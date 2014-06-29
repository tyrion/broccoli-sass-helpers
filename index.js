var fs = require('fs'),
    path = require('path'),
    Filter = require('broccoli-filter'),
    minimatch = require("minimatch");


module.exports = SassHelpersInjector;

SassHelpersInjector.prototype = Object.create(Filter.prototype);
SassHelpersInjector.prototype.constructor = SassHelpersInjector;

function SassHelpersInjector(inputTree, options) {
  if (!(this instanceof SassHelpersInjector))
    return new SassHelpersInjector(inputTree, options);

  this.helpers = fs.readFileSync(
      path.join(__dirname, 'helpers.scss'), {encoding: 'utf-8'})

  Filter.call(this, inputTree, options)
  this.files = options.files || ['**'];
}

SassHelpersInjector.prototype.canProcessFile = function(path) {
  return this.files.some(function(pattern) {
    return minimatch(path, pattern)
  })
}

SassHelpersInjector.prototype.getDestFilePath = function(path) {
  return path
}

SassHelpersInjector.prototype.processString = function(input, path) {
  return this.helpers + input
}
