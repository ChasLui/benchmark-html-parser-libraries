import htmlParser from "html-parser";

export default async function (html) {
	return htmlParser.parse(html, {});
};
