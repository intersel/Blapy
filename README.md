# UPIApplication
UPIApplication is a jQuery plugin that helps you to create and manage an ajax web application.

The web application is build from the usual way of generating web pages like with php or a standard CMS.

So, it may help you to transform your "normal" web site in a web application too, creating easily ajax/rest calls without the hassle of changing the way you develop websites.

#Who may need it?
Everyone using a CMS that generates web pages from a server and would like to transform his website to a client application-like website, ie that does not reload each page during the user navigation but only the needed block within the page.

Everyone who would like to keep the way he builds websites but would like to have it behaves like a web application.

The ones who gave up with AngularJS and other javascript frameworks to build web app... like me ;-)

#Why should I use that?!
The concept of a web application getting data through REST Api with a client application that is doing the job of connecting the whole to build an application is generally a difficult job whereas PHP websites built on a standard CMS are easy to handle and do this job quite naturally...

Except that we reload pages when clicking a link... or we need to do ajax calls to update part of our pages...

So, the idea is to provide a simple environment that don't change your habits when creating your website without having the hassle of creating ajax calls:
* no complicated framework to understand to build your application
* no REST or Ajax url end points to develop
* building the pages don't change from the old normal way
* configuration is really simple and quite natural: it uses html5 "data" attributes to be configured and there is quite nothing to do from an existing website :-)
* the history of browsing is kept

#Have a look on the "Hello World" demo
[Go and see the demo: http://www.intersel.net/demos/intersel/UPIApplication/demos/helloworld/](http://www.intersel.net/demos/intersel/UPIApplication/demos/helloworld/)

#How does it work?

let's have a first html file test1.html with some blocks with special attributes we will see later on...
```html
<body id="myUPIApplication">
  <h1>I'm test1.html file</h1>
  <ul>
  	<li><a href="test1.html" data-upi-link="true">Hello World!</a></li>
  	<li><a href="test2.html" data-upi-link="true">How is it going?</a></li>
  </ul>
  <div id="mainContainer" data-upi-container="true" data-upi-container-name="mainContainer" data-upi-container-content="helloWorld">
  	Hello World
  </div>
</body>
```
**Let's imagine now that you would like that the website loads and updates only the "mainContainer" part without updating the whole page when we click on the test2.html link...**

You know that you would need to call a URL in ajax, get the new content from the server and update the container with jQuery html function... 
Perhaps meet some problem with the browser history when going back... etc... etc...

With UPI Application, just create your second test2.html file as usual: it will be quite the same than test1.html (let's imagine the files are php generated...) with a new content in the "mainContainer" part :
```html
<body id="myUPIApplication">
  <h1>I am test2.html file</h1>
  <ul>
  	<li><a href="test1.html" data-upi-link="true">Hello World!</a></li>
  	<li><a href="test2.html" data-upi-link="true">How is it going?</a></li>
  </ul>
  <div data-upi-container="true" data-upi-container-name="mainContainer" data-upi-container-content="Howisitgoing?">
	  How is it going?
  </div>
</body>
```

These two html files will load and behave normally if you load them and click the links.
 
Well, just add at the end of your files this little script :

```javascript
<script type="text/javascript" src="../UPIApplication.js"></script>
<script>
	$( document ).ready(function() {
		$('#myUPIApplication').UPIApplication();
	});
</script>
```

You will then see that when clicking on the page links, only the 'data-upi-container' block is changed without reloading the whole page! You can see that as the title has not changed... 

Tada! you've got a **client web application** :-)

#How to configure my pages to become pages of a web application?

##Identify the common blocks between your different pages
* Identify the common blocks (div, p, ... html tags) between your pages. When you use a CMS, these blocks are the same one you identified when building your website.
```html
  <div id="myContainer">
	  How is it going?
  </div>
```
* Tell to UPIApplication that these blocks are the one that may be updated from page to page :
  * add a "data-upi-container" attribute set to true in order to configure this container as a UPIApplication container, container name that will be shared with multiple pages
  * give a name identifier to the container with the "data-upi-container-name" attribute in order to identify this content as unique. Each page that has a unique content to be used to update block content should have a unique name identifier here.
```html
  <div id="myContainer"  data-upi-container="true" data-upi-container-name="mainContainer" data-upi-container-content="Howisitgoing">
	  How is it going?
  </div>
```

You can create as many UPI containers as you need parts of your page to be updated.

##Identify the links that update contents
* Identify the links pointing to pages that have contents you could use to update some content blocks of your current page.
```html
<a href="test1.html">Hello World!</a>
```
* Tell the links that they need to be handled by UPIApplication using the "data-upi-link" attribute.
```html
<a href="test1.html" data-upi-link="true">Hello World!</a>
```
* Call UPIApplication script attaching it to the body of your page... The body tag should have an "id" attribute and jQuery should be called on this object.
```html
<html>
...
<body id="myUPIApplication">
...
<div id="myContainer"  data-upi-container="true" data-upi-container-name="mainContainer" data-upi-container-content="Howisitgoing">
	  How is it going?
  </div>
...
<script type="text/javascript" src="../UPIApplication.js"></script>
<script>
	$( document ).ready(function() {
		$('#myUPIApplication').UPIApplication();
	});
</script>
</body>
</html>
```

That's it: your blocks will be automatically updated by ajax calls to the other pages according to your configuration.



#General algorithm of UPI Application

The general algorithm of UPI Application is the following:
* when a link is called (clicked) and it is "upi-link", 
  * get the new content from the clicked page through an ajax call
  * get all the "upi-container" of the current page
  * for each "upi-container" of the current page
    * Get the "upi-container" with the same name ("upi-container-name") from the new page
    * Compare "upi-container-content : is the "upi-container-content" different between the current one and the new one?
      * if "yes", then change the "upi-container" with the new one


#.UPIApplication(options)

UPIApplication is the jQuery function that starts your web application.	
```
$("#<an id of the body tag>").UPIApplication(options);
```

##Options
Options is a javascript object. It can take as input the following possible option parameters :
* **debug**: (default:false) if true, then log things in the console
* **LogLevel**: (default:3) log level: 1: error ; 2: warning; 3: notice
* **AlertError**: (default:false) show an alert box on error messages if true
* **pageLoadedFunction**: (default:null) function to call when the page is loaded
* **pageReadyFunction**: (default:null) function to call when the page is ready
* **beforePageChange**: (default:null) function to call when the page will have its content changed
* **afterPageChange**: (default:null) function to call when the page had its content changed
* **onErrorOnPageChange**: (default:null) function to call when the page got an error during change

##Example: 
```
$('#bodyId').UPIApplication({debug:true,LogLevel:2})
```

#Triggered events
UPIApplication generates the following events:
* **UPIApplication_PageLoaded** - triggered when a page is fully and normally loaded. 
* **UPIApplication_PageReady** - triggered when the page is ready, after a loading page or a change in the page.
* **UPIApplication_beforePageChange** - triggered before a page content will change 
* **UPIApplication_afterPageChange** - triggered after a page content has changed
* **UPIApplication_ErrorOnPageChange** - triggered when an error occured during a page content change. 
  * Parameters:
    * anError: the error message

To listen to UPI events, you may use the jQuery 'on' function as in this example:
```
$("#myUPIApplication").on( "UPIApplication_ErrorOnPageChange", function(event,anError) {
			  alert( anError );
			}); 
```

#Sending events to UPI Application

You can activate some features of UPI Application by sending events to it with the 'trigger' function of jQuery:
```
$('#< id of the body tag>').trigger(<anEvent>,{aUrl:<aURL to call>,params:<someParameters>)
```

##loadURL
This event allows you to call a URL.

```
$('#< id of the body tag>').trigger('loadUrl',{aUrl:<aURL to call>,params:{action:<anAction>}})
```
###params
* action
  * 'update': update the UPI blocks from the URL
###Example
```
$('#myUPIApplication').trigger('loadUrl',{aUrl:"helloworld_2.php",params:{action:'update'}})
```

#UPI parameters sent when calling a URL
When UPI Application calls a 'UPI Link', the following parameters are sent as GET parameters:
* upicall=1 - tells that the call is coming from UPI Application
* upiaction=<anAction> -tells the kind of action that will be operated
  * update: blocks will be updated
  
Knowing these parameters allow you to optimize the generated html returned by the server to the client, so sending back only the useful html blocks instead of the full html page. 

#LIBRARY DEPENDENCIES
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

#FAQ
If you have questions or unsolved problems, you can have a look on the our [FAQs](https://github.com/intersel/UPIApplication/wiki) 
or leave a message on the [Issue board](https://github.com/intersel/UPIApplication/issues).

##When a UPI link is called, do the server need to send a full HTML page with a body and ...
No, you can optimize your code by only sending the useful UPI blocks. 

#Contact
If you have any ideas, feedback, requests or bug reports, you can reach me at github@intersel.org, 
or via my website: http://www.intersel.fr
