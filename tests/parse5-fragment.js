import { parseFragment } from 'parse5';

export default function(html, callback) {
	return parseFragment(html.toString());
};
