// eslint-plugin-bun.js — Custom ESLint rules for Bun-specific patterns

/**
 * Custom ESLint rule: require-bun-prefix
 * Enforces that constants related to Bun features must start with BUN_ prefix
 */
const requireBunPrefix = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Require Bun-specific constants to start with BUN_',
			recommended: true,
		},
		schema: [],
		messages: {
			missingBunPrefix: 'Constants related to Bun features should start with BUN_ prefix. Found: {{name}}',
		},
	},
	create(context) {
		// Keywords that indicate Bun-related constants
		const bunKeywords = ['API', 'CATALOG', 'DOC', 'KEYWORD', 'ANNOTATION', 'CONFIG', 'FORMAT', 'VERSION', 'COOKIE', 'R2', 'S3', 'CLIENT', 'ENDPOINT', 'BUCKET', 'ACCOUNT', 'ACCESS', 'SECRET'];

		/**
		 * Check if a constant name should have BUN_ prefix
		 */
		function shouldHaveBunPrefix(name) {
			// Skip if already has BUN_ prefix
			if (name.startsWith('BUN_')) {
				return false;
			}

			// Check if name contains Bun-related keywords (case-insensitive)
			const upperName = name.toUpperCase();
			return bunKeywords.some(keyword => upperName.includes(keyword));
		}

		return {
			VariableDeclaration(node) {
				if (node.kind === 'const' && node.declarations.length > 0) {
					for (const declaration of node.declarations) {
						if (declaration.id && declaration.id.type === 'Identifier') {
							const name = declaration.id.name;

							// Only check exported constants or SCREAMING_SNAKE_CASE constants
							const isExported = node.parent?.type === 'ExportNamedDeclaration' || 
											   node.parent?.type === 'ExportDefaultDeclaration' ||
											   (node.parent?.type === 'Program' && declaration.id.name.match(/^[A-Z][A-Z0-9_]*$/));

							if (isExported && shouldHaveBunPrefix(name)) {
								context.report({
									node: declaration.id,
									messageId: 'missingBunPrefix',
									data: {
										name,
									},
								});
							}
						}
					}
				}
			},
		};
	},
};

/**
 * Custom ESLint rule: no-hardcoded-similarity-threshold
 * Detects hardcoded numeric thresholds in similarity/distance comparisons
 * and suggests using named constants instead
 */
const noHardcodedSimilarityThreshold = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Disallow hardcoded similarity thresholds in distance comparisons',
			recommended: true,
		},
		schema: [
			{
				type: 'object',
				properties: {
					allowedThresholds: {
						type: 'array',
						items: { type: 'number' },
						description: 'List of threshold values that are allowed to be hardcoded',
					},
					functionNames: {
						type: 'array',
						items: { type: 'string' },
						description: 'Function names to check (default: levenshtein, distance, similarity)',
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			hardcodedThreshold: 'Hardcoded similarity threshold {{threshold}} detected. Consider using a named constant like SIMILARITY_THRESHOLD or MAX_DISTANCE instead.',
		},
	},
	create(context) {
		const options = context.options[0] || {};
		const allowedThresholds = new Set(options.allowedThresholds || []);
		const functionNames = new Set(options.functionNames || ['levenshtein', 'distance', 'similarity', 'editDistance']);

		/**
		 * Check if a node is a call to a similarity/distance function
		 */
		function isSimilarityFunction(node) {
			if (node.type !== 'CallExpression' || !node.callee) {
				return false;
			}

			const calleeName = node.callee.type === 'Identifier' ? node.callee.name : null;
			if (!calleeName) {
				return false;
			}

			// Check if function name matches (case-insensitive)
			const lowerName = calleeName.toLowerCase();
			return Array.from(functionNames).some(name => lowerName.includes(name.toLowerCase()));
		}

		/**
		 * Extract numeric value from a binary expression or literal
		 */
		function getNumericValue(node) {
			if (node.type === 'Literal' && typeof node.value === 'number') {
				return node.value;
			}
			if (node.type === 'UnaryExpression' && node.operator === '-' && node.argument?.type === 'Literal') {
				return -node.argument.value;
			}
			return null;
		}

		/**
		 * Check if a comparison uses a hardcoded threshold
		 */
		function checkHardcodedThreshold(node, left, right) {
			// Check if left side is a similarity function call
			const isLeftSimilarity = isSimilarityFunction(left);
			const isRightSimilarity = isSimilarityFunction(right);

			if (!isLeftSimilarity && !isRightSimilarity) {
				return;
			}

			// Get the threshold value (the non-function side)
			const thresholdNode = isLeftSimilarity ? right : left;
			const threshold = getNumericValue(thresholdNode);

			if (threshold !== null && !allowedThresholds.has(threshold)) {
				context.report({
					node: thresholdNode,
					messageId: 'hardcodedThreshold',
					data: {
						threshold: String(threshold),
					},
				});
			}
		}

		return {
			BinaryExpression(node) {
				const { operator, left, right } = node;

				// Check comparison operators that might use thresholds
				if (['<=', '>=', '<', '>', '===', '==', '!==', '!='].includes(operator)) {
					checkHardcodedThreshold(node, left, right);
				}
			},
		};
	},
};

export default {
	rules: {
		'require-bun-prefix': requireBunPrefix,
		'no-hardcoded-similarity-threshold': noHardcodedSimilarityThreshold,
	},
};
