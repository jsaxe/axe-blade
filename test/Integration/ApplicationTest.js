'use strict'

var expect = require('chai').expect;

var Axe = require('../../').Application;

let axe;
describe('Axe', function () {

	beforeEach(() => {
		axe = new Axe('test/Integration')
	})

	it ('should not slash without AppData', function () {
		expect( () => axe.slash()).to.throw()
	})


	it('should slash with valid AppData', function () {

		var fakeKernel = {
			providers : [
				FakeServiceProvider,
				'Fakes/AnotherFakeService',
				FakeServiceWithoutRegisterProvider,
			],

			cliProviders : [
				'lodash'
			],

			aliases : {
				Fake: 'Axe/FakeService'
			},
		}

		var fakeKernelWithOutCLI = {
			providers : [
				FakeServiceProvider,
				'Fakes/AnotherFakeService',
				FakeServiceWithoutRegisterProvider,
			],
			aliases : {
				Fake: 'Axe/FakeService'
			},
		}

		// without callback
		axe.slash(fakeKernel)
		// with callback
		axe.slash(fakeKernelWithOutCLI, () => {
			app('Axe/Events').fire('Completed')
			app('Axe/Log')
			app('Axe/Env')
		})

	})

})


var ServiceProvider = require('../../src/Application/ServiceProvider')

class FakeServiceProvider extends ServiceProvider {

	register () {
		describe('FakeServiceProvider', function () {
			it('should have app instance', function () {

				expect(this.app).to.deep.equal(axe)

			}.bind(this)) // Required, because `it` has scope of `this` to TestSuite
		}.bind(this))  // Required, because `describe` has scope of `this` to TestSuite
	}

}

class FakeServiceWithoutRegisterProvider extends ServiceProvider {
	//
}
