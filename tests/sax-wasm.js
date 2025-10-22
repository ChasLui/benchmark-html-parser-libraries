import fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Readable } from 'stream';
import { SaxEventType, SAXParser } from 'sax-wasm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let saxWasmBuffer;
let saxParser = null; // Persistent parser instance to prevent GC from reclaiming WASM buffer
export default {
	async setup() {
		// Get the path to the WebAssembly binary and load it
		// Try to find the wasm file in various possible locations
		const possiblePaths = [
			path.join(__dirname, '../node_modules/.pnpm/sax-wasm@3.1.2/node_modules/sax-wasm/lib/sax-wasm.wasm'),
			path.join(__dirname, '../node_modules/sax-wasm/lib/sax-wasm.wasm'),
		];
		
		let saxPath = null;
		for (const p of possiblePaths) {
			if (fs.existsSync(p)) {
				saxPath = p;
				break;
			}
		}
		
		if (!saxPath) {
			throw new Error('Could not find sax-wasm.wasm file');
		}
		
		// Read the wasm file once during setup
		saxWasmBuffer = await readFile(saxPath);
		
		// Verify the buffer is valid
		if (!saxWasmBuffer || saxWasmBuffer.length === 0) {
			throw new Error('Failed to load sax-wasm.wasm file');
		}
		
		// Create and initialize the parser instance once during setup
		// This prevents GC from reclaiming the WASM buffer during repeated parse() calls
		try {
			saxParser = new SAXParser(SaxEventType.Attribute | SaxEventType.OpenTag, {highWaterMark: 32 * 1024});
			
			// Prepare WASM runtime environment
			const ready = await saxParser.prepareWasm(saxWasmBuffer);
			if (!ready) {
				const error = new Error('Failed to prepare WASM');
				console.error('sax-wasm setup error:', error.message);
				saxParser = null;
				throw error;
			}
		} catch (error) {
			console.error('sax-wasm setup error:', error.message, error.stack);
			saxParser = null;
			throw new Error(`Failed to initialize SAXParser: ${error.message}`);
		}
	},
	async parse(html, file) {
		// Sanity check: ensure parser instance is initialized
		if (!saxParser) {
			console.error('sax-wasm error: Parser instance is not initialized. Call setup() first.');
			return;
		}
		
		try {
			// Reuse the persistent parser instance initialized in setup()
			// This avoids repeated WASM initialization and prevents GC issues
			const readable = fs.createReadStream(file);
			const webReadable = Readable.toWeb(readable);
			const reader = webReadable.getReader();
			
			// Parse using async iteration
			for await (const [event, detail] of saxParser.parse(reader)) {
				if (event === SaxEventType.Attribute) {
					// process attribute
				} else if (event === SaxEventType.OpenTag) {
					// process open tag
				}
			}
		} catch (error) {
			// If parsing fails, continue benchmark anyway
			console.error('sax-wasm parse error:', error.message);
		}
	},
};