import jsdom from 'jsdom';
const { JSDOM } = jsdom;

export default async function (html) {
    const dom = JSDOM.fragment(html, { url: 'http://example.com' });
    return dom;
}