'use strict';

require('dotenv').config();

console.log('Building...');

let app = new require('./lib/app'),
  db = require('./public/db/entries.json');

db.forEach((entry) => {
  if (entry.sys.contentType.sys.id == 'homepage') {
    app.render('/', () => {
      entry.fields.template = 'home';

      return entry.fields;
    });
  } else if (entry.sys.contentType.sys.id == 'page' && entry.fields.path) {
    let path = '/' + entry.fields.path['nl-NL'] + '/';
    app.render(path, () => {
      entry.fields.template = 'content';

      return entry.fields;
    });
  }
});



// let router = function (path, cb) {
//   this.path = path;
//   cb();
// };
//
// router('/', function () {
//   jade.renderFile('site/templates/home.jade', { pretty: true, env: process.env.APPLICATION_ENV }, function (err, html) {
//     if (err) {
//       throw err;
//     }
//
//     fs.writeFile('public' + this.path + 'index.html', html, function (err) {
//       if (err) {
//         throw err;
//       }
//     });
//   });
// });
//
// router('/content/', function () {
//   jade.renderFile('site/templates/content.jade', { pretty: true, env: process.env.APPLICATION_ENV }, function (err, html) {
//     if (err) {
//       throw err;
//     }
//
//     fs.writeFile('public' + this.path + 'index.html', html, function (err) {
//       if (err) {
//         throw err;
//       }
//     });
//   });
// });

// routes.forEach(function (route) {
//   route();
// });


// jade.renderFile('site/templates/home.jade', {pretty: true}, function (error, html) {
//   if (error) {
//     console.log(error);
//     process.exit(1);
//   }
//
//   fs.writeFile('public/home.html', html, function (err) {
//     if (err) {
//       console.log(err);
//       process.exit(1);
//     }
//   });
// });

console.log('done');
