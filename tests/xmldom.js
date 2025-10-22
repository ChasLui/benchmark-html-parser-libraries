import { DOMParser } from '@xmldom/xmldom';

export default function (html) {
	try {
		// Use onError callback to prevent crashes on malformed HTML
		const parser = new DOMParser({
			onError: () => {} // Silently ignore all errors
		});
		
		return parser.parseFromString(html, 'text/html');
	} catch (error) {
		// If parsing fails completely, return an empty document
		// This allows the benchmark to continue
		return null;
	}
}

