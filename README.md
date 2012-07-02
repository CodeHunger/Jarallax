[Jarallax](http://Jarallax.com/) - Interactive css at your fingertips
==================================================

Contribution Guides
--------------------------------------

In the spirit of open source software development, Jarallax always encourages community code contribution.

What you need to build your own Jarallax
--------------------------------------

In order to build Jarallax, you need to have Node.js/npm latest, Grunt.js and git 1.7 or later.
(Earlier versions might work OK, but are not tested.)

Windows users have two options:

1. Install [msysgit](https://code.google.com/p/msysgit/) (Full installer for official Git),
   [GNU make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm), and a
   [binary version of Node.js](http://node-js.prcn.co.cc/). Make sure all three packages are installed to the same
   location (by default, this is C:\Program Files\Git).
2. Install [Cygwin](http://cygwin.com/) (make sure you install the git, make, and which packages), then either follow
   the [Node.js build instructions](https://github.com/ry/node/wiki/Building-node.js-on-Cygwin-%28Windows%29) or install
   the [binary version of Node.js](http://node-js.prcn.co.cc/).

Mac OS users should install Xcode (comes on your Mac OS install DVD, or downloadable from
[Apple's Xcode site](http://developer.apple.com/technologies/xcode.html)) and
[http://mxcl.github.com/homebrew/](Homebrew). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.

Linux/BSD users should use their appropriate package managers to install make, git, and node, or build from source
if you swing that way. Easy-peasy.


How to build your own Jarallax
----------------------------

First, clone a copy of the main Jarallax git repo by running:

```bash
git clone git://github.com/CodeHunger/Jarallax.git
```

Make sure you have `grunt` installed by testing:

```bash
grunt -version
```

Then, to get a complete, minified (w/ Uglify.js), linted (w/ JSHint) version of Jarallax, type the following:

```bash
grunt
```


The built version of Jarallax will be put in the `bin/` subdirectory.


Git for dummies
---------------

As the source code is handled by the version control system Git, it's useful to know some features used.

### Submodules ###

The repository uses submodules, which normally are handled directly by the Makefile, but sometimes you want to
be able to work with them manually.

Following are the steps to manually get the submodules:

```bash
git clone https://github.com/CodeHunger/Jarallax.git
git submodule init
git submodule update
```

Or:

```bash
git clone https://github.com/CodeHunger/Jarallax.git
git submodule update --init
```

Or:

```bash
git clone --recursive https://github.com/CodeHunger/Jarallax.git
```
