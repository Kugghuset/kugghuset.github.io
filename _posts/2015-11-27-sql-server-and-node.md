---
layout: post
title: SQL Server and Node.js
date: 2015-11-27
author: "Kristoffer Östlund"
lang: en
---

Here at Kugghuset, We're predominantly a [Business Intelligence](https://en.wikipedia.org/wiki/Business_intelligence) shop, which for us means we work a lot with [SQL Server](http://www.microsoft.com/en-us/server-cloud/products/sql-server/default.aspx), and we're good at it. There's just so much great tooling for it and it's (from a business perspective) quite affordable. Though, we aren't a pure Microsoft shop, as a developer I mainly use [Node.js](https://nodejs.org/en/) and I initially thought this would troublesome as I can't say I've heard of anyone combinig the two. Boy was I wrong, and I'm super happy I was - SQL Server and Node.js works great together.

## SQL Server ❤ Node.js

Most of my previous experience comes from working on the [MEAN Stack](http://mean.io/#!/), but from day one I had to swap the "M" of MongoDB for another "M" - namely, MSSQL. So I guess it's still _MEAN_, just not _The MEAN_? Anyway, there are a few different options to go with:

- [node-sqlserver](https://github.com/Azure/node-sqlserver)
- [Tedious](https://github.com/pekim/tedious)
- [node-mssql](https://github.com/patriksimek/node-mssql)
- [Seriate](https://github.com/LeanKit-Labs/seriate)
- [Sequelize](https://github.com/sequelize/sequelize)

### [node-sqlserver](https://github.com/Azure/node-sqlserver)

node-sqlserver is developed by (a part of?) Azure and is what I'm assuming will be the official _The Microsoft Driver for Node.js for SQL Server_. Though, as of writing ({{ page.date | date: '%B %d, %Y' }}) they themselves considered it not production ready, and it's only supported on Windows. Other than node itself, it also has dependencies in both [Python 2.7](https://www.python.org/download/releases/2.7/) and [Visual C++ 2010 Express](https://app.vssps.visualstudio.com/profile/review?download=true&context=eyJwZSI6MSwicGMiOjEsImljIjoxLCJhbyI6MSwiYW0iOjAsIm9wIjpudWxsLCJhZCI6bnVsbCwiZmEiOjAsImF1IjpudWxsLCJjdiI6NTU5MTI1NjAsImZzIjowLCJzdSI6MCwiZXIiOjF90). It also only works on Node 0.8.9, and installation requires the installation of an executable in order to work. It seems to be sparsely documented, as [they refer to their tests for example of usage](https://github.com/Azure/node-sqlserver#usage).

### [Tedious](https://github.com/pekim/tedious)

Tedious is a pure JavaScript implementation of/driver for the [TDS protocol](http://msdn.microsoft.com/en-us/library/dd304523.aspx) and does essentially what node-sqlserver does, but is easier to install (`npm install tedious [--save]`) and runs wherever node runs. I would consider tedious the as _close to the metal_ you'll come (on par with node-sqlserver, of course), which does give you the freedom to do essentially whatever you want, but will require you writing far more code than the following packages. It's well documented, with a nice [getting started page](http://pekim.github.io/tedious/getting-started.html) as well as some nice [API docs](http://pekim.github.io/tedious/api.html).

### [node-mssql](https://github.com/patriksimek/node-mssql)

node-mssql is _an easy to use mssql datase connecetor for Node.js / io.js_, which puts it in a different category than the previous two, as it's not a driver. It works on top of either tedious or node-sqlserver, and was the first package I used to connect to a SQL Server from node. It's less verbose and easier to use than purely working with the drivers, and is super easy to get started with. It has some [quick examples](http://patriksimek.github.io/node-mssql/#quick-example) and the [documentation is nice](http://patriksimek.github.io/node-mssql/#documentation).

### [Seriate](https://github.com/LeanKit-Labs/seriate)
  
Seriate is based on node-mssql, and is even easier to use as a lot of the work is done under the hood. Obviously, it's more opinionated and will give you a more directed way of using it, but this also means it's less easy to screw up. It's super simple to get started with, and out of the box it makes it super easy to use variables and even easier to use `.sql` files to separate concerns (which we take full advantage of by combining BI philosophies and development practices). [Documentation and examples](https://github.com/LeanKit-Labs/seriate#api) can be found on its [GitHub page](https://github.com/LeanKit-Labs), and an excellent [gettings started post can be found on their own website](http://developer.leankit.com/painless-sql-server-with-nodejs-and-seriate/)

### [Sequelize](https://github.com/sequelize/sequelize)

Sequelize is only ORM on the list, it's also the only package which straight away can work against different flavours of SQL databases (they list Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server on their GitHub page). With this one, as opposed to the others, you don't actually write too much SQL (if any at all). It also makes for a more general approach, as the project won't be tied a specific type of database, which makes it great for diverse teams working in different environments. The [documentation is awesome](http://docs.sequelizejs.com/en/latest/api/sequelize/) and there's a [nice getting started page](http://docs.sequelizejs.com/en/latest/docs/getting-started/) too.

## What we use

As already mentioned above, we have grown to love **Seriate**, as it allows me as a dev to leverage the knowledge of my business intelligence colleagues without having to compromise development at all really. In a future blog post I will discuss in more detail how we use Seriate to accommodate customer's needs whilst also keeping dev work easy. It's a little different writing SQL queries, but as I can stove away them in neat `.sql`, which are still loaded as strings, I can do some pretty cool stuff using some JavaScript goodness.
