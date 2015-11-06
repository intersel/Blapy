# Blapy
Blapy is a jQuery plugin that helps you to create and manage an ajax web application without coding any javascript to do it.

The web application is built the usual way of generating web pages like with php or any standard CMS and Blapy will transform it into a dynamic web application with ajaxified contents and without coding any javascript.

So, it may help you to transform your "normal" web site in a web application too, creating easily ajax/rest calls without the hassle of changing the way you develop websites.

# Who may need it?
Everyone using a CMS that generates web pages from a server and would like to transform his website to a client application-like website, ie that does not reload each page during the user navigation but only the needed blocks within the page.

Everyone who would like to keep the way he builds websites but would like to have it behaves like a web application.

The ones who gave up with AngularJS and other javascript frameworks to build web app... like me ;-)

# Why should I use that?!
The concept of a web application getting data through REST Api with a client application that is doing the job of connecting the whole to build an application is quite a difficult job with a steep learning curve... 
Whereas PHP websites built on a standard CMS are easier to handle... The standard CMS does the page generation job quite naturally for years... Except that we reload pages when clicking a link... or we need to do ajax calls to dynamically update part of the pages...

So, the idea is to provide a simple environment that don't change your habits when creating your website without having the hassle of creating ajax calls:

* no difficult framework to understand how to build a web application
* no REST or Ajax url end points to develop. Of course, you can do that if you like to do your application that way ;-)
* building the pages don't change from the "static" usual way of doing a website, meaning you can continue to use your standard LAMP and CMS environement
* configuration is simple and quite natural: it uses html5 "data" attributes to be configured and there is quite nothing to do from an existing website :-)
* the history of browsing is kept
* completly compliant with any existing html/js code

# Have a look on the "Hello World" demo
[Go and see the demo: http://www.intersel.net/demos/intersel/Blapy/demos/helloworld/](http://www.intersel.net/demos/intersel/Blapy/demos/helloworld/)

# How does it work?

The main simple idea is to automatically and dynamically bind and update html blocks in ajax during the web navigation from page to page. 

Rules defined on the html blocks with data attributes will specify how the blocks should be updated with their new dynamic contents.

let's have a first html file test1.html with some blocks with special attributes we will see later on...

```html
<body id="myBlapy">
  <h1>I'm test1.html file</h1>
  <ul>
  	<li><a href="test1.html" data-blapy-link="true">Hello World!</a></li>
  	<li><a href="test2.html" data-blapy-link="true">How is it going?</a></li>
  </ul>
  <div id="mainContainer" data-blapy-container="true" data-blapy-container-name="mainContainer" data-blapy-container-content="helloWorld">
  	Hello World
  </div>
</body>
```

**Let's imagine now that you would like that the website loads and updates only the "mainContainer" part without updating the whole page when we click on the test2.html link...**

You surely know that you would need to call a URL in ajax, get the new content from the server and update the container with jQuery html function... 
Perhaps meet some problem with the browser history when going back... etc... etc...

With Blapy, just create a second test2.html file as usual: it will be quite the same than test1.html (let's imagine the files are php generated...) with a new content in the "mainContainer" part :

```html
<body id="myBlapy">
  <h1>I am test2.html file</h1>
  <ul>
  	<li><a href="test1.html" data-blapy-link="true">Hello World!</a></li>
  	<li><a href="test2.html" data-blapy-link="true">How is it going?</a></li>
  </ul>
  <div data-blapy-container="true" data-blapy-container-name="mainContainer" data-blapy-container-content="Howisitgoing?">
	  How is it going?
  </div>
</body>
```

These two html files will load and behave normally if you load them and click the links.
 
Well, just add at the end of your files this little script :

```javascript
<script type="text/javascript" src="../Blapy.js"></script>
<script>
	$( document ).ready(function() {
		$('#myBlapy').Blapy();
	});
</script>
```

You will then see that when clicking on the page links, only the 'data-blapy-container' block is changed without reloading the whole page! You can see that as the title has not changed... 

Tada! you've got a **client web application** :-)

# How to configure my pages to become pages of a web application?

## Identify the common blocks between your different pages
* Identify the common blocks (div, p, ... html tags) between your pages. When you use a CMS, these blocks are the same ones than those you identified when building your website.

```html
  <div id="myContainer">
	  How is it going?
  </div>
```

* Tell to Blapy that these blocks are the ones that may be updated from page to page:
 * add a "data-blapy-container" attribute set to true in order to configure this container as a Blapy container
 * give a name identifier to the container with the "data-blapy-container-name" attribute in order to identify this content block as unique. 
 * give a content name to identify each unique page content to be used with the "data-blapy-container-content" attribute.
  
```html
  <div id="myContainer"  data-blapy-container="true" data-blapy-container-name="mainContainer" data-blapy-container-content="Howisitgoing">
	  How is it going?
  </div>
```

You can create as many Blapy containers as you need parts of your page to be updated.

## Identify the links that update contents
* Identify the links pointing to pages that have contents you would like to use to update the content blocks of your current page.

```html
<a href="test1.html">Hello World!</a>
```

* Tell the links that they need to be handled by Blapy by using the "data-blapy-link" attribute.

```html
<a href="test1.html" data-blapy-link="true">Hello World!</a>
```

* Call Blapy jquery script on the body of your page (or any main div in your page)... **The html block should have an "id" attribute**.

```html
<html>
...
<body id="myBlapy">
...
<div id="myContainer"  data-blapy-container="true" data-blapy-container-name="mainContainer" data-blapy-container-content="Howisitgoing">
	  How is it going?
  </div>
...
<script type="text/javascript" src="../Blapy.js"></script>
<script>
	$( document ).ready(function() {
		$('#myBlapy').Blapy();
	});
</script>
</body>
</html>
```

That's it: your blocks will be automatically updated by ajax calls to the other pages according to your configuration.


# General algorithm of Blapy

The general algorithm of Blapy is the following:

* when a link is called (clicked) and if it is a "blapy-link", 
 * get the new content from the clicked page through an ajax call
 * get all the "blapy-container" of the current page
 * for each "blapy-container" of the current page
  * Get the "blapy-container" with the same name ("blapy-container-name") from the new page
  * Compare "blapy-container-content" : is the current "blapy-container-content" different from the new one?
   * if "yes", then change the "blapy-container" with the new one


# .Blapy(options)

Blapy is the jQuery function that starts your web application.

```javascript
$("#<an id>").Blapy(options);
```

## Options
Options is a javascript object. It can take as input the following possible option parameters :

* **debug**: (default:false) if true, then log things in the console
* **LogLevel**: (default:3) log level: 1: error ; 2: warning; 3: notice
* **AlertError**: (default:false) show an alert box on error messages if true
* **pageLoadedFunction**: (default:null) function to call when the page is loaded
* **pageReadyFunction**: (default:null) function to call when the page is ready
* **beforePageLoad**: (default:null) function to call b efore the page load the new content
* **beforeContentChange**: (default:null) function to call when a Blapy bloc will have its content changed
* **afterContentChange**: (default:null) function to call after a Blapy bloc has its content changed
* **afterPageChange**: (default:null) function to call when the page had all its content changed
* **onErrorOnPageChange**: (default:null) function to call when the page got an error during change

## Example: 

```javascript
	$( document ).ready(function() {
		$('#bodyId').Blapy({debug:true,LogLevel:2})
	});
```

## Remarks

**Blapy absolutely needs to be called on an object with an "id" set.**

That means that if you'd like to bind Blapy to the "body", you **have to** set an id on the body element:

```html
<body id="bodyId">
...
</body>
```

**You can have as many separate Blapy blocks as you like.**

```javascript
	$( document ).ready(function() {
		$('#myBlapyApp1,#myBlapyApp2,#myBlapyApp3').Blapy();
	});
```

This way, you will be able to tell which application a Blapy block should update when loaded. 

See "data-blapy-applyon" option on Blapy blocks.

# Blapy Blocks
Blapy blocks are the parts where you would like the content to be updated from external contents downloaded through ajax calls by Blapy.

A Blapy block may be any html element where you have set Blapy attributes that define the behaviour as Blapy blocks.

These attributes are analysed from the external Blapy block in order to know how the updating process should be applied on the current block. 

To define a Blapy Block, you need to use the following attributes:

## Attributes

####data-blapy-container
set to "true", tells that the current html tag is Blapy block.
####data-blapy-container-name
gives the name of the Blapy block. It will identify the block.
####data-blapy-container-content
gives the subject of the content. It will identify the content of the block.
####data-blapy-update
(option, default:'update')
tells how Blapy should update the Blapy block when an external page or content is loaded.

* **update**: if the container-name is found from the external content and its container-content is different from the current page, 
 the Blapy block of the current page is to be replaced by the new one
* **force-update**: if the container-name is found from the external content, the Blapy block of the current page is to be replaced by the new one
* **append**: if the container-name is found from the external content, the external content should be added to the end of the current Blapy block content.
* **prepend**: if the container-name is found from the external content, the external content should be added before the current Blapy block content.
* **replace**: if the container-name is found from the external content, the inner content of the external content should replace the current Blapy block content.
* **remove**:  if the container-name is found from the external content, then the Blapy block is to be removed.

####data-blapy-update-rule
['local'|'external' (default)]
if 'local', will use the data-blapy-update rule defined in the current block, else will use the one defined in the external block. Exception to the default value, a "json" block is always "local".
####data-blapy-applyon
(option, default:'all')
By default, the Blapy blocks loaded by a Blapy link will be tried on all Blapy blocks. 

If defined, the external container will only be applied on the matched Blapy blocks contained in the given application id element.

## Examples

```html
		<div 	data-blapy-container="true" 
				data-blapy-container-name="mainContainerApp3" 
				data-blapy-container-content="aContent2" 
				data-blapy-applyon="myBlapyApp1,myBlapyApp3"
		>
			<h3>a Content</h3>
			This is content...
		</div>
```
```html
		<div 	data-blapy-container="true" 
				data-blapy-container-name="submainContainerApp1" 
				data-blapy-container-content="aSubContent" 
				data-blapy-update="remove"
		>
		</div>
```


# Blapy Links
A Blapy Link is a url link that should be handled by Blapy. 

A Blapy link may be attached to the html "`<a>`" or "`<form>`" tags by specifying a "data-blapy-link" attribute on it.

It may be attached to other kind of tag, then you will have to specify the "data-blapy-href" attribute to explicit the hyperlink. 

**Remarks on blapy links on tags that are not "a" or "form"**
* In this case, Blapy automatically binds a click event on this element in order to simulate an anchor.
* The routing mecanism done with Sammy does not apply on them.

To define a Blapy Link, here are its attributes:

## Attributes

* **data-blapy-link**: tells that the current link has to be handled by Blapy.
 * set to "**true**" (or void), Blapy will "get" the content of the link and will process the blapy blocks matching with the current application content

**Remarks:** if data-blapy-link is set to a form, the "method" configuration (eg. "GET", "POST", "PUT", "DELETE") is used to get the content.

* **data-blapy-href**: if not bound to a "A" or "FORM" tag, it tells the hyperlink to use.

## Examples

```html
<ul>
	<li><a href="content1.php" data-blapy-link="true">Content 1</a></li>
	<li><a href="content2.php" data-blapy-link="true">Content 2</a></li>
</ul
```

# Triggered events
Blapy generates the following events during the Blapy object change processing:

* **Blapy_PageLoaded** - triggered when a page is fully and normally loaded. 
* **Blapy_PageReady** - triggered when the page is ready, after a loading page or a change in the page.
* **Blapy_beforePageLoad** - triggered before a page load its new content.
* **Blapy_beforePageChange** - triggered before a page content will change.
* **Blapy_beforeContentChange** - triggered before a Blapy block content change. 
 * Parameters:
  * the Blapy block 
* **Blapy_afterContentChange** - triggered after a a Blapy block content has changed.
 * Parameters:
  * the Blapy block 
* **Blapy_doCustomChange** - triggered if data-blapy-update='custom', sent to the object that should change its content
 * Parameters:
  * newObject : the new Blapy Block 
* **Blapy_ErrorOnPageChange** - triggered when an error occured during a page content change. 
 * Parameters:
  * anError: the error message

To listen to Blapy events, you may use the jQuery 'on' function as in this example:

```javascript
	$("#myBlapy").on( "Blapy_ErrorOnPageChange", function(event,anError) {
		  alert( anError );
	}); 
```

# Sending events to Blapy

You can activate some features of Blapy by sending events to it with the 'trigger' function of jQuery:

```javascript
$('#< id of the body tag>').trigger(<anEvent>,{aUrl:<aURL to call>,params:<someParameters>)
```

## "loadURL" event

This event allows you to call a URL.

```javascript
$('#<id of the blapy application tag>').trigger('loadUrl',{aUrl:<aURL to call>,params:{action:<anAction>}})
```

### params

* action
 * 'update': update the Blapy blocks from the URL

### Example

```javascript
$('#myBlapy').trigger('loadUrl',{aUrl:"helloworld_2.php",params:{action:'update'}})
```

## "postData" event

```javascript
$('#<id of the blapy application tag>').trigger('postData',{aUrl:<aURL to call>,params:{action:<anAction>},method:<http method>});
```

### params

* action
 * 'update' (default) : update the Blapy blocks from the URL
* method
 * 'post' (default)
 * 'put'
 * 'delete'

### Example

```javascript
$("#myBlapy").trigger('postData',{aUrl:"testForm.php",params:{fname:'couou',lname:'tatat'}})
```


# Blapy parameters sent when calling a URL
When Blapy calls a 'Blapy Link', the following parameters are sent as GET parameters:

* **blapycall**=1 - tells that the call is coming from Blapy
* **blapyaction**=[anAction] -tells the kind of action that will be operated
 * **update**: blocks will be updated
  
Knowing these parameters allow you to optimize the generated html returned by the server to the client, so sending back only the useful html blocks instead of the full html page. 

# Blapy animation plugin functions

It is possible to create its own animation plugin functions.

The prototype of an animation plugin function is :

```javascript
theBlapy.prototype.myAnimationFunction = function (oldContainer,newContainer) {}
```

Have a look in the Blapy_AnimationPlugins.js and add your new functions in it inspired by the existing functions.

# LIBRARY DEPENDENCIES
To work properly, you need to include the following javascript libraries:

* jQuery (>= 1.10) 
 * `<script type="text/javascript" src="extlib/jquery-1.10.2.min.js"></script>`
* [iFSM by intersel](https://github.com/intersel/iFSM/)
 * this library manages finite state machines and needs these libraries:
  * doTimeout by ["Cowboy" Ben Alman](http://benalman.com/projects/jquery-dotimeout-plugin/)
   * this library brings some very usefull feature on the usual javascript setTimeout function like Debouncing, Delays & Polling Loops, Hover Intent...
    * `<script type="text/javascript" src="extlib/jquery.dotimeout.js"></script>`
  * attrchange by Selvakumar Arumugam](http://meetselva.github.io/attrchange/) 
   * a simple jQuery function to bind a listener function to any HTML element on attribute change
    * `<script type="text/javascript" src="extlib/jquery.attrchange.js"></script>`
* [Sammy](http://sammyjs.org/)
 * Sammy is a small framework to make web application providing simple but efficient 'route' services
  * `<script type="text/javascript" src="extlib/sammy/lib/sammy.js"></script>`
* [json2html](http://json2html.com/)
 * json2html is a javascript HTML templating library used to transform JSON objects into HTML using a template.
  * `<script type="text/javascript" src="../../extlib/json2html/json2html.js"></script>`

# FAQ
If you have questions or unsolved problems, you can have a look on the our [FAQs](https://github.com/intersel/Blapy/wiki) 
or leave a message on the [Issue board](https://github.com/intersel/Blapy/issues).

## When a Blapy link is called, does the server need to send a full HTML page with a body and ...
No, you can optimize your code by only sending the useful Blapy blocks. 

## Is it possible to set Blapy blocks in "head" tags?
Yes, but in order to have the Blapy see them, set an id on the html tag and call Blapy on it:

### Example

```html
<html id="myBlapy">
<head>
	<title 	data-blapy-container="true" 
			data-blapy-container-name="Title" 
			data-blapy-container-content="myTitle">This is a title page</title>
	<script>
		$( document ).ready(function() {
			$('#myBlapy').Blapy();
		});
	</script>
</head>
<body>
  <!--  body part -->
</body>
</html>  
```  

## How to define template variables in a template

The syntax follows the one defined by json2html library : ${myVariableName} 

### Example

```
		First name: ${fname}<br>
		Last name: ${lname}<br>
```
	
## How to send several json objects to a json block
You just defined an array the way you would do in javascript with your json objects

```html
	<div id="aForm" 
		data-blapy-container="true" 
		data-blapy-container-name="resultFormJson" 
		data-blapy-container-content="resultFormJson"
		data-blapy-update="json"
	>
	[
	{fname: "Emmanuel",lname: "Durand"},
	{fname: "Maryse",lname: "Dupond"}
	]
	</div>
```

# Contact
If you have any ideas, feedback, requests or bug reports, you can reach me at github@intersel.org, 
or via my website: http://www.intersel.fr
