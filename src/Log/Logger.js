/**
 * @name Logger
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var winston = require('winston')

/**
 * Logger Class
 */
class Logger {

	/**
	 * Constructor
	 * @param {Object} config
	 */
	constructor (config) {
		this.config = config
		config.uses.split('|').forEach(transport => {
			if (typeof this[transport + 'Transport'] === 'function')
				this[transport + 'Transport']()
		});
	}

	/**
	 * Registers Console Transport to winston
	 *
	 * @public
	 */
	consoleTransport () {
		winston.add(new winston.transports.Console(this.config.transports.console))
	}

	/**
	 * Registers File Transport to winston
	 *
	 * @public
	 */
	fileTransport () {
		winston.add(new winston.transports.File(this.config.transports.file))
	}

	/**
	 * Logs the data using winston
	 *
	 * @param  {...any} args
	 */
	log (...args) {
		winston.log(...args)
	}

}

module.exports = Logger
