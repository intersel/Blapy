
(function($) {
 
	/**
	* 
	**/	
	var theUPIApplication = window.theUPIApplication = function (anObject, options)
	{
		
		var $defaults = {
				debug				: false, //if true, then log things in the console
				LogLevel			: 3,	 // log level: 1: error ; 2: warning; 3: notice
				AlertError			: false,
				//function Hooks
				pageLoadedFunction	: null,
				pageReadyFunction	: null,
				beforePageChange	: null,
				afterPageChange		: null,
				onErrorOnPageChange	: null,
				
		};

		// on charge les options passées en paramètre
		if (options == undefined) options=null;
		this.opts = jQuery.extend( {}, $defaults, options || {});

		/**
		 * @param myUIObject		- Target object of the FSM
		 */
		this.myUIObject	= anObject;
		this.myUIObjectID = anObject.attr('id');
		if (!this.myUIObjectID) alert('no defined Id on the given jQuery object... UPI Application can\'t work properly :-(');
		
	}

	/**
	 * InitApplication - init the UPI Application
	 * public method
	 */
	theUPIApplication.prototype.InitApplication	= function() 
	{
		this._log('InitApplication');
		
		//change href on upi-link
		$('[data-upi-link]').each(function() {
			$(this).attr("href",'#/'+$(this).attr("href")); 
		});

		//Standard Routing definition
		var app = Sammy('#'+this.myUIObjectID);
		
		var myUIApplication = this;
		
		app.get('#/', function() 
		{
			//do nothing
		});

		app.get('#/:nameUrl', function() 
		{
			if(!this.params['action']) this.params['action']='update';

			switch(this.params['action'])
			{
				case 'update': 
				default:
					myUIApplication.myUIObject.trigger('loadUrl',{aUrl:myUIApplication.hashURL(),params:this.params});
					break;
			}
		});
		
		this.myUIObject.iFSM(manageUPIApplication,this.opts);
		app.run('#/');

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
	theUPIApplication.prototype._log = function (message) {
		/*global console:true */

		if (!this.opts.debug) return;
		if ( (arguments.length > 1) && (arguments[1] > this.opts.LogLevel) ) return; //on ne continue que si le nv de message est <= LogLevel
		if ( (arguments.length <= 1) && (3 > this.opts.LogLevel) ) return;// pas de niveau de msg défini => niveau notice (3)
		
		if (window.console && console.log)
		{
			console.log('[fsm] ' + message);
			if ( (arguments[1] == 1) && this.opts.AlertError) alert(message);
		}
		
	};//end of 
	
	/**
	* get the hash part of the URL
	* returns 0 if none
	*/
	theUPIApplication.prototype.hashURL = function (aURL)
	{
		this._log('hashURL');

		if (!aURL) aURL = window.location.href;
		var results = new RegExp('[\#][/](.*)').exec(aURL);
		return results[1] || 0;
	}

	$.fn.UPIApplication = function(options) {
		if (!this.length) alert("The jquery selector '"+this.selector+"' is void!?\n\n Can\'t start UPI application...\n\n :-(");
		return this.each(function() {
			var UPIApplication = new theUPIApplication($(this), options);
			UPIApplication.InitApplication();	//start it
		});
	};
	
	
	/* var & function definitions */	
	var manageUPIApplication = {
        PageLoaded: 
        {
             enterState:
            {
                init_function: function(){
					if (this.opts.pageLoadedFunction) this.opts.pageLoadedFunction();
				},
                next_state: 'PageReady'
            },
        }, 
        PageReady: 
        {
            enterState:   
            {
                init_function: function(){
					if (this.opts.pageReadyFunction) this.opts.pageReadyFunction();
				}
            },
            loadUrl:   
            {
                init_function: function(){
					if (this.opts.beforePageChange) this.opts.beforePageChange();
				},
                out_function: function(p,e,data){
					var aFSM = this;
					var aUrl=data.aUrl;
					var params=data.params;
					jQuery.ajax({
						  type: 'GET', 
						  url: aUrl, 
						  success: function(data, textStatus, jqXHR) {
							aFSM.trigger('pageLoaded',{htmlPage:data,params:params});
						  },
						  error: function(jqXHR, textStatus, errorThrown) {
							aFSM.trigger('errorOnLoadingPage');
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
					
					switch(params['action'])
					{
						case 'update': 
						default:
							
							$('[data-upi-container]').each(function(){
								myContainer = $(this);
								containerName = myContainer.attr('data-upi-container-name');
								aUPIContainer=jQuery(pageContent).filter('[data-upi-container-name="'+containerName+'"]')
																 .add(jQuery(pageContent).find('[data-upi-container-name="'+containerName+'"]'));
								
								//container not found
								if (!aUPIContainer || aUPIContainer.length == 0) return true;
								
								if ( !params['force-update'] 
										&& aUPIContainer.attr('data-upi-container-content') == myContainer.attr('data-upi-container-content')
									)
									return true;
									
								myContainer.replaceWith(aUPIContainer[0].outerHTML)//replace content with the new one
							});
							break;
					};//switch
				},
                out_function: function(p,e,data){
					if (this.opts.afterPageChange) this.opts.afterPageChange();
				},
                next_state: 'PageReady',
            },
            errorOnLoadingPage:   
            {
                next_state: 'ErrorOnPageChange',
            },
        },
        ErrorOnPageChange: 
        {
            enterState:   
            {
                init_function: function(){
					if (this.opts.onErrorOnPageChange) this.opts.onErrorOnPageChange();
				},
                next_state: 'PageReady',
            },
        },
        DefaultState:
        {
            start:
            {
                next_state: 'PageLoaded',
            }
        }
    };

 
})(jQuery);

