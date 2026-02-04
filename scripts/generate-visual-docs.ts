#!/usr/bin/env bun
/**
 * Visual Documentation Generator - Tier-1380 Enhanced
 * Generates HTML dashboard, badges, and visual indicators for BUN constants versioning system
 *
 * Usage:
 *   bun scripts/generate-visual-docs.ts
 *   bun scripts/generate-visual-docs.ts --serve
 *   bun scripts/generate-visual-docs.ts --badges-only
 */

import {readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync} from 'fs';
import {join} from 'path';
import {Bun} from 'bun';

const REGISTRY_FILE = join(import.meta.dir, '..', '..', 'BUN_CONSTANTS_VERSION.json');
const OUTPUT_DIR = join(import.meta.dir, '..', '..', 'docs', 'visual');
const DASHBOARD_FILE = join(OUTPUT_DIR, 'dashboard.html');
const BADGES_DIR = join(OUTPUT_DIR, 'badges');

interface VersionRegistry {
	version: string;
	schemaVersion: string;
	bunVersion: string;
	mcpEnabled: boolean;
	tier1380: {
		compliant: boolean;
		certified: string;
		auditLevel: string;
		col89Max: number;
		col93Balanced: boolean;
	};
	projects: Record<
		string,
		{
			root: string;
			constants: number;
			lastScan: string;
		}
	>;
	constants: any[];
	metadata: {
		totalConstants: number;
		extractionTime: string;
		platform: string;
		nodeVersion: string;
		cliVersion: string;
	};
	changelog: Record<string, string>;
}

function generateBadgeSVG(name: string, value: string, color: string, scale = 1): string {
	const width = Math.ceil((120 + value.length * 8) * scale);
	const height = Math.ceil(20 * scale);

	return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <linearGradient id="a" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <clipPath id="a">
      <rect width="${width}" height="${height}" rx="3" fill="#fff"/>
    </clipPath>
    <g clip-path="url(#a)">
      <path fill="#555" d="M0 0h${width * 0.4}v${height}H0z"/>
      <path fill="${color}" d="M${width * 0.4} 0h${width * 0.6}v${height}H${width * 0.4}z"/>
      <path fill="url(#a)" d="M0 0h${width}v${height}H0z"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${11 * scale}">
      <text x="${width * 0.2}" y="${height * 0.68}" fill="#010101" fill-opacity=".3">${name}</text>
      <text x="${width * 0.2}" y="${height * 0.68}" fill="#fff">${name}</text>
      <text x="${width * 0.7}" y="${height * 0.68}" fill="#010101" fill-opacity=".3">${value}</text>
      <text x="${width * 0.7}" y="${height * 0.68}" fill="#fff">${value}</text>
    </g>
  </svg>`;
}

function generateBadges(registry: VersionRegistry): void {
	try {
		// Create badges directory
		if (!existsSync(BADGES_DIR)) {
			mkdirSync(BADGES_DIR, {recursive: true});
		}

		const badges = [
			{name: 'version', value: `v${registry.version}`, color: '#007ec6'},
			{
				name: 'tier-1380',
				value: registry.tier1380.compliant ? 'certified' : 'non-compliant',
				color: registry.tier1380.compliant ? '#28a745' : '#dc3545',
			},
			{name: 'constants', value: registry.metadata.totalConstants.toString(), color: '#6f42c1'},
			{name: 'schema', value: registry.schemaVersion, color: '#17a2b8'},
			{
				name: 'mcp',
				value: registry.mcpEnabled ? 'enabled' : 'disabled',
				color: registry.mcpEnabled ? '#28a745' : '#6c757d',
			},
			{name: 'col-89', value: 'compliant', color: '#fd7e14'},
			{name: 'audit', value: registry.tier1380.auditLevel, color: '#e83e8c'},
			{name: 'projects', value: Object.keys(registry.projects).length.toString(), color: '#20c997'},
		];

		for (const badge of badges) {
			const svg = generateBadgeSVG(badge.name, badge.value, badge.color);
			writeFileSync(join(BADGES_DIR, `${badge.name.replace('-', '_')}.svg`), svg);
		}

		// Generate badges markdown
		const badgesMarkdown = badges
			.map(badge => `![${badge.name}](badges/${badge.name.replace('-', '_')}.svg)`)
			.join(' ');

		writeFileSync(join(BADGES_DIR, 'README.md'), `# Tier-1380 Badges\n\n${badgesMarkdown}\n`);
		console.log(`🏷️  Generated ${badges.length} badges in ${BADGES_DIR}`);
	} catch (error) {
		console.warn(`⚠️  Failed to generate badges: ${error.message}`);
	}
}

function generateDashboardHTML(registry: VersionRegistry): string {
	const lastUpdated = new Date(registry.metadata.extractionTime).toLocaleString();
	const certifiedDate = new Date(registry.tier1380.certified).toLocaleDateString();

	// Calculate statistics
	const categories = [...new Set(registry.constants.map(c => c.category).filter(Boolean))];
	const types = [...new Set(registry.constants.map(c => c.type).filter(Boolean))];
	const securityLevels = [...new Set(registry.constants.map(c => c.security).filter(Boolean))];

	const categoryStats = categories
		.map(cat => ({
			name: cat,
			count: registry.constants.filter(c => c.category === cat).length,
		}))
		.sort((a, b) => b.count - a.count);

	const typeStats = types
		.map(type => ({
			name: type,
			count: registry.constants.filter(c => c.type === type).length,
		}))
		.sort((a, b) => b.count - a.count);

	const securityStats = securityLevels
		.map(level => ({
			name: level,
			count: registry.constants.filter(c => c.security === level).length,
		}))
		.sort((a, b) => b.count - a.count);

	// Project breakdown
	const projectStats = Object.entries(registry.projects).map(([name, proj]) => ({
		name,
		count: registry.constants.filter(c => c.project === name).length,
		...proj,
	}));

	// Prepare constants data as JSON for JavaScript
	const constantsJSON = JSON.stringify(
		registry.constants.map(c => ({
			name: c.name,
			project: c.project,
			type: c.type ?? 'string',
			category: c.category ?? '-',
			security: c.security ?? 'low',
			mcp: c.tier1380?.mcpExposed ?? false,
			path: c.relPath,
			line: c.line,
			value: c.value,
			description: c.description,
		})),
	);

	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BUN Constants - Tier-1380 Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0d1117; color: #c9d1d9; line-height: 1.6; }
        .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 40px; padding: 40px 0; background: linear-gradient(135deg, #161b22 0%, #21262d 100%); border-radius: 12px; border: 1px solid #30363d; }
        .header h1 { font-size: 2.5rem; margin-bottom: 10px; background: linear-gradient(135deg, #58a6ff 0%, #79c0ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .header p { font-size: 1.1rem; color: #8b949e; }
        .badges { display: flex; justify-content: center; gap: 10px; margin-top: 20px; flex-wrap: wrap; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .card { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 24px; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); }
        .card h3 { color: #58a6ff; margin-bottom: 16px; font-size: 1.2rem; display: flex; align-items: center; gap: 8px; }
        .metric { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #21262d; }
        .metric:last-child { border-bottom: none; }
        .metric-value { font-weight: 600; color: #79c0ff; }
        .status-compliant { color: #3fb950; }
        .status-non-compliant { color: #f85149; }
        .chart-bar { background: #21262d; height: 8px; border-radius: 4px; margin-top: 4px; overflow: hidden; }
        .chart-fill { background: linear-gradient(90deg, #58a6ff 0%, #79c0ff 100%); height: 100%; border-radius: 4px; transition: width 0.3s ease; }
        .controls { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 20px; margin-bottom: 20px; display: flex; gap: 15px; flex-wrap: wrap; align-items: center; }
        .search-box { flex: 1; min-width: 200px; padding: 10px 15px; background: #0d1117; border: 1px solid #30363d; border-radius: 6px; color: #c9d1d9; font-size: 14px; }
        .search-box:focus { outline: none; border-color: #58a6ff; }
        .filter-group { display: flex; gap: 10px; flex-wrap: wrap; }
        .filter-btn { padding: 8px 16px; background: #21262d; border: 1px solid #30363d; border-radius: 6px; color: #c9d1d9; cursor: pointer; font-size: 13px; transition: all 0.2s; }
        .filter-btn:hover { background: #30363d; border-color: #58a6ff; }
        .filter-btn.active { background: #58a6ff; border-color: #58a6ff; color: white; }
        .export-btn { padding: 8px 16px; background: #238636; border: 1px solid #2ea043; border-radius: 6px; color: white; cursor: pointer; font-size: 13px; transition: all 0.2s; }
        .export-btn:hover { background: #2ea043; }
        .constants-table-wrapper { width: 100%; background: #161b22; border-radius: 8px; overflow: hidden; border: 1px solid #30363d; }
        .constants-table { width: 100%; border-collapse: collapse; }
        .constants-table th { background: #21262d; padding: 12px; text-align: left; font-weight: 600; color: #f0f6fc; cursor: pointer; user-select: none; position: relative; }
        .constants-table th:hover { background: #30363d; }
        .constants-table th.sortable::after { content: ' ↕'; opacity: 0.5; font-size: 0.8em; }
        .constants-table th.sort-asc::after { content: ' ↑'; opacity: 1; }
        .constants-table th.sort-desc::after { content: ' ↓'; opacity: 1; }
        .constants-table td { padding: 12px; border-bottom: 1px solid #21262d; }
        .constants-table tbody tr { transition: background 0.15s; }
        .constants-table tbody tr:hover { background: #0d1117; }
        .constants-table tbody tr.hidden { display: none; }
        .type-badge { padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; }
        .type-string { background: #0969da; color: white; }
        .type-url { background: #8250df; color: white; }
        .type-number { background: #d1242f; color: white; }
        .security-low { background: #1f7424; color: white; }
        .security-medium { background: #9a6700; color: white; }
        .security-high { background: #d1242f; color: white; }
        .security-critical { background: #8250df; color: white; }
        .pagination { display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 20px; padding: 15px; }
        .pagination-btn { padding: 8px 12px; background: #21262d; border: 1px solid #30363d; border-radius: 6px; color: #c9d1d9; cursor: pointer; font-size: 13px; transition: all 0.2s; }
        .pagination-btn:hover:not(:disabled) { background: #30363d; border-color: #58a6ff; }
        .pagination-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .pagination-info { color: #8b949e; font-size: 14px; }
        .footer { text-align: center; margin-top: 40px; padding: 20px; border-top: 1px solid #30363d; color: #8b949e; }
        .code-link { color: #58a6ff; text-decoration: none; }
        .code-link:hover { text-decoration: underline; }
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .header h1 { font-size: 2rem; }
            .grid { grid-template-columns: 1fr; }
            .badges { justify-content: center; }
            .controls { flex-direction: column; align-items: stretch; }
            .search-box { width: 100%; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏆 BUN Constants Dashboard</h1>
            <p>Tier-1380 Certified Version Management System</p>
            <div class="badges">
                <img src="badges/version.svg" alt="Version">
                <img src="badges/tier-1380.svg" alt="Tier-1380">
                <img src="badges/constants.svg" alt="Constants">
                <img src="badges/schema.svg" alt="Schema">
                <img src="badges/mcp.svg" alt="MCP">
                <img src="badges/col-89.svg" alt="Col-89">
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <h3>📊 System Overview</h3>
                <div class="metric">
                    <span>Version</span>
                    <span class="metric-value">v${registry.version}</span>
                </div>
                <div class="metric">
                    <span>Total Constants</span>
                    <span class="metric-value">${registry.metadata.totalConstants}</span>
                </div>
                <div class="metric">
                    <span>Projects</span>
                    <span class="metric-value">${Object.keys(registry.projects).length}</span>
                </div>
                <div class="metric">
                    <span>Last Updated</span>
                    <span class="metric-value">${lastUpdated}</span>
                </div>
            </div>

            <div class="card">
                <h3>🔒 Tier-1380 Compliance</h3>
                <div class="metric">
                    <span>Certification Status</span>
                    <span class="status-compliant">${registry.tier1380.compliant ? '✅ Certified' : '❌ Non-Compliant'}</span>
                </div>
                <div class="metric">
                    <span>Certified Date</span>
                    <span class="metric-value">${certifiedDate}</span>
                </div>
                <div class="metric">
                    <span>Audit Level</span>
                    <span class="metric-value">${registry.tier1380.auditLevel}</span>
                </div>
                <div class="metric">
                    <span>Col-89 Max Width</span>
                    <span class="metric-value">${registry.tier1380.col89Max} chars</span>
                </div>
            </div>

            <div class="card">
                <h3>🛠️ Technical Details</h3>
                <div class="metric">
                    <span>Bun Version</span>
                    <span class="metric-value">${registry.bunVersion}</span>
                </div>
                <div class="metric">
                    <span>Schema Version</span>
                    <span class="metric-value">${registry.schemaVersion}</span>
                </div>
                <div class="metric">
                    <span>MCP Enabled</span>
                    <span class="status-${registry.mcpEnabled ? 'compliant' : 'non-compliant'}">${registry.mcpEnabled ? '✅ Yes' : '❌ No'}</span>
                </div>
                <div class="metric">
                    <span>Platform</span>
                    <span class="metric-value">${registry.metadata.platform}</span>
                </div>
            </div>

            <div class="card">
                <h3>📈 Category Distribution</h3>
                ${categoryStats
					.map(
						cat => `
                <div class="metric">
                    <span>${cat.name}</span>
                    <span class="metric-value">${cat.count}</span>
                </div>
                <div class="chart-bar">
                    <div class="chart-fill" style="width: ${(cat.count / registry.metadata.totalConstants) * 100}%"></div>
                </div>
                `,
					)
					.join('')}
            </div>

            <div class="card">
                <h3>🔤 Type Distribution</h3>
                ${typeStats
					.map(
						type => `
                <div class="metric">
                    <span>${type.name}</span>
                    <span class="metric-value">${type.count}</span>
                </div>
                <div class="chart-bar">
                    <div class="chart-fill" style="width: ${(type.count / registry.metadata.totalConstants) * 100}%"></div>
                </div>
                `,
					)
					.join('')}
            </div>

            <div class="card">
                <h3>🔐 Security Classification</h3>
                ${securityStats
					.map(
						sec => `
                <div class="metric">
                    <span>${sec.name.charAt(0).toUpperCase() + sec.name.slice(1)}</span>
                    <span class="metric-value">${sec.count}</span>
                </div>
                <div class="chart-bar">
                    <div class="chart-fill" style="width: ${(sec.count / registry.metadata.totalConstants) * 100}%"></div>
                </div>
                `,
					)
					.join('')}
            </div>

            <div class="card">
                <h3>📦 Project Breakdown</h3>
                ${projectStats
					.map(
						proj => `
                <div class="metric">
                    <span>${proj.name}</span>
                    <span class="metric-value">${proj.count}</span>
                </div>
                <div class="chart-bar">
                    <div class="chart-fill" style="width: ${(proj.count / registry.metadata.totalConstants) * 100}%"></div>
                </div>
                `,
					)
					.join('')}
            </div>
        </div>

        <div class="controls">
            <input type="text" class="search-box" id="searchInput" placeholder="🔍 Search constants, projects, types..." />
            <div class="filter-group">
                <button class="filter-btn" data-filter="all">All</button>
                <button class="filter-btn" data-filter="mcp">MCP Only</button>
                <button class="filter-btn" data-filter="critical">Critical</button>
                ${categories.map(cat => `<button class="filter-btn" data-filter="category:${cat}">${cat}</button>`).join('')}
            </div>
            <button class="export-btn" onclick="exportData('json')">Export JSON</button>
            <button class="export-btn" onclick="exportData('csv')">Export CSV</button>
        </div>

        <div class="constants-table-wrapper">
            <table class="constants-table">
                <thead>
                    <tr>
                        <th class="sortable" data-sort="name">Constant</th>
                        <th class="sortable" data-sort="project">Project</th>
                        <th class="sortable" data-sort="type">Type</th>
                        <th class="sortable" data-sort="category">Category</th>
                        <th class="sortable" data-sort="security">Security</th>
                        <th class="sortable" data-sort="mcp">MCP</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody id="constantsTableBody">
                    ${registry.constants
						.map(
							constant => `
                    <tr data-name="${constant.name.toLowerCase()}" data-project="${constant.project}" data-type="${constant.type ?? 'string'}" data-category="${constant.category ?? ''}" data-security="${constant.security ?? 'low'}" data-mcp="${constant.tier1380?.mcpExposed ? 'true' : 'false'}">
                        <td><code>${constant.name}</code></td>
                        <td>${constant.project}</td>
                        <td><span class="type-badge type-${constant.type ?? 'string'}">${constant.type ?? 'string'}</span></td>
                        <td>${constant.category ?? '-'}</td>
                        <td><span class="type-badge security-${constant.security ?? 'low'}">${constant.security ?? 'low'}</span></td>
                        <td>${constant.tier1380?.mcpExposed ? '✅' : '❌'}</td>
                        <td><a href="#" class="code-link" title="${constant.relPath}:${constant.line}">${constant.relPath}:${constant.line}</a></td>
                    </tr>
                    `,
						)
						.join('')}
                </tbody>
            </table>
        </div>

        <div class="pagination">
            <button class="pagination-btn" id="prevBtn" onclick="changePage(-1)">← Previous</button>
            <span class="pagination-info" id="pageInfo">Page 1 of <span id="totalPages">1</span></span>
            <button class="pagination-btn" id="nextBtn" onclick="changePage(1)">Next →</button>
        </div>

        <div class="footer">
            <p>Generated on ${new Date().toISOString()} | Tier-1380 Certified | BUN Constants Version Management System</p>
        </div>
    </div>
    <script>
        const constantsData = ${constantsJSON};
        let filteredData = [...constantsData];
        let currentPage = 1;
        const itemsPerPage = 50;
        let sortColumn = null;
        let sortDirection = 'asc';

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterAndRender(query);
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                applyFilter(filter);
            });
        });

        function applyFilter(filter) {
            if (filter === 'all') {
                filteredData = [...constantsData];
            } else if (filter === 'mcp') {
                filteredData = constantsData.filter(c => c.mcp);
            } else if (filter === 'critical') {
                filteredData = constantsData.filter(c => c.security === 'critical');
            } else if (filter.startsWith('category:')) {
                const category = filter.split(':')[1];
                filteredData = constantsData.filter(c => c.category === category);
            }
            currentPage = 1;
            renderTable();
        }

        function filterAndRender(query) {
            const rows = document.querySelectorAll('#constantsTableBody tr');
            let visibleCount = 0;
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                const matches = !query || text.includes(query);
                row.classList.toggle('hidden', !matches);
                if (matches) visibleCount++;
            });
            updatePagination(visibleCount);
        }

        // Sorting
        document.querySelectorAll('.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const column = th.dataset.sort;
                if (sortColumn === column) {
                    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    sortColumn = column;
                    sortDirection = 'asc';
                }
                
                document.querySelectorAll('.sortable').forEach(t => {
                    t.classList.remove('sort-asc', 'sort-desc');
                });
                th.classList.add(\`sort-\${sortDirection}\`);
                
                filteredData.sort((a, b) => {
                    let aVal = a[column];
                    let bVal = b[column];
                    if (column === 'mcp') {
                        aVal = a.mcp ? 1 : 0;
                        bVal = b.mcp ? 1 : 0;
                    }
                    if (typeof aVal === 'string') {
                        aVal = aVal.toLowerCase();
                        bVal = bVal.toLowerCase();
                    }
                    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
                    return sortDirection === 'asc' ? comparison : -comparison;
                });
                
                currentPage = 1;
                renderTable();
            });
        });

        function renderTable() {
            const tbody = document.getElementById('constantsTableBody');
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageData = filteredData.slice(start, end);
            
            tbody.innerHTML = pageData.map(constant => \`
                <tr data-name="\${constant.name.toLowerCase()}" data-project="\${constant.project}" data-type="\${constant.type}" data-category="\${constant.category}" data-security="\${constant.security}" data-mcp="\${constant.mcp}">
                    <td><code>\${constant.name}</code></td>
                    <td>\${constant.project}</td>
                    <td><span class="type-badge type-\${constant.type}">\${constant.type}</span></td>
                    <td>\${constant.category || '-'}</td>
                    <td><span class="type-badge security-\${constant.security}">\${constant.security}</span></td>
                    <td>\${constant.mcp ? '✅' : '❌'}</td>
                    <td><a href="#" class="code-link" title="\${constant.path}:\${constant.line}">\${constant.path}:\${constant.line}</a></td>
                </tr>
            \`).join('');
            
            updatePagination(filteredData.length);
            
            // Re-apply search filter
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();
            if (searchQuery) {
                filterAndRender(searchQuery);
            }
        }

        function updatePagination(totalItems) {
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            document.getElementById('totalPages').textContent = totalPages;
            document.getElementById('pageInfo').innerHTML = \`Page \${currentPage} of \${totalPages} (\${totalItems} total)\`;
            document.getElementById('prevBtn').disabled = currentPage === 1;
            document.getElementById('nextBtn').disabled = currentPage >= totalPages;
        }

        function changePage(direction) {
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            const newPage = currentPage + direction;
            if (newPage >= 1 && newPage <= totalPages) {
                currentPage = newPage;
                renderTable();
            }
        }

        // Export functionality
        function exportData(format) {
            const data = filteredData.length > 0 ? filteredData : constantsData;
            let content, filename, mimeType;
            
            if (format === 'json') {
                content = JSON.stringify(data, null, 2);
                filename = \`bun-constants-\${new Date().toISOString().split('T')[0]}.json\`;
                mimeType = 'application/json';
            } else {
                const headers = ['Name', 'Project', 'Type', 'Category', 'Security', 'MCP', 'Path', 'Line', 'Value', 'Description'];
                const rows = data.map(c => [
                    c.name,
                    c.project,
                    c.type,
                    c.category || '',
                    c.security,
                    c.mcp ? 'Yes' : 'No',
                    c.path || '',
                    c.line || '',
                    c.value || '',
                    c.description || ''
                ]);
                content = [headers, ...rows].map(row => row.map(cell => \`"\${String(cell).replace(/"/g, '""')}"\`).join(',')).join('\\n');
                filename = \`bun-constants-\${new Date().toISOString().split('T')[0]}.csv\`;
                mimeType = 'text/csv';
            }
            
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }

        // Initialize
        updatePagination(filteredData.length);
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    </script>
</body>
</html>`;
}

function main(): void {
	const args = process.argv.slice(2);
	const badgesOnly = args.includes('--badges-only');
	const serveMode = args.includes('--serve');

	try {
		// Read registry
		const registry: VersionRegistry = JSON.parse(readFileSync(REGISTRY_FILE, 'utf-8'));
		console.log(`📊 Loaded registry: v${registry.version} with ${registry.metadata.totalConstants} constants`);

		// Generate badges
		generateBadges(registry);

		if (!badgesOnly) {
			// Create output directory
			if (!existsSync(OUTPUT_DIR)) {
				mkdirSync(OUTPUT_DIR, {recursive: true});
			}

			// Generate dashboard HTML
			const html = generateDashboardHTML(registry);
			writeFileSync(DASHBOARD_FILE, html);
			console.log(`🎨 Generated dashboard: ${DASHBOARD_FILE}`);

			// Copy badges to dashboard directory
			const dashboardBadgesDir = join(OUTPUT_DIR, 'dashboard-badges');
			try {
				if (!existsSync(dashboardBadgesDir)) {
					mkdirSync(dashboardBadgesDir, {recursive: true});
				}
				const badgeFiles = readdirSync(BADGES_DIR);
				for (const badgeFile of badgeFiles) {
					if (badgeFile.endsWith('.svg')) {
						const content = readFileSync(join(BADGES_DIR, badgeFile), 'utf-8');
						writeFileSync(join(dashboardBadgesDir, badgeFile), content);
					}
				}
				console.log(`🏷️  Copied badges to dashboard directory`);
			} catch (error) {
				console.warn(`⚠️  Failed to copy badges: ${error.message}`);
			}

			if (serveMode) {
				console.log(`🌐 Starting dashboard server...`);
				console.log(`📱 Open http://localhost:3000 to view the dashboard`);

				const server = Bun.serve({
					port: 3000,
					fetch(req) {
						const url = new URL(req.url);
						if (url.pathname === '/') {
							return new Response(html, {
								headers: {'Content-Type': 'text/html'},
							});
						} else if (url.pathname.startsWith('/badges/')) {
							try {
								const badgePath = join(BADGES_DIR, url.pathname.replace('/badges/', ''));
								if (existsSync(badgePath)) {
									const badgeContent = readFileSync(badgePath, 'utf-8');
									return new Response(badgeContent, {
										headers: {'Content-Type': 'image/svg+xml'},
									});
								}
							} catch {}
						}
						return new Response('Not Found', {status: 404});
					},
				});

				console.log(`🚀 Dashboard running at http://localhost:3000`);
				console.log(`🛑 Press Ctrl+C to stop the server`);

				// Keep server running
				process.on('SIGINT', () => {
					console.log('\n🛑 Shutting down dashboard server...');
					server.stop();
					process.exit(0);
				});
			}
		}

		console.log(`✅ Visual documentation generation complete!`);
	} catch (error) {
		console.error(`❌ Failed to generate visual documentation: ${error.message}`);
		process.exit(1);
	}
}

if (import.meta.main) {
	main();
}
