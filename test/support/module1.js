define("module1", ["module2"], function(module2) {
	var module = {};

	module.func1 = function() {
		return "test1";
	};

	module.func2 = module2.func;

	return module;
});
