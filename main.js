const sass = require('node-sass');
const fs = require('fs');

console.log('Starting Sass compiler');
sass.render(
  {
  file: 'theme.sass',
  outFile: './theme.css'
  }, 
  (err, _) => err ? console.log(err) : fs.writeFile('./theme.css', _.css, err =>  !err ? console.log('Done compiling'): console.log(err)));