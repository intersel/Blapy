/**
 * -----------------------------------------------------------------------------------------
 * INTERSEL - 4 cité d'Hauteville - 75010 PARIS
 * RCS PARIS 488 379 660 - NAF 721Z
 *
 * File : Blapy.js
 * Blapy : jQuery plugin that helps you to create and manage ajax and single page web applications (SPA) with almost no javascript coding to do it.
 *
 * -----------------------------------------------------------------------------------------
 * @copyright Intersel 2015-2019
 * @fileoverview : Blapy is a jQuery plugin that helps you to create and manage an ajax web application.
 * @see {@link https://github.com/intersel/Blapy}
 * @author : Emmanuel Podvin - emmanuel.podvin@intersel.fr
 * @version : 1.13.5
 * @license : donationware - see https://github.com/intersel/Blapy/blob/master/LICENSE
 * -----------------------------------------------------------------------------------------
 * Modifications :
 * - 2019/11/26 - E.Podvin - 1.13.5
 *  - different log level between ifsm and blapy
 *  - fix in postData when console log on embeddingBLockId not set (use of aFSM instead of myFSM)
 * - 2019/11/15 - E.Podvin - 1.13.4
 *  - add data-blapy-params property for A tag element to specify data to send to url
 * - 2019/11/14 - E.Podvin - 1.13.3
 *    - use of event.currentTarget instead of event.target
 *    - use of postData for blapy-link on tag A allowing to define "method" attribute
 * - 2019/11/12 -  E.Podvin - 1.13.2
 *   - fixes for compliance with non json blapy blocks after the json dev
 * - 2019/11/01 - E.Podvin - 1.13.1
 *   - alert when htmllBlapyBlock id is not found in embedHtmlPage
 *   - use of log.warn when error/warning
 *   - fix load of img or script by the system in setBlapyContainerJsonTemplate
 * - 2019/10/26 - E.Podvin - 1.13.0
 *  - add nested json blocks by escaping xmp tags that does not accept to be nested :-( see demos/demo_json_nested_blocks/
 *  - fix data-blapy-template-init-purejson to default to 1
 * - 2019/10/24 - E.Podvin - 1.12.2
 *  - add a console report when json template is not html for whatever reason...
 * - 2019/10/22 - E.Podvin - 1.12.1
 *  - remove only external xmp in setBlapyContainerJsonTemplate allowing templates in xmp within templates
 * - 2019/10/22 - E.Podvin - 1.12.0
 *  - add data-blapy-template-mustache-delimiterStart and data-blapy-template-mustache-delimiterEnd to be able to change mustache delimiters when rendering template
 * - 2019/10/19 - E.Podvin - 1.11.1
 *  - set eval of data-blapy-template-init-processdata function out of the catch error test for json validation
 * - 2019/10/19 - E.Podvin - 1.11.0
 *  - add data-blapy-template-init-processdata
 * - 2019/10/18 - E.Podvin - 1.10.4
 *  - remove html comments to test if no template in the block
 * - 2019/10/11 - E.Podvin - 1.10.3
 *  - fix on xmp that did not handle the extended char properly...
 * - 2019/10/07 - E.Podvin - 1.10.2
 *  - fix on xmp to remove in template that could contains data like 'display:none'...
 * - 2019/10/02 - E.Podvin - 1.10.1
 *  - fix on json data that contains html
 * - 2019/09/05 - E.Podvin - 1.10.0
 *  - add data-blapy-template-init-fromproperty and a-blapy-template-init-search options
 * - 2019/09/02 - E.Podvin - 1.9.5
 *  - fix bad blapy fsm to do things when blocks appear
 * - 2019/09/02 - E.Podvin - 1.9.4
 *  - fix on undeclared variable in postDataFunc
 *  - fix on bad variable initialisation in postData event
 * - 2019/09/01 - E.Podvin - 1.9.3
 *  - fix on tplid == "" in json process
 *  - add possibility to not send any blapy data on loadURL or postData
 *  - loadURL now embeds "postData"
 * - 2019/08/25 - E.Podvin - 1.9.2
 *  - fix on search embeding block name id in setBlapyJsonTemplates to set template id to blapy object
 *  - data-blapy-updateblock-ondisplay works now on json blocks
 * - 2019/08/25 - E.Podvin - 1.9.1
 *  - add automatically property "blapyIndex" for each item in json data that is an array
 * - 2019/08/23 - E.Podvin - 1.9.0
 *   - add multi templating for json blapy blocks
 * - 2019/08/23 - E.Podvin - 1.8.0
 *  - add "reloadBlock" feature
 *  - embeddingBlockId should be "block container name" (and not DOM id)
 *  - fix/improvement on json update management (mainly setBlapyContainerJsonTemplate)
 * - 2019/08/22 - E.Podvin - 1.7.2
 *  - fix on header and footer in json template
 * - 2019/08/15 - E.Podvin - 1.7.1
 *  - add fsmExtension option to extend iFSM definition of the blapy object
 *  - send blapycall=1&blapyaction=updateTpl&blapyobjectid=<dom object id> parameters when loading a json template
 *	- process templates whether they are using json2html or mustache tags as long as their libraries are loaded
 *		(carefull: no mix between the two tag syntaxes in the same template file)
 * - 2019/08/14 - E.Podvin - 1.7.0
 *  - Mustache Support
 * - 2019/08/10 - E.Podvin - V1.6.4 -
 *    - use JSON5 instead of JSON
 *    - store templates in a 'xmp' instead of a div fixing pb when there was comments or special structures
 *    - fix in setBlapyContainerJsonTemplate the async loading of the template done with $.get, template that could be not there when a loadurl or postdata was just received
 *    - alert when a blapy block has no id
 * - 2018/05/29 - E.Podvin - V1.6.3 - remove all eval by JSON.parse
 * - 2018/05/28 - E.Podvin - V1.6.2 - send container name to server when block requests an update with data-blapy-updateblock-time+compliant to $ 3.3.1
 * - 2018/05/26 - E.Podvin - V1.6.1 -
 *    - updateBlock accepts json object or json string as html input
 *    - add xmp tags support to escape html in a template definition that could generate errors if not escaped
 *    - fixes on updateBlock when errors were logged
 * - 2018/05/18 - E.Podvin - V1.6.0 - add the loading/updating of a blapy block from a local call to blapy. cf. new "updateBlock" event
 * - 2017/03/20 - E.Podvin - V1.5.4 - fix on key enter on a field that did not send any info from the submit object to the request
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
 */

/**
 * How to use it :
 * ===============
 *
 * see README.md content or consult it on https://github.com/intersel/Blapy
 */

(function($) {

  /**
   * ASCII to Unicode (decode Base64 to original data)
   * @param {string} b64
   * @return {string}
   */
  var atou = function(b64) {
    return decodeURIComponent(escape(atob(b64)));
  }

  /**
   * Unicode to ASCII (encode data to Base64)
   * @param {string} data
   * @return {string}
   */
  var utoa = function (data) {
    return btoa(unescape(encodeURIComponent(data)));
  }

  /**
   * The Blapy Object that controlls a set of blapy blocks
   * @param  {jQuery} the jquery object handled with blapy [description]
   * @param  {Object} options
   * @return {Object}
   * - opts : set of option
   * - myUIObject: Target object of the blapy's FSM
   * - myUIObjectID: Id of the target objet
   */
  var theBlapy = window.theBlapy = function(anObject, options) {

    var $defaults = {
      debug: true, //if true, then log things in the console
      LogLevel: 1, // log level: 1: error ; 2: warning; 3: notice
      debugIfsm: true, // debug mode for ifsm
      LogLevelIfsm: 3,
      alertError: false,
      //function Hooks
      pageLoadedFunction: null,
      pageReadyFunction: null,
      beforePageLoad: null,
      beforeContentChange: null, //param: the Blapy block whose content will change
      afterContentChange: null, //param: the Blapy block whose content has changed
      afterPageChange: null,
      doCustomChange: null,
      onErrorOnPageChange: null,
      theBlapy: this,
      /**
       * activeSammy- if set, activates 'sammy' routing
       * @type {Boolean}
       */
      activeSammy: false,
      /**
       * fsmExtension - an FSM extension to the default blapy FSM definition
       * useful to extend the API of the blapy object (in "PageReady" state for example)
       * @type {[type]}
       */
      fsmExtension: null,

    };

    // on charge les options passées en paramètre
    if (options == undefined) options = null;

    this.opts     = $.extend({}, $defaults, options || {});
    this.optsIfsm = $.extend({}, $defaults, options || {});
    // redefine log options for ifsm
    this.optsIfsm.debug     =  this.opts.debugIfsm;
    this.optsIfsm.LogLevel  =  this.opts.LogLevelIfsm;

    /**
     * @param myUIObject	public - Target object of the FSM
     */
    this.myUIObject = anObject;
    /**
     * @param myUIObjectID public
     * @type {[type]}
     */
    this.myUIObjectID = anObject.attr('id');
    if (!this.myUIObjectID) alert('no defined Id on the given jQuery object... Blapy can\'t work properly :-(');

    /**
     * @param intervalsSet private
     * @type {Array}
     * intervals of time set to update blapy blocks
     */
    this.intervalsSet = new Array();

  };

  /**
   * InitApplication - init the Blapy
   * public method
   */
  theBlapy.prototype.InitApplication = function() {
    this._log('InitApplication');

    var myBlapy = this;

    if (myBlapy.opts.fsmExtension) {
      $.extend(true,manageBlapy, myBlapy.opts.fsmExtension)
    }

    // Sammy routing if set
    if (this.opts.activeSammy) {
      //Standard Routing definition
      if (typeof Sammy != 'function') {
        alert("Sammy is not loaded... can not continue");
        return false;
      }

      var app = Sammy('#' + this.myUIObjectID);

      app.get(/(.*)\#blapylink/, function() {
        //filter the action to be processed only on the defined active blapy object for the link
        if (($(this.target).attr("data-blapy-active-blapyid")) && ($(this.target).attr("data-blapy-active-blapyid") != myBlapy.myUIObjectID))
          return;

        this.params['embeddingBlockId'] = myBlapy.extractembeddingBlockIdName(myBlapy.hashURL());
        if (!this.params['embeddingBlockId']) delete(this.params['embeddingBlockId']);

        myBlapy.myUIObject.trigger('loadUrl', {
          aUrl: myBlapy.hashURL(),
          params: myBlapy.filterAttributes(this.params),
          aObjectId: myBlapy.myUIObjectID,
          noBlapyData:$(this).attr("data-blapy-noblapydata")
        });
      });
      app.post(/(.*)\#blapylink/, function() {
        //filter the action to be processed only on the defined active blapy object for the link
        if (($(this.target).attr("data-blapy-active-blapyid")) && ($(this.target).attr("data-blapy-active-blapyid") != myBlapy.myUIObjectID))
          return;

        this.params['embeddingBlockId'] = myBlapy.extractembeddingBlockIdName(myBlapy.hashURL(this.path));
        if (!this.params['embeddingBlockId']) delete(this.params['embeddingBlockId']);

        myBlapy.myUIObject.trigger('postData', {
          aUrl: myBlapy.hashURL(this.path),
          params: myBlapy.filterAttributes(this.params),
          aObjectId: myBlapy.myUIObjectID,
          method: "post",
        });
      });
      app.put(/(.*)\#blapylink/, function() {
        //filter the action to be processed only on the defined active blapy object for the link
        if (($(this.target).attr("data-blapy-active-blapyid")) && ($(this.target).attr("data-blapy-active-blapyid") != myBlapy.myUIObjectID))
          return;
        this.params['embeddingBlockId'] = myBlapy.extractembeddingBlockIdName(myBlapy.hashURL(this.path));
        if (!this.params['embeddingBlockId']) delete(this.params['embeddingBlockId']);

        myBlapy.myUIObject.trigger('postData', {
          aUrl: myBlapy.hashURL(this.path),
          params: myBlapy.filterAttributes(this.params),
          aObjectId: myBlapy.myUIObjectID,
          method: "put"
        });
      });

      app.notFound = function(verb, path) {
        //just do nothing! means that the called link is not handle by Blapy (no route for Sammy)...
        return true;
      };

      this.myUIObject.iFSM(manageBlapy, this.optsIfsm);
      app.run();
    }
    else
    // no routing - standard blapy links management
    {
      //start Blapy Engine
      this.myUIObject.iFSM(manageBlapy, this.optsIfsm);

      $(document).on("click", "#" + myBlapy.myUIObjectID + " a[data-blapy-link]", function(event) {
        //if requested, filter the action to be processed only to the defined active blapy object for the link
        if (($(event.currentTarget).attr("data-blapy-active-blapyid")) && ($(event.currentTarget).attr("data-blapy-active-blapyid") != myBlapy.myUIObjectID))
          return;

        //use JSON5 if present as JSON5.parse is more cool than JSON.parse (cf. https://github.com/json5/json5)
        var jsonFeatures = null;
        if (typeof(JSON5) == "undefined") jsonFeatures=JSON;else jsonFeatures=JSON5;

        let params = $(this).attr("data-blapy-params");
        if (params != undefined) params = jsonFeatures.parse(params);
        else params = {};

        if ($(this).attr('data-blapy-embedding-blockid'))
          params = $.extend(params, {embeddingBlockId: $(this).attr('data-blapy-embedding-blockid')});


        event.preventDefault();
        myBlapy.myUIObject.trigger('postData', {
          aUrl: myBlapy.hashURL($(this).attr('href')),
          params: params,
          method: $(this).attr("method")||'GET',
          aObjectId: myBlapy.myUIObjectID,
          noBlapyData:$(this).attr("data-blapy-noblapydata")
        });
      });
      $(document).on("submit", "#" + myBlapy.myUIObjectID + " form[data-blapy-link]", function(event) {
        //if requested, filter the action to be processed only to the defined active blapy object for the link
        if (($(event.currentTarget).attr("data-blapy-active-blapyid")) && ($(event.currentTarget).attr("data-blapy-active-blapyid") != myBlapy.myUIObjectID))
          return;

        event.preventDefault();
        // get all the inputs into an array.
        var $inputs = $(this).serializeArray();

        // get an associative array of the values in the form and send it
        var formValues = {};
        $.each($inputs, function() {
          formValues[this.name] = this.value;
        });
        //add the submit input info that is not given by the serializeArray
        if (event.originalEvent) {
          aSubmitInput = $(event.originalEvent.currentTarget.activeElement);
          if (aSubmitInput) {
            //the submit was emitted by an input that is not of submit type (enter on a field perhaps)
            if (aSubmitInput.attr('type') != 'submit') {
              //let's get the first submit object
              aSubmitInput = $(event.originalEvent.target).find("*").filter(':submit:visible:first')
            }
            if (aSubmitInput && aSubmitInput.attr('name')) formValues[aSubmitInput.attr('name')] = aSubmitInput.attr('value');
          }
        }

        formValues['embeddingBlockId'] = $(this).attr('data-blapy-embedding-blockid');

        myBlapy.myUIObject.trigger('postData', {
          aUrl: myBlapy.hashURL($(this).attr("action")),
          params: formValues,
          aObjectId: myBlapy.myUIObjectID,
          method: $(this).attr("method"),
          noBlapyData:$(this).attr("data-blapy-noblapydata")
        });
      });//end on submit
    }

  }; //

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
  theBlapy.prototype._log = function(message) {
    /*global console:true */

    let errorLevel = 3;

    if (arguments.length > 1) errorLevel = arguments[1];

    //show only errors if debug is not set
    if ( (errorLevel >= 2) && (!this.opts.debug) ) return;

    if (errorLevel > this.opts.LogLevel) return; //on ne continue que si le nv de message est <= LogLevel

    if (window.console && console.log) {
      switch (errorLevel)
      {
        case 1:
          console.error('[blapy] ' + message);
          break;
        case 2:
          console.warn('[blapy] ' + message);
          break;
        default:
        case 3:
          console.log('[blapy] ' + message);
          break;
      }
      if ((errorLevel == 1) && this.opts.alertError) alert(message);
    }

  }; //end Log



  /**
   *
   * returns the target block name of the URL if any
   */
  theBlapy.prototype.extractembeddingBlockIdName = function(aBlapyUrl) {
    regexHashBlapyBlock = /#blapylink#.*/igm;
    extractEB = regexHashBlapyBlock.exec(aBlapyUrl);
    if (extractEB && extractEB.length) {
      extractEB = extractEB[0].replace('#blapylink#', '');
    } else extractEB = '';
    return extractEB;
  };

  /**
   * embeds a html source with a blapy block definition of aBlapyBlockIdName
   * returns the embedded html source
   */
  theBlapy.prototype.embedHtmlPage = function(aHtmlSource, aBlapyBlockIdName) {
//    htmlBlapyBlock = this.myUIObject.find('#' + aBlapyBlockIdName);
    htmlBlapyBlock = this.myUIObject.find("[data-blapy-container-name='" + aBlapyBlockIdName + "']");

    if (!htmlBlapyBlock[0])
    {
      this._log('embedHtmlPage: Error on blapy-container-name... "'+aBlapyBlockIdName+'" does not exist!\n',1);

      return '';
    }

    if (   ($(htmlBlapyBlock[0].outerHTML).attr('data-blapy-update') == 'json')
        && ($(htmlBlapyBlock[0].outerHTML).attr("data-blapy-template-init-purejson") == "0")
      )
    {
      try{
        aHtmlSource = $(aHtmlSource).html();
      } catch (e) {
        this._log('embedHtmlPage: aHtmlSource is perhaps a pure json after all...?\n' + aHtmlSource, 1);
      }
    }
    //embed html source in an xmp to avoid any tampering by the browser
    aHtmlSource = '<xmp class="blapybin">'+utoa(aHtmlSource)+'</xmp>';
    aHtmlSource = $(htmlBlapyBlock[0].outerHTML).html(aHtmlSource);
    aHtmlSource.attr('data-blapy-container-content', aHtmlSource.attr('data-blapy-container-content') + '-' + $.now());
    aHtmlSource.attr('id', ''); //remove id in order that it takes the one of the block to change
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
  theBlapy.prototype.createBlapyBlock = function(aJsonObject) {
    this._log('createBlapyBlock');

    if (!aJsonObject["blapy-container-name"])
    {
      this._log('createBlapyBlock: Error on received json where blapy-container-name is not defined!\nPerhaps it\'s pure json not defined as such in Blapy block configuration (cf. data-blapy-template-init-purejson)...\n'+JSON.stringify(aJsonObject),1);
    }

    htmlBlapyBlock = $('<div/>', {
      "data-blapy-container": true,
      "data-blapy-container-name": aJsonObject["blapy-container-name"],
      "data-blapy-container-content": aJsonObject["blapy-container-content"],
      "data-blapy-update": "json"
    }).html(JSON.stringify(aJsonObject['blapy-data']));
    return htmlBlapyBlock;
  };

  /**
   * get the hash part of the URL
   * returns 0 if none
   */
  theBlapy.prototype.hashURL = function(aURL) {
    this._log('hashURL');
    if (!aURL) aURL = window.location.href;
    return aURL || 0;
  };

  //creation function of Blapy that embeds jQuery
  $.fn.Blapy = function(options) {
    if (!this.length) alert("The jquery selector '" + this.selector + "' is void!?\n\n Can\'t start Blapy...\n\n :-(");
    return this.each(function() {
      var Blapy = new theBlapy($(this), options);
      Blapy.InitApplication(); //start it
    });
  };

  /**
   * filter to get only usefull attributes
   * on a Sammy Object
   * returns an object without any function or object
   *
   */
  theBlapy.prototype.filterAttributes = function(aSammyObject) {
    //var sammyKeys=aSammyObject.keys();
    var mySammyObject = aSammyObject;
    var returnObject = {};
    $.each(aSammyObject.keys(),
      function(key, value) {
        if ((typeof mySammyObject[value] != 'function') && (typeof mySammyObject[value] != 'object')) {
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
  theBlapy.prototype.setBlapyUrl = function() {
    this._log('setBlapyUrl');

    var myBlapy = this;

    //change href on blapy-link within the blapy object
    $('#' + myBlapy.myUIObjectID + ' [data-blapy-link]').each(function() {

      var aHref;

      //in case a blapy object is within another blapy object, we need to tell which active blapy object to listen...
      if (($(this).attr("data-blapy-active-blapyId")) && ($(this).attr("data-blapy-active-blapyId") != myBlapy.myUIObjectID))
        return;

      if ($(this)[0].tagName == 'A')
        aHref = $(this).attr("href");
      else if ($(this)[0].tagName == 'FORM')
        aHref = $(this).attr("action");
      else
        aHref = $(this).attr("data-blapy-href");

      if (!aHref) return; //not valid... for now


      if (aHref.indexOf('#blapylink') == -1) {
        aHref += '#blapylink';

        if ($(this).attr('data-blapy-embedding-blockid')
            && ($(this).attr('data-blapy-embedding-blockid') != "")
          )
        {
          aHref += '#' + $(this).attr('data-blapy-embedding-blockid');
        }

        if ($(this)[0].tagName == 'A')
          $(this).attr("href", aHref);
        else if ($(this)[0].tagName == 'FORM')
          $(this).attr("action", aHref);
        else {
          if ((aHref.charAt(0) != '/') &&
            (aHref.substring(0, 4) != "http")
          ) {
            var aBaseHref = $('base').attr('href');
            if (aBaseHref)
              aHref = aBaseHref + aHref;
            else
              aHref = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1) + aHref;
          }

          $(this).attr("data-blapy-href", aHref);
          $(this).click(function() {
            myBlapy.myUIObject.trigger('loadUrl', {
              aUrl: aHref,
              params: '',
              aObjectId: myBlapy.myUIObjectID,
              noBlapyData:$(this).attr("data-blapy-noblapydata")
            });
          });
        }
      }

    });
  };

  /**
   * prepare update block calls on interval time
   *
   */
  theBlapy.prototype.setBlapyUpdateIntervals = function() {
    this._log('setBlapyUpdateIntervals');

    var myBlapy = this;
    var intervalSetId = 0;

    //clear all intervals set
    for (i = 0; i < myBlapy.intervalsSet.length; i++) {
      clearInterval(myBlapy.intervalsSet[i]);
    }

    //for any template block
    $('#' + myBlapy.myUIObjectID + ' [data-blapy-updateblock-time]').each(function() {
      var myContainer = $(this);
      var aUpdateBlockTime = myContainer.attr("data-blapy-updateblock-time");
      var aUpdateBlockHrefURL = myContainer.attr("data-blapy-href")+'?blapyContainerName='+myContainer.attr('data-blapy-container-name');
      if (aUpdateBlockTime) {
        myBlapy.intervalsSet[intervalSetId] = setInterval(function() {
          $('#' + myBlapy.myUIObjectID).trigger('loadUrl', {
            aUrl: aUpdateBlockHrefURL,
            noBlapyData:myContainer.attr("data-blapy-noblapydata")
          });
        }, aUpdateBlockTime);

        intervalSetId++;
      }
    });
  }

  /**
   * prepare update block calls when the block becomes visible
   *
   */
  theBlapy.prototype.setBlapyUpdateOnDisplay = function() {
    this._log('setBlapyUpdateOnDisplay');

    if (!window.jQuery.prototype.appear) {
      this._log('setBlapyUpdateOnDisplay: jquery.appear.js is not loaded...');
      if ($('[data-blapy-updateblock-ondisplay]').length > 0)
        alert('Blapy: jquery.appear.js is not loaded. Need it to process data-blapy-updateblock-ondisplay option');
      return;
    }

    var myBlapy = this;

    $(myBlapy.myUIObject).off('appear');
    $(myBlapy.myUIObject).find('[data-blapy-updateblock-ondisplay]').appear();

    $(myBlapy.myUIObject).on('appear', '[data-blapy-updateblock-ondisplay]', function(event, $all_appeared_elements) {
      if (!$(this).attr("data-blapy-appear"))
          $(this).attr("data-blapy-appear", 'done');
      else return;

      if ($(this).attr("data-blapy-href"))
      {
        myBlapy.myUIObject.trigger('loadUrl', {
          aUrl: $(this).attr("data-blapy-href"),
          noBlapyData:$(this).attr("data-blapy-noblapydata")
        });
      }
      else if ($(this).attr("data-blapy-template-init"))
      {
        let myContainerName = $(this).attr("data-blapy-container-name");
        myBlapy.myUIObject.trigger('reloadBlock',{
          params:{
            embeddingBlockId:myContainerName,
          }
        });
      }
    });

    $.force_appear();

  }

  /**
   * setBlapyContainerJsonTemplate - prepare a json container with its template and initial values
   * @param  {[type]} myContainer [description]
   * @param  {[type]} myBlapy     the
   * @return {[type]}             [description]
   */
  theBlapy.prototype.setBlapyContainerJsonTemplate = function(myContainer, myBlapy, forceReload) {
    this._log('setBlapyContainerJsonTemplate');

    if (forceReload == undefined) forceReload=false;

    /**
     * postDataFunc - activate the initialization of the json block
     * @return {[type]} [description]
     */
    var postDataFunc = function(forceReload) {

      //use JSON5 if present as JSON5.parse is more cool than JSON.parse (cf. https://github.com/json5/json5)
      var jsonFeatures = null;
      if (typeof(JSON5) == "undefined") jsonFeatures=JSON;else jsonFeatures=JSON5;

      //do we have to get the data only when block is displayed?
      if (   !forceReload
          &&  myContainer.attr("data-blapy-updateblock-ondisplay")
          &&  (myContainer.attr("data-blapy-appear") != 'done')
        )
      {
        //$(document).scroll();//force appear to work...
        return;
      }

      let aInitURL = myContainer.attr("data-blapy-template-init");
      if (aInitURL)
      {
        let aInitURL_Param = myContainer.attr("data-blapy-template-init-params");
        if (aInitURL_Param != undefined) aInitURL_Param = jsonFeatures.parse(aInitURL_Param);
        else aInitURL_Param = {};

        let aInitURL_EmbeddingBlockId = myContainer.attr("data-blapy-template-init-purejson");
        if ( (aInitURL_EmbeddingBlockId !== "0") ) //default: pure blapy json
          aInitURL_Param = $.extend({'embeddingBlockId':myContainer.attr("data-blapy-container-name")}, aInitURL_Param);

        let noBlapyData = myContainer.attr("data-blapy-noblapydata");
        if ( (noBlapyData == undefined) ) noBlapyData = "0";

        let aInitURL_Method = myContainer.attr("data-blapy-template-init-method");
        if (aInitURL_Method == undefined) aInitURL_Method = "GET";

        $('#' + myBlapy.myUIObjectID).trigger('postData', {
          "aUrl": aInitURL,
          "params":aInitURL_Param,
          "method":aInitURL_Method,
          'noBlapyData':noBlapyData
        });
      }
    };


    //if block is declared json, then we take local update rule (json)
    myContainer.attr('data-blapy-update-rule', 'local');

    //Search for a template container already defined within the blapy container
    var htmlTpl = myContainer.children('[data-blapy-container-tpl]'); // if still processed, a block data-blapy-container-tpl will be inside
    if (htmlTpl.length == 0) // ok so not processed, so let's do it
    {
      var htmlTplContent = myContainer.html();

      //remove any xmp tags (used to escape html in a template definition that could generate errors if not escaped)
      //htmlTplContent = htmlTplContent.replace(/(\r\n|\n|\r)?<\/?xmp[^>]*>(\r\n|\n|\r)?/gi, '');
      try {
        if ($(htmlTplContent).prop("tagName") == "XMP") htmlTplContent = $(htmlTplContent).html();
      }
      catch(error) {
        //htmlTplContent is not html???...
        this._log("htmlTplContent from "+myContainer.attr("id")+" is not html template...?\n"+htmlTplContent,1);
      }

      //if no template defined within the block
      if (htmlTplContent
          .replace(/\s{2,}/g, ' ')
          .replace(/\t/g, ' ')
          .toString().trim()
          .replace(/(\r\n|\n|\r)/g, "")
          .replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '')
          .replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/g, '') == "") {
        //look for partial template file
        var tplFile = myContainer.attr("data-blapy-template-file");
        if (tplFile) {
          $.get(
            {
              url: tplFile,
              data: "blapycall=1&blapyaction=loadTpl&blapyobjectid=" + myContainer.attr('id'),
              success: function(htmlTplContent) {
                //replace img by anything in order that the system don't want to load them... same for script
                // as we only want to know if there are siblings...
                if ($(htmlTplContent
                          .split("script")
                          .join("scriptblapy")
                          .split("img")
                          .join("imgblapy"))
                      .siblings('[data-blapy-container-tpl="true"]').length == 0)
                {
                  //store the template in comment in a hidden xmp
                  myContainer.html('<xmp style="display:none" data-blapy-container-tpl="true">' + htmlTplContent.replace(/<!--(.*?)-->/gm, "") + '</xmp>');
                }
                else
                {
                  myContainer.html(htmlTplContent.replace(/<!--(.*?)-->/gm, ""));
                }

                postDataFunc();
              },
              async: false,
            });
        } else // no defined template...?
        {
          postDataFunc();
        }
      } else //template is defined in the block
      {
        //replace img by anything in order that the system don't want to load them... same for script
        // as we only want to know if there are siblings...
        if ($(htmlTplContent
                  .split("script")
                  .join("scriptblapy")
                  .split("img")
                  .join("imgblapy"))
              .siblings('[data-blapy-container-tpl="true"]').length == 0)
        {
          //store the template in comment in a hidden xmp
          myContainer.html('<xmp style="display:none" data-blapy-container-tpl="true">' + htmlTplContent.replace(/<!--(.*?)-->/gm, "") + '</xmp>');
        }
        else
        {
          myContainer.html(htmlTplContent.replace(/<!--(.*?)-->/gm, ""));
        }
        postDataFunc();
      }
    }
    else if (forceReload)
    {
      postDataFunc(forceReload);
    }
  };


  /**
   * setBlapyJsonTemplates - prepare the json templates of the blapy blocks controlled with json (cf [data-blapy-update="json"])
   * json templates are stored in a hidden xmp with a "data-blapy-container-tpl" attribute set
   *
   * @param  boolean forceReload reload initial json content
   * @param  string (option/default:undefined) aEmbeddingBlock a specific block container name
   * @param  string (option/default:undefined) aTemplateId     default template to set on the block
   * @return void
   */
  theBlapy.prototype.setBlapyJsonTemplates = function(forceReload,aEmbeddingBlock,aTemplateId) {
    this._log('setBlapyJsonTemplates');

    var myBlapy = this;
    if (forceReload == undefined) forceReload=false;

    if (aEmbeddingBlock) aEmbeddingBlock="[data-blapy-container-name='"+aEmbeddingBlock+"']";
    else aEmbeddingBlock="";

    // set the default template
    if (aTemplateId)
    {
      $(myBlapy.myUIObject).find('[data-blapy-update="json"]'+aEmbeddingBlock).attr('data-blapy-template-default-id',aTemplateId);
    }

    //for any json template block
    $(myBlapy.myUIObject).find('[data-blapy-update="json"]'+aEmbeddingBlock).each(function() {
      var myContainer = $(this);

      myBlapy.setBlapyContainerJsonTemplate(myContainer, myBlapy, forceReload);
    });
  };

/**
 * getObjects - return an array of objects according to key, value, or key and value matching
 * @param  {Object} obj a json object
 * @param  {string} key a json property
 * @param  {string} val a json value
 * @return {Array}     results of the search
 * @example
 * this.getObjects(js,'ID','SGML');// look for sub objects whose properties 'ID' in the json tree have their value == 'SGML'
 * this.getObjects(js,'ID',''); //  look for sub objects whose properties 'ID' in the json tree with any value
 * this.getObjects(js,'','SGML');// look for any sub object that contains a property with the value == 'SGML'
 */
theBlapy.prototype.getObjects = function (obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(this.getObjects(obj[i], key, val));
        } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

  /* var & function definitions */

  /**
   * manageBlapy
   * @type {Object} Blapy state machine definition
   */
  var manageBlapy = {
    PageLoaded: {
      enterState: {
        init_function: function() {
          //process interval updates
          this.opts.theBlapy.setBlapyUpdateIntervals();

          if (this.opts.pageLoadedFunction) this.opts.pageLoadedFunction();
          this.myUIObject.trigger('Blapy_PageLoaded');
        },
        next_state: 'PageReady',
      },
/*      postData: 'loadUrl',
      updateBlock: 'loadUrl',
      loadUrl: //no load URL at first load of the page (generated by sammy)
      {
        propagate_event: true,
        next_state: 'PageReady',
      },
*/
    },
    PageReady: {
      enterState: {
        init_function: function() {
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
      loadUrl: {
        init_function: function(p, e, data) {
          data.method='GET';
          this.trigger('postData',data);
        },
      },
      postData: {
        init_function: function(p, e, data) {
          if (this.opts.beforePageLoad) this.opts.beforePageLoad(data);
          this.myUIObject.trigger('Blapy_beforePageLoad', data);
        },
        out_function: function(p, e, data) {
          var aFSM = this;
          var aUrl = data.aUrl;
          var noBlapyData = data.noBlapyData;
          var aObjectId = data.aObjectId ? data.aObjectId : e.currentTarget.id;
          if ( (aObjectId == undefined) && (typeof(e.currentTarget.attr) != "undefined") ) aObjectId = e.currentTarget.attr('id');
          var urlparams = $.extend({}, data.params);
          var params = $.extend({}, data.params);
          if (!params) params = {
            blapyaction: 'update'
          };
          else if (!params.blapyaction) params['blapyaction'] = 'update';

          if ( ("embeddingBlockId" in params) && (!params.embeddingBlockId) )
          {
            aFSM.opts.theBlapy._log('[postData on '+aFSM.myUIObject.attr('id')+'] embeddingBlockId has been set but is undefined! must be an error...', 1);
          }

          var aembeddingBlockId = params.embeddingBlockId;

          var method = data.method;
          if (!method) method = 'post';

          params = $.extend(params, {
            blapycall: "1",
//            blapyaction: params.blapyaction,
            blapyobjectid: aObjectId
          });

          if (noBlapyData != "1")
          {
            urlparams= params;
          }

          $.ajax({
            type: method,
            url: aUrl,
            data: urlparams,
            success: function(data, textStatus, jqXHR) {
              if (typeof (data) == "object") //then it's a json object
              {
                data = JSON.stringify(data);
              }
              if (aembeddingBlockId) data = aFSM.opts.theBlapy.embedHtmlPage(data, aembeddingBlockId);
              aFSM.trigger('pageLoaded', {
                htmlPage: data,
                params: params
              });
            },
            error: function(jqXHR, textStatus, errorThrown) {
              aFSM.trigger('errorOnLoadingPage', aUrl + ': ' + errorThrown);
            }
          });
        },
        next_state: 'ProcessPageChange'

      },
      updateBlock:{
        init_function: function(p, e, data) {
          if (this.opts.beforePageLoad) this.opts.beforePageLoad(data);
          this.myUIObject.trigger('Blapy_beforePageLoad', data);
          if (!data || !data.html)
          {
            this._log('updateBlock: no html property found');
            this.trigger('errorOnLoadingPage', 'updateBlock: no html property found');
          }
        },
        out_function: function(p, e, data) {
          if (!data) return;
          if (!data.params) data.params="";

          if ( ("embeddingBlockId" in data.params) && (!data.params.embeddingBlockId) )
          {
            this.opts.theBlapy._log('[updateBlock on '+this.myUIObject.attr('id')+'] embeddingBlockId has been set but is undefined! must be an error...', 1);
          }
          var aembeddingBlockId = data.params.embeddingBlockId;

          if (typeof (data.html) == "object") //then it's a json object
          {
              data.html = JSON.stringify(data.html);
          }

          if (aembeddingBlockId) data.html = this.opts.theBlapy.embedHtmlPage(data.html, aembeddingBlockId);

          this.trigger('pageLoaded', {
            htmlPage: data.html,
            params: data.params
          });
        },
        next_state: 'ProcessPageChange'
      },
      /**
       * reloadBlock - reload the (json) blocks
       * @type {data}
       *  - data.embeddingBlockId - a block container name
       */
      reloadBlock:{
        init_function: function(p, e, data) {

          var params = {};
          if (data) params = data.params;

          if ( ("embeddingBlockId" in params) && (!params.embeddingBlockId) )
          {
            this.opts.theBlapy._log('[reloadBlock on '+this.myUIObject.attr('id')+'] embeddingBlockId has been set but is undefined! must be an error...', 1);
          }

          // process json blocks
          this.opts.theBlapy.setBlapyJsonTemplates(true,params.embeddingBlockId,params.templateId);

          //@todo for block types other than json blocks
          //init blapy block that should be initialized on display
//          this.opts.theBlapy.setBlapyUpdateOnDisplay();
        },
      }//reloadBlock
    },
    ProcessPageChange: {
      enterState: {},
      pageLoaded: {
        init_function: function(p, e, data) {
          var pageContent = data.htmlPage;
          var params = data.params;
          var aObjectId = this.myUIObject.attr('id');
          var myFSM = this;
          var tmpPC = null;
          var jsonFeatures = null;

          //use JSON5 if present as JSON5.parse is more cool than JSON.parse (cf. https://github.com/json5/json5)
          if (typeof(JSON5) == "undefined") jsonFeatures=JSON;else jsonFeatures=JSON5;

          // transform any json text in json object
          // @TODO : optimize the json data processing as we eval it then stringify it (createBlapyBlock) then reeval... :(
          try {
            tmpPC = jsonFeatures.parse(pageContent);
            pageContent = tmpPC;

            // if the received pageContent is pure json then build the equivalent in blapy block
            if ( pageContent instanceof Array) {
              var newContent = $("");
              var tmpRes = "";
              for (i = 0; i < pageContent.length; i++) {
                tmpRes = this.opts.theBlapy.createBlapyBlock(pageContent[i]);
                newContent = newContent.add(tmpRes);
              };
              pageContent = newContent;
            }
            else if (typeof (pageContent) == "object") //then it's a json object? curious... should have been stringify previously
            {
                pageContent = this.opts.theBlapy.createBlapyBlock(pageContent);;
            }
            else
            {
              // don't know what to do...? not normal to be here...
              myFSM.opts.theBlapy._log('downloaded content is not html neither json object, that\'s curious... ' + pageContent + ' - ' + containerName, 1);
            }

          } catch (e) {
            //not json input... but html...
          }

          switch (params['blapyaction']) {
            case 'update':
            default:

              this.myUIObject.find('[data-blapy-container]').each(function() {

                var myContainer = $(this);
                if (!params['force-update']) params['force-update'] = 0;
                var containerName = myContainer.attr('data-blapy-container-name');

                try {

                  //get the Blapy Container named <containerName>
                  var aBlapyContainer = $(pageContent)
                    .filter('[data-blapy-container-name="' + containerName + '"]')
                    .add($(pageContent)
                      .find('[data-blapy-container-name="' + containerName + '"]')
                    ).first();
                } catch (e) {
                  myFSM.opts.theBlapy._log('downloaded content can not be evaluated by jQuery, so perhaps it is json data: ' + pageContent + ' - ' + containerName, 1);
                  return;
                }

                //container not found
                if (!aBlapyContainer || aBlapyContainer.length == 0) {
                  return;
                } else if (aBlapyContainer.attr('data-blapy-applyon') != undefined) {
                  //if the container specifies the accepted applications and we're not processing the correct one (aObjectId), then exit
                  var aListOfApplications = aBlapyContainer.attr('data-blapy-applyon').split(",");
                  if ((aListOfApplications.length > 0) &&
                    ($.inArray(aObjectId, aListOfApplications) == -1)
                  ) return;

                }

                //update the id with the current container id, if none given in the new container
                if (!myContainer.attr('id'))
                {
                  myFSM.opts.theBlapy._log('a blapy block has no id:\n'+myContainer[0].outerHTML.substring(0,250), 1);
                  //alert('a blapy block has no id:\n'+myContainer[0].outerHTML.substring(0,250));
                }
                if (!aBlapyContainer.attr('id')) aBlapyContainer.attr('id', myContainer.attr('id'));

                var dataBlapyUpdate = aBlapyContainer.attr('data-blapy-update');
                var dataBlapyUpdateRuleIsLocal = false;
                if (
                  (myContainer.attr('data-blapy-update-rule') == 'local') ||
                  (
                    (dataBlapyUpdate == 'json') &&
                    (myContainer.attr('data-blapy-update') != 'json')
                  )
                ) {
                  dataBlapyUpdate = myContainer.attr('data-blapy-update');
                  dataBlapyUpdateRuleIsLocal = true;
                }

                //is our container embed in an xmp? if yes, remove it...
                var tmpContainer = aBlapyContainer.children('xmp.blapybin');
                if ((dataBlapyUpdate != 'json') && (tmpContainer.length)) aBlapyContainer.html(atou(tmpContainer.html()));

                //alert that the content of the block will change
                if (myFSM.opts.beforeContentChange) myFSM.opts.beforeContentChange(myContainer);
                myContainer.trigger('Blapy_beforeContentChange', this.myUIObject);

                //standard update
                if (!dataBlapyUpdate ||
                  (dataBlapyUpdate == 'update')
                ) {
                  if (aBlapyContainer.attr('data-blapy-container-content') != myContainer.attr('data-blapy-container-content') ||
                    (params['force-update'] == 1)
                  ) {
                    if (dataBlapyUpdateRuleIsLocal) {
                      myContainer.html(aBlapyContainer.html()); //replace content with the new one
                    } else {
                      myContainer.replaceWith(aBlapyContainer[0].outerHTML); //replace content with the new one
                    }
                    myContainer = aBlapyContainer;
                  }
                }
                //append update
                else if (dataBlapyUpdate == 'force-update') {
                  if (dataBlapyUpdateRuleIsLocal) {
                    myContainer.html(aBlapyContainer.html()); //replace content with the new one
                  } else {
                    myContainer.replaceWith(aBlapyContainer[0].outerHTML); //replace content with the new one
                  }
                  myContainer = aBlapyContainer;
                }
                //append update
                else if (dataBlapyUpdate == 'append') {
                  aBlapyContainer.prepend(myContainer.html()); //we prepend the old content to the new one (~to append the new one to the old one ;-))
                  if (dataBlapyUpdateRuleIsLocal) {
                    myContainer.html(aBlapyContainer.html()); //replace content with the new one
                  } else {
                    myContainer.replaceWith(aBlapyContainer[0].outerHTML); //replace content with the new one
                  }
                  myContainer = aBlapyContainer;
                }
                //prepend update
                else if (dataBlapyUpdate == 'prepend') {
                  aBlapyContainer.append(myContainer.html());
                  if (dataBlapyUpdateRuleIsLocal) {
                    myContainer.html(aBlapyContainer.html()); //replace content with the new one
                  } else {
                    myContainer.replaceWith(aBlapyContainer[0].outerHTML); //replace content with the new one
                  }
                  myContainer = aBlapyContainer;
                }
                //replace update
                else if (dataBlapyUpdate == 'replace') {
                  myContainer.replaceWith(aBlapyContainer.html()); //replace content with the new inner one
                  myContainer = aBlapyContainer;
                }
                //custom update
                else if (dataBlapyUpdate == 'custom') {
                  if (aBlapyContainer.attr('data-blapy-container-content') != myContainer.attr('data-blapy-container-content') ||
                    (params['force-update'] == 1)
                  ) {
                    if (myFSM.opts.doCustomChange) myFSM.opts.doCustomChange(myContainer, aBlapyContainer);
                    myContainer.trigger('Blapy_doCustomChange', aBlapyContainer);
                  }
                }
                //remove update
                else if (dataBlapyUpdate == 'remove') {
                  var myContainerParent = myContainer.parent();
                  myContainer.replaceWith(''); //replace content with the new one
                  myContainer = myContainerParent;
                }
                //json update
                else if (dataBlapyUpdate == 'json') {
                  var jsonData = null;
                  if (tmpContainer.length)
                    jsonData = atou(tmpContainer.html());//
                  else
                    jsonData = aBlapyContainer.html();

                    //get json data and remove return chars
                  jsonData = jsonData.replace(/(\r\n|\n|\r)/g, "");
                  try {
                    var jsonDataObj = jsonFeatures.parse(jsonData);
                    jsonData = JSON.stringify(jsonDataObj);

                    if ( (jsonDataObj['blapy-data']) && (jsonDataObj['blapy-container-name']) )
                    {
                      if (jsonDataObj['blapy-container-name'] != containerName)
                      {
                        myFSM.opts.theBlapy._log('blapy-data set: '+jsonData+'\n but not match with containerName '+containerName);
                        return;
                      }

                      jsonDataObj = jsonDataObj['blapy-data'];
                      jsonData = JSON.stringify(jsonDataObj);
                    }
                  } catch (e) {
                    myFSM.opts.theBlapy._log('downloaded content can not be evaluated, so is not json data: ' + jsonData, 2);
                    try {
                      jsonData = $(jsonData).html();
                      jsonData = jsonData.replace(/(\r\n|\n|\r)/g, "");
                      jsonDataObj = jsonFeatures.parse(jsonData);
                      jsonData = JSON.stringify(jsonDataObj);
                    }
                    catch (e) {
                      myFSM.opts.theBlapy._log('try the subtext but content can not be evaluated either, so is not json data: ' + jsonData, 1);
                      return;
                    }
                    myFSM.opts.theBlapy._log('use of sub text to get json data: ' + jsonData,2);
                  }

                  try {
                    if (myContainer.attr('data-blapy-template-init-fromproperty')
                        && (myContainer.attr('data-blapy-template-init-fromproperty') != "")
                      )
                    {
                      myFSM.opts.theBlapy._log('Apply data-blapy-template-init-fromproperty: '+myContainer.attr('data-blapy-template-init-fromproperty'));
                      jsonDataObj = myContainer
                                      .attr('data-blapy-template-init-fromproperty')
                                      .split('.')
                                      .reduce((acc,item)=>acc[item]!=undefined?acc[item]:acc,jsonDataObj);
                    }
                    if (myContainer.attr('data-blapy-template-init-search')
                        && (myContainer.attr('data-blapy-template-init-search') != "")
                      )
                    {
                      myFSM.opts.theBlapy._log('Apply data-blapy-template-init-search: '+myContainer.attr('data-blapy-template-init-search'));
                      //search -> "<property>==<value>[,<property>==<value>,...]"
                      //get array of objects matching the query
                      jsonDataObj = myContainer
                                        .attr('data-blapy-template-init-search')
                                        .split(',')
                                        .map(propval => propval.split('=='))
                                        .reduce( (acc,item) => {
                                          let founds = myFSM.opts.theBlapy.getObjects(jsonDataObj,item[0],item[1]);
                                          if (founds.length)
                                            return acc.concat(founds);
                                          else
                                            return acc;
                                        },[])
                                        ;
                      //remove duplicate
                      jsonDataObj = jsonDataObj.filter((thing,index) => {
                        return index === jsonDataObj.findIndex(obj => {
                          return JSON.stringify(obj) === JSON.stringify(thing);
                        });
                      });
                    }

                  }
                  catch (e) {
                    myFSM.opts.theBlapy._log('init-search or init-property does not work well on json data of container: ' + myContainer.attr('id'), 1);
                  }

                  if (myContainer.attr('data-blapy-template-init-processdata')
                      && (myContainer.attr('data-blapy-template-init-processdata') != "")
                    )
                  {
                    aJsonDataFunction = myContainer.attr("data-blapy-template-init-processdata");
                    if (aJsonDataFunction)
                    {
                      myFSM.opts.theBlapy._log('Apply data-blapy-template-init-processdata: '+aJsonDataFunction);
                      let previousJsonDataObj = jsonDataObj;
                      eval(   'if (typeof '+aJsonDataFunction+' === "function") '
                            + '   jsonDataObj='+aJsonDataFunction+'(jsonDataObj);'
                            + 'else '
                            +'    myFSM.opts.theBlapy._log("'+aJsonDataFunction+' does not exist :(! '
                                      +'Have a look on the : data-blapy-template-init-processdata of container '
                                      + myContainer.attr('id') +'", 1);');
                      if (typeof jsonDataObj !== 'object') {
                          myFSM.opts.theBlapy._log('returned Json Data was not a json structure :(! Perhaps it is due to the processing of this function on them: ' + aJsonDataFunction, 1);
                          jsonDataObj = previousJsonDataObj;
                      }
                    }
                  }

                  // Get the json Template
                  var htmlTpl = $();
                  var htmlAllTpl = myContainer.children('[data-blapy-container-tpl]');

                  var tplId = myContainer.attr('data-blapy-template-default-id');
                  if ( (tplId != undefined) && (tplId != "") )
                  {
                    //get tpl from the tplId of the object
                    tplId = "[data-blapy-container-tpl-id='"+tplId+"']";
                    htmlTpl = myContainer.children('[data-blapy-container-tpl]'+tplId);
                    if (htmlTpl.length == 0)
                    {
                      myFSM.opts.theBlapy._log('The json template of id '+tplId+' was not found for the block '+ myContainer.attr('data-blapy-container-name')+'!', 1);
                    }
                  }

                  if (htmlTpl.length == 0)
                    htmlTpl = htmlAllTpl;

                  if (htmlTpl.length == 0)
                  {
                    myFSM.opts.theBlapy._log('can not find any json template for the block: ' + myContainer.attr('data-blapy-container-name'), 1);
                    htmlTplContent='';
                  }
                  else
                  {
                    // Great! Template was found
                    htmlTplContent = htmlTpl.html();
                  }

                  //get the rendering
                  var newHtml = '';
                  if (htmlTplContent.length < 3)
                    //no defined template?
                    newHtml = jsonData;
                  else
                  {
                    //template defined...
                    //let's parse it with the json data...

                    let parsed=false;

                    // create an "idx" property to access to the index of the array
                    // so is it a json array?
                    if (jsonDataObj.length)
                    {
                      for( var i=0; i< jsonDataObj.length; i++) {
                        if (jsonDataObj[i].blapyIndex == undefined)
                          jsonDataObj[i].blapyIndex = (function(in_i){return in_i+1;})(i);
                      }
                    }
                    else
                    {
                      //not a json array
                      jsonDataObj.blapyIndex = 0;
                    }
                    //update jsonData with the index
                    jsonData= JSON.stringify(jsonDataObj);

                    //remove one level of escaped xmp
                    //+ escaped script with blapyScriptJS
                    htmlTplContent = htmlTplContent
                    .replace(/\|xmp/gi, 'xmp')
                    .replace(/\|\/xmp/gi, '/xmp')
                    .replace(/blapyScriptJS/gi, 'script');

                    if ( (typeof(Mustache) != "undefined") )
                    {
                      var mustacheStartDelimiter = '{{';
                      var mustacheEndDelimiter = '}}';
                      var newDelimiters = '';
                      if (myContainer.attr('data-blapy-template-mustache-delimiterStart')
                          && (myContainer.attr('data-blapy-template-mustache-delimiterStart') != "")
                        )
                      {
                        //want to apply other mustache tag delimiters
                        mustacheStartDelimiter = myContainer.attr('data-blapy-template-mustache-delimiterStart');
                        mustacheEndDelimiter = myContainer.attr('data-blapy-template-mustache-delimiterEnd');
                        newDelimiters =   "{{="+mustacheStartDelimiter+" "+mustacheEndDelimiter+"=}}";
                      }

          						if ( (newDelimiters != '') || htmlTplContent.includes("{{") )
          						{ //ok that's mustache templating
          							newHtml = Mustache.render(
                          newDelimiters
                          +mustacheStartDelimiter+"#."+mustacheEndDelimiter
                          +htmlTplContent
                          +mustacheStartDelimiter+"/."+mustacheEndDelimiter,jsonDataObj);
          							parsed=true;
          						}
                    }

					          if ( !parsed && typeof(json2html) != "undefined" )
                    {
                      newHtml = json2html.transform(jsonData, {
                        'tag': "void",
                        'html': htmlTplContent
                      });

                      //as json2html needs a root tag to render... well, we set void to delete it after rendering...
                      newHtml = newHtml.replace(/<.?void>/g, "");
                      parsed=true;
                    }

                    if (!parsed)
                    {
                      myFSM.opts.theBlapy._log('no json parser loaded... need to include json2html or Mustache library! ', 1);
                      alert('no json parser loaded... need to include "json2html" or "Mustache" library!');
                    }
                  }//else of htmlTplContent.length<3

                  if (myContainer.attr('data-blapy-template-header')) {
                    myFSM.opts.theBlapy._log('Apply data-blapy-template-header');
                    newHtml = myContainer.attr('data-blapy-template-header') + newHtml;
                  }
                  if (myContainer.attr('data-blapy-template-footer')) {
                    myFSM.opts.theBlapy._log('Apply data-blapy-template-footer');
                    newHtml = newHtml + myContainer.attr('data-blapy-template-footer');
                  }

                  //Wrap content if needed
                  if (myContainer.attr('data-blapy-template-wrap')) {
                    myFSM.opts.theBlapy._log('Apply data-blapy-template-wrap');
                    newHtml = $(myContainer.attr('data-blapy-template-wrap')).html(newHtml)[0];
                    newHtml = newHtml.outerHTML;
                  }

                  //prepare to replace the content by the new parsed one
                  //get the available templates
                  var tplList = "";
                  htmlAllTpl.each(function(){tplList += this.outerHTML});
                  //replace content with the new one
                  myContainer.html(tplList + newHtml);

                  // initialize the sub blapy blocks found in the new content if any
                  var myBlapy = myFSM.opts.theBlapy;
                  myContainer.find('[data-blapy-update="json"]').each(function() {
                    var mySubContainer = $(this);

                    myBlapy.setBlapyContainerJsonTemplate(mySubContainer, myBlapy);
                  });

                  //reset container to its original jquery object
                  myContainer = aBlapyContainer;

                } else {
                  var pluginUpdateFunction = eval("myFSM.opts.theBlapy." + aBlapyContainer.attr('data-blapy-update'));

                  if (pluginUpdateFunction) {
                    if (aBlapyContainer.attr('data-blapy-container-content') != myContainer.attr('data-blapy-container-content') ||
                      (params['force-update'] == 1) ||
                      aBlapyContainer.attr('data-blapy-container-force-update') == "true"
                    ) {
                      pluginUpdateFunction(myContainer, aBlapyContainer);
                    }

                  } else myFSM.opts.theBlapy._log(aBlapyContainer.attr('data-blapy-update') + ' does not exist', 1);

                }

                //process interval updates
                myFSM.opts.theBlapy.setBlapyUpdateIntervals();

                if (myFSM.opts.afterContentChange) myFSM.opts.afterContentChange(myContainer);
                //try to send to the new object the alert
                if (myContainer.attr('id'))
                  $('#' + myContainer.attr('id')).trigger('Blapy_afterContentChange', myContainer);

              }); //end of each
              break;
          }; //switch
        },
        out_function: function(p, e, data) {
          if (this.opts.afterPageChange) this.opts.afterPageChange();
          this.myUIObject.trigger('Blapy_afterPageChange', data);
        },
        next_state: 'PageReady',
      },
      errorOnLoadingPage: {
        init_function: function(p, e, data) {
          if (this.opts.onErrorOnPageChange) this.opts.onErrorOnPageChange(data);
          this.myUIObject.trigger('Blapy_ErrorOnPageChange', [data]);
        },
        next_state: 'PageReady',
      },
      reloadBlock: 'loadUrl',
      updateBlock: 'loadUrl',
      postData: 'loadUrl',
      loadUrl: //someone try to load an URL but page is not ready... try it later...
      {
        how_process_event: {
          delay: 20,
          preventcancel: true
        },
        propagate_event: true,
      },
    },
    DefaultState: {
      start: {
        next_state: 'PageLoaded',
      },
    },
  };

})(jQuery);
