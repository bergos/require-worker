/*
* require-worker
* Copyright 2013 Thomas Bergwinkl
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

/**
 * Register a new module
 * 
 * @param {String} module Name of the module (optional).
 * @param {Array} imports List of modules to import (optional).
 * @param {Function} callback Function which returns the module object. If the imports parameter is defined and not empty, the module objects will be passed to this function.
 */
define = function() {
	// parse parameters
	var module = requireworker.moduleLoadStack[0];
	var imports = [];
	var callback = arguments[arguments.length-1];

	for(var i=0; i<arguments.length-1; i++) {
		if(Array.isArray(arguments[i]))
			imports = arguments[i];
		else if(typeof arguments[i] == "string")
			module = arguments[i]; 
	}

	// load defined import modules
	var importModules = [];

	for(var i=0; i<imports.length; i++)
		importModules.push(requireworker(imports[i]));

	// and finally retrieve the module object from the callback function
	try {
		requireworker.modules[module] = callback.apply(callback, importModules);
	} catch(e) {
		requireworker.modules[module] = null;
	};
};

/**
 * Synchronous import of a module
 *
 * @param {String} module The name of the module to import.
 * @returns {Object} The module or null if the module couldn't be loaded.
 */
requireworker = function(module) {
	// check if the module was already loaded -> load if not
	if(!(module in requireworker.modules))
		requireworker.load(module);

	// define wasn't called if the module is still not in our list -> assign null
	if(!module in requireworker.modules)
		requireworker.modules[module] = null;

	return requireworker.modules[module];
};

/**
 * 
 * @param options
 */
requireworker.config = function(options) {
	for(option in options)
		requireworker[option] = options[option];
};

requireworker.load = function(module) {
	requireworker.moduleLoadStack.unshift(module);

	var path = (typeof requireworker.baseUrl != "undefined" ? requireworker.baseUrl + "/" : "") + module + ".js";

	try {
		importScripts(path);
	} catch(e) {}

	requireworker.moduleLoadStack.shift();
};

requireworker.moduleLoadStack = [];
requireworker.modules = {};
