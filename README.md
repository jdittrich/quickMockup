#QuickMockup

QuickMockup is a simple tool for creating simple mockups of interfaces and websites. 

[Try the demo](https://jdittrich.github.io/quickMockup/)

It is HTML based and javascript-enhanced.

--------------------
![Screenshot](https://i.imgur.com/D4B3ggc.png)

--------------------

## Usecase

The tool is meant to allow to quickly create mockups of interfaces in order to communicate ideas.

It is not meant for pixel perfect mockups nor for complex interface mockups involving several screens and hundereds of elements.

The target group for now are designers or design-aware developers who take part in open source projects and need to communicate their ideas. An mockup is worth a thousand words in this case.

### Saving
You can just save the webpage with your browsers save function. If you save the complete webpage, you retain interactivity. If you just save the webpage-HTML-itself, you still have the mockup in one file. You can also just do a screenshot (in case it is more a throw-away mock anyway) using whichever tool you like.

## Technology/Implementation

HTML based and javascript-enhanced, means that the functions rely on manipulating the HTML directly; there is no MVC-Framework, Database etc. The core code is not very long.

This has the advantage of keeping things simple. It means also that I needed to go with what works well already. E.g. there in no zoom, since it makes dragging much harder to manage.

## Create own interface Elements

Interface elements (a custom button or so) can be created in HTML and CSS.

See the source code for now, there are instructions in a comment in the html at the beginning of the code for the element list.

## License

MIT License; Used Libraries may have other licenses – see below


## Used Libraries

Library  | Creator |License | Origin
------------- | -------- | ----- | -------------
jQuery | Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors | [Released under the MIT license](http://jquery.org/license) | http://jquery.com/
jQueryUI | Copyright jQuery Foundation and other contributors | Released under the MIT license | http://jqueryui.com
Mousetrap | Craig Campbell in 2012-2015 | [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0) | https://craig.is/killing/mice
Showdown | Showdown Copyright (c) 2007, John Fraser | [Showdown Copyright](https://github.com/showdownjs/showdown/blob/master/license.txt) | https://github.com/showdownjs/showdown
