# UPIApplication
UPIApplication is a jQuery library that transforms a normal web site in a web application.

#Who could need it?
Everyone using a (php) CMS that generates web pages and would like to transform his website to an application-like website, ie that does not reload each page during the user navigation but only the needed block within the page.

Everyone that would like to keep the way he builds websites but would like to have it behaves like a web application.

#Why should I use that?!
The concept of web application getting data through REST Api with a client application that is doing the job of connecting the whole 
to build an application is generally a difficult job whereas PHP websites built on a standard CMS are easy to handle and do this job quite naturally...
Except that we reload the pages... or we need to do ajax calls to update part of our pages...

So, the idea is to provide a simple environment that don't change your habits when creating your website without having the hassle of creating ajax calls:
* no complicated framework to understand like AngularJS to build your application
* building the pages don't change from the old normal way
* configuration is really simple and quite natural: quite nothing to do :-)
* the history of browsing is kept


#How does it work? the "Hello world" example...

let's have a first html file test1.html 
```html
<body id="myUPIApplication">
  <p>I'm test1.html file</p>
  <ul>
  	<li><a href="test1.html" data-upi-link="true">Hello World!</a></li>
  	<li><a href="test2.html" data-upi-link="true">HowDy?</a></li>
  </ul>
  <div id="mainContainer" data-upi-container="true" data-upi-container-name="mainContainer" data-upi-container-content="helloWorld">
  	Hello World
  </div>
</body>
```

and a second one test2.html that is quite the same (let's imagine these files are php generated...) with a new content in the "mainContainer" part :
```html
<body id="myUPIApplication">
  <p>I am test2.html file</p>
  <ul>
  	<li><a href="test1.html" data-upi-link="true">Hello World!</a></li>
  	<li><a href="test2.html" data-upi-link="true">HowDy?</a></li>
  </ul>
  <div data-upi-container="true" data-upi-container-name="mainContainer" data-upi-container-content="HowDy?">
	  How is it going?
  </div>
</body>
```

This two html files will load and behave normally. If you would like to transform them in a web application, just add at the end this little script :

```javascript
<script type="text/javascript" src="../UPIApplication.js"></script>
<script>
	$( document ).ready(function() {
		$('#myUPIApplication').UPIApplication();
	});
</script>
```

You will then see that when clicking on the page links, only the 'data-upi-container' block is changed! 

Tada! you've got a web application :-)

General algorithm of UPI Application
====================================

The general algorithm of UPI Application is the following:
* when a link is called (clicked), 
  * get the new content from the clicked page through an ajax call
  * get all the "upi-container" of the current page
  * for each "upi-container" of the current page
    * Get the "upi-container" with the same name ("upi-container-name") from the new page
    * Compare "upi-container-content : is the "upi-container-content" different between the current one and the new one?
      * if "yes", then change the "upi-container" with the new one

How to configure my pages to become pages of a web application?
===============================================================

Follow these steps :
* Identify the common blocks between your pages. When you use a CMS, these blocks are the one you identified when building your website.
* Tell to UPIApplication that these blocks are the one that may be updated from page to page, using "data-upi-container" attribute set to true and giving a name to the container with the "data-upi-container-name" attribute.
* Tell what are the links that may update your content using the "data-upi-link" attribute.
* Call UPIApplication script...

That's it: your blocks will be automatically updated from ajax calls to the other pages according to your configuration.


.UPIApplication(options)
========================

UPIApplication is the jQuery function that starts your web application.

It can take 'options' as input with the following possible option parameters :
* debug: (default:false) if true, then log things in the console
* LogLevel: (default:3) log level: 1: error ; 2: warning; 3: notice
* AlertError: (default:false) show an alert box on error messages if true
* pageLoadedFunction: (default:null) function to call when the page is loaded
* pageReadyFunction: (default:null) function to call when the page is ready
* beforePageChange: (default:null) function to call when the page will have its content changed
* afterPageChange: (default:null) function to call when the page had its content changed
* onErrorOnPageChange: (default:null) function to call when the page got an error during change
  


LIBRARY DEPENDENCIES
====================
To work properly, you need to include the following javascript library:
* jQuery (>= 1.10) `<script type="text/javascript" src="extlib/jquery-1.10.2.min.js"></script>`
* [iFSM by intersel](https://github.com/intersel/iFSM/)
  * this library manages finite state machines and needs these libraries:
    * doTimeout by ["Cowboy" Ben Alman](http://benalman.com/projects/jquery-dotimeout-plugin/)
	  * this library brings some very usefull feature on the usual javascript setTimeout function like Debouncing, Delays & Polling Loops, Hover Intent...
	  * `<script type="text/javascript" src="extlib/jquery.dotimeout.js"></script>`
    * attrchange by Selvakumar Arumugam](http://meetselva.github.io/attrchange/) 
	  * a simple jQuery function to bind a listener function to any HTML element on attribute change
	  * `<script type="text/javascript" src="extlib/jquery.attrchange.js"></script>`
* [Sammy](http://sammyjs.org/)
  * Sammy is a little framework to make web application providing simple but efficient 'route' services

FAQ
===

If you have questions or unsolved problems, you can have a look on the our [FAQs](https://github.com/intersel/UPIApplication/wiki) 
or leave a message on the [Issue board](https://github.com/intersel/UPIApplication/issues).


Contact
=======
If you have any ideas, feedback, requests or bug reports, you can reach me at github@intersel.org, 
or via my website: http://www.intersel.fr
