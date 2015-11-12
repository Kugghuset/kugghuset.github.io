---
layout: post
title: Jekyll on Windows
date: 2015-10-29
categories: kugghuset jekyll windows
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

Because it' late 2015, and I'm running a Windows machine that list can be cut significantly smaller and opiniated towards Windows:

- [RubyInstaller](http://rubyinstaller.org/downloads/) (Ruby + RubyGems)

All we need installed (except Jekyll itself) is included in the RubyInstaller download! As I only use Ruby for Jekyll and thus won't have to worry too much about versions of Ruby, I was free to download any 2.x of Ruby so I chose the most recent installer, that being Ruby 2.2.3.

During the installation, I ticked the box to add `ruby` (and `gem`) to my PATH variable, which gives me easy access via the Command Prompt, from which essentially everything Ruby related is done. (I favor using the Command Prompt for as much as possible, especially since it in Windows 10 includes copy/paste using _keyboard shortcuts_!)

When the installation is finshed, open the Command Prompt, either by finding it in the Start Menu (or Start Screen if you're on Windows 8 or 8.1), or using the incredibly quick keyboard shortcut `WinKey + r` and typipng `cmd` into the little window that pops ups ([`WinKey`](https://en.wikipedia.org/wiki/Windows_key) is the key with the Windows Logo on it). This should open the Command Prompt into which it's just to type:

{% highlight shell %}
gem install jekyll
{% endhighlight %}

And we're pretty much set with installing stuff!