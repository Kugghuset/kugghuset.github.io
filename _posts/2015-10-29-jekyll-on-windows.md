---
layout: post
title: Jekyll on Windows
date: 2015-10-29
categories: kugghuset jekyll windows github pages rouge
author: "Kristoffer Östlund"
lang: en
---

While Jekyll [isn't officially supported](http://jekyllrb.com/docs/installation/), there's no real headache working with it. There are a few gotcha's, but these are easy to overcome.

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

{% highlight shell %}
gem install jekyll
{% endhighlight %}

The last thing we need to do is to ensure the gem `rouge` is installed. We want Rouge simply because the Pygments seems to not work too nicely on Windows (I get some very mean looking error messages when trying to use it*). These two are [syntax highlighters](https://en.wikipedia.org/wiki/Syntax_highlighting), where Rouge is written in Ruby and [Pygments is based on Python](http://jekyll-windows.juthilo.com/3-syntax-highlighting/). Just like installling Jekyll is easy, so is Rouge:

{% highlight shell %}
gem install rouge
{% endhighlight %}


## Creating a simple blog

Creating a new project is only a line away, so let's get to it, I'll call the project `mostly-harmless`  (if you want to host this on [GitHub Pages](https://pages.github.com/) I suggest you give it the name of `usename.github.io`, but that's up to you!). First I'll create the project and then cd into it.

{% highlight shell %}
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

That is correct, but if you want to use [GitHub Pages](https://pages.github.com/) for hosting (which is free, and free is nice), we're going to need Pygments as the highlighter as they run Jekyll with the `--safe` flag, which won't allow Rouge. Running the project run now will give me the **mean looking error** I was talking about before and that is no fun. This we fix by adding another file which we'll call `_config_dev.yml` and will contain the development specific configurations (*like which highlighter to use locally*!). For now, the file can look something like below, but can obviously also contain other development variables such as whether to load Google Analytics or whatever really.

{% highlight yaml %}
# Development config file
# Highlighter set to rouge as pygments doesn't work on Windows
highlighter: rouge
{% endhighlight %}

Just adding that file won't do much, we need to tell Jekyll to use it. You do this by running `jekyll serve` with the `--config` flag. To use both config files (which is what we want), we'll have to _chain_ the config files, which is done by a single comma, like so: `--config _config.yml,_config_dev.yml`. If we combine those the command to run will be as below, and should work perfectly.

{% highlight shell %}
jekyll serve --config _config.yml,_config_dev.yml
{% endhighlight %}

If you're using git this, again, would be the perfect time to add and commit the changes. `git add . --all`, `git commit -m "Add add dev config file and highlighter rouge"`.

---

_*mean looking error_

{% highlight err %}
 Dependency Error: Yikes! It looks like you don't have pygments or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- pygments' If you run into trouble, you can find helpful resources at http://jekyllrb.com/help/!
{% endhighlight %}