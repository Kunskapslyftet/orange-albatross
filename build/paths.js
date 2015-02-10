var path = require('path');

var appRoot = 'client/src/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  style: 'client/styles/**/*.css',
  output: 'client/dist/',
  doc:'./doc',
  e2eSpecsSrc: 'client/test/e2e/src/*.js',
  e2eSpecsDist: 'client/test/e2e/dist/'
};
