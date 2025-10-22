import fs from 'fs';
import summary from 'summary';
import ProgressBar from 'progress';

process.on('uncaughtException', crashed);
process.on('unhandledRejection', crashed);
function crashed(error) {
	console.error(error);
	process.exit(1);
}

function hrtime2ms([s, ns]) { return s * 1000 + ns / 1000000; }

process.on('message', start);
async function start(task) {

	const ram = {};

	global.gc();

	// load lib
	ram['baseline'] = process.memoryUsage();
	let tRequire = process.hrtime();
	
	const theModule = await import(task.jsModule);
	if (typeof theModule === 'object' && theModule.setup) await theModule.setup();
	if (typeof theModule === 'object' && theModule.default && theModule.default.setup) await theModule.default.setup();
	
	tRequire = hrtime2ms(process.hrtime(tRequire));
	ram['required'] = process.memoryUsage();
	// end load lib

	const parser = typeof theModule.default === 'function' ? theModule.default : (theModule.parse || theModule.default?.parse);
	
	const bar = new ProgressBar('[:bar] :percent (:current/:total) | :rate HTML/s | ETA: :eta | ', {
		total: task.inputFiles.length,
		complete: '\u25A0',
		incomplete: '-',
		// width: 40,
	});

	const times = [];
	const ramRuns = [];
	for (const input of task.inputFiles) {

		// read input
		const content = await fs.promises.readFile(input, 'utf8');

		// before
		ramRuns.push(process.memoryUsage().rss);
		let t = process.hrtime();

		// execute the actual thing
		let r = await parser(content, input);

		// after
		t = hrtime2ms(process.hrtime(t));
		times.push(t);
		ramRuns.push(process.memoryUsage().rss);

		Object.assign({}, r); // Dummy work so the three is not GC before sampling memory
		r = null; // release
		
		bar.tick();
		
		global.gc();
	}

	ram['final'] = process.memoryUsage();

	// done
	const statTiming = summary(times);
	const statRam = summary(ramRuns);

	// result
	process.send({
		timming: {
			startup: tRequire,
			min: statTiming.min(),
			mean: statTiming.mean(),
			max: statTiming.max(),
			sd: statTiming.sd(),
		},
		ram: {
			...ram,
			min: statRam.min(),
			mean: statRam.mean(),
			max: statRam.max(),
			sd: statRam.sd(),
		},
	});

	process.exit(0);
}
