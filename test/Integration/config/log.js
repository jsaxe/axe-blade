'use strict'

module.exports = {

	uses: 'console|file|foo',

	transports: {

		console: {
			//
		},

		file: {
			filename: app().storagePath('logs/pico.log')
		}

	}

}
