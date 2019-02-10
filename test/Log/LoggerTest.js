'use strict'

var Logger = require('../../lib/Log/Logger')


describe('Logger', function () {

	var Config = {

		uses: 'console|file',

		transports: {

			console: {
				//
			},

			file: {
				filename: 'test/Log/pico.log'
			}

		}

	}

	var logger = new Logger(Config)

	describe('consoleTransport()', function () {

		it('should add console transport', function () {

			logger.consoleTransport()

		})

	})

	describe('fileTransport()', function () {

		it('should add file transport', function () {

			logger.fileTransport('test.log')

		})

	})

	describe('log()', function () {

		it('should log a message', async function () {

			logger.log('info', 'Logging from Test')

		})
	})

})
