---
layout: post
title: Markdown crash course
date: 2015-11-20
author: "Kristoffer Östlund"
lang: en
---

It's no secret I'm a fan of [markdown](https://en.wikipedia.org/wiki/Markdown). I'm also a [fan of Jekyll]({% post_url 2015-11-13-jekyll-on-windows %}) which is probably the cause of the former. It's just so beautiful - combining the ease of _plain text_ with the customizability of HTML and CSS. I'm in power. Best of all? It's super easy to get started.

## The basics of Markdown

As with everything, there are things which will seem odd to begin with, but I greatly believe the pro's overweight the con's by a long shot. The absolute basics are super easy. To **create a block of text**, type some words and then double tap the enter button and then type away for the next paragraph. Easy, isn't it?

<pre> <!-- Used pre here to ensure everything is plain text -->
Type something here.

And then some here.
</pre>

## Headings

What would text be without headings? Markdown has that. The syntax is simple, add a `#` or more, and the fewer [octothorpe](http://www.worldwidewords.org/weirdwords/ww-oct1.htm) (or [hashtag](https://en.wikipedia.org/wiki/Hashtag), whatever you prefer), the _less big_ it will be. If you are familiar with [Word](https://products.office.com/en/word) (you've probaly heard of it), these correspond to the different levels of headings. If you're more of a geek (like I am), these truly match the different levels of headings levels of HTML (`#` maps to `<h1>`, `##` to `<h2>` and so on). This can be observed below:

# _Single \#_

## _Double \#\#_

### _Triple \#\#\#_

#### _Quadrupel \#\#\#\#_

##### _Quintiple \#\#\#\#\#_

## _Cursive_ and **Bold**

Furthermore (I love that word!), **bold** or _italics_ are quite fun as well. Who am I kidding? _What would even **words** be without those two_? Once again, super simple to use. I like to difference the two a bit, but both are quite similar. **Bold** are achieved using either double `__` (underscores) or double `**` (asterisks) surrounding the words or word in question. **This is bold with asterisks** and __this with underscores__. _Cursive_ is written using a single `*` or `_`. Whatever way you prefer writing these are individual, but I prefer to use asterisks for **bold** (`*`), and underscores for _cursive_.

*Cursive* using asterisks (`*Cursive*`). _Cursive_ using underscores (`_Cursive_`).

**Bold** using asterisks (`**Bold**`). __Bold__ using underscores (`__Bold__`).

## Block quotes

> Initially I put  "**But wait, there's more!**" here, but I couldn't do it.

Sometimes, words are so powerful, or simple so many "_inline quoting_" isn't enough. That's when block quotes come in handy. To be honest, I'm quite bad with using them, but they do have their time and place. Anywho, block quotes are writtens as `> Text goes here`.

## Code blocks

There are in general two ways of writing code blocks in Markdown. In pure Markdown these are done through back ticks or [Grave accents](https://en.wikipedia.org/wiki/Grave_accent). First there are `inline blocks`, meaning exactly that - code blocks in the line with the rest of the text - which are surrounded by single back ticks (I can't seem to escape them properly though). The other way is for proper code blocks - where there is a _block of code_ and it has its own lines and sometimes higlighting as well. These are surrounded by triple back ticks and on separate lines.

When using Jekyll it's slightly different though. Inline code is done the same way, using single back ticks, but blocks of code needs [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers), which is done through the use of curly brackets, the word _highlight_, the language to highlight and all put between `{``% highlight <language> %}` and `{``% endhighlight %}`. In some instances, for instance in [GitHub flavoured Markdown](https://help.github.com/articles/github-flavored-markdown/), you can do the same thing by adding the language on the same row as the first three back ticks.

{% highlight text %}

`inline code`

```bash
Code block
```

{% endhighlight %}

{% highlight javascript %}
console.log('This is JavaScript!');
{% endhighlight %}

## Dividers

Dividers are cool. They're as easy as 1, 2, 3, or `---` really. They're cool nonetheless. Just look at how cool it is!

---

## Links

Links are great, and I use them a lot! They consist of square brackets, normal brackets, some text and of course the link. The words to highlight is put inside square brackets (`[]`), and the link itself inside regular brackets (`()`). You can also use references, which means you don't have to have the links inline, which is quite nice, and it's achieved by using only square brackets (first around the word(s) and then around the name of the reference). Lastly, there are automatic links, which is done by using [_pointy brackets_](https://en.wikipedia.org/wiki/Bracket#Names_for_various_bracket_symbols) (`<>`) to surround the link itself, so they're not too automatic:


{% highlight text %}

<https://www.google.com/>

[Link to Google.com](https://www.google.com/)

or

[Referenced link][1]
[Other referenced link][reference]

references here:

[1]:https://www.google.com/
[reference]: https://twitter.com/

or

<https://en.wikipedia.org/wiki/Bracket#Names_for_various_bracket_symbols>

{% endhighlight %}

## Images

If I'm bad at using block quotes, I'd say I'm worse at using images. They're easy though, as they work just like with links, but you prepend an exclamation mark. Obviously, references works just fine here as well, as it's _simply a link_ (which also happens to be rendered as an image).

Here's the code for below image:

{% highlight text %}

![http://i.kinja-img.com/gawker-media/image/upload/krizzghfqegk0fv0g3ey.gif](http://i.kinja-img.com/gawker-media/image/upload/krizzghfqegk0fv0g3ey.gif)

{% endhighlight %}

![http://i.kinja-img.com/gawker-media/image/upload/krizzghfqegk0fv0g3ey.gif](http://i.kinja-img.com/gawker-media/image/upload/krizzghfqegk0fv0g3ey.gif)

## Tables

I'll be honest, I haven't used tables in Markdown myself. But they exist, and are, as with everything else, quite easy to use. Some vertical bars (`|`), some dashes (`-`), colons (`:`) and obviously some values (whatever you want really) are all you need. Vertical bars divide the olumns, the dashes defined the header and the colons determine how the values should be aligned.


| Heading | Left aligned | Right aligned |
| ------- | :------------ |------------: |
| value   | other         | 2            |
 last | line | ugly formatting

And here's the code for above table:
 
 {% highlight text %}
| Heading | Left aligned | Right aligned |
| ------- | :------------ |------------: |
| value   | other         | 2            |
 last | line | ugly formatting
{% endhighlight %}

## What else?

One thing I absolutely love about Markdown, other than the styling benefits, is its ability to be diffed in Git (which is deep in my ❤), opposed to using for instance Word or another [binary format](https://en.wikipedia.org/wiki/Binary_file). [Markdown files are saved just as plain text](https://github.com/Kugghuset/kugghuset.github.io/blob/master/_posts/2015-11-20-markdown-crash-course.md). The downside here is obviously you get less tools for spell check and the likes, but my favourite text editor has as of v0.10.1 a [spell checker extension](https://marketplace.visualstudio.com/items/seanmcbreen.Spell) (extensions overall!!), and I know [Sublime Text has an inbuilt spell check as well](https://www.sublimetext.com/docs/2/spell_checking.html), and [Atom seems to have some as well](https://github.com/atom/spell-check).

## Last words

You can now consider yourself a Mark(down)sman (I'm sorry, I had to!). Thank you for reading!