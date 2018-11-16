const cheerio = require('cheerio');
const fs = require('fs');

function writer(files, ctx) {
  // store bootstrap in variables
  const js = fs.readFileSync('./static/js/bootstrap.min.js', {encoding: 'utf-8'});
  const css = fs.readFileSync('./static/css/bootstrap.min.css', {encoding: 'utf-8'});

  files.forEach(file => {
    if(file.match(/.html$/)) {
      const html = fs.readFileSync(file, {encoding: 'utf-8'});
      const $ = cheerio.load(html);

      // Write output files
      fs.writeFileSync('./build/boostrap.min.css', css);
      fs.writeFileSync('./build/boostrap.min.js', js);

      // Only add to html if not already there
      if($('link[data-linked="true"]').length <= 0) {
        if(ctx === 'production') {
          $(`<link data-linked="true" rel="stylesheet" href="bootstrap.min.css"></link>\n`).appendTo('head');
          $(`<script data-linked="true" src="bootstrap.min.js" defer />\n`).appendTo('body');
          $(`<script data-linked="true" src="https://code.jquery.com/jquery-3.3.1.min.js" defer />\n`).appendTo('head');
        } else {
          // Run cdn in dev mode.
          $(`<link data-linked="true" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"></link>\n`).appendTo('head');
          $(`<script data-linked="true" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" defer></script>\n`).appendTo('body');
          $(`<script data-linked="true" src="https://code.jquery.com/jquery-3.3.1.min.js" defer></script>\n`).appendTo('head');
        }
      }
      fs.writeFileSync(file, $.html());
    }
  });
}

module.exports = writer;