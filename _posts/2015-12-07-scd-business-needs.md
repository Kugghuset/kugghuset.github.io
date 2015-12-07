---
layout: post
title: Slowly Changing Dimensions - with business needs
date: 2015-12-07
author: "Michael Tracey"
lang: en
---

## DO NOT BE AFRAID!
It is not as complex as it sounds like,
Parallel universes and Einstein's relativity will not be popping up in this one.
But nevertheless it is considered by many to be a real challenge to implement.
In this blog post I'm going to provide you with three different approaches to handling historical data.
I'm also going to address an issue regarding business needs,
and the implications it has with different types of SCD functionality.
Let the jazzing begin!

<!--more-->

## What is SCD?

Slowly Changing Dimensions (SCD) offers your organization the possibility to report historical data with dimensions that changes over time.
There are five different types of SCD that you can implement, Type: 1, 2, 3, 4, and 6.
Though there are many to choose from the most used and common ones are 1, 2 and 3.
The following examples will describe them in more detail.

## SCD – Type 1

In type 1 the columns are updated, or overwritten, with the latest data retrieved directly from the data source. Below we see a row, in the customer table, where a `Business Area` is changed from Iceland to Sweden. What is taking place here is data changing form. Nothing more, nothing less.

![/assets/img/2015-12-07/SCD1.JPG](/assets/img/2015-12-07/SCD1.JPG)

## SCD – Type 2

In type 2 we make it possible to trace the dimension by adding a new line based on whether there is a change in one or more of the specified columns. Here we have entered the column `Business Area` as a requirement for a new row to be added. Notice that we have two date based columns, `StartDate` and `EndDate`, which keeps track of the start and end dates of the relevant customer-row. These tell which row is current or former.

![/assets/img/2015-12-07/SCD2.JPG](/assets/img/2015-12-07/SCD2.JPG)

## SCD – Type 3

In type 3, instead of creating new lines, you keep track of historical data stored in columns. Below we see two columns for business area. **Current** which shows the current value, and **Previous** which holds the previous value. The downside with this implementation is that if we were to say that the business area changed value a third time from `Sweden` to `Denmark`, `Iceland` would have been overwritten and forgotten.

![/assets/img/2015-12-07/SCD3.JPG](/assets/img/2015-12-07/SCD3.JPG)

## Theory vs Reality

Is it all good then? Of course not! Different companies have different needs… so called "business needs". They come in the shape of reports, and sure if you've opened up for the possibility to analyze historical data it must be counted for. This is where it gets complicated.
Imagine we have a company which operates in different areas, so called Business Areas (BA's). These BA's are linked to certain sales persons, and let's say they would like to know how big of a Christmas-paycheck they would be expecting. If salesman Håkan, which is responsible for Denmark got replaced by Henrik instead, how would we determine what amount each sales person was responsible for? This is where surrogate keys come in handy! 
Imagine (pre- SCD implementation) we had `CustomerNr` as a primary key in the customer-table linked to all transactions in a fact table. To keep adding new rows we need to replace the `BusinessKey` with surrogate-keys instead. Now we can map facts to current rows in the dimension table by inherited surrogate-keys from the dimension-table. 

![/assets/img/2015-12-07/SCD_ETL.JPG](/assets/img/2015-12-07/SCD_ETL.JPG)

If the dimensions keep on changing and the ETL-process repeats itself, voilá, you now have a fully functional database with historical records. So now we can find records for both Håkan and Henrik, and determine what amount they were held responsible for by the basis of when the change took place. But what if Henrik is part of many business areas and out of curiosity would like to know how much, regardless if he's been selling or not, that particular business area has done over the year? This is done by adding a column (SCD-type 3) which keeps track on the current value.

![/assets/img/2015-12-07/SCD6.JPG](/assets/img/2015-12-07/SCD6.JPG)

Every row, historical or not, has a given value which shows the current one. Now we can map rows by, for example, `CustomerNr` and then give us a total based on the current BA.

## Conclusion

As you may noticed by now my solution above referred to more than one SCD. That is why I choose to reveal the hidden ace up my sleeve. SCD type 6! This is a hybrid of SCD's, a combination of type 1, 2 and 3. 1+2+3 = 6, makes sense does it not? 

![https://media.giphy.com/media/FG14fnY17opr2/giphy.gif](https://media.giphy.com/media/FG14fnY17opr2/giphy.gif)