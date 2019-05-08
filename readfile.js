"use strict"
const fs = require('fs');

class Helper {
  static readFile(path, callback) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data);
      }
    });
  }
}

module.exports = {
  readFile: Helper.readFile
};