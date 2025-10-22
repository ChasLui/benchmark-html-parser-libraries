# Benchmark HTML Parser Libraries
A Benchmark of javascript libraries for parsing HTML (CPU/RAM)

## Libraries Tested

This benchmark includes the following HTML parser libraries:

### Original Libraries
- **htmlparser2** - Fast & forgiving HTML/XML parser with streaming support 🌐 *Browser + Node.js*
- **parse5** - HTML5 spec-compliant parser with detailed error reporting 🌐 *Browser + Node.js*
- **jsdom** - Full JavaScript implementation of web standards for Node.js *Node.js only*
- **html5parser** - Lightweight HTML5 spec-compliant streaming parser 🌐 *Browser + Node.js*
- **libxmljs** - Fast native libxml2 bindings for Node.js with XPath support *Node.js only (native)*
- **sax** - Streaming SAX-style XML parser with low memory footprint 🌐 *Browser + Node.js*
- **html-dom-parser** - Converts HTML strings to DOM nodes using htmlparser2 🌐 *Browser + Node.js*
- **fast-xml-parser** - High-performance XML/HTML parser with validation support 🌐 *Browser + Node.js*
- **htmlparser** - Original tolerant HTML parser for Node.js (legacy) *Node.js only*
- **html-parser** - Simple and flexible HTML tokenizer and parser 🌐 *Browser + Node.js*
- **html5** - HTML5 parser implementation in pure JavaScript 🌐 *Browser + Node.js*
- **neutron-html5parser** - Ultra-lightweight HTML5 parser with minimal overhead 🌐 *Browser + Node.js*
- **sax-wasm** - WebAssembly-based SAX parser for extreme performance 🌐 *Browser + Node.js*

### Newly Added Libraries (2025)
- **cheerio** - Fast, jQuery-like DOM manipulation (based on htmlparser2 and parse5) 🌐 *Browser + Node.js*
- **node-html-parser** - Pure JavaScript, zero dependencies, browser-like DOM API 🌐 *Browser + Node.js*
- **linkedom** - Lightweight DOM implementation by Cloudflare, browser-compatible API 🌐 *Browser + Node.js*
- **domino** - Server-side DOM implementation with browser-consistent API *Node.js only*
- **@xmldom/xmldom** - Native DOM Level 2/3 implementation for HTML and XML 🌐 *Browser + Node.js*
- **rehype** - unified ecosystem HTML processor with AST transformation 🌐 *Browser + Node.js*

### XML Parser Libraries (2025)
- **saxes** - Evented streaming XML parser, modern fork of sax-js with TypeScript support 🌐 *Browser + Node.js*
- **ltx** - Lightweight XML parser for XMPP/Jabber applications (from @xmppjs) 🌐 *Browser + Node.js*
- **node-xml** - Libxml bindings for Node.js, SAX-style XML to JSON parser *Node.js only (native)*
- **node-expat** - Fast streaming XML parser based on libexpat *Node.js only (native)*

# Results

[List of result](./results)

<!--RESULTS-->
Date: `2025-10-22T06:53:38.600Z`

|         Library          |     ms/file (Mean)      | Module Startup  | RAM MB/file (Mean)  |   Max   | Lib Overhead  |  Delta  |
|--------------------------|-------------------------|-----------------|---------------------|---------|---------------|---------|
| cheerio.js               |    12.5745ms ±7.61980ms |       133.670ms |       115mb ±11.0mb |   123mb |        26.6mb |  38.5mb |
| domino.js                |    7.29536ms ±6.18280ms |       34.0436ms |       100mb ±17.8mb |   108mb |        26.8mb |  27.6mb |
| fast-xml-parser.js       |    6.05691ms ±4.16235ms |       8.01246ms |      93.5mb ±19.9mb |   104mb |        5.75mb |  41.1mb |
| html-dom-parser.js       |    6.20442ms ±15.9363ms |       23.2874ms |      93.7mb ±20.2mb |   104mb |        13.0mb |  30.8mb |
| html-parser.js           |    11.5430ms ±8.46132ms |       3.31087ms |      85.6mb ±15.0mb |  95.3mb |        1.95mb |  32.0mb |
| html5.js                 |    75.4416ms ±115.811ms |       22.6453ms |      94.5mb ±4.05mb |   102mb |        16.1mb |  30.3mb |
| html5parser.js           |  0.959125ms ±0.802085ms |       6.42292ms |      95.5mb ±11.5mb |   101mb |        6.14mb |  42.9mb |
| htmlparser.js            |    15.9346ms ±90.8120ms |       3.54279ms |      76.8mb ±11.2mb |  81.4mb |        2.70mb |  21.4mb |
| htmlparser2-dom.js       |    4.47496ms ±3.26854ms |       21.3009ms |      70.8mb ±14.7mb |  73.8mb |        8.93mb |  13.1mb |
| htmlparser2.js           |    3.93414ms ±3.02513ms |       12.5213ms |      66.4mb ±14.6mb |  68.5mb |        8.54mb |  8.03mb |
| jsdom-fragment.js        |    40.3006ms ±22.5432ms |       330.344ms |       159mb ±12.9mb |   165mb |        71.7mb |  44.2mb |
| jsdom-node-locations.js  |    42.6174ms ±35.3054ms |       291.448ms |       157mb ±16.3mb |   166mb |        70.4mb |  37.4mb |
| jsdom.js                 |    51.5161ms ±39.1054ms |       367.210ms |       162mb ±16.7mb |   171mb |        69.3mb |  37.7mb |
| libxmljs.js              |    1.82985ms ±1.60672ms |       9.37438ms |      73.9mb ±20.7mb |  77.6mb |        8.63mb |  17.2mb |
| linkedom.js              |    7.36873ms ±7.34008ms |       66.6308ms |       105mb ±20.9mb |   114mb |        14.7mb |  46.9mb |
| ltx.js                   |    1.14182ms ±6.26301ms |       6.98100ms |      65.8mb ±19.1mb |  69.9mb |        5.82mb |  4.87mb |
| neutron-html5parser.js   |    1.25210ms ±1.54199ms |       3.73546ms |      71.7mb ±21.6mb |  74.8mb |        1.75mb |  21.0mb |
| node-expat.js            |  0.225692ms ±0.232368ms |       5.58321ms |      65.0mb ±24.6mb |  66.4mb |        5.44mb |  9.08mb |
| node-html-parser.js      |   1.16427ms ±0.805465ms |       29.5126ms |      98.1mb ±11.8mb |   106mb |        14.5mb |  38.8mb |
| node-xml.js              |   0.868144ms ±1.15726ms |       4.31687ms |      75.7mb ±24.3mb |  80.8mb |        3.11mb |  25.5mb |
| parse5-fragment.js       |    9.90944ms ±4.92169ms |       15.0154ms |       100mb ±18.1mb |   107mb |        8.50mb |  46.5mb |
| parse5.js                |    10.1668ms ±5.94298ms |       10.8841ms |      97.8mb ±10.6mb |   107mb |        8.52mb |  35.9mb |
| rehype.js                |    16.8286ms ±9.06746ms |       40.4654ms |       108mb ±15.9mb |   116mb |        12.5mb |  51.1mb |
| sax-wasm.js              |    2.47512ms ±1.36164ms |       6.70383ms |      79.3mb ±22.2mb |  91.6mb |        6.60mb |  14.6mb |
| sax.js                   |    13.7990ms ±12.8060ms |       4.76617ms |      77.6mb ±13.1mb |  83.8mb |        4.95mb |  27.4mb |
| saxes.js                 |    36.2962ms ±99.1673ms |       8.14117ms |      93.5mb ±10.8mb |   102mb |        7.75mb |  34.9mb |
| xmldom.js                |    3.68125ms ±6.23283ms |       16.6288ms |      85.3mb ±18.7mb |  89.6mb |        15.1mb |  22.3mb |

#### Notes:
* Max = The maximum amount of memory seen during all the tests.  
        (You should see higher values in the real world when parsing multiple files in sequence,  
         normally garbage collection isn't guaranteed to happen after each parse, like here.
         This is the amount of ram you will typically need for parsing a single file)
             
* Delta = The amount of RAM being used at the end of the benchmark after a forced Garbage Colletion.  
          This shows how good or bad the library is at releasing its resources.

* Lib Overhead = Memory usage just after importing the library and running the setup()  
                 minus the baseline memory usage before importing the library.
----

#### Device summary

> Node: `22.20.0` V8: `12.4.254.21-node.33` NPM: `10.9.3`
> OS: macOS Tahoe 26.0.1 darwin arm64 25.0.0
> Device: Apple Inc. Mac14,7 | CPU Apple M2 2.4GHz 8C/8T | RAM 16 GB | GPU Apple Apple M2  Built-In null MB

<!--END-RESULTS-->

----

# Running the benchmark

## With pnpm (recommended)

1. Install pnpm if you haven't already:
   ```sh
   npm install -g pnpm
   ```

2. Clone the repository
3. Run:
	```sh
	pnpm install
	pnpm start
	```

## Attribution

Original HTML files from [@victornpb](https://github.com/victornpb/benchmark-html-parser-libraries)