import jsdom from 'jsdom';
const { JSDOM } = jsdom;

export default async function (html) {
    const dom = new JSDOM(html, { url: 'http://example.com' });
    return dom;
}