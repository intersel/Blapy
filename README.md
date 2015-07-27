# UPIApplication
UPIApplication is a jQuery library that transforms a normal web site in an web application.

#Who could need it?
Everyone using a (php) CMS that generates web pages and would like to transform his website to an application-like website, ie that does not reload each page during the user navigation but only the needed block within the page.

Everyone that would like to keep the way he builds websites but would like to have it behaves like an web application.

#How does it work? the "Hello world" example...

let's have a first html file test1.html 
```html
<body id="myUPIApplication">
  <p>I'm test1.html file</p>
  <ul>
  	<li><a href="test1.html?action=update" data-upi-link="true">Hello World!</a></li>
  	<li><a href="test2.html?action=update" data-upi-link="true">HowDy?</a></li>
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
  	<li><a href="test1.html?action=update" data-upi-link="true">Hello World!</a></li>
  	<li><a href="test2.html?action=update" data-upi-link="true">HowDy?</a></li>
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

.UPIApplication(options)
========================


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
