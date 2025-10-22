import * as cheerio from 'cheerio';

export default function (html) {
	return cheerio.load(html);
}

