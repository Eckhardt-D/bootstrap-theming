const Utils = require('./utils');
const fs    = require('fs');

const source         = fs.readdirSync('./src/');
const sassCompiler   = Utils.sassCompiler;
const rCopy          = Utils.rCopy;

if (!fs.existsSync('./build')){
  fs.mkdirSync('./build');
}

/* copy all html components into the build directory */
process.stdout.write('building source\n');

sassCompiler();
rCopy(source);
