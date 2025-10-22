import xml from 'node-xml';

// Timeout for single file parsing (5 seconds)
const PARSE_TIMEOUT = 5000;

export default function (html) {
	return new Promise((resolve, reject) => {
		const result = {};
		
		// State management to prevent multiple resolves
		let resolved = false;
		let timeoutId = null;
		
		// Safe resolve function that clears timeout and prevents duplicates
		const safeResolve = (value = result) => {
			if (resolved) return;
			resolved = true;
			
			// Clear timeout to prevent memory leak
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
			
			resolve(value);
		};
		
		// Set timeout protection to prevent infinite hanging
		// node-xml may not trigger onEndDocument for malformed HTML
		timeoutId = setTimeout(() => {
			if (!resolved) {
				// Force resolve after timeout
				safeResolve(result);
			}
		}, PARSE_TIMEOUT);
		
		try {
			const parser = new xml.SaxParser((cb) => {
				cb.onStartDocument(() => {});
				
				// Normal completion
				cb.onEndDocument(() => {
					safeResolve(result);
				});
				
				cb.onStartElementNS(() => {});
				cb.onEndElementNS(() => {});
				cb.onCharacters(() => {});
				cb.onCdata(() => {});
				cb.onComment(() => {});
				cb.onWarning(() => {});
				
				// Error handling - resolve instead of hanging
				cb.onError((msg) => {
					// Continue on error and resolve to avoid blocking
					safeResolve(result);
				});
			});
			
			parser.parseString(html);
		} catch (e) {
			// Catch synchronous errors and resolve
			safeResolve(result);
		}
	});
}

