---
layout: post
title: Jekyll on Windows
date: 2015-11-13
author: "Kristoffer Östlund"
lang: en
---

[Jekyll](http://jekyllrb.com/) is great, and while Jekyll [isn't officially supported](http://jekyllrb.com/docs/installation/), there's no real headache working with it. There are a few gotcha's, but these are easily overcome. We'll discuss how to install Jekyll, set up a project for hosting on [GitHub Pages](https://pages.github.com/) and how to run it. As an extra I tossed in a small [Gulp](http://gulpjs.com/) script which automates reloading and serving.

## Prerequisites - things to install

As with everything in life, there are a couple of things to do before we can get to the fun. [The Jekyll website](http://jekyllrb.com/docs/installation/) lists a few requirements, I will blatantly borrow them:

- [Ruby](https://www.ruby-lang.org/en/documentation/installation/#rubyinstaller)
- [RubyGems](https://rubygems.org/pages/download)
- Linux, Unix, or Mac OS X
- [NodeJS](https://nodejs.org/en/), or another JavaScript runtime (Jekkyll 2 and earlier, for CoffeeScript support).
- [Python 2.7](https://www.python.org/downloads/) (for Jekyll 2 and earlier)

_Hey, it says Linux, Unix or Mac OS X is required, I'm on Windows!_

I know, I know! But here's the thing. You really don't need a [*nix](https://en.wikipedia.org/wiki/Unix-like) system, Windows works just fine!

Because it' late 2015, and I'm running a Windows machine that list can be cut **significantly smaller and opiniated towards Windows**:

- [RubyInstaller](http://rubyinstaller.org/downloads/) (Ruby + RubyGems)

All we need installed (except Jekyll itself) is included in the RubyInstaller download! As I only use Ruby for Jekyll and thus won't have to worry too much about versions of Ruby, I was free to download any 2.x of Ruby so I chose the most recent installer, that being Ruby 2.2.3.

During the installation, I ticked the box to add `ruby` (and `gem`) to my PATH variable, which gives me easy access via the Command Prompt, from which essentially everything Ruby related is done. (I favor using the Command Prompt for as much as possible, especially since it in Windows 10 includes copy/paste using _keyboard shortcuts_!)

When the installation is finshed, open the Command Prompt, either by finding it in the Start Menu (or Start Screen if you're on Windows 8 or 8.1), or using the incredibly quick keyboard shortcut `WinKey + r` and typipng `cmd` into the little window that pops ups ([`WinKey`](https://en.wikipedia.org/wiki/Windows_key) is the key with the Windows Logo on it). This should open the Command Prompt into which it's just to type:

{% highlight bash %}
gem install jekyll
{% endhighlight %}

The last thing we need to do is to ensure the gem `rouge` is installed. We want Rouge simply because the Pygments seems to not work too nicely on Windows (I get some very mean looking error messages when trying to use it*). These two are [syntax highlighters](https://en.wikipedia.org/wiki/Syntax_highlighting), where Rouge is written in Ruby and [Pygments is based on Python](http://jekyll-windows.juthilo.com/3-syntax-highlighting/). Just like installling Jekyll is easy, so is Rouge:

{% highlight bash %}
gem install rouge
{% endhighlight %}


## Creating a simple blog

Creating a new project is only a line away, so let's get to it, I'll call the project `mostly-harmless`  (if you want to host this on [GitHub Pages](https://pages.github.com/) I suggest you give it the name of ``<username>.github.io``, but that's up to you!). First I'll create the project and then cd into it.

{% highlight bash %}
jekyll new mostly-harmless
cd mostly-harmless
{% endhighlight %}

If you plan no using Git in the project, I suggest quickly running `git init`, `git add . --all` and `git commit -m "Initial commit"` here, so you can go back to how things started if something where to go wrong for you.

Open the folder in your favorite text editor, I've grown very fond of [Visual Studio Code](https://code.visualstudio.com/) and thoroughly enjoy working in it. I just run `code .` from inside the directory, (`subl .` or Sublime Text or `atom .` for Atom).

Inside the text editor, open the `_config.yml` and under the line `markdown: kramdown` add the following line `highlighter: pygments`. The last lines should look something like this:

{% highlight yaml %}
# Build settings
markdown: kramdown
highlighter: pygments
{% endhighlight %}

_But you said we would use Rouge!_

We will, I'll explain how in just a sec! but if you want to use [GitHub Pages](https://pages.github.com/) for hosting (which is free, and free is nice), we're going to need Pygments as the highlighter as they run Jekyll with the `--safe` flag, which won't allow Rouge. Running the project run now will give me the **mean looking error** I was talking about before and that is no fun.

This we fix by adding another file which we'll call `_config_dev.yml` and will contain the development specific configurations (*like which highlighter to use locally*!). For now, the file can look something like below, but can obviously also contain other development variables such as whether to load Google Analytics or whatever really.

{% highlight yaml %}
# Development config file
# Highlighter set to rouge as pygments doesn't work on Windows
highlighter: rouge
{% endhighlight %}

Just adding that file won't do much, we need to tell Jekyll to use it. You do this by running `jekyll serve` with the `--config` flag. To use both config files (which is what we want), we'll have to _chain_ the config files, which is done by a single comma, like so: `--config _config.yml,_config_dev.yml`. If we combine those the command to run will be as below, and should work perfectly.

{% highlight bash %}
jekyll serve --config _config.yml,_config_dev.yml
{% endhighlight %}

As I've fallen in love with [Gulp](http://gulpjs.com/), I've written a small ***gulpfile** (found under the **As mentioned** header) and which runs the serve command for me, as well as watches for changes and reloads the browsers via [LiveReload](http://livereload.com/). For this, obviously you'll need NodeJS.

If you're using git, this would be the perfect time to add and commit the changes. `git add . --all`, `git commit -m "Add add dev config file and highlighter rouge"`.

## Setting GitHub Pages

To set GitHub up for you, you simply navigate to [github.com](https://github.com/) and from there either sign up for a new account or sign in into your existing one and create a **New repository**. Set the **Repository name** to `<username>.github.io`, give it a neat description and then click **Create repository**.

From Command Line, type or paste `git remote add origin git@github.com:<username>/<username>.github.io.git` and then `git push origin master`. Now you should be able to navigate to `<username>.github.io` in your browser and the blog should be right there. You might need to give it some time to build, but it should be pretty instant.

## Conclusion

In short, it's absolutely possible and quite easy to run Jekyll on a Windows machine, and setting it up for hosting it on GitHub. Step by step:

- Download and run [RubyInstaller](http://rubyinstaller.org/downloads/) and make sure tick the box for adding `ruby` and `gem` to your path variable
- In the Command Prompt run:
  - `gem install jekyll`
  - `gem install rouge`
- Create the blog and `cd` into it:
  - `jekyll new blog-name`
  - `cd blog-name`
- Open the project in the text editor of your choice
  - Add to `_config.yml` the line:
    - `highlighter: pygments`
  - Create a new file called `_config_dev.yml`
  - In the file, add at least:
    - `highlighter: rouge`
- Give the project a test run via the command:
  - `jekyll serve --config _config.yml,_config_dev.yml`
- Log in on [github.com](https://github.com/) and create a new project called:
  - `<username>.github.io`
  - Via the Command Prompt, add the remote (make sure you've initialized, added and commited first):
    - `git remote add origin git@github.com:<username>/<username>.github.io.git`

And that should be pretty much it!

_Kristoffer Östlund_

---

## As mentioned

#### _*gulpfile.js_

To be able to use gulp, you'll need [NodeJS](https://nodejs.org/en/) and [Gulp](http://gulpjs.com/). In the Command Prompt (when NodeJS is installed) run:

{% highlight bash %}
npm install -g gulp
npm install --save-dev gulp gulp-livereload
{% endhighlight %}

And then from the Command Prompt run:

{% highlight bash %}
gulp
{% endhighlight %}

Finally here is the `gulpfile.js`:

{% highlight javascript %}
'use strict'

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var livereload = require('gulp-livereload');

var jekyll;
// process name for jekyll
var _jekyll = process.platform === 'win32'
  ? 'jekyll.bat'
  : 'jekyll';

// Serve task
gulp.task('serve', function () {
  if (jekyll) { jekyll.kill(); }
  
  // Run the jekyll command with the --config and --incremental flags
  jekyll = spawn(_jekyll, ['serve', '--config', '_config.yml,_config_dev.yml', '--incremental'], { stdio: 'inherit' });
  
  jekyll.on('close', function (code) {
    console.log(code);
  });
});

// Super simple task to reload the page on changes.
gulp.task('reload', function () {
  livereload.reload();
});

// Watches for changes in the _site folder, as it is what is served
gulp.task('watch', function () {
  gulp.watch(['./_site/**/*.html'], ['reload']);
});

// Initiate livereload
livereload.listen();

gulp.task('default', ['serve', 'watch']);

// Kill jekyll if it's still running on shut down.
process.on('exit', function () {
  if (jekyll) jekyll.kill();
});
{% endhighlight %}

#### _*mean looking error_

{% highlight err %}
 Dependency Error: Yikes! It looks like you don't have pygments or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- pygments' If you run into trouble, you can find helpful resources at http://jekyllrb.com/help/!
{% endhighlight %}