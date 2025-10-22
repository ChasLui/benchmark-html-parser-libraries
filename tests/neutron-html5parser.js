import neutronHTML5Parser from "neutron-html5parser";
const HTMLtoDOM = neutronHTML5Parser();

export default async function (html) {
    function noop() { }
    return HTMLtoDOM.Parser(html, {
        start: noop,
        end: noop,
        chars: noop,
        comment: noop,
        doctype: noop
    });
};
