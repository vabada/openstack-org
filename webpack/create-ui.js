"use strict";

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(1));
let moduleName = args._[1];

if(!moduleName) {
	console.error('Please provide a module name');
	process.exit(0);
}
moduleName = moduleName.replace(/\/$/, "");

let dir = path.join(moduleName, 'ui');

if(fs.existsSync(dir)) {
	console.error('This module already has a ui/ directory. Please delete it before running this script');
	process.exit(0);
}

fs.mkdirSync(dir);
fs.mkdirSync(path.join(dir, 'source'));
fs.mkdirSync(path.join(dir, 'production'));
fs.mkdirSync(path.join(dir, 'source','js'));
fs.mkdirSync(path.join(dir, 'source','scss'));

const webpackContent = 
`module.exports = {
	entry: {
		main: './source'
	}
};`;

const packageContent = 
`{
  "name": "${moduleName}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/OpenStackweb/openstack-org"
  },
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/OpenStackweb/openstack-org/issues"
  },
  "homepage": "https://github.com/OpenStackweb/openstack-org",
  "dependencies": {    
  }
}`;

const indexContent =
`import './scss/${moduleName}.scss';
import './js/init.js';`

const jsContent = `alert('Welcome to ${moduleName}');`;
const scssContent = `/* styles for ${moduleName} */`;

const promiseCallback = (fulfill, reject) => (err, res) => {
	if(err) reject(err);
	else fulfill(res);
};

const promises = [
	new Promise((f, r) => {
		fs.writeFile(
			path.join(dir, 'webpack.config.js'),
			webpackContent,
			promiseCallback(f,r)
		);
	}),
	new Promise((f, r) => {
		fs.writeFile(
			path.join(dir, 'package.json'), 
			packageContent,
			promiseCallback(f, r)
		);
	}),
	new Promise((f, r) => {
		fs.writeFile(
			path.join(dir, 'source','index.js'),
			indexContent,
			promiseCallback(f, r)
		);
	}),
	new Promise((f, r) => {
		fs.writeFile(
			path.join(dir, 'source', 'js', 'init.js'),
			jsContent,
			promiseCallback(f, r)
		);
	}),
	new Promise((f, r) => {
		fs.writeFile(
			path.join(dir, 'source', 'scss', `${moduleName}.scss`),
			scssContent,
			promiseCallback(f, r)
		);
	})

];

Promise.all(promises).then(() => {
	console.log('Success!');
	process.exit(0);
});