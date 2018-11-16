const fs      = require('fs');
const sass    = require('node-sass');
const writer  = require('./helpers');
const ncp     = require('ncp').ncp;

const utils = {
  writer, // Package function but also method (to avoid 'this')
  rCopy(directory) {
    // Copy public files to build
    ncp('./src/public', './build/public', err => err ? process.stdout.write('Error copying public assets\n') : process.stdout.write('Public files copied!\n'));

    directory.forEach(item => {
      if(item.match(/.html$/)) {
        const page = fs.readFileSync('./src/' + item);
        fs.writeFileSync('./build/' + item, page);
        writer(['./build/' + item], 'production');
        return console.log('Successfully built!\n');
      }
    })
  },
  sassCompiler() {
    process.stdout.write('Starting Sass compiler\n');

    /* compile sass from theme.sass directory and write to build directory */
    sass.render(
      { file: 'theme.sass', outFile: './theme.css'}, 
      (err, output) => err ? process.stdout.write(err) : fs.writeFile(
        './build/theme.css', output.css, err => !err ? console.log('\x1b[34m', '\n\nDone compiling!\n\n', '\x1b[0m') : process.stdout.write(err+'\n')
      )
    );
  }
}

module.exports = utils;