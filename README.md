# require-worker

`require-worker` is a small AMD compatible module loader for Web Workers.

## Usage

Import `require-worker` using importScripts in your worker. The script provides the `requireworker` function to load AMD modules synchronous. Here is an example:

    importScripts('require-worker');
    var module1 = requireworker('module1');

### r.js Optimizer

`jake-requirejs` provides a function to optimize your worker script. 

    jakeRequireJs.optimizeWorker('worker.build.js', {});

To import `require-worker.js` as the first file of your optimized output you need to define it as a wrapper in your build file.

    wrap: { startFile: "require-worker.js" }

### License

Licensed under the Apache License, Version 2.0
(<http://www.apache.org/licenses/LICENSE-2.0>)
