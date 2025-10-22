import { unified } from 'unified';
import rehypeParse from 'rehype-parse';

export default async function (html) {
	const processor = unified().use(rehypeParse);
	return processor.parse(html);
}

