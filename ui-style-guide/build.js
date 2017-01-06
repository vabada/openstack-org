#!/usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');
var reactDocs = require('./ui/node_modules/react-docgen');
var aliases = require('../webpack/base-config.js').resolve.alias;
var manifestDir = path.join(__dirname, 'ui/source/js/lib');
var manifestPath = path.join(manifestDir, '__manifest.json');

var MANIFEST = {};

var absComponentsDir = path.join(__dirname, '../ui-core/ui/source/js/components');
var relComponentsDir = path.relative(manifestDir, absComponentsDir);

const isDefaultExport = (source, component) => (
	new RegExp(`export +default +${component}`).exec(source)
);

const getExportedPaths = (source) => {
	const paths = {};
	const rx = /^import +([a-zA-Z][a-zA-Z0-9]*) +from +('|")([a-zA-Z0-9-_.\/]+)('|")/gm;
	let matches;
	while ((matches = rx.exec(source)) !== null) {
		paths[matches[1]] = matches[3];
	}
	
	// find the default;
	for (let i in paths) {
		if(isDefaultExport(source, i)) {
			return [paths[i]];
		}
	}

	var exportMatches = source.match(/export[\s\S]*\{([\s\S.]*?)\}/);
	if(!exportMatches) {
		throw new Error('No exports found');
	}
	
	return exportMatches[1].split(',').map(m => {
		m = m.trim();
		let p = paths[m];
		if(!p) {
			throw new Error(`Exported module at path ${m} was not declared as an import. Did it get reassigned?`);
		}

		return p;
	});
};

const getComponentsFromFile = (absFile) => {
	var components = [];
	var dir = path.dirname(absFile);
	var componentName = path.basename(absFile, '.js');
	var source = fs.readFileSync(absFile, { encoding: 'utf8'});
		// Only files with component definitions will parse
		try {
			var parsed = reactDocs.parse(source);
			components.push({
				name: componentName === 'index' ? path.basename(dir) : componentName,
				props: parsed.props,
				description: parsed.description
			});
		} catch(e) {
		// If it doesn't parse, figure out what components are referenced, e.g. in an index.js lookup
			try {
				var paths = getExportedPaths(source);								
				paths.forEach(p => {					
					for(let a in aliases) {						
						p = p.replace(new RegExp(`^${a}/`), `${aliases[a]}/`);
					}

					if(!path.extname(p)) {						
						p += '.js';
					}

					if(!path.isAbsolute(p)) {
						p = path.relative(__dirname, path.join(dir, p));
					}
					components = components.concat(
						getComponentsFromFile(p)
					);
				});
			} catch(e) {
				console.error(`${absFile} does not export any modules`);				
			}
		}
	return components;
};

var components = fs.readdirSync(absComponentsDir).filter(file => (
	fs.statSync(path.join(absComponentsDir, file)).isDirectory()
));

var importContent = components.map(component => {
	try {
		var source = fs.readFileSync(path.join(absComponentsDir, component, 'index.js'));
	} catch(e) {
		throw new Error(`Could not read index.js in ${component}`);
	}

	return isDefaultExport(source, component) ?
		`import ${component} from '${path.join(relComponentsDir, component)}';` :
		`import * as ${component} from '${path.join(relComponentsDir, component)}';`;
}).join("\n");

importContent += `
export {
	${components.join(",\n\t")}
};`

components.forEach(component => {
	var componentDir = path.join(absComponentsDir, component);	
	var exampleCodePath = path.join(componentDir, 'example.js'),
		example = '';
	if(fs.existsSync(exampleCodePath)) {
		example = fs.readFileSync(exampleCodePath, {encoding: 'utf8'});
	}
	MANIFEST[component] = {
		name: component,
		example,
		components: getComponentsFromFile(path.join(componentDir, 'index.js'))
	};
});

Promise.all([
	new Promise((resolve, reject) => {
		fs.writeFile(
			path.join(__dirname, 'ui/source/js/lib/ui-core.js'),
			importContent,
			(err, res) => {
				if(err) reject(err);
				else resolve(res);
			}
		);
	}),
	new Promise((resolve, reject) => {
		fs.writeFile(
			manifestPath,
			JSON.stringify(MANIFEST, null, 2),
			(err, res) => {
				if(err) reject(err);
				else resolve(res);
			}
		);
	}),
]).then(() => {
	console.log(`Built ${components.length} entries in the style guide.`);
	process.exit(1);
}).catch((e) => {
	console.error(e);
})

