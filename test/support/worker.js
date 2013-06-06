importScripts("/require-worker.js");

requireworker.config({"baseUrl": ("/test/support/")});

module = requireworker("module1");


self.addEventListener("message", function(event) {
	var result = {};

	result.test1 = module.func1();
	result.test2 = module.func2();

	self.postMessage(result);
	self.close();
}, false);
