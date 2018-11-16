const sass    = require('node-sass');
const writer  = require('./helpers');
const fs      = require('fs');
const join    = require('path').join;
const express = require('express');
const app     = express();
const port    = 1011;

// First write all the dev files.
sass.render(
  { file: 'theme.sass', outFile: './src/theme.css'}, 
  (err, output) => err ? process.stdout.write(err) : fs.writeFile(
    './src/theme.css', output.css, err => !err ? process.stdout.write('Done compiling\n') : process.stdout.write(err+'\n')
  )
);

let fileTree = fs.readdirSync('./src/', {encoding: 'utf-8'}).map(file => './src/' + file);
writer(fileTree, 'dev');

// Serve up a local server
app.use(express.static(join(__dirname, '../src')));
app.get('/', (req, res) => res.send('Welcome, please navigate to any of your pages in src'))
app.listen(port, e => console.log('\x1b[34m', 'Local files served on port ' + port, '\x1b[0m'));
