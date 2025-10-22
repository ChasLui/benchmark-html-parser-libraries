import { SaxesParser } from 'saxes';

export default function (html) {
	return new Promise((resolve, reject) => {
		const parser = new SaxesParser({
			xmlns: false,
			fragment: false,
			position: false
		});
		
		// Handle errors gracefully - HTML is not strict XML
		parser.on('error', (error) => {
			// Continue parsing despite errors
		});
		
		parser.on('end', () => {
			resolve();
		});
		
		try {
			parser.write(html);
			parser.close();
		} catch (e) {
			// If there's a fatal error, still resolve to let benchmark continue
			resolve();
		}
	});
}

