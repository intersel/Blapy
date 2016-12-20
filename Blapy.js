/**
 * -----------------------------------------------------------------------------------------
 * INTERSEL - 4 cité d'Hauteville - 75010 PARIS
 * RCS PARIS 488 379 660 - NAF 721Z
 *
 * File : Blapy.js
 * Blapy : jQuery plugin that helps you to create and manage ajax and single page web applications (SPA) with almost no javascript coding to do it. 
 *
 * -----------------------------------------------------------------------------------------
 * Modifications :
 * - 2016/12/20 - E.Podvin - V1.5.3 - fix https://github.com/intersel/Blapy/issues/4 - form should return the value of button/input of submit type 
 * - 2016/08/01 - E.Podvin - V1.5.2 - fix on blapy objects embedded on other blapy objects 
 * - 2016/07/31 - E.Podvin - V1.5.1 - fix on blapy objects embedded on other blapy objects 
 * - 2016/07/31 - E.Podvin - V1.5.0 - 
 * 		- add data-blapy-template-header and data-blapy-template-footer in json templating
 * 		- fix on the scope of a blapy links now limited to their blapy object
 * 		- for blapy objects embeded in an blapy object, we can now specify the correct blapy object that applies on a blapy links if needed (if not, will react for all blapy objects)  
 * - 2016/06/06 - E.Podvin - V1.4.3 - fix on setBlapyUpdateOnDisplay and blapy blocks to appear
 * - 2016/04/26 - E.Podvin - V1.4.2 - fix on json file when returned as a string by .ajax (+fix on iFsm) 
 * - 2016/04/26 - E.Podvin - V1.4.1 - fix on multiple initialization (+fix on iFsm) 
 * - 2016/04/18 - E.Podvin - V1.4.0 - add pure json answer to define blapy blocks
 * - 2016/04/06 - E.Podvin - V1.3.2 - add scripting within json block template with the "<blapyScriptJs>" tag 
 * - 2016/04/01 - E.Podvin - V1.3.1 - fix on json blocks embedded in json block 
 * - 2016/03/07 - E.Podvin - V1.3.0 - add block init update when it becomes visible, after a scroll or resize (data-blapy-updateblock-ondisplay option). 
 * - 2016/02/26 - E.Podvin - V1.2.0 - add block regular updates 
 * - 2016/02/17 - E.Podvin - V1.1.1 - fix when 'postData' is sent to Blapy while we're not in a "pageReady" state
 * - 2016/01/20 - E.Podvin - V1.1.0 - add block update feature from a standard json feed
 * - 2015/12/22 - E.Podvin - V1.0.19 - fix on default return for sammy when no blapy route is defined (return now true)
 * - 2015/11/09 - E.Podvin - V1.0.18 - fix on routing to 404 error with sammy
 * - 2015/11/09 - E.Podvin - V1.0.17 - fix on routing with sammy
 * - 2015/11/08 - E.Podvin - V1.0.16 - Add possibility to not use Sammy (sammy may be unplugged so no routing management) 
 * - 2015/11/05 - E.Podvin - V1.0.15 - small fixes...
 * - 2015/11/04 - E.Podvin - V1.0.14 - fix on posted data
 * - 2015/11/03 - E.Podvin - V1.0.13 - remove the # duplication of the url
 * - 2015/11/03 - E.Podvin - V1.0.12 - fix on the initial URL loosing the querystring part
 * - 2015/09/25 - E.Podvin - V1.0.11 - fix on json updates
 * - 2015/09/21 - E.Podvin - V1.0.10 - fix on the initialization of json container whose template is defined by an external file
 * - 2015/08/29 - E.Podvin - V1.0.7 - add post data capabilities
 * - 2015/08/07 - E.Podvin - V1.0.6 - add event Blapy_doCustomChange
 * - 2015/08/05 - E.Podvin - V1.0.5 - fix on a double pageready event sent
 * - 2015/08/04 - E.Podvin - V1.0.4 - fix on relative URL
 * - 2015/08/02 - E.Podvin - V1.0.3 - append/prepend features on Blapy blocks
 * - 2015/07/31 - E.Podvin - V1.0.1 - general fixes
 * - 2015/07/25 - E.Podvin - V1.0.0 - Creation
 * 
 * -----------------------------------------------------------------------------------------
 *
 * @copyright Intersel 2015-2016
 * @fileoverview : Blapy is a jQuery plugin that helps you to create and manage an ajax web application.
 * @see {@link https://github.com/intersel/Blapy}
 * @author : Emmanuel Podvin - emmanuel.podvin@intersel.fr
 * @version : 1.5.2
 * -----------------------------------------------------------------------------------------
 */

/**
 * How to use it :
 * ===============
 *
 * see README.md content or consult it on https://github.com/intersel/Blapy
 */

(function($) {
 
	/**
	* 
	**/	
	var theBlapy = window.theBlapy = function (anObject, options)
	{
		
		var $defaults = {
				debug				: true, //if true, then log things in the console
				LogLevel			: 1,	 // log level: 1: error ; 2: warning; 3: notice
				alertError			: false,
				//function Hooks
				pageLoadedFunction	: null,
				pageReadyFunction	: null,
				beforePageLoad		: null,
				beforeContentChange	: null, //param: the Blapy block whose content will change
				afterContentChange	: null, //param: the Blapy block whose content has changed
				afterPageChange		: null,
				doCustomChange		: null,
				onErrorOnPageChange	: null,
				theBlapy			: this,
				activeSammy			: false,
				
		};

		// on charge les options passées en paramètre
		if (options == undefined) options=null;
		this.opts = jQuery.extend( {}, $defaults, options || {});

		/**
		 * @param myUIObject		- Target object of the FSM
		 */
		this.myUIObject	= anObject;
		this.myUIObjectID = anObject.attr('id');
		if (!this.myUIObjectID) alert('no defined Id on the given jQuery object... Blapy can\'t work properly :-(');
		
		//intervals of time set to update blapy blocks
		this.intervalsSet = new Array(); 
		
	};

	/**
	 * InitApplication - init the Blapy
	 * public method
	 */
	theBlapy.prototype.InitApplication	= function() 
	{
		this._log('InitApplication');
		
		var myBlapy = this;

		if (this.opts.activeSammy)
		{
			//Standard Routing definition
			if (typeof Sammy != 'function') {
				alert("Sammy is not loaded... can not continue");
				return false;
			}
			
			var app = Sammy('#'+this.myUIObjectID);
			
			app.get(/(.*)\#blapylink/, function() 
			{
				//filter the action to be processed only on the defined active blapy object for the link
                if ( ($(this.target).attr("data-blapy-active-blapyid")) && ($(this.target).attr("data-blapy-active-blapyid") != myBlapy.myUIObjectID) )
                        return;

                this.params['embeddingBlockId'] = myBlapy.extractembeddingBlockIdName(myBlapy.hashURL());
				
				myBlapy.myUIObject.trigger('loadUrl',{aUrl:myBlapy.hashURL(),params:myBlapy.filterAttributes(this.params),aObjectId:myBlapy.myUIObjectID});
			});
			app.post(/(.*)\#blapylink/, function() 
			{
				//filter the action to be processed only on the defined active blapy object for the link
                if ( ($(this.target).attr("data-blapy-active-blapyid")) && ($(this.target).attr("data-blapy-active-blapyid") != myBlapy.myUIObjectID) )
                        return;

				this.params['embeddingBlockId'] = myBlapy.extractembeddingBlockIdName(myBlapy.hashURL(this.path));

				myBlapy.myUIObject.trigger('postData',{aUrl:myBlapy.hashURL(this.path),params:myBlapy.filterAttributes(this.params),aObjectId:myBlapy.myUIObjectID,method:"post"});
			});
			app.put(/(.*)\#blapylink/, function() 
			{
				//filter the action to be processed only on the defined active blapy object for the link
                if ( ($(this.target).attr("data-blapy-active-blapyid")) && ($(this.target).attr("data-blapy-active-blapyid") != myBlapy.myUIObjectID) )
                        return;
				this.params['embeddingBlockId'] = myBlapy.extractembeddingBlockIdName(myBlapy.hashURL(this.path));
				myBlapy.myUIObject.trigger('postData',{aUrl:myBlapy.hashURL(this.path),params:myBlapy.filterAttributes(this.params),aObjectId:myBlapy.myUIObjectID,method:"put"});
			});
			
			app.notFound = function(verb, path){
				//just do nothing! means that the called link is not handle by Blapy (no route for Sammy)...
				return true;
			};

			this.myUIObject.iFSM(manageBlapy,this.opts);
			app.run();
		}
		else
		{
			this.myUIObject.iFSM(manageBlapy,this.opts);
			$(document).on("click","#"+myBlapy.myUIObjectID+" a[data-blapy-link]", function(event) {
				//if requested, filter the action to be processed only to the defined active blapy object for the link
                if ( ($(event.target).attr("data-blapy-active-blapyid")) && ($(event.target).attr("data-blapy-active-blapyid") != myBlapy.myUIObjectID) )
                        return;
				
                event.preventDefault();
				myBlapy.myUIObject.trigger('loadUrl',{aUrl:myBlapy.hashURL($(this).attr('href')),params:{embeddingBlockId:$(this).attr('data-blapy-embedding-blockid')},aObjectId:myBlapy.myUIObjectID});
			});
			$(document).on("submit","#"+myBlapy.myUIObjectID+" form[data-blapy-link]", function(event) {
				//if requested, filter the action to be processed only to the defined active blapy object for the link
                if ( ($(event.target).attr("data-blapy-active-blapyid")) && ($(event.target).attr("data-blapy-active-blapyid") != myBlapy.myUIObjectID) )
                        return;

                event.preventDefault();
				 // get all the inputs into an array.
			    var $inputs = $(this).serializeArray();

			    // not sure if you wanted this, but I thought I'd add it.
			    // get an associative array of the values in the form.
			    var values = {};
			    $.each($inputs,function() {
			        values[this.name] = this.value;
			    });
			    //add the submit input info that is not given by the serializeArray
			    if (event.originalEvent)
			    {
				    aSubmitInput = $(event.originalEvent.currentTarget.activeElement);
				    if (aSubmitInput)
				    {
					    values[aSubmitInput.attr('name')] = aSubmitInput.attr('value'); 
				    }
			    }

			    values['embeddingBlockId']=$(this).attr('data-blapy-embedding-blockid');

				myBlapy.myUIObject.trigger('postData',{
						aUrl:myBlapy.hashURL($(this).attr("action")),
						params:values,
						aObjectId:myBlapy.myUIObjectID,method:$(this).attr("method")
				});
			});
		}

	};//
	
	/**
	 * this._log - log function
	 * private function
	 * @param message - message to log
	 * @param error_level (default : 3) 	
	 * 			- 1 : it's an error
	 * 			- 2 : it's a warning
	 * 			- 3 : it's a notice
	 * 
	 */
	theBlapy.prototype._log = function (message) {
		/*global console:true */

		if (!this.opts.debug) return;
		if ( (arguments.length > 1) && (arguments[1] > this.opts.LogLevel) ) return; //on ne continue que si le nv de message est <= LogLevel
		if ( (arguments.length <= 1) && (3 > this.opts.LogLevel) ) return;// pas de niveau de msg défini => niveau notice (3)
		
		if (window.console && console.log)
		{
			console.log('[fsm] ' + message);
			if ( (arguments[1] == 1) && this.opts.alertError) alert(message);
		}
		
	};//end Log

	
	
	/**
	* 
	* returns the target block name of the URL if any
	*/
	theBlapy.prototype.extractembeddingBlockIdName = function (aBlapyUrl)
	{
		regexHashBlapyBlock = /#blapylink#.*/igm;
		extractEB = regexHashBlapyBlock.exec(aBlapyUrl);
		if (extractEB && extractEB.length) 
		{
			extractEB = extractEB[0].replace('#blapylink#','');
		}
		else extractEB='';
		return extractEB;
	};
	
	/**
	* embeds a html source with a blapy block definition of aBlapyBlockIdName
	* returns the embedded html source
	*/
	theBlapy.prototype.embedHtmlPage = function (aHtmlSource,aBlapyBlockIdName)
	{
		htmlBlapyBlock = this.myUIObject.find('#'+aBlapyBlockIdName);
		aHtmlSource = $(htmlBlapyBlock[0].outerHTML).html(aHtmlSource);
		aHtmlSource.attr('data-blapy-container-content',aHtmlSource.attr('data-blapy-container-content')+'-'+$.now()) ;
		aHtmlSource.attr('id','');//remove id in order that it takes the one of the block to change
		return aHtmlSource[0].outerHTML;
	};
	
	/**
	* create a blapy block from a pure json definition
	* returns the html source of the blapy block
	* 
	* aJsonObject : array of blapy objects described with the attributes of a blapy block
	* 				the essential attributes are blapy-container-name, blapy-container-content
	* 				the attribute "blapy-data" gives the new data of the block
	*/
	theBlapy.prototype.createBlapyBlock = function (aJsonObject)
	{
		this._log('createBlapyBlock');
		
		htmlBlapyBlock = $('<div/>', {
			"data-blapy-container":true,
			"data-blapy-container-name":aJsonObject["blapy-container-name"],
			"data-blapy-container-content":aJsonObject["blapy-container-content"],
			"data-blapy-update":aJsonObject["blapy-update"],
			"data-blapy-update":"json"
		}).html(JSON.stringify(aJsonObject['blapy-data']));
		return htmlBlapyBlock;
	};

	/**
	* get the hash part of the URL
	* returns 0 if none
	*/
	theBlapy.prototype.hashURL = function (aURL)
	{
		this._log('hashURL');
		if (!aURL) aURL = window.location.href;
		return aURL || 0;
	};

	//creation function of Blapy that embeds jQuery 
	$.fn.Blapy = function(options) {
		if (!this.length) alert("The jquery selector '"+this.selector+"' is void!?\n\n Can\'t start Blapy...\n\n :-(");
		return this.each(function() {
			var Blapy = new theBlapy($(this), options);
			Blapy.InitApplication();	//start it
		});
	};
	
	/**
	 * filter to get only usefull attributes
	 * on a Sammy Object
	 * returns an object without any function or object
	 * 
	 */
	theBlapy.prototype.filterAttributes = function (aSammyObject)
	{
		//var sammyKeys=aSammyObject.keys();
		var mySammyObject= aSammyObject;
		var returnObject={};
		$.each(aSammyObject.keys(),
				function(key,value) {
						if ( (typeof mySammyObject[value] != 'function') && (typeof mySammyObject[value] != 'object') )
						{
							//console.log(value+" "+mySammyObject[value]+(typeof mySammyObject[value]));
							returnObject[value] = mySammyObject[value];
							//alert(localO);console.log(localO);
						};
				});
		return returnObject;
	};
	
	/**
	* set # tag in the Blapy Url
	* returns 0 if none
	*/
	theBlapy.prototype.setBlapyUrl = function ()
	{
		this._log('setBlapyUrl');
		
		var myBlapy = this;

		//change href on blapy-link within the blapy object
		$('#'+myBlapy.myUIObjectID+' [data-blapy-link]').each(function() {
			
			var aHref;
			
			//in case a blapy object is within another blapy object, we need to tell which active blapy object to listen... 
			if ( ($(this).attr("data-blapy-active-blapyId")) && ($(this).attr("data-blapy-active-blapyId") != myBlapy.myUIObjectID) )
				return;
			
			if ($(this)[0].tagName == 'A')
				aHref = $(this).attr("href");
			else if ($(this)[0].tagName == 'FORM')
				aHref = $(this).attr("action");
			else 
				aHref = $(this).attr("data-blapy-href");
				
			if (!aHref) return;//not valid... for now
			
			
			if (aHref.indexOf('#blapylink') == -1) {
				aHref+='#blapylink';
				
				if ($(this).attr('data-blapy-embedding-blockid')) aHref+='#'+$(this).attr('data-blapy-embedding-blockid');
				
				if ($(this)[0].tagName == 'A')
					$(this).attr("href",aHref);
				else if ($(this)[0].tagName == 'FORM')
					$(this).attr("action",aHref);
				else 
				{
					if( 	(aHref.charAt(0) != '/')
						&& 	(aHref.substring(0,4) != "http")
					  )
					{
						var aBaseHref=$('base').attr('href');
						if (aBaseHref)
							aHref = aBaseHref+aHref;
						else
							aHref = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1)+aHref;
					}
					
					$(this).attr("data-blapy-href",aHref);
					$(this).click(function() {
						myBlapy.myUIObject.trigger('loadUrl',{aUrl:aHref,params:'',aObjectId:myBlapy.myUIObjectID});
					});
				}
			} 

		});
	};

	/**
	* prepare update block calls on interval time
	* 
	*/
	theBlapy.prototype.setBlapyUpdateIntervals = function ()
	{
		this._log('setBlapyUpdateIntervals');
		
		var myBlapy 		= this;
		var intervalSetId 	= 0;
		
		//clear all intervals set
		for (i = 0; i < myBlapy.intervalsSet.length; i++) {
			clearInterval(myBlapy.intervalsSet[i]);
		}
		
		//for any template block
		$('#'+myBlapy.myUIObjectID+' [data-blapy-updateblock-time]').each(function() {
			var myContainer = $(this);
			var aUpdateBlockTime = myContainer.attr("data-blapy-updateblock-time");
			var aUpdateBlockHrefURL = myContainer.attr("data-blapy-href");
			if (aUpdateBlockTime)
			{
				myBlapy.intervalsSet[intervalSetId] = setInterval(function(){
					$('#'+myBlapy.myUIObjectID).trigger('loadUrl',{aUrl:aUpdateBlockHrefURL});
				}, aUpdateBlockTime);
				
				intervalSetId++;
			}
		});
	}

	/**
	* prepare update block calls when the block becomes visible
	* 
	*/
	theBlapy.prototype.setBlapyUpdateOnDisplay = function ()
	{
		this._log('setBlapyUpdateOnDisplay');
		
		if (!window.jQuery.prototype.appear)
		{
			this._log('setBlapyUpdateOnDisplay: jquery.appear.js is not loaded...');
			if ($('[data-blapy-updateblock-ondisplay]').length > 0)
				alert('Blapy: jquery.appear.js is not loaded. Need it to process data-blapy-updateblock-ondisplay option');
			return;
		}
		
		var myBlapy 		= this;
		
		$(document.body).off('appear');
		$('[data-blapy-updateblock-ondisplay]').appear();
		$(document.body).on('appear','[data-blapy-updateblock-ondisplay]', function(event, $all_appeared_elements) {
			if ($(this).attr("data-blapy-href") && !$(this).attr("data-blapy-appear")) myBlapy.myUIObject.trigger('loadUrl',{aUrl: $(this).attr("data-blapy-href")});
			$(this).attr("data-blapy-appear",'done');
		});
		$.force_appear();
		
	}

	/**
	 * prepare a json container
	 */
	theBlapy.prototype.setBlapyContainerJsonTemplate = function (myContainer,myBlapy)
	{
		this._log('setBlapyContainerJsonTemplate');
			
		//if block is declared json, then we take local update rule (json)
		myContainer.attr('data-blapy-update-rule','local');
		
		//Search for a template container already defined within the blapy container
		var htmlTpl = myContainer.find('[data-blapy-container-tpl]');// if still processed, a block data-blapy-container-tpl will be inside
		if (htmlTpl.length == 0)// ok so not processed, so let's do it
		{
			var htmlTplContent = myContainer.html();
			
			htmlTplContent = htmlTplContent.replace(/blapyScriptJS/gi, 'script');
			
			//if no template defined within the block
			if (htmlTplContent.replace(/\s{2,}/g, ' ').replace(/\t/g, ' ').toString().trim().replace(/(\r\n|\n|\r)/g,"") == "")
			{
				//look for partial template file
				var tplFile = myContainer.attr("data-blapy-template-file");
				if (tplFile)
				{
					$.get(tplFile, function(htmlTplContent) {
						//store the template in comment in a hidden div
						//needs to be in a comment, if not, template content is filtered by the DOM if the template content not compliant within a div
						myContainer.prepend('<div style="display:none" data-blapy-container-tpl="true"><!--'+htmlTplContent+'--></div>');
						var aInitURL = myContainer.attr("data-blapy-template-init");
						if (aInitURL)
							$('#'+myBlapy.myUIObjectID).trigger('loadUrl',{aUrl:aInitURL});
					});
				}
				else // no defined template...?
				{
					var aInitURL = myContainer.attr("data-blapy-template-init");
					if (aInitURL)
						$('#'+myBlapy.myUIObjectID).trigger('loadUrl',{aUrl:aInitURL});
				}
			}
			else //template is defined in the block
			{
				myContainer.html('<div style="display:none" data-blapy-container-tpl="true"><!--'+htmlTplContent+'--></div>');
				var aInitURL = myContainer.attr("data-blapy-template-init");
				if (aInitURL)
					$('#'+myBlapy.myUIObjectID).trigger('loadUrl',{aUrl:aInitURL});
				
			}
		}
	};
	
	
	/**
	* prepare json templates
	* 
	* json templates are stored in a hidden div with a "data-blapy-container-tpl" attribute set
	*/
	theBlapy.prototype.setBlapyJsonTemplates = function ()
	{
		this._log('setBlapyJsonTemplates');
		
		var myBlapy = this;

		//for any json template block
		$('[data-blapy-update="json"]').each(function() {
			var myContainer = $(this);
			
			myBlapy.setBlapyContainerJsonTemplate(myContainer,myBlapy);
		});
	};

	/* var & function definitions */	
	var manageBlapy = {
        PageLoaded: 
        {
             enterState:
            {
                init_function: function(){
                	//process interval updates
                	this.opts.theBlapy.setBlapyUpdateIntervals();
                	
                	if (this.opts.pageLoadedFunction) this.opts.pageLoadedFunction();
					this.myUIObject.trigger('Blapy_PageLoaded');
				},
                next_state: 'PageReady',
           },
           loadUrl:   //no load URL at first load of the page (generated by sammy)
            {
                 next_state: 'PageReady',
            },
         }, 
        PageReady: 
        {
            enterState:   
            {
                init_function: function(){
                	// set #tag to the Blapy url
                	this.opts.theBlapy.setBlapyUrl();
                	// process json blocks
                	this.opts.theBlapy.setBlapyJsonTemplates();

                	//init blapy block that should be initialized on display
                	this.opts.theBlapy.setBlapyUpdateOnDisplay();

                	//alert that blapy page is ready
                	if (this.opts.pageReadyFunction) this.opts.pageReadyFunction();
					this.myUIObject.trigger('Blapy_PageReady');
				},
            },
            loadUrl:   
            {
                init_function: function(p,e,data){
					if (this.opts.beforePageLoad) this.opts.beforePageLoad(data);
					this.myUIObject.trigger('Blapy_beforePageLoad',data);
				},
                out_function: function(p,e,data){
					var aFSM 		= this;
					var aUrl		= data.aUrl;
					var aObjectId	= data.aObjectId?data.aObjectId:e.currentTarget.id;
					var params		= data.params;
					if (!params) params = {action:'update'};
					else if (!params.action) params['action'] = 'update';
					
					var aembeddingBlockId = params.embeddingBlockId;
					
					jQuery.ajax({
						  type: 'GET', 
						  url: aUrl, 
						  crossDomain:true,
						  data: "blapycall=1&blapyaction="+params.action+"&blapyobjectid="+aObjectId,
						  success: function(data, textStatus, jqXHR) {
							  if(aembeddingBlockId) data=aFSM.opts.theBlapy.embedHtmlPage(data,aembeddingBlockId);
							  aFSM.trigger('pageLoaded',{htmlPage:data,params:params});
						  },
						  error: function(jqXHR, textStatus, errorThrown) {
							aFSM.trigger('errorOnLoadingPage',aUrl+': '+errorThrown);
						  }
						});
				},
                next_state: 'ProcessPageChange'

            },
            postData:   
            {
                init_function: function(p,e,data){
					if (this.opts.beforePageLoad) this.opts.beforePageLoad(data);
					this.myUIObject.trigger('Blapy_beforePageLoad',data);
				},
                out_function: function(p,e,data){
					var aFSM 		= this;
					var aUrl		= data.aUrl;
					var aObjectId	= data.aObjectId?data.aObjectId:e.currentTarget.id;
					var params		= data.params;
					if (!params) params = {action:'update'};
					else if (!params.action) params['action'] = 'update';
					
					var aembeddingBlockId = params.embeddingBlockId;
					
					var method		= data.method;
					if(!method) method = 'post';
					
					params = jQuery.extend( params, {blapycall:"1",blapyaction:params.action,blapyobjectid:aObjectId});
					
					jQuery.ajax({
						  type: method, 
						  url: aUrl, 
						  data: params,
						  success: function(data, textStatus, jqXHR) {
							  if(aembeddingBlockId) data=aFSM.opts.theBlapy.embedHtmlPage(data,aembeddingBlockId);
							  aFSM.trigger('pageLoaded',{htmlPage:data,params:params});
						  },
						  error: function(jqXHR, textStatus, errorThrown) {
							aFSM.trigger('errorOnLoadingPage',aUrl+': '+errorThrown);
						  }
						});
				},
                next_state: 'ProcessPageChange'

            }
        },
        ProcessPageChange: 
        {
            enterState:   
            {
            },
            pageLoaded:   
            {
                init_function: function(p,e,data){
					var pageContent	= data.htmlPage;
					var params 		= data.params;
					var aObjectId	= this.myUIObject.attr('id');
					var myFSM		= this;
					var tmpPC		= null;
					
					//transform any json text in json object
					//todo: optimize the json data processing as we eval it then stringify it (createBlapyBlock) then reeval... :(
					try
					{
						tmpPC=eval(pageContent);
						pageContent=tmpPC;
					}
					catch(e)
					{
						//not json input... but html...
						//myFSM._log('downloaded content can not be evaluated by eval: '+pageContent,1);
					}
					
					//if the received pageContent is pure json then build the equivalent in blapy block
					if (pageContent instanceof Array) 
					{
						var newContent=$("");
						var tmpRes="";
						for (i = 0; i < pageContent.length; i++) {
							tmpRes = this.opts.theBlapy.createBlapyBlock(pageContent[i]);
							newContent = newContent.add(tmpRes); 
						};
						pageContent = newContent;
					}
					
					switch(params['action'])
					{
						case 'update': 
						default:
							
							this.myUIObject.find('[data-blapy-container]').each(function(){
								
								var myContainer = $(this);
								if (!params['force-update']) params['force-update']=0; 
								var containerName = myContainer.attr('data-blapy-container-name');
								
								try
								{

									//get the Blapy Container named <containerName>
									var aBlapyContainer=jQuery(pageContent)
													.filter('[data-blapy-container-name="'+containerName+'"]')
													.add(jQuery(pageContent)
															.find('[data-blapy-container-name="'+containerName+'"]')
													).first();
								}
								catch(e)
								{
									myFSM._log('downloaded content can not be evaluated by jQuery, so perhaps it is json data: '+pageContent+' - '+containerName,1);
									return;
								}
								
								//container not found
								if (!aBlapyContainer || aBlapyContainer.length == 0) 
								{
									return;
								}
								else if (aBlapyContainer.attr('data-blapy-applyon') != undefined)
								{
									//if the container specifies the accepted applications and we're not processing the correct one (aObjectId), then exit
									var aListOfApplications = aBlapyContainer.attr('data-blapy-applyon').split(","); 
									if ( (aListOfApplications.length > 0)
											&& ($.inArray(aObjectId,aListOfApplications) == -1)
										) return;

								}
								
								//update the id with the current container id, if none given in the new container
								if (!aBlapyContainer.attr('id')) aBlapyContainer.attr('id',myContainer.attr('id'));
								
								//alert that the content of the block will change
								if (myFSM.opts.beforeContentChange) myFSM.opts.beforeContentChange(myContainer);
								myContainer.trigger('Blapy_beforeContentChange',this.myUIObject);
								
								var dataBlapyUpdate = aBlapyContainer.attr('data-blapy-update');
								var dataBlapyUpdateRuleIsLocal = false;
								if (
											(myContainer.attr('data-blapy-update-rule') == 'local')
										|| 	(
													(dataBlapyUpdate == 'json')
												&& 	(myContainer.attr('data-blapy-update') != 'json')
											)
									)
								{
									dataBlapyUpdate = myContainer.attr('data-blapy-update');
									dataBlapyUpdateRuleIsLocal = true;
								}
								
								//standard update
								if (	!dataBlapyUpdate
										 ||	(dataBlapyUpdate== 'update')
										)
								{
									if ( 	aBlapyContainer.attr('data-blapy-container-content') != myContainer.attr('data-blapy-container-content')
										||  ( params['force-update'] == 1 ) 
										)
									{
										if (dataBlapyUpdateRuleIsLocal)
										{
											myContainer.html(aBlapyContainer.html());//replace content with the new one
										}
										else
										{
											myContainer.replaceWith(aBlapyContainer[0].outerHTML);//replace content with the new one
										}
										myContainer=aBlapyContainer;
									}	
								}
								//append update
								else if (dataBlapyUpdate== 'force-update')
								{
									if (dataBlapyUpdateRuleIsLocal)
									{
										myContainer.html(aBlapyContainer.html());//replace content with the new one
									}
									else
									{
										myContainer.replaceWith(aBlapyContainer[0].outerHTML);//replace content with the new one
									}
									myContainer=aBlapyContainer;
								}
								//append update
								else if (dataBlapyUpdate== 'append')
								{
									aBlapyContainer.prepend(myContainer.html());//we prepend the old content to the new one (~to append the new one to the old one ;-))
									if (dataBlapyUpdateRuleIsLocal)
									{
										myContainer.html(aBlapyContainer.html());//replace content with the new one
									}
									else
									{
										myContainer.replaceWith(aBlapyContainer[0].outerHTML);//replace content with the new one
									}
									myContainer=aBlapyContainer;
								}
								//prepend update
								else if (dataBlapyUpdate== 'prepend')
								{
									aBlapyContainer.append(myContainer.html());
									if (dataBlapyUpdateRuleIsLocal)
									{
										myContainer.html(aBlapyContainer.html());//replace content with the new one
									}
									else
									{
										myContainer.replaceWith(aBlapyContainer[0].outerHTML);//replace content with the new one
									}
									myContainer=aBlapyContainer;
								}
								//replace update
								else if (dataBlapyUpdate== 'replace')
								{
									myContainer.replaceWith(aBlapyContainer.html());//replace content with the new inner one
									myContainer=aBlapyContainer;
								}
								//custom update
								else if (dataBlapyUpdate== 'custom')
								{
									if ( 	aBlapyContainer.attr('data-blapy-container-content') != myContainer.attr('data-blapy-container-content')
											||  ( params['force-update'] == 1 ) 
										)
									{
										if (myFSM.opts.doCustomChange) myFSM.opts.doCustomChange(myContainer,aBlapyContainer);
										myContainer.trigger('Blapy_doCustomChange',aBlapyContainer);
									}
								}
								//remove update
								else if (dataBlapyUpdate== 'remove')
								{
									var myContainerParent = myContainer.parent();
									myContainer.replaceWith('');//replace content with the new one
									myContainer=myContainerParent;
								}
								//json update
								else if (dataBlapyUpdate== 'json')
								{
									//get json data and remove return chars (for the eval)
									var jsonData = aBlapyContainer.html().replace(/(\r\n|\n|\r)/g,"");
									
									var htmlTpl = myContainer.find('[data-blapy-container-tpl]');
									if (htmlTpl.length == 0)
									{
										htmlTplContent = myContainer.html();
										htmlTpl = myContainer.prepend('<div style="display:none" data-blapy-container-tpl="true"><!--'+htmlTplContent+'--></div>');
									}
									else
									{
										htmlTplContent=htmlTpl.html();
										//delete comment tag
										htmlTplContent=htmlTplContent.substr(4,htmlTplContent.length-3-4);
									}
									
									try
									{
										eval("jsonData="+jsonData);
									}
									catch(e)
									{
										myFSM._log('downloaded content can not be evaluated, so is not json data: '+jsonData,1);
										return;
									}
									
									//get the rendering
									var newHtml = '';
									if (htmlTplContent.length < 3)
										//no defined template?
										newHtml = JSON.stringify(jsonData);
									else
									{
										newHtml = json2html.transform(jsonData,  {'tag':"void",'html':htmlTplContent} );
										
										//as json2html needs a root tag to render... well, we set void to delete it after rendering...
										newHtml = newHtml.replace(/<.?void>/g,"");
									}
									
									if ($(myContainer.attr('data-blapy-template-header')).length > 0)
									{
										newHtml = $(myContainer).attr('data-blapy-template-header')+newHtml;
									}
									if ($(myContainer.attr('data-blapy-template-footer')).length > 0)
									{
										newHtml = newHtml+$(myContainer).attr('data-blapy-template-footer');
									}

									//Wrap content if needed
									if ($(myContainer.attr('data-blapy-template-wrap')).length > 0)
									{
										newHtml = $(myContainer.attr('data-blapy-template-wrap')).html(newHtml)[0];
										newHtml = newHtml.outerHTML;
									}

									myContainer.html(htmlTpl[0].outerHTML + newHtml);//replace content with the new one
									var myBlapy = myFSM.opts.theBlapy;
									myContainer.find('[data-blapy-update="json"]').each(function() {
										var mySubContainer = $(this);
										
										myBlapy.setBlapyContainerJsonTemplate(mySubContainer,myBlapy);
									});									

									myContainer=aBlapyContainer;
									
								}
								else
								{
									var pluginUpdateFunction = eval("myFSM.opts.theBlapy."+aBlapyContainer.attr('data-blapy-update'));
									
									if (pluginUpdateFunction)
									{
										if ( 	aBlapyContainer.attr('data-blapy-container-content') != myContainer.attr('data-blapy-container-content')
												||  ( params['force-update'] == 1 ) 
												||  aBlapyContainer.attr('data-blapy-container-force-update') == "true" 
											)
										{
											pluginUpdateFunction(myContainer,aBlapyContainer);
										}
										
									}
									else myFSM._log(aBlapyContainer.attr('data-blapy-update')+' does not exist',1);
								
								}

			                	//process interval updates
								myFSM.opts.theBlapy.setBlapyUpdateIntervals();

			                	if (myFSM.opts.afterContentChange) myFSM.opts.afterContentChange(myContainer);
								//try to send to the new object the alert
								if (myContainer.attr('id'))
									$('#'+myContainer.attr('id')).trigger('Blapy_afterContentChange',myContainer);

							});//end of each
							break;
					};//switch
				},
                out_function: function(p,e,data){
					if (this.opts.afterPageChange) this.opts.afterPageChange();
					this.myUIObject.trigger('Blapy_afterPageChange',data);
				},
                next_state: 'PageReady',
            },
            errorOnLoadingPage:   
            {
                init_function: function(p,e,data){
					if (this.opts.onErrorOnPageChange) this.opts.onErrorOnPageChange(data);
					this.myUIObject.trigger('Blapy_ErrorOnPageChange',[data]);
				},
                next_state: 'PageReady',
            },
            postData:'loadUrl',
	        loadUrl:   //someone try to load an URL but page is not ready... try it later... 
	        {
	        	how_process_event: {delay:20,preventcancel:true},
	        	propagate_event:true,
	        },
        },
        DefaultState:
        {
            start:
            {
                next_state: 'PageLoaded',
            },
        },
	};
})(jQuery);
