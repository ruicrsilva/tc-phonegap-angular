tc-phonegap-angular
===================

A angular and phonegap application boilerplate, using `tc-angular`


Installation
============

Clone this repository to get a working copy.

You will now need to update the android project, to have all the required
local files.

```sh
platforms/android $ android update project --path .
```

Tasks
=====

Build
-----

There is a grunt build task, configured to build all your assets into a minified
`build/` directory.

```sh
$ grunt build
```

The build can be configured in `build.config.js`.


Server
------

There is a task to start a connect web server to serve the given directory.

This connect server is pre-configured for angular, using modRewrite to map all
requests through index.html, and to inject LiveReload script into your html.

There are 2 different web servers:

#### SRC web server

```sh
$ grunt server:src
```

Starts a web server at `http://127.0.0.1:9001`.

#### BUILD web server

```sh
$ grunt server:build
```

Starts a web server at `http://127.0.0.1:9002`.

#### NO-RIPPLE web server

```sh
$ grunt server:no-ripple
```

Starts a web server at `http://127.0.0.1:9003`.

Watch
-----

The watch task, will watch all files for changes, and handle the LiveReload.

```sh
$ grunt watch
```

Contributing
============

- [Open a Pull Request (PR)](https://github.com/ThreeceeStudios/tc-phonegap-angular/pull/new/master)
- Make sure your PR is on a new branch you created from the latest version of master branch
- Please do not open a PR from your master branch
- Open a PR even if your code is incomplete to start a discussion and to collect feedback
- Please make sure all unit tests pass, and add new tests for any added features.


License
=======

tc-phonegap-angular is dual licensed with the Apache-2.0 or MIT license.

See LICENSE-APACHE-2.0 and LICENSE-MIT for more details.