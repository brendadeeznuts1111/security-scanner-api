// bun-optimizations.ts — High-impact Bun-native optimizations for scanner

import {readdir} from 'node:fs/promises';

// ── 1. Memory: no parent refs; monomorphic shape (all props pre-set) ───────────
export interface OptimizedDirectoryNode {
	path: string;
	name: string;
	children?: OptimizedDirectoryNode[];
	size?: number;
	lastModified?: number;
	isFile?: boolean;
	isDirectory?: boolean;
}

export function getParentPath(path: string): string | null {
	const lastSlash = path.lastIndexOf('/');
	return lastSlash > 0 ? path.slice(0, lastSlash) : null;
}

// ── 2. Concurrency limiting ───────────────────────────────────────────────────
export class ConcurrencyLimiter {
	private running = 0;
	private readonly queue: (() => void)[] = [];

	constructor(private readonly maxConcurrency: number = 64) {}

	async execute<T>(task: () => Promise<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			const run = async (): Promise<void> => {
				this.running++;
				try {
					const result = await task();
					resolve(result);
				} catch (error) {
					reject(error instanceof Error ? error : new Error(String(error)));
				} finally {
					this.running--;
					this.processQueue();
				}
			};
			if (this.running < this.maxConcurrency) void run();
			else this.queue.push(run);
		});
	}

	private processQueue(): void {
		if (this.queue.length > 0 && this.running < this.maxConcurrency) {
			const next = this.queue.shift()!;
			next();
		}
	}
}

export const ioLimiter = new ConcurrencyLimiter(64);

// ── 3. Fast file existence ────────────────────────────────────────────────────
export async function fileExists(path: string): Promise<boolean> {
	return Bun.file(path).exists();
}

// ── 4. Native glob ───────────────────────────────────────────────────────────
export async function* globScan(pattern: string, rootPath: string): AsyncGenerator<string> {
	const glob = new Bun.Glob(pattern);
	for await (const file of glob.scan(rootPath)) yield file;
}

// ── 5. Risk constants ─────────────────────────────────────────────────────────
export const BUN_RISK_CONSTANTS = {NANO_RISK: 1e-9, MICRO_RISK: 1e-6, MILLI_RISK: 1e-3} as const;
export function calculateRisk(latencyNs: number): number {
	return latencyNs * BUN_RISK_CONSTANTS.NANO_RISK;
}

// ── 6. Lazy tree materialization (monomorphic shape) ───────────────────────────
export async function* scanGenerator(rootPath: string): AsyncGenerator<OptimizedDirectoryNode> {
	const stack: string[] = [rootPath];

	while (stack.length > 0) {
		const currentPath = stack.pop()!;
		const name = currentPath.split('/').pop() ?? currentPath;
		const node: OptimizedDirectoryNode = {
			path: currentPath,
			name,
			children: undefined,
			size: undefined,
			lastModified: undefined,
			isFile: undefined,
			isDirectory: undefined,
		};

		const file = Bun.file(currentPath);
		if (await file.exists()) {
			const stat = await file.stat();
			node.isFile = stat.isFile();
			node.isDirectory = stat.isDirectory();
			node.size = stat.size;
			node.lastModified = stat.mtimeMs;

			if (node.isDirectory) {
				try {
					const entries = await ioLimiter.execute(async () => readdir(currentPath));
					for (const entry of entries) {
						if (!entry.startsWith('.')) stack.push(`${currentPath}/${entry}`);
					}
				} catch {
					// skip
				}
			}
		}

		yield node;
	}
}

// ── 7. Flatten tree (no recursion) ────────────────────────────────────────────
export function flattenTree(root: OptimizedDirectoryNode): OptimizedDirectoryNode[] {
	const queue: OptimizedDirectoryNode[] = [root];
	const result: OptimizedDirectoryNode[] = [];
	while (queue.length > 0) {
		const node = queue.pop()!;
		result.push(node);
		if (node.children) queue.push(...node.children);
	}
	return result;
}
