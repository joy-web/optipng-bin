'use strict';
const path = require('path');
const fs = require('fs');

const vendor = path.resolve(__dirname, '../vendor');

const dataBindingLocation = (function(){
	if(process.platform === 'linux'){
		return path.resolve(vendor,'linux',process.arch,'optipng');
	} else if(process.platform === 'freebsd'){
		return path.resolve(vendor,'freebsd', process.arch, 'optipng');
	} else if(process.platform === 'darwin'){
		return path.resolve(vendor,'macos/optipng');
	} else {
		return path.resolve(vendor,'win/optipng');
	}
})();
const dest = path.resolve(vendor,'optipng', process.platform === 'win32' ? '.exe' : '');

if(!fs.existsSync(vendor)){
	fs.mkdirSync(vendor);
}

fs.createReadStream(dataBindingLocation).pipe(fs.createWriteStream(dest,{
	mode: 755,
	autoClose: true
}));

module.exports = {
	path: function(){
		return dest;
	},
	run: function(opts,callback){
		fs.stat(dest,callback);
	}
}


// 'use strict';
// const path = require('path');
// const BinWrapper = require('bin-wrapper');
// const pkg = require('../package.json');

// const url = `https://raw.githubusercontent.com/imagemin/optipng-bin/v${pkg.version}/vendor/`;

// module.exports = new BinWrapper()
// 	.src(`${url}macos/optipng`, 'darwin')
// 	.src(`${url}linux/x86/optipng`, 'linux', 'x86')
// 	.src(`${url}linux/x64/optipng`, 'linux', 'x64')
// 	.src(`${url}freebsd/x86/optipng`, 'freebsd', 'x86')
// 	.src(`${url}freebsd/x64/optipng`, 'freebsd', 'x64')
// 	.src(`${url}sunos/x86/optipng`, 'sunos', 'x86')
// 	.src(`${url}sunos/x64/optipng`, 'sunos', 'x64')
// 	.src(`${url}win/optipng.exe`, 'win32')
// 	.dest(path.resolve(__dirname, '../vendor'))
// 	.use(process.platform === 'win32' ? 'optipng.exe' : 'optipng');
