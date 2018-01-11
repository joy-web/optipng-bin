'use strict';
const BinBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');
const path = require('path');

bin.run(err => {
	if (err) {
		log.warn(err.message);
		log.warn('optipng pre-build test failed');
		log.info('compiling from source');

		BinBuild.file(path.resovle(__dirname,'vendor/optipng-0.7.6.tar.gz'))
			.cmd(`./configure --with-system-zlib --prefix="${bin.dest()}" --bindir="${bin.dest()}"`)
			.cmd('make install')
			.run(err => {
				if (err) {
					log.error(err.stack);
					return;
				}

				log.success('optipng built successfully');
			});

		return;
	}

	log.success('optipng pre-build test passed successfully');
});
