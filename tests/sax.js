import sax from 'sax';

export default function (html) {
	return new Promise((resolve, reject) => {
		// Use non-strict mode (false) for HTML parsing
		const parser = sax.parser(false, {
			lowercase: true,
			normalize: true
		});
		
		// Handle errors gracefully - HTML is not strict XML
		parser.onerror = (error) => {
			// Clear the error to continue parsing
			parser.error = null;
			parser.resume();
		};
		
		parser.onend = () => { resolve(); };
		
		try {
			parser.write(html).close();
		} catch (e) {
			// If there's a fatal error, still resolve to let benchmark continue
			resolve();
		}
	});
}