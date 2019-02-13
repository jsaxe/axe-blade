# Axe Blade 🔥
> Core ignition engine for Axe apps, where booting happens!

[![Node Version][node-image]][npm-url]
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls][coveralls-image]][coveralls-url]

[Axe Blade](https://jsaxe.com/blade) does the bootstrapping job for the Axe apps.

<img src="https://i.imgur.com/7AO4FyX.png" width="200px" align="right" hspace="30px" vspace="100px">

## Features

1. Provides Application and Service Provider bootstrapper
2. Provides Containerizaion based on [Boxa](https://jsaxe.com/boxa)
3. Registers all providers & aliases based on Kernel provided
4. Defines aliases for providers and maps.
5. Automatic resolution of Core Service Providers
6. Registers CLI providers for command line activities
7. Provides `Config` and `Env` Service Providers

## Installation
You can install the package from npm.
```bash
npm i --save axe-blade
```
## Node

Axe Blade is supposed to run on platforms with `Node.js >=7.10.1`

## Development

It would be GREAT if you plan for contribution. For contribution, make sure to adhere to following conventions, since a consistent code-base is always joy to work with.

Run the following command to see list of available npm scripts.

```
npm run
```
### Tests & Linting

1. Lint your code using ESLint. Run `npm run lint` command to check if there are any linting errors.
2. Make sure you write tests for all the changes/bug fixes.
3. Make sure all the tests are passing on `travis`.
4. Make sure to have full coverage on your tests.

### General Practices

ES6 shall be prefered for development, since it comes with latest javascript features. Also, we love comments. Be sure to comment your codes properly so that your fellow can understand you easily.

If commenting is not done properly, following may happen
>While Coding: Only You and God knows what it does

>After some time: Only God knows what it does

To prevent this, let's all commit to commenting. 😉
## Issues & Pull Requests

1. Always try creating regression tests when you find a bug (if possible).
2. Share some context on what you are trying to do, with enough code to reproduce the issue.
3. For general questions, please create a forum thread.
4. When creating a Pull Request for a feature, make sure to create a parallel Pull Request for docs too.

## Author

Robin Panta (Hacktivistic) 😎  &nbsp; [GitHub](https://github.com/hacktivistic) | [Blog](https://robinpanta.com)
> I prefer `yarn` over `npm`

[node-image]: https://img.shields.io/node/v/axe-blade.svg?style=flat
[npm-image]: https://img.shields.io/npm/v/axe-blade.svg?style=flat-square
[npm-url]: https://npmjs.org/package/axe-blade
[travis-image]: https://travis-ci.org/jsaxe/axe-blade.svg?branch=master
[travis-url]: https://travis-ci.org/jsaxe/axe-blade
[coveralls-image]: https://coveralls.io/repos/github/jsaxe/axe-blade/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/jsaxe/axe-blade?branch=master
