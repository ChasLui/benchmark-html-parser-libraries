import domino from 'domino';

export default function (html) {
	return domino.createDocument(html);
}

