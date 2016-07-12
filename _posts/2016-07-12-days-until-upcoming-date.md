---
layout: post
title: DAX-tutorial Calculate the number of days left until an upcoming date
date: 2016-07-12
author: "Lisa Bányay"
lang: en
---

## 1. A Simple Case – Due Dates

If you have due dates for projects set up in the future, it could be a good idea to keep track of how many days that are left until that said date or by how many days a project is overdue. In business for instance, that allows for better project planning.
This is an easy calculation when using DAX, the language used in Excel, Power Pivot, Power BI and SSAS calculations. All thanks to the nifty date function `TODAY()`. Let’s take a look:

We begin with a simple Excel sheet which shows our projects and their respective due dates. Let’s assume that today’s date is the 29th of June, 2016.

![/assets/img/2016-07-12/duud-01.PNG](/assets/img/2016-07-12/duud-01.PNG)

Now we want to add a new column that will show us the number of days left until the due date (or, for Project 1 and Project 2, how many days we are overdue).

![/assets/img/2016-07-12/duud-02.PNG](/assets/img/2016-07-12/duud-02.PNG)

First you have to make sure that your Due Date is in a correct date format.
Simply write the formula into the C2 field, directly under the header “Days left until due”.

![/assets/img/2016-07-12/duud-03.PNG](/assets/img/2016-07-12/duud-03.PNG)

Then press Enter. If the result is showing you weird things like lots of ##### or a date like 1900-02-01, it’s because the output format is set to Date. Change it to General and you will receive the days left until the due date.

Here it shows a negative number, which means the project is overdue. Remember, we assumed that today is the 29th of June, 2016.

But what about the rest of the due dates? We clearly have to fill the whole C column with the number of days. Simply double-click in the bottom right corner of the selected field (C2) or click once and drag it all the way down to C6.

![/assets/img/2016-07-12/duud-04.PNG](/assets/img/2016-07-12/duud-04.PNG)

And you’re done! Now, this wasn’t so hard, was it? Wait, was it too easy?! How about something more difficult, then?

## 2. A Special Case – Birthdays

Let’s say you want to create a countdown for all of your employees’ birthdays to show how many days that are left until somebody’s next birthday. In this case we can’t use the latter formula. This is because of two reasons.

First, if an employee already had their birthday this year, we now want to know the days until their next birthday (which would be next year). Due dates like in the previous example, where we show days overdue, do not exist here. Also, the calculation is based on somebody’s birthdate, the year of which could be many years ago.

If we had used the formula above, we would have gotten the number of days since the day they were born. That’s why we need to figure out another solution!

Let’s start with another simple Excel sheet:

![/assets/img/2016-07-12/duud-05.PNG](/assets/img/2016-07-12/duud-05.PNG)

Now to fill our column C (Days until next Birthday) we have to use this super easy (just kidding) formula:

{% highlight dax %}
= IF(TODAY() < DATE(YEAR(TODAY()), MONTH(B2), DAY(B2)), DATE(YEAR(TODAY()), MONTH(B2), DAY(B2))-TODAY(), DATE(YEAR(TODAY()) + 1, MONTH(B2), DAY(B2))-TODAY())
{% endhighlight %}

We will get the correct result (as, again, it is the 29th of June, 2016 today):

![/assets/img/2016-07-12/duud-06.PNG](/assets/img/2016-07-12/duud-06.PNG)

Confused yet? Well, good news. We will now take a step-by-step (real baby steps) walkthrough on how to get to the formula and what all of its parts mean.

First, let’s subtract today’s date from the Day of Birth (the same way we did above).

![/assets/img/2016-07-12/duud-07.PNG](/assets/img/2016-07-12/duud-07.PNG)

Now we get the days that have went by since the day the person was born. But we want to focus on the current year as we are only interested on the next birthday. So let’s tweak the formula to

{% highlight dax %}
= DATE(YEAR(TODAY()), MONTH(B2), DAY(B2)) - TODAY()
{% endhighlight %}

![/assets/img/2016-07-12/duud-08.PNG](/assets/img/2016-07-12/duud-08.PNG)

So, what happened here? Well, we used the `DATE()`-function in combination with `TODAY()` to essentially set the Day of Birth to this year. 1992-08-17 became 2016-08-17. Then we subtracted today’s date. To understand this step we have to take a closer look at general date functions in DAX. The `DATE()`-function takes exactly three arguments, a year, a month and a day, in this particular order to make up a full date. The syntax is: `DATE(year, month, day)`

Now, if there is a full date you can “extract” the year, month and day by using `YEAR(date)`, `MONTH(date)`, and `DAY(date)`, respectively. Lucky for us, we have the Day of Birth column which contains a full date. In this case, we want to extract today’s year, but month and day from the employees’ birthdates. That’s how we get `DATE(YEAR(TODAY()), MONTH(B2), DAY(B2))`. Now we simply subtract `TODAY()`, as usual.

Now we know that the employee born on 17th of August, 1992 has their next birthday in 49 days. This is completely correct. So why do we need that super annoyingly long formula I mentioned above?! Well, let’s take a look at what happens when we fill the series with the current formula.

![/assets/img/2016-07-12/duud-09.PNG](/assets/img/2016-07-12/duud-09.PNG)

Shoot! We missed the birthdays of Employee 3 and Employee 4! They already had their birthday this year. We want to know the days until their next birthday, which is next year. So in order to take employees who already have had their birthday into account, we need to add one year to the year part of the current formula.

{% highlight dax %}
= DATE(YEAR(TODAY()) + 1, MONTH(B4), DAY(B4)) - TODAY()
{% endhighlight %}

![/assets/img/2016-07-12/duud-10.PNG](/assets/img/2016-07-12/duud-10.PNG)

Great! Now we solved the problem… almost. We need to combine the two formulas into one and make Excel understand when to choose the one for the current year and when to choose the one for next year. Why? Because we need one consistent formula that works correctly through the whole C column.

The logic is: If the upcoming birthday is in this year, it means that the date for the birthday is bigger than the date of today and the formula has to calculate the days until the birthday this year. However, if the birthday already happened this year, it means today’s date is bigger than the date of the birthday this year. Hence, the formula has to “jump” to the next year to calculate the days.

Do you see how I said “if” twice? In DAX we can also use `IF()` to define which part of the formula should be used. The general syntax of `IF()` in DAX has three steps:

{% highlight dax %}
IF(logical test, what happens if true, what happens if false)
{% endhighlight %}

In our case the logical test of the IF() statement will look like this:

{% highlight dax %}
IF(TODAY() < DATE(YEAR(TODAY()), MONTH(B2), DAY(B2))
{% endhighlight %}

So we “test” whether today’s date is smaller than the birthdate when setting the year of the birthday to the current year.

Now, let’s put it all together and “translate” the whole formula into English.

DAX:

{% highlight dax %}
= IF(TODAY() < DATE(YEAR(TODAY()), MONTH(B2), DAY(B2)),
DATE(YEAR(TODAY()), MONTH(B2), DAY(B2)) - TODAY(),
DATE(YEAR(TODAY()) + 1, MONTH(B2), DAY(B2)) - TODAY())
{% endhighlight %}

English:

{% highlight dax %}
= IF(today’s date < birthdate using this year,
then calculate birthdate using the current year – today’s date,
otherwise calculate birthdate using the next year – today’s date).
{% endhighlight %}

**Or even simpler**:

If today’s date is smaller than the birthdate using the current year, then take the birthday, switch the year to the current year and subtract today’s date, otherwise do exactly the same calculation, only with the next year as the year of birth, instead.

And this is how you get the result I’ve shown before:

![/assets/img/2016-07-12/duud-11.PNG](/assets/img/2016-07-12/duud-11.PNG)

Congratulations! Now that you’ve made it this far, I want to give credit to the person that posted this formula in a help forum. Sadly, the post is very well hidden, advanced internet searching and a lot of scrolling were involved in order to find it. Also, the formula isn’t really explained, so I took it upon myself to create a (hopefully) decent explanation for everyone interested in not only using the formula, but actually gain some knowledge on DAX and date functions.

So, the mastermind behind this awesome formula is Microsoft Most Valuable Professional BobGreenblatt, and his post can be found [here](http://answers.microsoft.com/en-us/mac/forum/macoffice2011-macexcel/how-to-advance-birthday-in-days-till-next-birthday/79a81203-ebdf-4db5-9514-0f04b86162d8?auth=1), far down on the page.
