'use strict'
var app = use('app')

module.exports = {

	uses: 'console|file|foo',

	transports: {

		console: {
			//
		},

		file: {
			filename: app.storagePath('logs/pico.log')
		}

	}

}
