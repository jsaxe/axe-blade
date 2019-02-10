/**
 * @name Emitter
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var EventEmitter = require('eventemitter2').EventEmitter2
var _ = require('lodash')

/**
 * Event Emitter Class
 */
class Emitter extends EventEmitter {

	/**
	 * Constructor
	 * @param {Application} app
	 * @param {Object} config
	 */
	constructor (app, config) {
		super(config)
		this.config = config
		this.app = app
	}

	/**
	 * Registers an event
	 *
	 * @param {String|Array} events
	 * @param {Closure} listener
	 *
	 * @public
	 */
	on (events, listener) {
		if (!_.isArray(events))
			events = [events]

		_.forEach(events, (event) => {
			var app = this.app;
			super.on(event, function (...args) {
				listener(this.event, app, ...args)
			})
		})
	}

	/**
	 * Fires an event
	 *
	 * @param {String} event
	 * @param  {...any} args
	 *
	 * @public
	 */
	fire (event, ...args) {
		this.dispatch(event, ...args)
	}

	/**
	 * Alias to fire()
	 *
	 * @param {String} event
	 * @param  {...any} args
	 *
	 * @public
	 */
	dispatch (event, ...args) {
		super.emit(event, ...args)
	}

}

module.exports = Emitter
