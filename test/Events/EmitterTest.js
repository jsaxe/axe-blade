'use strict'

var expect = require('chai').expect;

var EventEmitter2 = require('eventemitter2').EventEmitter2
var Emitter = require('../../lib/Events/Emitter')
var Application = new (require('../../lib/Application/Application'))()

describe('Emitter', function () {

	it('should be instance of EventEmitter2', function () {
		var emitter = new Emitter({})
		expect(emitter).to.be.instanceof(EventEmitter2)
	})

	var emitter = new Emitter(Application)

	describe('on()', function () {

		it('should register event with event as string', function () {

			// String Event
			expect(function () {
				emitter.on('boot', function (event, app) {
					expect(event).to.equal('boot')
					expect(app).to.equal(Application)
				})
			}).to.not.throw()

		})

		it('should register event with array of events', function () {

			// Array Event
			var turns = 0;
			expect(function () {
				emitter.on(['shut', 'off'], (event, app, booter) => {
					turns = turns+1
					if (event === 'shut')
						expect(turns).to.equal(1)
					if (event === 'off')
						expect(turns).to.equal(2)

					expect(booter).to.equal('Robin')
				})
			}).to.not.throw()

		})

		it ('should register event with wildcard string', function () {

			// Wildcard Event
			var turns = 0;
			expect(function () {
				emitter.on('foo.*', (event, app, booter) => {

					turns = turns + 1

					if (event === 'foo.bar')
						expect(turns).to.equal(1)

					if (event === 'foo.baz')
						expect(turns).to.equal(2)

					expect(booter).to.equal('Hacktivistic')
				})
			}).to.not.throw()

		})

	})

	describe('fire()', function () {

		it('should fire registered events', function () {

			emitter.fire('boot')
			emitter.fire('shut', 'Robin')
			emitter.fire('off', 'Robin')

			emitter.fire('foo', 'Hacktivistic')
			emitter.fire('foo.bar', 'Hacktivistic')
			emitter.fire('foo.baz', 'Hacktivistic')

		})

	})

})
