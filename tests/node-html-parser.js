import { parse } from 'node-html-parser';

export default function (html) {
	return parse(html);
}

