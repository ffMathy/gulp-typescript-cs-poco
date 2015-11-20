/* global Buffer */
var pocoGen = require('typescript-cs-poco');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-typescript-cs-poco';

module.exports = function() {
	var stream = through.obj(function(file, enc, cb) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, "Streams not supported yet!"));
			return cb();
		}

		if (file.isBuffer()) {
			if (file.contents) {
				var stringContents = file.contents.toString();
				
				var result = pocoGen(stringContents);
				
				file.contents = new Buffer(result);
			}
		}

		this.push(file);

		cb();
	});

	return stream;
};