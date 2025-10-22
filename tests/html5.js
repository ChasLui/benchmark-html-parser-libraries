import pkg from 'html5';
const { SAXParser: Parser } = pkg;

export default async function (html) {
	var parser = new Parser();
	var noop = function() {};
	parser.contentHandler = {
		startDocument: noop,
		endDocument: noop,
		startElement: noop,
		endElement: noop,
		characters: noop
	};
	return parser.parse(html);
};
