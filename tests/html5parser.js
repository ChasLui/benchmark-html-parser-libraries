import { parse } from 'html5parser';

export default function (html) {
    return parse(html);
}