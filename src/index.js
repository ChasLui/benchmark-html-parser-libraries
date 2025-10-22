import fs from 'fs';
import path from 'path';
import si from 'systeminformation';
import matrixToAsciiTable from 'asciitable.js';
import S from 'tiny-dedent';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import executor from './execute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {

    // Collect device Info
    const device = await deviceInfo();
    const deviceSummary = S(`
        Node: \`${device.sw.node}\` V8: \`${device.sw.v8}\` NPM: \`${device.sw.npm}\`
        OS: ${device.os}
        Device: ${device.name} | CPU ${device.cpu} | RAM ${device.ram} | GPU ${device.gpu}`);
    
    console.log(deviceSummary);

    // NOTE: Modern CPUs can boost the clock speed for a small duration of time when they see an increase in load.
    //       in order to make the benchmark more acurate, we run the benchmark twice, and discard the first run,
    //       at the second pass, the cpu should settle at clock for sustained load, making every test more comparable.
    //       It should also make any effects of potential caching negligible
    
    // Run test
    console.log('\nRunning...\n');
    let results;
    for (let i = 0; i < 2; i++) {
        results = await executor();
    }
    console.log('\n\nFinihed!\n\n');

    results = sortBy(results, 'name');

    const rawResult = {
        date: new Date(),
        device,
        results,
    };

    // Create Markdown
    const table = matrixToAsciiTable([
        ['^Library', '^ms/file (Mean)', '^Module Startup', '^RAM MB/file (Mean)', '^Max', /*'^Baseline',*/ '^Lib Overhead', '^Delta'], //header
        null, //horizontal line
        ...results.map(r => ([
            `<${r.name}`,
            `>${r.result.timming.mean.toPrecision(6)}ms ±${r.result.timming.sd.toPrecision(6)}ms`,
            `>${r.result.timming.startup.toPrecision(6)}ms`,
            `>${(r.result.ram.mean / 1E6).toPrecision(3)}mb ±${(r.result.ram.sd / 1E6).toPrecision(3)}mb`,
            `>${(r.result.ram.max / 1E6).toPrecision(3)}mb`,
            // `>${(r.result.ram.baseline.rss / 1E6).toPrecision(3)}mb`,
            `>${((r.result.ram.required.rss-r.result.ram.baseline.rss) / 1E6).toPrecision(3)}mb`,
            `>${((r.result.ram.final.rss-r.result.ram.required.rss) / 1E6).toPrecision(3)}mb`,
        ])),
    ], {
        "row": {
            "paddingLeft": "|",
            "paddingRight": "|",
            "colSeparator": "|",
            "lineBreak": "\n"
        },
        "cell": {
            "paddingLeft": " ",
            "paddingRight": " "
        },
        "hr": {
            "str": "-",
            "colSeparator": "|"
        }
    });

    const md = S(`
        Date: \`${new Date().toISOString()}\`
        
        ${table}

        #### Notes:
        \* Max = The maximum amount of memory seen during all the tests.  
                (You should see higher values in the real world when parsing multiple files in sequence,  
                 normally garbage collection isn't guaranteed to happen after each parse, like here.
                 This is the amount of ram you will typically need for parsing a single file)
                     
        \* Delta = The amount of RAM being used at the end of the benchmark after a forced Garbage Colletion.  
                  This shows how good or bad the library is at releasing its resources.

        \* Lib Overhead = Memory usage just after importing the library and running the setup()  
                         minus the baseline memory usage before importing the library.
        ----

        #### Device summary

        ${quote(deviceSummary)}
    `);
    
    console.log(md);

    // Write result
    const fileName = `result_${new Date().toISOString().replace(/:/g, '-')}`;
    await fs.promises.writeFile(path.join(__dirname, '../results/', `${fileName}.md`), md, 'utf8'); // markdown
    await fs.promises.writeFile(path.join(__dirname, '../results/', `${fileName}.json`), JSON.stringify(rawResult, null, '\t'), 'utf8'); // Raw JSON
    
    // Update Readme
    const readmePath = path.join(__dirname, '../', 'README.md');
    const readme = await fs.promises.readFile(readmePath, 'utf8');
    const newRead = readme.replace(/(<!--RESULTS-->)([\s\S]*)(<!--END-RESULTS-->)/, `$1\n${md}\n$3`)
    await fs.promises.writeFile(readmePath, newRead, 'utf8');
}

async function PromiseAllProps(object) {
    const values = await Promise.all(Object.values(object));
    Object.keys(object).forEach((key, i) => object[key] = values[i]);
    return object;
}

async function deviceInfo() {
    const info = await PromiseAllProps({
        os: si.osInfo(),
        sw: si.versions('node,npm,v8'),
        sys: si.system(),
        cpu: si.cpu(),
        mem: si.mem(),
        gpu: si.graphics(),
    });
    return {
        sw: info.sw,
        os: `${info.os.distro} ${info.os.codename} ${info.os.release} ${info.os.platform} ${info.os.arch} ${info.os.kernel}`,
        name: `${info.sys.manufacturer} ${info.sys.model}`,
        cpu: `${info.cpu.manufacturer} ${info.cpu.brand} ${info.cpu.speed}GHz ${info.cpu.physicalCores}C/${info.cpu.cores}T`,
        ram: `${info.mem.total / (1024 * 1024 * 1024)} GB`,
        gpu: info.gpu.controllers.map(g => `${g.vendor} ${g.model}  ${g.bus} ${g.vram} MB`).join(' / '),
    };
}

function sortBy(arr, fields) {
    if (typeof fields === 'string') fields = [fields];
    function compareFn(a, b) {
      return fields
        .map(field => {
          let dir = 1;
          if (field[0] === "-") {
            dir = -1;
            field = field.substring(1);
          }
          return a[field] > b[field] ? dir : a[field] < b[field] ? -dir : 0;
        })
        .reduce((p, n) => (p ? p : n), 0);
    }
    return arr.slice().sort(compareFn);
}

function quote(str) {
    return str.replace(/^/gm, "> ");
}

main();
