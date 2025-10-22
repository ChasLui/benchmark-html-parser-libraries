import { parse } from 'ltx';

export default function (html) {
	try {
		// ltx is designed for XML/XMPP, so we'll parse what we can
		return parse(html);
	} catch (e) {
		// If parsing fails, return null to continue benchmark
		return null;
	}
}

