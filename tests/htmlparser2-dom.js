import { Parser, DomHandler } from 'htmlparser2';

export default async function (html) {
	const handler = new DomHandler();
	const parser = new Parser(handler);
	return parser.parseComplete(html);
};
