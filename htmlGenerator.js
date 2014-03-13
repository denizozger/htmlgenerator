'use strict';

const fs = require('fs'),
      lazy = require('lazy');

const inputFileName = process.env.FILE_NAME || './datasource.txt';
const outputFileName = './outputhtml.html';

new lazy(fs.createReadStream(inputFileName))
   .lines
   .forEach(function(line) {
      var line = line.toString();

      var th = 
        '{?players[0].' + line + '}\n' +
          '\t<th class="global sortable g" title="' + line + '">' + line +'</th>\n' +
        '{/players[0].' + line + '}\n\n';

      fs.appendFile(outputFileName, th, function (err) {
        if(err) {
          return console.log('Bah, cant write to file! :/ ' + err);
        }
      });
   }
);

new lazy(fs.createReadStream(inputFileName))
  .lines
  .forEach(function(line) {
    var line = line.toString();

    var td = 
      '{?' + line + '}\n' + 
        '\t<td title="' + line + '">\n' +
          '\t\t{' + line + '}\n' +
        '\t</td>\n' +
      '{/' + line + '}\n\n';

    fs.appendFile(outputFileName, td, function (err) {
      if(err) {
        return console.log('Bah, cant write to file! :/ ' + err);
      }
    });
  }
);

console.log('Happy days');
