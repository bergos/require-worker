var assert = require("assert");
var Worker = require("webworker").Worker;


describe("requireworker", function() {
	it("should load module1 and depending module2", function(done) {
		this.timeout(5000);

		var worker = new Worker("/test/support/worker.js");

		worker.addEventListener("message", function(event) {
			assert.equal(event.data.test1, "test1");
			assert.equal(event.data.test2, "test2");

			done();
		});

		worker.postMessage({});
	});
});
