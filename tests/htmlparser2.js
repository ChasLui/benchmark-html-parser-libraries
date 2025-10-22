import { Parser } from "htmlparser2";

export default function (html) {
	return new Promise((resolve, reject) => {

		const parser = new Parser({
			onend: () => { resolve() },
			onerror: () => { reject() },
		});
		return parser.end(html);

	});
};