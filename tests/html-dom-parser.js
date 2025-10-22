import parse from "html-dom-parser";

export default async function (html) {
	return parse(html);
};