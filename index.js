var fs = require('fs'),
    path = require('path'),
    Filter = require('broccoli-writer');

module.exports = SassHelpersInjector;

SassHelpersInjector.prototype = Object.create(Filter.prototype);
SassHelpersInjector.prototype.constructor = SassHelpersInjector;

function SassHelpersInjector(inputTree, options) {
  if (!(this instanceof SassHelpersInjector))
    return new SassHelpersInjector(inputTree, options);

  this.helpers = fs.readFileSync(
      path.join(__dirname, 'helpers.scss'), {encoding: 'utf-8'})

  Filter.call(this, inputTree, options)
}


SassHelpersInjector.prototype.processString = function(input, path) {
  return this.helpers + input
}
