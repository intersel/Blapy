# Blapy


> If you like Blapy, I'll be pleased that you star it :-)


Blapy is a jQuery plugin that helps you to create and manage ajax and single page web applications (SPA) with almost no javascript coding to do it.

Your web application is built the usual way of generating web pages like with php or any standard CMS and Blapy will transform it into a dynamic web application with ajaxified contents.

So, it may help you to transform your "normal" web site in a web application without the hassle of changing the way you develop websites.

Blapy will speed up your page load too as it won't load all the internet files every page change but only the requested new contents.

Blapy is json compliant too and eases the integration of ajax/rest API with templating and routing services very simple to use... Blapy will be the "V-iew" in an MVC application approach...

The best of all is that your web application will be fully SEO compliant as Blapy uses normal URLs to do the routing and your html rendering output from your server to update your application blocks!

# Have a look on the "Hello World" demo and other demos
[Go and see the demo: http://www.intersel.net/demos/intersel/Blapy/demos/helloworld/](http://www.intersel.net/demos/intersel/Blapy/demos/helloworld/)

You can have a look on a more complete example based on the [SB Admin 2 - Free Bootstrap Admin Theme](http://www.intersel.net/demos/intersel/Blapy/demos/startbootstrap-sb-admin-2/pages/) (you can see the original one [here](http://startbootstrap.com/template-overviews/sb-admin-2/))

or test the ["To do list" web Apps demo](http://www.intersel.net/demos/intersel/Blapy/demos/todomvc/) made with Blapy and inspired from [TodoMVC](http://todomvc.com/)

[This one allows to dynamically load and display blapy block contents](http://intersel.net/demos/intersel/Blapy/demos/bootstrap-four-column-gallery/) that were hidden and which need to be displayed as they became visible.

All the demos found in the demos directory can be tested there : [http://www.intersel.net/demos/intersel/Blapy/demos/](http://www.intersel.net/demos/intersel/Blapy/demos/)

We invite you to have a deep look in the code source of the demos as they use quite every possible features and configurations available in Blapy as they are used to test the library.

# How to install

As it is a simple jQuery plugin... copy all the provided Blapy directories somewhere in your project, then include the needed javascript libraries in your code then call the Blapy function... and you're done...

As an "Hello world" example:

```html
<!DOCTYPE html>
<!-- To run the current sample code in your own environment, copy this to an html page. -->
<html>
<head>
  <!-- load of the external libraries needed by Blapy (provided in the package) -->
  <script type="text/javascript" src="<myrootdir>/extlib/jquery-3.3.1.min.js"></script>
  <script type="text/javascript" src="<myrootdir>/extlib/sammy/lib/sammy.js"></script>
  <script type="text/javascript" src="<myrootdir>/extlib/iFSM/extlib/jquery.dotimeout.js"	></script>
  <script type="text/javascript" src="<myrootdir>/extlib/iFSM/extlib/jquery.attrchange.js"></script>
  <script type="text/javascript" src="<myrootdir>/extlib/json2html/json2html.js"></script>  
  <script type="text/javascript" src="<myrootdir>/extlib/iFSM/iFSM.js"></script>
  <!-- load of the Blapy script -->
  <script type="text/javascript" src="<myrootdir>/Blapy.js"></script>
</head>
<!-- start Blapy -->
<body id="myBlapy">
  <div  id="mainContainer"
        data-blapy-container="true"
        data-blapy-container-name="mainContainer"
        data-blapy-container-content="helloWorld Test1">
  	Hello World...
  </div>
  <script>
  	$( document ).ready(function() {
  		$('#myBlapy').Blapy();
  	});
  </script>
</body>
</html>
```

Table of Contents
=================

  * [Blapy](#blapy)
  * [Have a look on the "Hello World" demo and other demos](#have-a-look-on-the-hello-world-demo-and-other-demos)
  * [Who may need it?](#who-may-need-it)
  * [Why would I use that?!](#why-would-i-use-that)
  * [How does it work?](#how-does-it-work)
  * [How to configure my pages to become pages of a web application?](#how-to-configure-my-pages-to-become-pages-of-a-web-application)
  * [General algorithm of Blapy](#general-algorithm-of-blapy)
  * [.Blapy(options)](#blapyoptions)
  * [Blapy Blocks](#blapy-blocks)
  * [Blapy Links](#blapy-links)
  * [Triggered events](#triggered-events)
    * [Blapy_PageLoaded](#blapy_pageloaded)
    * [Blapy_PageReady](#blapy_pageready)
    * [Blapy_beforePageLoad](#blapy_beforepageload)
    * [Blapy_beforeContentChange](#blapy_beforecontentchange)
    * [Blapy_afterContentChange](#blapy_aftercontentchange)
    * [Blapy_doCustomChange](#blapy_docustomchange)
    * [Blapy_ErrorOnPageChange](#blapy_erroronpagechange)
  * [Sending events to Blapy](#sending-events-to-blapy)
    * ["loadURL" event](#loadurl-event)
    * ["postData" event](#postdata-event)
    * ["updateBlock" event](#updateblock-event)
  * [Blapy parameters sent when calling a URL](#blapy-parameters-sent-when-calling-a-url)
  * [Blapy animation plugin functions](#blapy-animation-plugin-functions)
  * [LIBRARY DEPENDENCIES](#library-dependencies)
  * [FAQ](#faq)
    * [When a Blapy link is called, does the server need to send a full HTML page with a body and ...](#when-a-blapy-link-is-called-does-the-server-need-to-send-a-full-html-page-with-a-body-and-)
    * [Is it possible to set Blapy blocks in "head" tags?](#is-it-possible-to-set-blapy-blocks-in-head-tags)
    * [How to define template variables in a blapy template for json blocks](#how-to-define-template-variables-in-a-blapy-template-for-json-blocks)
    * [How to set conditional output in a json template](#how-to-set-conditional-output-in-a-json-template)
    * [How to send several json objects to a json block](#how-to-send-several-json-objects-to-a-json-block)
    * [How to send "pure" json as response to a query ?](#how-to-send-pure-json-as-response-to-a-query-)
    * [How to initialize the blapy blocks after loading the page?](#how-to-initialize-the-blapy-blocks-after-loading-the-page)
    * [How to update a blapy block at a regular period ?](#how-to-update-a-blapy-block-at-a-regular-period-)
    * [What about the id sent in the returned blapy blocks...](#what-about-the-id-sent-in-the-returned-blapy-blocks)
  * [Problem resolutions](#problem-resolutions)
    * [My blapy block does not update from my external content...](#my-blapy-block-does-not-update-from-my-external-content)
    * [Clicking to a blapy link generates several ajax calls though it should generate only a unique call...](#clicking-to-a-blapy-link-generates-several-ajax-calls-though-it-should-generate-only-a-unique-call)
    * [When routing is activated with Sammy, My URL does not work any more...](#when-routing-is-activated-with-sammy-my-url-does-not-work-any-more)
  * [Contact](#contact)


# Who may need it?
Everyone using a CMS that generates web pages from a server and would like to transform his website to a client application-like website, ie that does not reload each page during the user navigation but only the needed blocks within the page.

Everyone who...
* would like to keep the way he builds websites but would like to have it behaves like an ajax web application.
* gave up with AngularJS and other javascript frameworks to build web app... like me ;-)
* wants to integrate json REST API with a simple approach without coding...
* is starting with Javascript...
* does not want to learn a Nth new framework to do websites...
* wants to keep the application SEO compliant with google...

And, as I just discovered it recently, for those who are using [pjax](https://github.com/defunkt/jquery-pjax), Blapy may be a good alternative too... You'll tell me!

# Why would I use that?!
The concept of a web application getting data through REST Api with a client application that is doing the job of connecting the whole to build an application is quite a difficult job with a steep learning curve...

Whereas PHP -or whatever web server languages- websites built on a standard CMS are easier to handle... Any standard CMS does the page rendering job quite naturally for years... Except that it reloads pages when clicking a link... or it needs to develop ajax calls to dynamically update parts of the page...

So, the idea is to provide a simple environment that don't change your habits when creating your website without having the hassle of creating ajax calls.

The benefits of using Blapy?

* no difficult framework to understand how to build a web application
* no REST or Ajax url end points to develop. Of course, you can do that if you like to have your application that way ;-)
* no change in your habit to develop website: building the pages with Blapy don't change from the "static" usual way of doing a website, meaning you can continue to use your standard LAMP and CMS environement
* configuration is simple and quite natural: it uses html5 "data" attributes to configure the Blapy configuration and there is quite nothing to do from an existing website :-)
* the ajax things are done behind the scene with no js lines of code to implement them
* the history of browsing is kept as any smart framework
* completly compliant with any existing html/js code
* SEO compliant as the server keeps the control on the application behaviour on the loaded pages and blocks, and so it is able to deliver correct contents to search engines as google.

# How does it work?

The main simple idea behind Blapy is to automatically and dynamically bind and update html blocks in ajax during the web navigation from page to page.

Simple ;-) but powerful...

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
<!-- load of the external libraries needed by Blapy (provided in the package) -->
<script type="text/javascript" src="extlib/jquery-3.3.1.min.js"				></script>
<script type="text/javascript" src="extlib/sammy/lib/sammy.js"				></script>
<script type="text/javascript" src="extlib/iFSM/extlib/jquery.dotimeout.js"	></script>
<script type="text/javascript" src="extlib/iFSM/extlib/jquery.attrchange.js"></script>
<script type="text/javascript" src="extlib/iFSM/iFSM.js"					></script>
<!-- load of the Blapy script -->
<script type="text/javascript" src="Blapy.js"></script>
<!-- start Blapy -->
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
* **LogLevel**: (default:1) log level: 1: error ; 2: warning; 3: notice
* **AlertError**: (default:false) show an alert box on error messages if true
* **activeSammy**: (default:false) if set to true, will use Sammy for URL routing
* **pageLoadedFunction**: (default:null) function to call when the page is loaded
* **pageReadyFunction**: (default:null) function to call when the page is ready
* **beforePageLoad**: (default:null) function to call before the page load the new content
* **beforeContentChange**: (default:null) function to call when a Blapy bloc will have its content changed
* **afterContentChange**: (default:null) function to call after a Blapy bloc has its content changed
* **afterPageChange**: (default:null) function to call when the page had all its content changed
* **onErrorOnPageChange**: (default:null) function to call when the page got an error during change

## Example:

```javascript
	$( document ).ready(function() {
		$('#bodyId').Blapy({activeSammy:true,debug:true,LogLevel:2})
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

* **data-blapy-container**: set to "true", tells that the current html tag is Blapy block.
* **data-blapy-container-name**: gives the name of the Blapy block. It will identify the block.
* **data-blapy-container-content**: gives the subject of the content. It will identify the content of the block.
* **data-blapy-update** (option, default:'update'): tells how Blapy should update the Blapy block when an external page or content is loaded.
  * **update**: if the container-name is found from the external content and its container-content is different from the current page,
 the Blapy block of the current page is to be replaced by the new one
  * **force-update**: if the container-name is found from the external content, the Blapy block of the current page is to be replaced by the new one
  * **append**: if the container-name is found from the external content, the external content should be added to the end of the current Blapy block content.
  * **prepend**: if the container-name is found from the external content, the external content should be added before the current Blapy block content.
  * **replace**: if the container-name is found from the external content, the inner content of the external content should replace the current Blapy block content.
  * **json**: the content of the current container is considered to be a template.
 If the container-name is found, then it is considered that the external content is a json object or an array of json objects.
 These json objects will be applied on the template. Theses parameters allows the json configuration:
      * **data-blapy-template-file**: defines a template file name where to get the template if the container is empty
      * **data-blapy-template-wrap**: once the json data are rendered, it is possible to wrap the result by giving the wrap html tag (ex: "```<table>```")
      * **data-blapy-template-header**: once the json data are rendered, it is possible to set a header(ex: "```<tr><th>header</th></tr>```")
      * **data-blapy-template-footer**: once the json data are rendered, it is possible to set a footer(ex: "```<tr><th>footer</th></tr>```")
      * **data-blapy-template-init**: a file name that contains a json data blapy block to use to initialize the block
  * **remove**:  if the container-name is found from the external content, then the Blapy block is to be removed.
  * **custom**:  if the container-name is found from the external content, then we call the custom change 'doCustomChange' if defined
 and send the Blapy_doCustomChange event.
  * **[an animation plugin function name]**: if the container-name is found from the external content,
 function to call and apply to do the content change.
 The available plugin functions may be found in the Blapy_AnimationPlugins.js file.
* **data-blapy-update-rule**: ['local'|'external' (default)], if 'local', will use the data-blapy-update rule defined in the current block, else will use the one defined in the external block. Exception to the default value, a "json" block is always "local".
* **data-blapy-applyon** (option, default:'all'): By default, the Blapy blocks loaded by a Blapy link will be tried on all Blapy blocks.
If defined, the external container will only be applied on the matched Blapy blocks contained in the given application id element.
* **data-blapy-href** (option): a URL to call on **data-blapy-updateblock-time** (if set) or on **data-blapy-updateblock-ondisplay**
* **data-blapy-updateblock-time** (option): a time in milliseconds when the URL set in 'data-blapy-href' should be called to update the block.
* **data-blapy-updateblock-ondisplay** (option): if set to true, will update the block from **data-blapy-href** when the element is visible (after a scroll).


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

* **data-blapy-embedding-blockid**: tells to embed the return source of the link in a blapy block of the given name. Usefull for return sources that are not 'blapy' formatted and that address a specific block...
* **data-blapy-active-blapyId**: useful in the case the link is embedded in several different blapy objects, it gives the correct blapy object for the link. If not set, the link will be processed by all the blapy objects that contain the link.

## Examples

```html
<ul>
	<li><a href="content1.php" data-blapy-link="true">Content 1</a></li>
	<li data-blapy-link="true" data-blapy-href="content2.php">Content 2</a></li>
	<li><a href="jsoncontent3.php" data-blapy-link="true" data-blapy-embedding-blockid="mainContainerApp3">Content 3</a></li>
</ul
```

# Triggered events
Blapy generates the specific events during the Blapy object change processing.

Some events are sent to the DOM element on which you create the jquery blapy object, some apply on the blapy block where occurs the processing.

## Blapy_PageLoaded
Triggered when a page is fully and normally loaded and sent to the **blapy object**.

## Blapy_PageReady
Triggered when the page is ready, after a loading page or a change in the page, and sent to the **blapy object**.

## Blapy_beforePageLoad
Triggered before a page loads its new content and sent to the **blapy object**.
* Parameters: the Blapy json data sent to the URL
  * [data].aUrl: url to call
  * [data].params: json of the parameters to send to aUrl

## Blapy_afterPageChange
Triggered after a page loaded its new content and sent to the **blapy object**.
* Parameters: the Blapy json data sent to the URL
  * [data].aUrl: url to call
  * [data].params: json of the parameters to send to aUrl


## Blapy_beforeContentChange
Triggered before a Blapy block content change and sent to the **blapy Block** that will change.
* Parameters:
  * the Blapy block

## Blapy_afterContentChange
Triggered after a a Blapy block content has changed and sent to the **blapy Block** that has changed..
* Parameters:
  * the Blapy block

## Blapy_doCustomChange
Triggered if data-blapy-update='custom', sent to the object that should change its content
* Parameters:
  * newObject : the new Blapy Block

## Blapy_ErrorOnPageChange
Triggered when an error occured during a page content change.
* Parameters:
  * anError: the error message

## Examples
To listen to Blapy events, you may use the jQuery 'on' function as in this example:

```javascript
	$("#myBlapy").on( "Blapy_ErrorOnPageChange", function(event,anError) {
		  alert( anError );
	});
	$("#myBlapy").on( "Blapy_beforePageLoad", function(event,anError) {
		  alert( 'call before loading new blocks...' );
	});
	//assure that the event will be received by the new DOM object #mainContainer if it has been replaced by Blapy
	$(document).on( "Blapy_afterContentChange","#mainContainer", function(event,aBlock) {
			  alert( 'Blapy_afterContentChange');
			});
```

# Sending events to Blapy

You can activate some features of Blapy by sending events to it with the 'trigger' function of jQuery:

```javascript
$('#<id of the blapy application tag>').trigger(<anEvent>,{aUrl:<aURL to call>,params:<someParameters>)
```

## "loadURL" event

This event allows you to call a URL.

```javascript
$('#<id of the blapy application tag>').trigger('loadUrl',{aUrl:<aURL to call>,params:{action:<anAction>,embeddingBlockId:<a Blapy Block Id>}})
```

### params

* **action** (optional)
  * **'update'** (default): update the Blapy blocks from the URL
* **embeddingBlockId** (optional): a block container id

### Example

```javascript
$('#myBlapy').trigger('loadUrl',{aUrl:"helloworld_2.php",params:{action:'update'}})
```

## "postData" event

```javascript
$('#<id of the blapy application tag>').trigger('postData',{aUrl:<aURL to call>,params:{action:<anAction>},method:<http method>});
```

### params

* **action** (option)
  * **'update'** (default) : update the Blapy blocks from the URL
* **method** (option)
  * 'post' (default)
  * 'put'
  * 'delete'
* **embeddingBlockId** (optional): a block container id
* any property/value to send to the server

### Example

```javascript
$("#myBlapy").trigger('postData',{aUrl:"testForm.php",params:{fname:'Emmanuel',lname:'Podvin'}})
```

## "updateBlock" event

This event allows you to call Blapy to directly update a Blapy block.

```javascript
$('#<id of the blapy application tag>').trigger('updateBlock',{html:<a blapy content>,params:{action:<anAction>,embeddingBlockId:<a Blapy Block Id>}})
```

### params

* **html**
  * any blapy content (blapy blocks, json string or objects, ...)
* **params**:
  * **action** (optional)
    * **'update'** (default): update the Blapy blocks from the URL
  * **embeddingBlockId** (optional): a block container id

### Example

```javascript
$('#myBlapy').trigger('updateBlock',{html:"[{name:"John Doe"}]",params:{action:'update',embeddingBlockId:'myBlapyBlock'}})
```


# Blapy parameters sent when calling a URL
When Blapy calls a 'Blapy Link', the following parameters are sent as GET parameters:

* **blapycall**=1 - tells that the call is coming from Blapy
* **blapyaction**=[anAction] -tells the kind of action that will be operated
  * **update**: blocks will be updated

Knowing these parameters allow you to optimize the generated html returned by the server to the client, so sending back only the useful html blocks instead of the full html page.

# Blapy animation plugin functions

It is possible to create its own animation plugin functions on Blapy blocks when they are loaded.

It is also a way to hook features on the content that will be placed in a Blapy block...

The prototype of an animation plugin function is :

```javascript
theBlapy.prototype.myAnimationFunction = function (oldContainer,newContainer) {}
```

Have a look in the Blapy_AnimationPlugins.js and add your new functions in it inspired by the existing functions.

# LIBRARY DEPENDENCIES
To work properly, you need to include the following javascript libraries:

* jQuery (>= 1.10)
  * `<script type="text/javascript" src="extlib/jquery-3.3.1.min.js"></script>`
* [iFSM by intersel](https://github.com/intersel/iFSM/)
  * this library manages finite state machines and needs these libraries:
    * **doTimeout** by ["Cowboy" Ben Alman](http://benalman.com/projects/jquery-dotimeout-plugin/)
    * this library brings some very usefull feature on the usual javascript setTimeout function like Debouncing, Delays & Polling Loops, Hover Intent...
    * `<script type="text/javascript" src="extlib/jquery.dotimeout.js"></script>`
  * **attrchange** by [Selvakumar Arumugam](http://meetselva.github.io/attrchange/)
    * a simple jQuery function to bind a listener function to any HTML element on attribute change
    * `<script type="text/javascript" src="extlib/jquery.attrchange.js"></script>`
* [json2html](http://json2html.com/) (optional if blapy block does not use json feature)
  * json2html is a javascript HTML templating library used to transform JSON objects into HTML using a template.
  * used for json parsing and templating
    * `<script type="text/javascript" src="../../extlib/json2html/json2html.js"></script>`
* [Sammy](http://sammyjs.org/) (optional if you don't need routing management)
  * Sammy is a small framework to make web application providing simple but efficient 'route' services
  * `<script type="text/javascript" src="extlib/sammy/lib/sammy.js"></script>`
* [jquery.appear] (http://morr.github.io/appear.html) (optional if you don't need to init blocks when they become visible after a scroll)
  * `<script type="text/javascript" src="extlib/jquery.appear/jquery.appear.js"></script>`

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

## How to define template variables in a blapy template for json blocks

The syntax follows the one defined by [json2html library](http://json2html.com/) : ${myVariableName}

### Example

```
		First name: ${fname}<br>
		Last name: ${lname}<br>
```

## How to set a json template driven by Blapy...
Let's say we would like to create a dynamic table as the following example:

```html
<section id="tableExample">
  <table>
    <tr><td>John</td><td>Doe</td></tr>
    <tr><td>Bob</td><td>Dylan</td></tr>
    ....
  </table>
</section>
```

First step is to define the blapy block:
```html
<section id="tableExample"
      data-blapy-container="true"
			data-blapy-container-name="results"
			data-blapy-container-content="void"
			data-blapy-update="json"
			data-blapy-template-wrap="<table>"
			data-blapy-template-init="arrayvalues.data.php"
>
  <tr><td>${firstname}</td><td>${lastname}</td></tr>
</section>
```
Some explanations on the defined attributes:
  - _data-blapy-update="json"_: the blapy block is filled with json data. So the content in the block is the template to apply on the json data. The template may be given by an external file with the property "data-blapy-template-file".
  - _data-blapy-template-wrap="```<table>```"_: the template is wrapped with a 'table' tag
  - _data-blapy-template-init="arrayvalues.data.php"_: the values to init our block are to be found in this file

The returned content of the "data-blapy-template-init" file should contain the addressed blapy block definition ("data-blapy-container-name") with a json struture with the data to display, and so should be something like the following example:

```html
<section id="tableExample"
	data-blapy-container="true"
	data-blapy-container-name="results"
	data-blapy-container-content="initContent"
>
[
{firstname: "John",lastname: "Doe"},
{firstname: "Bob",lastname: "Dylan"},
...
]
</section>
```

Of course, this content may be dynamically generated by the server side.

Once you start blapy like with "('#tableExample').Blapy();", blapy will automatically read the json content of the "data-blapy-template-init" file and will apply its content to the html template.

The resulting content will be like the example to produced...


## How to set conditional output in a json template

Instead of having a HTML template, you can set a javascript that will be interprated to generate the DOM.

The javascript should be inserted with the specific tag **"```<blapyScriptJs>```"**.

### Example

This example shows how "```<li>```" statement will be inserted according to the statut of "dontdisplay" variable.

#### Initial blapy definition

Let's define a UL statement that we want be filled with LI statements.

It will be initialized from the "data-blapy-template-init" variable with the content returned by myInitFile.php file. It could have been initialized with a "loadUrl" or "postData" calls.

```
<ul id="MenuExampleWithInitializedWithJSScript"
    data-blapy-container="true"
	data-blapy-container-name="MenuExampleWithInitializedWithJSScript"
	data-blapy-container-content="MenuExampleVoid"
	data-blapy-update="json"
	data-blapy-template-init="myInitFile.php"
>
     <blapyScriptJS>
        	if (!"${dontdisplay}")
            	jQuery('#MenuExampleWithInitializedWithJSScript').append('<li class="${class}"><a href="${url}">${action}</a></li>');
     </blapyScriptJS>

</ul>
```

Please note that what myIntFile.php returns as data content should have only data initialization for this block.

#### Example of data that could be sent to Blapy by myInitFile.php
```
<ul id="MenuExampleWithInitializedWithJSScript"
	data-blapy-container="true"
	data-blapy-container-name="MenuExampleWithInitializedWithJSScript"
	data-blapy-update="json"
>
	[
		{class: "",url: "#",action:"Action"},
		{class: "",url: "#",action:"Action Not Shown",dontdisplay:'1'},
		{class: "",url: "#",action:"Another action",dontdisplay:'1'},
		{class: "myClass",url: "#",action:"Something else here"},
	]
</ul>
```

or the same description but in full json description:
```
[
	{ 	"blapy-container-name":"MenuExampleWithInitializedWithJSScript",
		"blapy-data":
		[
		{class: "",url: "#",action:"Action"},
		{class: "",url: "#",action:"Action Not Shown",dontdisplay:'1'},
		{class: "",url: "#",action:"Another action",dontdisplay:'1'},
		{class: "myClass",url: "#",action:"Something else here"},
		]
	}
]
```


#### Example result

The result will be processed as:

```
<blapyScriptJS>
        	if (!"")
            	jQuery('#MenuExampleWithInitializedWithJSScript').append('<li class=""><a href="#">Action</a></li>');
</blapyScriptJS>
<blapyScriptJS>
        	if (!"1")
            	jQuery('#MenuExampleWithInitializedWithJSScript').append('<li class=""><a href="#">Action Not Shown</a></li>');
</blapyScriptJS>
<blapyScriptJS>
        	if (!"1")
            	jQuery('#MenuExampleWithInitializedWithJSScript').append('<li class=""><a href="#">Another action</a></li>');
</blapyScriptJS>
<blapyScriptJS>
        	if (!"")
            	jQuery('#MenuExampleWithInitializedWithJSScript').append('<li class="myClass"><a href="#">Something else here</a></li>');
</blapyScriptJS>
```     

and so, giving the following processed DOM:

```     
<ul id="MenuExampleWithInitializedWithJSScript"
	data-blapy-container="true"
	data-blapy-container-name="MenuExampleWithInitializedWithJSScript"
	data-blapy-update="json"
>     
	<li class=""><a href="#">Action</a></li>
	<li class="myClass"><a href="#">Something else here</a></li>
</ul>
```



## How to send several json objects to a json block
You just defined an array the way you would do in javascript with your json objects

```html
	<div  
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

## How to send "pure" json as response to a query ?

By default, when there is a blapy call, you define a blapy block and put your json data inside it and send the result back.

It is possible to return "pure" json to be handled by Blapy.

There are two possible configurations:
* the json content returned has no information on the Blapy blocks that should be updated
* the json content is blapy oriented

### Json has no information about blapy blocks

It applies to content that comes from outside your web application, that are not aware of Blapy ;-)

In order to tell to Blapy on what blapy block this kind of content should update, you need to configure the Blapy link that calls the json content.

Use the "data-blapy-embedding-blockid" parameter and configure it to the name of your Blapy block.

That's it! When the blapy link will call your json content, all your blapy block with the given name will be updated with the json content.

#### Example

**HTML File**

```html
<a href="myJsonDataFile.json"
	data-blapy-link="true"
	data-blapy-embedding-blockid="aBlapyBlockToUpdate"
			>Click here to update my "aBlapyBlockToUpdate" to update
</a>
<div  
		data-blapy-container="true"
		data-blapy-container-name="aBlapyBlockToUpdate"
		data-blapy-update="json"
>
This is ${jsonContent}<br>
The other content is: ${anotherContent}
</div>
```

**myJsonDataFile.json**

```
{"jsonContent":"a content for myJsonDataFile...","anotherContent":"another content for the example"}
```


**Remark:** You can have a look on the "demos/verifyEmails" demo that use this feature.

### The returned Json content is Blapy oriented

It is possible to configure your json content in order to give all the blapy blocks information and the data to transmit to the blapy blocks.

To do so, send an array of objects, each one will describe a blapy block. All the blapy attributes may be given to configure your blapy block. The names are those described in this document without the "data-" at the beginning of the name. For example, "data-blapy-container" will have "blapy-container" as attribute object.

The necessary attributes are:
* **blapy-container-name**: name of the blapy container
* **blapy-container-content**: identifier name of the content
* **blapy-data**: the json data to send to the blapy block

It is expected that that the answer returns an array of blapy objects.

#### Example of a response to a blapy call

The following blapy block definitions are the same:

* usual blapy block
```html
<div
	data-blapy-container-name="fnameOptions"
	data-blapy-container-content="fnameOptionsNew"
>
		[
			{"firstname": "John","lastname": "Doe","selected":"false"},
			{"firstname": "Bob","lastname": "Dylan","selected":"false"},
			{"firstname": "Peter","lastname": "Rabbit","selected":"false"},
		]
</div>
```

* pure json blapy block corresponding to the above example

```javascript
[
	{ 	"blapy-container-name":"fnameOptions",
		"blapy-container-content":"fnameOptionsNew",
		"blapy-data":
		[
			{"firstname": "John","lastname": "Doe","selected":"false"},
			{"firstname": "Bob","lastname": "Dylan","selected":"false"},
			{"firstname": "Peter","lastname": "Rabbit","selected":"false"},
		]
	}
]
```

## How to initialize the blapy blocks after loading the page?

The idea is to directly call the url that will initialize your page by calling one of the Blapy API functions "loadURL" or "postData" just after the Blapy initialization.

Example:
```html
$( document ).ready(function() {
    $('#myBlapy').Blapy();
    $('#myBlapy').trigger('loadUrl',{aUrl:"init_my_page.php"})
});
```

## How to update a blapy block at a regular period ?
You have two attributes for Blapy blocks named "data-blapy-href " and "data-blapy-updateblock-time" that let you configure the URL to call and the period to call it.

This example will update the block every second (1000ms) from index.php:
```html
        <div    data-blapy-container="true"
                        data-blapy-container-name="dateContainer"
                        data-blapy-container-content="aContent_<?php echo uniqid();?>"
                        data-blapy-href = "index.php"
                        data-blapy-updateblock-time = "1000"
                >
                    <b>Time is:</b> <?php echo date('d-M-Y H:i:s');?>
        </div>
```
## How to set a loader when blapy updates a content?

Use the events "Blapy_beforePageLoad" and "Blapy_afterPageChange" in order to active/deactivate your loader, as in the following example:

```html
<script>
	$("#myBlapy").on( "Blapy_beforePageLoad", function(event) {
		$('#loader').show();
	});
	$("#myBlapy").on( "Blapy_afterPageChange", function(event) {
		$('#loader').hide();
	});
</script>
```

## What about the id sent in the returned blapy blocks...
Generally, the new block will replace the old one, and so, the id will follow... and that's mainly ok...

Sometime, if there are several blocks with the same data-blapy-container-name in order to update several blocks with the same info,
it could be a problem that several new blocks get the same id after processing...

You can give **no id** on the new sent blocks, this way the system will set the id of the old block to change to the new one...

#Problem resolutions
## My blapy block does not update from my external content...

* Did you verify that your external block has a different **data-blapy-container-content** content than the current one? If not, the content is not updated as it is considered to be the same... The content of **data-blapy-container-content** may be any name. You can use the current time or a unique id to set the name as in this example:

```html
<div    data-blapy-container="true"
                        data-blapy-container-name="dateContainer"
                        data-blapy-container-content="aContent_<?php echo uniqid();?>"
                >
                    <b>Time is:</b> <?php echo date('d-M-Y H:i:s');?>
        </div>
```

* Maybe, the code of your external block is not a valid HTML code. For instance, if you use tbody as a blapy block, don't set it alone, but embed it within a table tag.

## Clicking to a blapy link generates several ajax calls though it should generate only a unique call...
* Verify your html return of the first ajax call. For instance, ```<img src="" alt="">``` will generate a second ajax call to index.html...

## When routing is activated with Sammy, My URL does not work any more...
* It's generally a problem linked to base URL. YOu can fix it by setting a ```<base>```  html tag in your html head part:

```html
	<base href="/demos/todomvc/" target="_blank">
```
## How to automate that every A / Form tags are "blapy-link"?
Blapy expects that you define the A and Form tags as blapy links if you want them to be handled by blapy.

Hereafter, you can add this little script to automate that every A / Form tags become "blapy-link=true":

```javascript
// every new page load, will assure that every new links will have the "blapy-link" attribute
$(document).on( "Blapy_PageReady","body", function(event,anError) {
		$('#[[+BlapyApplicationId]]').find('a,form').attr('data-blapy-link','true');
		var myBlapy = $('#<You Blapy DOM Object>').getFSM();//get the FSM working behind the scene for blapy
		myBlapy[0].opts.theBlapy.setBlapyUrl(); // call the function that will make blapy handle the url links

});
```

Once in place, every url links will be considered as Blapy Links...

## When my template contains "img" tag with the name file defined by a placeholder, I've got a 404 error
As the file is parsed as HTML, img tag will try to load the image that does not exist as the image name is not the placeholder name.

To fix this, simply wrap your html template with the tag "xmp" which will neutralize html analysis.


# Contact
If you have any ideas, feedback, requests or bug reports, you can reach me at github@intersel.org,
or via my website: http://www.intersel.fr
