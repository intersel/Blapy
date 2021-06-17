/**
 * -----------------------------------------------------------------------------------------
 * INTERSEL - 4 cité d'Hauteville - 75010 PARIS
 * RCS PARIS 488 379 660 - NAF 721Z
 *
 * File : iFSM.js
 * iFSM : a finite state machine with jQuery
 *
 * -----------------------------------------------------------------------------------------
 * Modifications :
 * - 2013/10/23 - E.Podvin - V1.0 - Creation
 * - 2013/11/03 - E.Podvin - V1.1 - add
 * - 2013/11/04 - E.Podvin - V1.2 - add process_event_if condition
 * - 2013/11/05 - E.Podvin - V1.3 - add sub machine to manage hierarchical state machines (HSM)
 * - 2013/11/12 - E.Podvin - V1.4 - debug on submachine management
 * - 2013/11/22 - E.Podvin - V1.5 - add 'next_state_on_target' to change a state according to the submachine states
 * - 2014/03/19 - E.Podvin - V1.6.1 - add options.initState in the jquery call to be able to define the initial state
 * - 2014/06/06 - E.Podvin - 1.6.8  - add synonymous events
 * - 2014/06/16 - E.Podvin - 1.6.9  - patch to correctly process process_on_UItarget option
 * - 2014/06/16 - E.Podvin - 1.6.10  - copy state definition in order to be able to have it dynamic
 * - 2014/07/01 - E.Podvin - 1.6.11 - patch on the reinitialisation of the event iterations when changing state
 * - 2014/07/08 - E.Podvin - 1.6.13 - propagate_event may be an array of events to propagate
 * - 2014/07/14 - E.Podvin - 1.6.14 - improve performance
 * - 2014/09/04 - E.Podvin - 1.6.15 - fix on the 'exitMachine' message when it was sent
 * - 2014/09/11 - E.Podvin - 1.6.16 - fix on synonymous event that was not set when still defined in a previous state
 * - 2016/04/26 - E.Podvin - 1.6.17 - fix on delayed events
 * - 2016/04/26 - E.Podvin - 1.6.18 - fix on delayed events on "DefaultState"
 * - 2017/03/08 - E.Podvin - 1.7.0 - myFSM.eventCalled available for script + 'propagate_event_on_localmachine' directive + catchEvent
 * - 2017/03/13 - E.Podvin - 1.7.1 - add myFSM.lastState
 * - 2017/03/20 - E.Podvin - 1.7.2 - fixes to be compliant with jquery 3.2.0
 * - 2017/10/14 - E.Podvin - 1.7.3 - small fix in case event is triggered with multiple parameters
 * - 2017/10/17 - E.POdvin - 1.7.4 - change log level - by default, displays the state&event processing step in the console
 * - 2018/03/08 - E.POdvin - 1.7.5 - transfer data transmitted by trigger to enterEvent and exitEvent
 * - 2018/03/13 - E.Podvin - 1.7.6 - add some controls when starting the state machines: can't start if no id on the object or if still exists
 * - 2019/11/22 - E.Podvin - 1.7.7 - prevent preventCancel event to stack if delayed again (see preventCancelSet)
 *                                   add console.warn (instead of log) for errors message
 * - 2020/06/18 - E.Podvin - 1.7.8 - Add alert when next_state does not exist (not defined)
 * - 2021/04/19 - E.Podvin - 1.7.9 - fix delayProcess when data is not set
 * -----------------------------------------------------------------------------------------
 *
 * @copyright Intersel 2013-2021
 * @fileoverview : iFSM : a finite state machine with jQuery
 * @see {@link https://github.com/intersel/iFSM}
 * @author : Emmanuel Podvin - emmanuel.podvin@intersel.fr
 * @version : 1.7.9
 * -----------------------------------------------------------------------------------------
 */

/**
 * How to use it :
 * ===============
 * <code>
 * <script type="text/javascript" src="jquery-3.6.0.min.js"></script>
 * <script type="text/javascript" src="jquery.dorequesttimeout.js"></script>
 * <script type="text/javascript" src="jquery.attrchange.js"></script>
 * <script type="text/javascript" src="ifsm.js"></script>
 * //Example of use :
 * <script type="text/javascript">
 *  	var aStateDefinition = {
 *		FirstState     :
 *		{
 *		     enterState:
 *		    {
 *		        init_function: function(){alert("First State");}
 *		    },
 *		    click:
 *		    {
 *		        next_state: 'NextState'
 *		    }
 *		},
 *		NextState      :
 *		{
 *		    enterState:
 *		    {
 *		        init_function: function(){alert("Next State");}
 *		    },
 *		    click:
 *		    {
 *		        next_state: 'FirstState'
 *		    }
 *		},
 *		DefaultState        :
 *		{
 *		    start   :
 *		    {
 *		        next_state  : 'FirstState'
 *		    }
 *		}
 *	};
 *
 * $('#myButton').iFSM(aStateDefinition);
 * myFSM = $('#myButton').getFSM(aStateDefinition); //get the linked FSM object if needed
 *
 * </script>
 * </code>
 *
 */
(function($){
/**
 * @param integer nb_FSM - number of active FSM
 */
var nb_FSM = 0;

/**
 *
 * fsm_manager - class constructor
 * @param {object} aStateDefinition - states definition
 * {
 * 	<aStateName1> :
 * 	{
 * 		delegate_machines	:
 * 		{
 * 			<aSubMachine name 1> :
 * 			{
 * 				submachine : <a State definition>,
 * 				no_reinitialisation : <boolean, default:false>
 * 			},
 * 			<aSubMachine name i> :
 * 			{
 * 				submachine : <a State definition>
 * 			},
 * 			...
 * 		},
 *
 * 		<aEventName1>:
 * 		{
 * 			how_process_event: <immediate||push (default)||{delay:<adelay>,preventcancel:<false(default)|true>}>,
 * 			init_function: <a function(parameters, event, data)>,
 * 			properties_init_function: <parameters for init_function>,
 * 			next_state: <aStateName>,
 * 			pushpop_state: <'PushState'||'PopState'>,
 * 			next_state_when: <a statement that returns boolean>,
 * 			next_state_on_target :
 * 			{
 * 				condition 			: <'||'||'&&'>
 * 				submachines			:
 * 				{
 * 					<submachineName1> 	:
 * 					{
 * 						condition	: <''(default)||'not'>
 * 						target_list : [<targetState1>,...,<targetStaten>],
 *					}
 * 					...
 * 					<submachineNamen> 	: ...
 *				}
 * 			}
 * 			next_state_if_error: <aStateName>,
 * 			pushpop_state_if_error: <'PushState'||'PopState'>,
 * 			propagate_event: <true||anEventName||[aEVN1,aEVN2,...]>
 * 			process_event_if : <a statement that returns boolean>,
 * 			propagate_event_on_refused : <anEventName>
 * 			out_function: <a function(parameters, event, data)>,
 * 			properties_out_function: <parameters for out_function>,
 * 			prevent_bubble: <true|false(default)>
 * 			process_on_UItarget: <true|false(default)>
 * 			UI_event_bubble: <true|false(default)>
 * 		},
 * 		<aEventName....>: <anOtherEventName>,
 * 		<aEventName....>:
 * 		{
 * 			....
 * 		},
 * 		enterState : ...
 * 		exitState :  ...
 * 	},
 * 	<aStateName...> : <anAnotherStateName>,
 * 	<aStateName...> :
 * 	{
 * 		....
 * 	},
 *  DefaultState :
 * 	{
 * 		start: //a default start event received at the FSM start
 * 		{
 * 		},
 * 		<aEventName....>:
 * 		{
 * 		}
 * 	}
 * }
 *
 *   - <aStateName> :
 * 		<aStateName> is the name of a state.
 *   	- delegate_machines : sub machines list to delegate the events on the state
 *   		- submachine : the variable name of a state definition or a state definition description
 *   	- <aEventName> :
 *   			'<aEventName>' is the name of an event. It may be any event name supported by javascript or JQuery.
 *   			It defines an event we want to be alerted when it occurs on the object
 *   			Specific events :
 *   				- 'start' : this event is automatically sent when the FSM starts. should be defined in the initial state (or 'DefaultState')
 *   				- 'enterState' : this event is automatically sent and immediatly executed when the FSM enter the state
 *   				- 'exitState' : this event is automatically sent and immediatly executed when the FSM exit the state
 *   				- 'exitMachine' : this event is automatically sent when the (sub)machine will exit/close
 *   				- 'attrchange' : received if any attribute of the jquery object (myUIObject) changed
 *   					- data sent : event - event object
 *   									* event.attributeName - Name of the attribute modified
 *   									* event.oldValue      - Previous value of the modified attribute
 *   									* event.newValue      - New value of the modified attribute
 *   				- 'attrchange_<attributename>' (ex: 'attrchange_class') : received if the attribute of the jquery object changed
 *   					- data sent :
 *   						* newValue      - New value of the modified attribute
 *   						* oldValue      - Previous value of the modified attribute
 *   				- 'attrchange_style_<cssattributename_in_camelcase>' (ex:'attrchange_style_width') : received if the css attribute of the jquery object changed
 *   					- data sent :
 *   						* newValue      - New value of the modified attribute
 *   						* oldValue      - Previous value of the modified attribute
 *
 *   		its description is using an object with the following properties:
 *   		- how_process_event [default:{push}] : {immediate}||{push}||{delay:delay_value,preventcancel:<false(default)|true>}
 *   			if delay is defined, the processing of the event is delayed and activated at 'delay'
 *   			by default, any event delayed will be cancelled if the state changes
 *   			if preventcancel is defined, the delayed event won't be cancelled
 * 			- process_event_if :
 *   			Definition of condition test that will be evaluated, and if result is true then event will be processed
 *   			if not, see if a propagate_event_on_refused in order to trigger it... and exit...
 * 			- propagate_event_on_refused : an event name to trigger if process_event_if is false
 *   		- init_function  : function name or a function statement
 *   		- properties_init_function : parameters to send to init_function
 *   		- next_state : next state once init_function done. If not defined, there is no state change.
 *   		- pushpop_state :
 *   			If 'PushState', then current state is pushed in the StateStack then next_state takes place.
 *   			If 'PopState', then the next state will be the one on top of the StateStack which is poped. next_state is so overwritten... If the stack is void, there is no state change.
 *   		- next_state_when :
 *   			Definition of condition test that will be evaluated, and if result is true then state will change
 *   			Following variables may be used for the test
 *   			this	: the FSM object
 *   			this.EventIteration : variable that gives the iteration of the number of calls of the current event.
 *   							 EventIteration is reset when the state changes
 *   		- next_state_on_target :
 *   			Definition of condition test based on the current states of the defined submachines
 *   			the test consist to :
 *   				- get the current states of each defined sub-machines,
 *   				- match the current state to the given array, resulting to true if found
 *   				- apply the defined operator between the results
 *   		- next_state_if_error (default: does not change state) : state set if init_function returns false. .
 *   		- pushpop_state_if_error :
 *   			If 'PushState', then current state is pushed in the StateStack then next_state_if_error takes place.
 *   			If 'PopState', then the next state will be the one on top of the StateStack which is poped. If the stack is void, there is no state change. next_state_if_error is so overwritten...
 *   		- out_function	 : function name to do once next_state changed
 *   		- properties_out_function : parameters to send to out_function
 *   		- propagate_event : if == 'true', the current event is propagated to the next state
 *   							if it's the name of an event, triggers the event...
 *   							if an array of events, events are triggered in sequence
 *   		- prevent_bubble : if defined and true, the current event will not bubble to its parent machine
 *   		- UI_event_bubble : if defined and true, the current event will bubble. By default, no UI event bubbling...
 *   		- process_on_UItarget : if defined and true, the current event will be processed only if the event was directly targeting
 *   									the UI jQuery object linked to the machine
 *   	An event may be synonymous with another event. In this case, we simply give the name of the synonymous event.
 *
 * @remarks
 * - any FSM is automatically initialised with a 'start' event
 * - state function should return a boolean : true: ok works fine; false: error
 * - state function should have the following input :
 * 		- parameters : the properties_<init/out>_function
 * 		- event : the event
 * 		- data : the data sent with the event
 * - a default statename 'DefaultState' can be defined to define the default behaviour of some events...
 * - an event is first search in the current state, then if not found in the 'DefaultState'
 * - if an event is not found, nothing is done...
 * - a 'start' event is triggered when the FSM is started with InitManager
 * - when there are sub machines defined for a state :
 * 		- the events are sent to each defined submachines in the order
 * 		- once the event is processed by the submachines, it is bubbled to the upper machines
 * 		- it is possible to prevent the bubbling of events with the directive 'prevent_bubble' to true
 * 		- a submachine works as the main one :
 * 			- if no_reinitialisation == false (default) it is initialised
 * 			- then starts once entering in the state
 * 			- a start event is triggered to it
 *
 * - to trigger an event to the machine itself, use can use the 'trigger' function
 *      ex: myFSM.trigger('myevent');
 * - it is possible to trigger any event to a machine with the jquery trigger function :
 * 		ex: $('#myButton1').trigger('start',{targetFSM:myFsm});
 * - within a state function, it is possible to trigger event to any machine using its linked jQuery object : myFSM.myUIObject
 *   	ex : this.myUIObject.trigger('aEventName')
 * - if multiple machines are assigned to the same jQuery Object, it also possible to specify the FSM in the parameter :
 *   	ex : this.myUIObject.trigger('aEventName',{targetFSM:this})
 * - beware that if the submachine is no more accessible, it won't perhaps receive the message you triggered from it.
 * 		a workaround is to directly "push" an event in order that it will be processed within the flow of the current event processing.
 * 		the function to use is myFSM.pushEvent(anEventName, data) (or this.pushEvent in a FSM function)
 * 		ex: 			init_function : function(){this.pushEvent('setText','I push an event');},
 * - if a delayed event is sent again before a previous one was processed, the previous event is cancelled and the new one re-started
 * - a sub machine can manage its first state by handling the 'start' event in the DefaultState
 * - as the structure definition of the states of a machine is a javascript object,
 * 		it is then possible to define generic states or generic events as this example :
 * <code>
 * var myGenericEvent = {
 * 	next_state : aState,
 *  propagate_event : anEvent,
 *  ....
 * }
 * var myMachine = {
 * 	aState1 :
 * 		firstEvent 	: $.extend(true, {}, myGenericEvent), //copy of the myGenericEvent object
 * 		secondEvent	: {...eventdefinition...},
 * 		thirdEvent	: myGenericEvent,
 * ....
 * }
 * </code>
 * - if you stay coherent, it is possible to define and to change dynamically the states definition through myFSM._stateDefinition
 * - enterState and exitState can't be delayed
 * - all events in a submachine should have the prevent_bubble to true, except for those you'd like to be processed in other parts of the machine
 * - delegate machines should not be created on the DefaultState state
 * - if UI_event_bubble for an UI event is set to false by any part of the machine or submachine it will stay to false
 *
 *
 * The public available variables :
 * 	- myFSM.currentState : current processed state name
 * 	- myFSM.currentEvent : current processed event
 *  - myFSM.myUIObject : the jQuery object associated to the FSM
 *  - myFSM._stateDefinition : the definition of the states and events
 *  - myFSM._stateDefinition.<statename>.<eventname>.EventIteration - the number of times an event has been called
 *  - myFSM.opts - the defined options. Generally used to store local data
 *  - myFSM.rootMachine : the root machine
 *  - myFSM.parentMachine : the parent machine if it's in a sub machine (null if none)
 *
 *  Within the call of FSM function, you can refer to the FSM by 'this', examples :
 *  - this.currentState
 *  - this.currentEvent
 *  - this.currentEvent.type (name of the current processed event)
 *  - this.myUIObject
 *  - ...
 *  plus about event:
 *  - this.EventIteration : the current event iteration
 *  - this.actualTarget : the jQuery object that is currently targetted by an event
 *
 * @param anObject - a jquery object on which the FSM applies.
 * 						ATTENTION : the property 'id' needs to be defined to have the machine working properly
 * @param options - an object defining the options:
 * 	- boolean 	debug
 *  - integer 	LogLevel -
 *  	- 1 only errors displayed
 *  	- 2 - errors and warnings
 *  	- 3 - all
 *  - boolean 	AlertError 	- send an alert box when error
 *  - boolean 	startEvent 	- name of the starting event
 *  - integer 	maxPushEvent - size of the push events array
 *  - string	logFSM		- list of FSM names to follow on debug	(ex: "FSM_1 FSM_4"). If void, then displays all machine messages
 */

var fsm_manager = window.fsm_manager = function (anObject, aStateDefinition, options)
{
	var $defaults = {
			debug				: true,
			LogLevel			: 1,
			AlertError			: false,
			maxPushEvent		: 100,
			startEvent			: 'start',
			prefixFsmName		: 'FSM_',
			logFSM				: ""
		};

	nb_FSM = nb_FSM+1;

	// on charge les options passées en paramètre
	if (options == undefined) options=null;
	this.opts = jQuery.extend( {}, $defaults, options || {});

	/**
	 * @param string FSMName - name of the FSM
	 */
	this.FSMName = this.opts.prefixFsmName+nb_FSM;

	/**
	 * @param Object _stateDefinition - the definition of the states of the FSM
	 */
	this._stateDefinition = jQuery.extend(true, {}, aStateDefinition);
	this._originalstateDefinition = aStateDefinition;//keep the original definition here

	/**
	 * currentState - current state of the fsm
	 *
	 */
    this.currentState = '';

    /**
     * lastState - previous state of the current state
     */
    this.lastState=this.currentState;

	/**
	 * @param currentEvent - current event processed by the fsm
	 *
	 */
    this.currentEvent = '';

    /**
	 * @param pushStateList array	- a state list pushed that can be poped
	 *
	 */
	this.pushStateList	= new Array();

	/**
	 * @param processEventStatus	- status of the process event execution
	 * 		- idle : not working
	 * 		- processing : is processing an event
	 *
	 */
	this.processEventStatus	= 'idle';

	/**
	 * @param pushEventList array	- an event list waiting to be processed
	 *
	 */
	this.pushEventList	= new Array();

	/**
	 * @param myUIObject		- Target object of the FSM
	 */
	this.myUIObject	= anObject;

	/**
	 * @param listEvents - array of the events subscribed
	 */
	this.listEvents	={};

	/**
	 * @param currentDataEvent - the data of the event currently processed
	 */
	this.currentDataEvent	={};

	/**
	 * @param returnGeneralEventStatus - status to send back to the event triggering (if false, generally will prevent event propagation)
	 */
	this.returnGeneralEventStatus = true;

	/**
	 * @param rootMachine - root FSM machine of this current FSM
	 */
	if (this.opts.rootMachine == undefined) this.opts.rootMachine = this;
	this.rootMachine = this.opts.rootMachine;

	/**
	 * @param parentMachine - parent machine of this current one
	 */
	if (this.opts.nextParent == undefined) this.parentMachine = null;
	else this.parentMachine = this.opts.nextParent;
	this.opts.nextParent = this; //

	/**
	 * @param childrenMachine - list of children of the current machine
	 */
	this.childrenMachine	= new Array();
	if (this.parentMachine) this.parentMachine.childrenMachine.push(this);//update the children of the parent if any

/**
 * preventCancelId to manage the preventcancel by creating a unique id for doTimeout
 * @type {Number}
 */
  this.preventCancelId=0;


	var aState;
	var aEvent;
	var theEvents	='';
	var space		='';
	var theTarget=$(document);
	var attrChangeRequested 		= false;
	var attrStyleChangeRequested 	= false;
	var attrChangeEvents 			= new Array();
	var setStart 	= false;


	// look for all the defined and unique events
	// as we're on it, copy the synonym states and events
	for(aState in this._stateDefinition)
	{
		if (typeof this._stateDefinition[aState] == 'string') //the state is synomym to another... so copy it
			this._stateDefinition[aState]=this._stateDefinition[this._stateDefinition[aState]];
		for(aEvent in this._stateDefinition[aState])
		{
			//to process synonymous events
			if (typeof this._stateDefinition[aState][aEvent]  == 'string')
				this._stateDefinition[aState][aEvent] =  this._stateDefinition[aState][this._stateDefinition[aState][aEvent]];

			// filter to the events list not subscribed by the root machine
			// start is always sent to the current machine
			if (!this.rootMachine.listEvents[aEvent] 	&& aEvent != 'delegate_machines'
														&& aEvent != this.opts.startEvent)
			{
				this.listEvents[aEvent]=aEvent;
				if (this != this.rootMachine)
					this.rootMachine.listEvents[aEvent]=aEvent;
			}
			else if (aEvent == this.opts.startEvent) setStart= true;
		}
	}

	//list all defined events in the FSM in a $.on format
	var splitevent='';
	for(aEvent in this.listEvents)
	{
		splitevent = aEvent.split('_');
		if ( splitevent[0] == 'attrchange' )
		{
			attrChangeRequested=true;
			attrChangeEvents.push(aEvent);
			if ( (splitevent[1] == 'style') && (splitevent.length > 2) )
				attrStyleChangeRequested=true;
		}
		theEvents=theEvents+space+aEvent;
		space=' ';
	}

	//define a selector object if none defined
	if ( 	(!anObject.selector)
		&& 	(anObject.attr('id')
    &&  (anObject.attr('id') != 'iFSMDocumentRoot'))
		)
		anObject.selector='#'+anObject.attr('id');// set to the #id
	else anObject.selector='';

	//define the triggers for attrchange
	if ( attrChangeRequested && (anObject.selector) )
	{
		var aStyleListNew;
		var aStyleCssListNew={};
		var aStyleListOld;
		var aStyleCssListOld={};
		var splitres;
		var i;
		var aCssStyle;
		$(anObject.selector).attrchange({
			trackValues: true, // Default to false, if set to true the event object is updated with old and new value.
			callback: function (event) {
			    //event    	          - event object
			    //event.attributeName - Name of the attribute modified
			    //event.oldValue      - Previous value of the modified attribute
			    //event.newValue      - New value of the modified attribute
			    //Triggered when the selected elements attribute is added/updated/removed

				//send trigger event if an attribute change...
				if (jQuery.inArray('attrchange', attrChangeEvents)>=0)
					$(this).trigger('attrchange',event);
				//send trigger event on attribute changes
				if (jQuery.inArray('attrchange'+'_'+event.attributeName, attrChangeEvents)>=0)
					$(this).trigger('attrchange'+'_'+event.attributeName,{newValue:event.newValue,oldValue:event.oldValue});
				//send trigger for the style changes
				if ( (event.attributeName == 'style') && attrStyleChangeRequested)
				{
					if (event.newValue) aStyleListNew=event.newValue.split(';');
					else aStyleListNew = [];
					if (event.oldValue) aStyleListOld=event.oldValue.split(';');
					else aStyleListOld = [];

					for(i= 0; i < aStyleListNew.length; i++)
					{
						splitres=aStyleListNew[i].split(':');
						if (splitres.length==2)
							aStyleCssListNew[splitres[0]]=splitres[1].replace(/^\s+/g,'').replace(/\s+$/g,'');
					}
					for(i= 0; i < aStyleListOld.length; i++)
					{
						splitres=aStyleListOld[i].split(':');
						if (splitres.length==2)
							aStyleCssListOld[splitres[0]]=splitres[1].replace(/^\s+/g,'').replace(/\s+$/g,'');
					}
					for(aCssStyle in aStyleCssListNew)
					{
						if (aStyleCssListOld[aCssStyle] == undefined
								|| (aStyleCssListOld[aCssStyle] && aStyleCssListOld[aCssStyle] != aStyleCssListNew[aCssStyle])
							)
							$(this).trigger('attrchange_style_'+fsm_manager_getcss3prop(aCssStyle),{newValue:aStyleCssListNew[aCssStyle],oldValue:aStyleCssListOld[aCssStyle]});
					}
				}//end if

			}//end callback
		});	//end attrchange selector
	}//end if

	//if target object not a document one
	if ($.isWindow(anObject[0])) theTarget = $(window);

	//activate the listening of events on object/FSM
	var myFSM=this.rootMachine;
	if (theEvents!='')
		theTarget.on(theEvents, anObject.selector, function( event, dataevent )
		{
			myFSM.returnGeneralEventStatus=true;
			myFSM.processEvent(event.type,arguments);
			return myFSM.returnGeneralEventStatus;
		});

	//activate the start event if defined
	if (setStart)
	{
		var myLocalFSM = this;
		theTarget.on(this.opts.startEvent, anObject.selector, function( event, dataevent )
		{
			myLocalFSM.processEvent(event.type,arguments);
		});
	}

	this._log('new fsm_manager:'+this.FSMName+'-'+anObject.selector,2);

};//fsm_manager

/*available functions*/
/**
 * InitManager - init the One Page Fonction State machine
 * 				- a 'start' event is triggered.
 * public method
 * @aInitState - the init state at start
 */
fsm_manager.prototype.InitManager	= function(aInitState)
{
	this._log('InitManager');

	if (aInitState==undefined)
		this.currentState		= 'DefaultState';
	else
		this.currentState		= aInitState;

	if (this._stateDefinition['DefaultState']==undefined)
		this._stateDefinition.DefaultState={};

	//send 'start' event
	if (!this.parentMachine)
		this.trigger(this.opts.startEvent);
	else //directly talk to the sub machine to process the start
	{
		var anEv = new Array();
		anEv[0] = fsm_manager_create_event(this.myUIObject,this.opts.startEvent,null);
		this.processEvent(this.opts.startEvent,anEv,true);
	}

};//

/**
 * procesEvent - process an event according to the current state
 * public Method
 * @param string 	anEvent 	: an event name
 * @param Array 	data		: arguments sent by the triggering event [event, dataevent]
 * @param boolean 	forceProcess: force event to be processed
 * @return false to stop propagation
 * @comment
 * 	it is possible to pass the FSM Object to test the target through 'data' : data[data.length-1].targetFSM
 * 	ex : the function this.trigger always send the FSM through this way;
 */
fsm_manager.prototype.processEvent= function(anEvent,data,forceProcess) {

	var thisFSM = this;
	var currentState = this.currentState;
	var currentEvent = this.currentUIEvent = data[0];
	this.receivedEvent	= anEvent;
	this.currentDataEvent = data;
	this.currentEvent	= currentEvent;
	var currentStateEvent = this.currentState;
	var doForceProcess = (forceProcess==undefined?false:true);
	var anEv = new Array();//dummy event to be used in 'processEvent' function (see processing of enterEvent and exitEvent)
	anEv[0] = fsm_manager_create_event(this.myUIObject,'',null); // to use it, just change anEv[0].type='an_event_name';
	anEv[1] = data[1]; anEv[2]= data[2];

	this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> START Processing Event',3,1);

	//targetFSM is sent through the this.trigger function
	//we consider the sub FSMs of a machine as the same machine...
	//except if the event was triggered as addressing only the "localmachine"
	if (data.length > 1
			&& data[(data.length - 1)] != null
			&& data[data.length-1].targetFSM
			&& (data[data.length-1].targetFSM != this)
			&& (
						(data[data.length-1].localMachine)
					|| 	(data[data.length-1].targetFSM.rootMachine != this.rootMachine)
				)
		)
	{
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> not for the current machine ---> exit',3);
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
		return; //not for this machine...
	}

	if (data.length > 1 && data[(data.length - 1)] != null && data[data.length-1].localMachine)
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> process event locally',3);


	// submachine needs to be active only if in the correct parent state where it was defined
	if (this.subMachineName)
	{
		if (
					(!this.parentMachine._stateDefinition[this.parentMachine.currentState].delegate_machines)
				|| 	(
							(this.parentMachine._stateDefinition[this.parentMachine.currentState].delegate_machines)
						&& 	(!this.parentMachine._stateDefinition[this.parentMachine.currentState].delegate_machines[this.subMachineName])
					)
		)
		{
			this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> submachine can\'t run if the parent state is not active for the submachine ---> exit',3);
			this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
			return; //not in the correct parent state
		}
	}

	if (this._stateDefinition[currentState]==undefined)
	{
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> currentState does not exist!',3);
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
		return;
	}

	if ( ( anEvent == 'enterState' ) || ( anEvent == 'exitState' ) ) doForceProcess = true;

	//element is not a right target...?
	if (
				!this.myUIObject.is(currentEvent.currentTarget)
			&&	!this.myUIObject.is(currentEvent.target)
			&& 	(this.myUIObject[0] != document)
			&& !$.isWindow(currentEvent.currentTarget)
			&& !$.isWindow(currentEvent.target)
		)
	{
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> object not a good target  ---> '+$(currentEvent.currentTarget).attr('id')+'---> exit',3);
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
		return;
	}
	else
	{
		if (this.myUIObject[0] == document) this.actualTarget=$(document);
		else this.actualTarget = $(currentEvent.currentTarget);
	}

	var currentEventConfiguration = null;
	currentEventConfiguration = this._stateDefinition[currentState][anEvent];

	//if we are still processing we push the event, except if explicitly asked otherwise
	//see if we should push the event
	if (	doForceProcess == false
			&& this.processEventStatus != 'idle'
			&& (
					currentEventConfiguration == undefined
					|| ( 	currentEventConfiguration
							&& 	currentEventConfiguration.how_process_event == undefined
						)
					|| ( 	currentEventConfiguration
							&& 	currentEventConfiguration.how_process_event
							&& 	currentEventConfiguration.how_process_event.immediate == undefined
							&& 	currentEventConfiguration.how_process_event.delay == undefined
					)
				)
		)
	{
		this.pushEvent(anEvent,data);
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Event pushed (lastevent)---> '+this.lastevent+' --> exit',3);
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
		return;
	}

	this.lastevent=currentState+'-'+anEvent;//unused...mainly for debug...

	/*
	 * Processing of the sub machines
	 */
	if ( ( this._stateDefinition[currentState].delegate_machines )
		)
	{
		var aSubMachineDefinition;
		for(aSubMachine in this._stateDefinition[currentState].delegate_machines)
		{
			this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> delegate to submachine---> '+aSubMachine,3);
			aSubMachineDefinition = this._stateDefinition[currentState].delegate_machines[aSubMachine];

			//initialize the sub machines if needed
			if (aSubMachineDefinition.myFSM == undefined)
			{
				this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> process submachine ---> create FSM for the submachine '+aSubMachine,3);
				this._stateDefinition[currentState].delegate_machines[aSubMachine].myFSM = new fsm_manager(this.myUIObject,aSubMachineDefinition.submachine,this.opts); //create the machine
				this._stateDefinition[currentState].delegate_machines[aSubMachine].myFSM.opts.FSMParent=this;
				this._stateDefinition[currentState].delegate_machines[aSubMachine].myFSM.subMachineName=aSubMachine;
			}

			if 	( anEvent == 'enterState' )
			{
				if (	(aSubMachineDefinition.myFSM.currentState =='')//never initialised if ==''
					||	(aSubMachineDefinition.no_reinitialisation == undefined)
					||	(aSubMachineDefinition.no_reinitialisation == false)
					)
				{
					aSubMachineDefinition.myFSM.InitManager();//reinit the sub machine
				}
			}
			else if	( anEvent == 'exitState' )
			{
				anEv[0].type='exitMachine';
				aSubMachineDefinition.myFSM.processEvent('exitMachine',anEv,true);//stop the sub machine

				//we cancel any waiting events on the state
				aSubMachineDefinition.myFSM.cancelDelayedProcess();
			}
			// process event except on the enterState and exitState events that are not to be delegated... or if we dont propagate the event amongst the different machines
			else
			{

				this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> process submachine  (event)---> '+aSubMachine+'('+anEvent+') Start',3);
				aSubMachineDefinition.myFSM.processEvent(anEvent,data);
				this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> process submachine  (event)---> '+aSubMachine+'('+anEvent+') Processed',3);

				//current state changed during the process of the submachine...?
				//not sure it is a normal behaviour... if it occurs, we exit...
				if (currentState != this.currentState)
				{
					this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> process submachine changed the current environment (event)',3);
					this.cleanExitProcess();
					this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
					return;
				}

				if (
							(	aSubMachineDefinition.myFSM._stateDefinition[aSubMachineDefinition.myFSM.currentState][anEvent]
							&& 	aSubMachineDefinition.myFSM._stateDefinition[aSubMachineDefinition.myFSM.currentState][anEvent].prevent_bubble
							)
						||
							(	aSubMachineDefinition.myFSM._stateDefinition.DefaultState[anEvent]
							&& 	aSubMachineDefinition.myFSM._stateDefinition.DefaultState[anEvent].prevent_bubble
							)
						|| 	(anEvent == this.opts.startEvent)
					)
				{
					this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> submachine processed and exit due to prevent_bubble directive',3);

					this.cleanExitProcess();
					this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> submachine exit',3);
					this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
					return;
				}
			}
		}
	}

	/*
	 * Processing of the current event on the current state
	 */

	//is the event to be processed?
	if ( (currentState=='DefaultState') || (currentEventConfiguration == undefined) )
	{
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> take Event '+anEvent+' configuration from DefaultState (not present in current state)',3);
		currentEventConfiguration = this._stateDefinition.DefaultState[anEvent];
		if (currentEventConfiguration == undefined) {
			if ( ['start','enterState','exitState','exitMachine'].indexOf(anEvent) < 0)
			{
				this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> take Event '+anEvent+' configuration from catchEvent',3);
				currentEventConfiguration = this._stateDefinition.DefaultState["catchEvent"];
				//we create the dummy event in the default state if it does not exist for the catchall
				if (!this._stateDefinition['DefaultState'][anEvent])
					this._stateDefinition['DefaultState'][anEvent]=jQuery.extend( true,{}, currentEventConfiguration);
			}
		}

		if (currentEventConfiguration == undefined) {
			this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Event '+anEvent+' does not exist and no catchEvent--> will exit',3);
			this.cleanExitProcess();
			this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
			return;
		}
		currentStateEvent = 'DefaultState';
	}

	//is this a potential Pop State?
	if (currentEventConfiguration.pushpop_state
			&& (currentEventConfiguration.pushpop_state =='PopState')
			&& (this.pushStateList.length > 0)
		)
		currentEventConfiguration.next_state = this.pushStateList[this.pushStateList.length-1];
	if (currentEventConfiguration.pushpop_state_if_error
			&& (currentEventConfiguration.pushpop_state_if_error =='PopState')
			&& (this.pushStateList.length > 0)
		)
		currentEventConfiguration.next_state_if_error = this.pushStateList[this.pushStateList.length-1];

	//look if event is processed when coming from any target
	if (	!this.myUIObject.is(currentEvent.target)
			&& 	(this.myUIObject[0] != document)
			&& !$.isWindow(currentEvent.currentTarget)
			&& !$.isWindow(currentEvent.target)
			&& currentEventConfiguration.process_on_UItarget
			&& currentEventConfiguration.process_on_UItarget == true
		)
	{
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Event '+anEvent+' does not address the correct UI target (see process_on_UItarget) will exit',3);
		this.cleanExitProcess();
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
		return;
	}

	//look if we let the bubbling of UI event on this event
	// no bubbling by default
	if (	/*(this.myUIObject[0] != document)
			&&*/
			(!currentEventConfiguration.UI_event_bubble
					|| 	currentEventConfiguration.UI_event_bubble==false
				)
		)
	{
		currentEvent.stopPropagation();
		this.returnGeneralEventStatus=false;
		this.rootMachine.returnGeneralEventStatus=false;//the UI events always call the root machine
	}

	//is it a delayed event?
	if 	( 	doForceProcess == false
			&& currentEventConfiguration
			&& 	currentEventConfiguration.how_process_event
			&& 	currentEventConfiguration.how_process_event.delay
		)
	{
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Event '+anEvent+' delayed will exit',3);
		this.delayProcess(anEvent, currentEventConfiguration.how_process_event.delay, data);
		this.cleanExitProcess();
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
		return;
	}

	//compute EventIteration
	if (this._stateDefinition[currentStateEvent][anEvent].EventIteration == undefined)
		this._stateDefinition[currentStateEvent][anEvent].EventIteration =0;

	this._stateDefinition[currentStateEvent][anEvent].EventIteration++;
	this.EventIteration = this._stateDefinition[currentStateEvent][anEvent].EventIteration;

	//verify if the event can be processed according to 'enter' condition
	if 	(		(currentEventConfiguration.process_event_if)
			&& 	(eval(currentEventConfiguration.process_event_if) == false)
		)
	{
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Event '+anEvent+' event not allowed to process (process_event_if rule is not OK) will exit',3);
		if 	(currentEventConfiguration.propagate_event_on_refused)
		{
			this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Event '+currentEventConfiguration.propagate_event_on_refused+' triggered on exit because of propagate_event_on_refused',3);
			this.trigger(currentEventConfiguration.propagate_event_on_refused,null,currentEventConfiguration.propagate_event_on_localmachine);
		}
		//exit as not accepted...
		this.cleanExitProcess();
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);
		return;
	}

  //*********************************************
	//ok we will really process this event...
	//*********************************************
	this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> currently processing',2);
	var lastprocessEventStatus = this.processEventStatus;
	this.processEventStatus = 'processing';

	var funcReturn = true;
	var localdata;

  //clear any preventCancel tag
  if (data && data[1] && data[1].preventCancelSet) delete(data[1].preventCancelSet);

	//call to the action (init_function) before transition state
	if (currentEventConfiguration.init_function)
	{
		localdata = [].slice.call(data);
		localdata.unshift(currentEventConfiguration.properties_init_function);
		funcReturn= currentEventConfiguration.init_function.apply(this,localdata);
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> init_function done',3);
	}

	/*
	 * Process the transition of state
	 *
	 */
	// do we change state?

	//is this a Push/Pop State?
	if (funcReturn != false)//it's ok for next_state
	{
		if (currentEventConfiguration.pushpop_state)
		{
			switch(currentEventConfiguration.pushpop_state)
			{
			case 'PushState':
				this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Push state to state '+this.currentState,3);
				this.pushStateList.push(this.currentState); //do not use currentStateEvent!
				break;
			case 'PopState':
				if (this.pushStateList.length > 0)
				{
					this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Pop state to state '+currentEventConfiguration.next_state,3);
					this.pushStateList.pop();
				}
				break;
			}
		}
	}

	//do we change of state?
	if ( 	(funcReturn != false)
		&& 	(currentEventConfiguration.next_state)
		&& 	(currentState != currentEventConfiguration.next_state)
		&&	(
				(
					(currentEventConfiguration.next_state_when 		== undefined)
				&& 	(currentEventConfiguration.next_state_on_target == undefined)
				)
			|| 	(
					(currentEventConfiguration.next_state_when)
				&& 	(eval(currentEventConfiguration.next_state_when) == true)
				)
			|| 	(
					(currentEventConfiguration.next_state_on_target)
				&& 	(this.subMachinesRespectTargets(anEvent) == true)
				)
			)
		)
	{
		//we reinit the iteration on the events
		$.each(this._stateDefinition[this.currentState],
				function(aKey,aValue)
				{
          if (!thisFSM._stateDefinition[thisFSM.currentState][aKey])
          {
            thisFSM._log(aKey+" does not exist in state "+thisFSM.currentState,1);
          }
					else if (aKey!='delegate_machines')
						thisFSM._stateDefinition[thisFSM.currentState][aKey].EventIteration =0;
				});

		//we cancel any waiting events on the state
		this.cancelDelayedProcess();

		anEv[0].type='exitState';
		//we alert that we're exiting the state (except if we're starting the machine...
		if (anEvent !=this.opts.startEvent)
		{
			this.processEvent('exitState',anEv,true);
		}

		/*
    *********************************************
		 * we change the current state Here!
    *********************************************
		 */
		if (this._stateDefinition[currentEventConfiguration.next_state])
		{
			this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Go to (see next_state) '+currentEventConfiguration.next_state,3);

			this.lastState=this.currentState;
			this.currentState = currentEventConfiguration.next_state;
		}
		else
		{
			this._log('processEvent: '+this.FSMName+':'+currentEventConfiguration.next_state+'-> DOES NOT EXIST!',1);

			this.lastState=this.currentState;

		}


    //*********************************************
		//and now  we're entering the new state
    //*********************************************
		anEv[0].type='enterState';
		this.processEvent('enterState',anEv,true);

		//propagate event if asked
		//propagate event(s)
		if 	(currentEventConfiguration.propagate_event != undefined)
		{
			if (!(currentEventConfiguration.propagate_event instanceof Array))
				currentEventConfiguration.propagate_event=[currentEventConfiguration.propagate_event];
			$.each(currentEventConfiguration.propagate_event,
				function(aKey,aPropagateEvent)
				{
					thisFSM._log('processEvent: '+thisFSM.FSMName+':'+currentState+':'+anEvent+'-> trigger event (see propagate_event) ---> '+aPropagateEvent,3);
					if (aPropagateEvent === true)
						thisFSM.trigger( anEvent, data[1],currentEventConfiguration.propagate_event_on_localmachine);
					else
						thisFSM.trigger( aPropagateEvent, data[1],currentEventConfiguration.propagate_event_on_localmachine);
			});
		}
	}
	/*
	 * we stay in the same state?
	 * so process the event propagation
	 */
	else if ( 	(funcReturn != false)
			&& (currentEventConfiguration.propagate_event != undefined)
		)
	{
		if (!(currentEventConfiguration.propagate_event instanceof Array))
			currentEventConfiguration.propagate_event=[currentEventConfiguration.propagate_event];
		//propagate event(s)
		$.each(currentEventConfiguration.propagate_event,
			function(aKey,aPropagateEvent)
			{
				thisFSM._log('processEvent: '+thisFSM.FSMName+':'+currentState+':'+anEvent+'-> trigger event (see propagate_event) ---> '+aPropagateEvent,3);
				if (aPropagateEvent === true)
					thisFSM.trigger( anEvent, data[1], currentEventConfiguration.propagate_event_on_localmachine);
				else
					thisFSM.trigger( aPropagateEvent, data[1], currentEventConfiguration.propagate_event_on_localmachine);
		});
	}
	/*
	 * oups there was an error during the processing of the action
	 */
	else if ( (funcReturn == false) && (currentEventConfiguration.next_state_if_error) )
	{
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> error in init_function',3);
		//is this a Push/Pop State?
		if (currentEventConfiguration.pushpop_state_if_error)
		{
			switch(currentEventConfiguration.pushpop_state_if_error)
			{
			case 'PushState':
				this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Push state to state '+this.currentState,3);
				this.pushStateList.push(this.currentState); //do not use currentStateEvent!
				break;
			case 'PopState':
				if (this.pushStateList.length > 0)
				{
					this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Pop state to state '+currentEventConfiguration.next_state_if_error,3);
					this.pushStateList.pop();
				}
				break;
			}
		}

		/*
     *********************************************
		 * we change the current state Here!
     *********************************************
		 */
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> Go to (see next_state_if_error) '+currentEventConfiguration.next_state_if_error,3);
		this.lastState=this.currentState;
		this.currentState = currentEventConfiguration.next_state_if_error;

		//and now that we're entering the new state
		anEv[0].type='enterState';
		this.processEvent('enterState',anEv,true);
	}
	else
	{
		//nothing to do?
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> nothing to do',3);
	}

	// do the exit action
	if (currentEventConfiguration.out_function)
	{
		localdata = [].slice.call(data);
		localdata.unshift(currentEventConfiguration.properties_out_function);
		funcReturn= currentEventConfiguration.out_function.apply(this,localdata);
		this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> out_function done',3);
	}

	this.processEventStatus = lastprocessEventStatus; //we globally finished the job...

	this.cleanExitProcess();
	this._log('processEvent: '+this.FSMName+':'+currentState+':'+anEvent+'-> EXIT PROCESS',3,-1);

};//end of processEvent

/*
 * cleanExitProcess - clean for exit the processing of an event
 */
fsm_manager.prototype.cleanExitProcess = function(anEvent,data) {
	// processing lasting events
	//we don't process the events if we were currently on an immediate event...
	if (
				(this.pushEventList.length)
			&& 	(this.processEventStatus == 'idle' || this.pushEventList.length>this.opts.maxPushEvent)
		)
	{
		this.popEvent();
	}
};

/**
 * pushEvent - push an event in the flow of the processing of an event
 * public Method
 * @param anEvent 	: an event name
 * @param data		: {event, data}
 * if data is not an array, we consider that it is an external pushed event...then create one from anEvent and data.
 */
fsm_manager.prototype.pushEvent	= function(anEvent,data) {
	this._log('pushEvent:  ---> '+anEvent);
	if (this.pushEventList.length>this.opts.maxPushEvent)
	{
		this._log('pushEvent: too much events...  ---> '+this.pushEventList.length,2);
		return;
	}
	if ( (data == undefined) || (data.length == 0) || data[0].type == undefined )
	{
		var datatmp = new Array();
		datatmp[0] = fsm_manager_create_event(this.myUIObject,anEvent);
		datatmp[1] = data;
		data = datatmp;
	}
	var anEventToPush =  {anEvent:anEvent, data:data};
	this.pushEventList.push( anEventToPush );
	this._log('pushEvent: push  nb event ---> '+this.pushEventList.length);
};

/*
 * popEvent - pop an event and process it
 * private Method
 * 		we process event in a FIFO order
 */
fsm_manager.prototype.popEvent	= function() {
	this._log('popEvent');
	if (this.pushEventList.length > 0)
	{
		anEventToProcess = this.pushEventList.shift();
		this._log('popEvent:'+anEventToProcess.anEvent,3);
		if (anEventToProcess == undefined || anEventToProcess.anEvent == undefined) return false;
		this.processEvent(anEventToProcess.anEvent,anEventToProcess.data);
		return true;
	}
	else this._log('popEvent void list');
	return false;
};//

/**
 * delayProcess - push an event after a delay
 * private Method
 * @param anEvent 	: an event name
 * @param aDelay	: a delay to do the processing
 * @param data		: {event, data}
 */
fsm_manager.prototype.delayProcess	= function(anEvent, aDelay, data) {
	this._log('delayProcess:  ---> '+anEvent);

	this.preventCancelId++;

  //let aHashData = this.hashCode(JSON.stringify(data[1]));
  let currentState = this.currentState;

  let aDelayedProcessName=this.myUIObject.attr('id')+currentState+anEvent+this.preventCancelId;

  if (!data[1]) data[1]={};//no data defined.... so define one

  if (!this._stateDefinition[this.currentState][anEvent]) currentState = "DefaultState";

	if (!this._stateDefinition[currentState][anEvent].how_process_event.DelayedProcessNames)
  {
    this._stateDefinition[currentState][anEvent].how_process_event.DelayedProcessNames=[];
  }

  if (this._stateDefinition[currentState][anEvent].how_process_event.preventcancel)
  {
    if (data[1].preventCancelSet) aDelayedProcessName=data[1].preventCancelSet; // same request that needs to be delayed again
    else data[1]['preventCancelSet']=aDelayedProcessName;
  }

	this._stateDefinition[currentState][anEvent].how_process_event.DelayedProcessNames[aDelayedProcessName]=aDelayedProcessName;
	//setTimeout(this.launchProcess,aDelay,this,anEvent,data);
	jQuery.doTimeout(aDelayedProcessName,aDelay,fsm_manager_launchProcess,this,anEvent,data);
};


/**
 * hash function
 * from https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 * @todo needed?
**/
fsm_manager.prototype.hashCode = function(source) {
	let hash = 0;
	if (source.length == 0) {
		return hash;
	}
	for (var i = 0; i < source.length; i++) {
		var char = source.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

/**
 * cancelDelayedProcess - delete all delayed events of the current state except those declared as prevented
 * public Method
 */
fsm_manager.prototype.cancelDelayedProcess	= function() {
	this._log('cancelDelayedProcess');

	var currentState = null;
	var currentEventConfiguration;

	for(aEvent in this._stateDefinition[this.currentState])
	{
		currentState = this.currentState;

		if (!this._stateDefinition[currentState][aEvent]) currentState = "DefaultState";

    if (!this._stateDefinition[currentState][aEvent])
    {
      this._log('cancelDelayedProcess: '+aEvent+" has no definition for "+this.currentState,1);
      return;
    }

		currentEventConfiguration = this._stateDefinition[currentState][aEvent];

		if 	( 	 	currentEventConfiguration.how_process_event
				&& 	(		currentEventConfiguration.how_process_event.preventcancel == undefined
						||  currentEventConfiguration.how_process_event.preventcancel != true
					)
			)
		{
			if (currentEventConfiguration.how_process_event.DelayedProcessNames)
			{
				for(aDelayedProcessName in currentEventConfiguration.how_process_event.DelayedProcessNames)
				{
					jQuery.doTimeout(aDelayedProcessName);//cancel event
				}
				currentEventConfiguration.how_process_event.DelayedProcessNames=[];
			}
		}
	}

};


/**
 * this.trigger - trigger an event to the machine
 * public function
 * @param aEventName - name of an event
 * @param [object](option) data parameters linked to the event
 * @param sendToLocalMachine [true|false(default)](option) - if true, send event to the local machine, if not to the root machine
 */
fsm_manager.prototype.trigger = function (aEventName,data,sendToLocalMachine) {
	if (!sendToLocalMachine) sendToLocalMachine=false;
	var anEv = new Array();
	anEv[0] = fsm_manager_create_event(this.myUIObject,aEventName,null);
	anEv[1] = data;
	anEv[2] = {targetFSM:this,localMachine:sendToLocalMachine};
	if (!sendToLocalMachine)
		this.rootMachine.processEvent(aEventName,anEv);
	else
		this.processEvent(aEventName,anEv);

};//end of

/**
 * subMachinesRespectTargets - verify if the set of submachines respects the target of the current event
 * @param String anEvent
 * @return boolean - true if target is respected
 */

fsm_manager.prototype.subMachinesRespectTargets = function (anEvent) {
	this._log('subMachinesRespectTargets:');
	var aStateDefinition 	= this._stateDefinition[this.currentState];
	var targetConfiguration = aStateDefinition[anEvent].next_state_on_target;
	var condition 	= targetConfiguration.condition;
	var aResult 	= (condition == '||') ? false:true;
	var aSMList 	= targetConfiguration.submachines;

	var localRes;
	for(aSubMachine in aSMList)
	{
		localRes = targetConfiguration.submachines[aSubMachine].target_list.indexOf(aStateDefinition.delegate_machines[aSubMachine].myFSM.currentState) > -1 ;
		if (
				(targetConfiguration.submachines[aSubMachine].condition != undefined)
			&&  (targetConfiguration.submachines[aSubMachine].condition == 'not')
			)
			localRes = !localRes;

		if (condition == '||')
		{
			aResult = aResult || localRes;
			if (aResult == true) return aResult;//we can stop as it a && operator
		}
		else if (condition == '&&')
		{
			aResult = aResult && localRes;
			if (aResult == false) return aResult;//we can stop as it a && operator
		}
		else
		{
			this._log('operator unknown'+condition);
			return aResult;
		}

	}
	return aResult;
};
/**
 * this._log - log function
 * private function
 * @param message - message to log
 * @param error_level (default : 3)
 * 			- 1 : it's an error
 * 			- 2 : it's a warning
 * 			- 3 : it's a notice
 * @param add_offset (default:0) :
 * 		1 : add blank offset on the left of the message
 * 		-1 : remove left blank offset on the left of the message
 * @remarks
 * - this.opts.debug needs to be set to have errors raised
 * - if this.opts.AlertError is set, then error message will raise an alert box
 * - if this.opts.logFSM is set, and contains a FSM name list, then only FSM in this list will raise errors
 */
fsm_manager.prototype.log_offsetstring='';
fsm_manager.prototype._log = function (message) {
	/*global console:true */

  let error = (arguments[1])? arguments[1] : 3;

  //show only errors if debug is not set
  if ( (error >= 2) && (!this.opts.debug) ) return;
	if ( error > this.opts.LogLevel) return; //we continue if error_level  <= LogLevel

  // if logFSM is defined, only log the FSM listed in it
	if ( this.opts.logFSM && this.opts.logFSM.indexOf(this.FSMName)<0) return;

	if ( (arguments.length > 2) && (arguments[2] == -1))
		this.log_offsetstring = this.log_offsetstring.replace('  ','');

	if (window.console && console.log)
	{
    if (error == 1)
    {
      console.error('[fsm] ' + this.log_offsetstring + message);
    }
    else if (error == 2)
    {
      console.warn('[fsm] ' + this.log_offsetstring + message);
    }
    else
    {
      console.log('[fsm] ' + this.log_offsetstring + message);
    }
		if ( (error == 1) && this.opts.AlertError) alert(message);
		if ( ( arguments.length > 2 ) && (arguments[2] == 1) )
			this.log_offsetstring = this.log_offsetstring+"  ";
	}

};//end of _log

/*
 * functions that can be used for the events of a state machine
 */

/**
 * triggerMe - trigger an event on an object
 * 				to be used within a state function
 * example :
 * 				init_function 				: fsm_manager_triggerMe,
 * 				properties_init_function 	: {objectToTrigger:'#myButton',eventNameToTrigger:'click'} ,
 * @param objectParameters
 * 	- {objectToTrigger: a jquery selector ,eventNameToTrigger: a event name to trigger}
 * @param event - the FSM event that called the function
 * @param data - the FSM event data
 *
 * @param this - the FSM object (well... if called in a state function)
 * @deprecated
 */
fsm_manager_triggerMe = function(objectParameters, event, data)
{
	this._log('[fsm_manager_triggerMe]'+$(objectParameters.objectToTrigger).attr('id')+'-'+objectParameters.eventNameToTrigger);

	$(objectParameters.objectToTrigger).trigger( objectParameters.eventNameToTrigger );
};

/**
 * fsm_manager_getcss3prop -
 * 	pass in an unaltered CSS property, and the function will return the vendor specific JavaScript equivalent property
 * 	supported by the browser
 * @param string cssprop - a css property
 *
 * <code>
 * getcss3prop('border-radius'); // returns 'borderRadius' or one of the variants, such as 'MozBorderRadius', 'WebkitBorderRadius' etc
 * </code>
 */
function fsm_manager_getcss3prop(cssprop){
    var css3vendors = ['', '-moz-','-webkit-','-o-','-ms-','-khtml-'];
    var root = document.documentElement;
    function camelCase(str){
        return str.replace(/\-([a-z])/gi, function (match, p1){ // p1 references submatch in parentheses
            return p1.toUpperCase(); // convert first letter after "-" to uppercase
        });
    }
    for (var i=0; i<css3vendors.length; i++){
        var css3propcamel = camelCase( css3vendors[i] + cssprop );
        if (css3propcamel.substr(0,2) == 'Ms') // if property starts with 'Ms'
            css3propcamel = 'm' + css3propcamel.substr(1); // Convert 'M' to lowercase
        if (css3propcamel in root.style)
            return css3propcamel;
    };
    return undefined;
}

/**
 * fsm_manager_create_event -
 * 	create a dummy event compliant with the FSM processing
 * @param string anEventName - an event name
 * @param {} aTarget - a javascript DOM object
 */
function fsm_manager_create_event(aTarget,anEventName,data){
	var aDummyEvent = {};
	aDummyEvent.data =  data;
	aDummyEvent.target =  aTarget;
	aDummyEvent.currentTarget =  aTarget;
	aDummyEvent.type =  anEventName;
	aDummyEvent.stopPropagation=function(){return true;};
	return aDummyEvent;
}
/**
 * launchProcess -
 * private Method
 * @param anEvent 	: an event name
 * @param aDelay	: a delay to do the processing
 * @param data		: {event, data}
 */
fsm_manager_launchProcess	= function(aFsm, anEvent, data) {
	aFsm._log('launchProcess:  ---> '+anEvent);
	aFsm.processEvent(anEvent,data,true);
};

/**
 * @param iFSMList - array of the created FSM linked with their Objects
 * iFSMList[aStateDefinition]
 */
var iFSMList = {};
//jQuery definition
/**
 * $.iFSM - iterate over a jQuery object to assign for each matched element a FSM machine
 * @param  aStateDefinition - a state definition
 * @param  options - options of the FSM machine
 * Remarks :
 * - any DOM object involved with a FSM needs to have its 'id' attribute defined
 * - the init state may be defined with options.initState
 */
$.fn.iFSM = function(aStateDefinition, options)
{
	return this.each(
		function()
		{
      if ( ($(this)[0] ==  document) && !$(this).attr('id') )
      {
        // set an id to document... a iFSM needs one...
        $(this).attr('id','iFSMDocumentRoot');
      }

			if ($(this).attr('id') != undefined)
			{
				if (iFSMList[$(this).attr('id')]==undefined)
				{
					iFSMList[$(this).attr('id')]=[];
				}

        var iFSM = new fsm_manager($(this), aStateDefinition, options);
        if ($(this).getFSM(aStateDefinition))
        {
          console.warn('[warn][fsm] state machine was already set for this state definition on '+$(this).attr('id'));
        }
				iFSMList[$(this).attr('id')].push(iFSM) ;
				if (options && options.initState  != undefined) iFSM.InitManager(options.initState);	//start it
				else iFSM.InitManager();	//start it
			}
			else
			{
				if (options && options.debug) alert('Can\'t initialized state machine because the DOM object has no "id" property');
				console.warn('[error][fsm] Can\'t initialized state machine because the DOM object has no "id" property');
			}
	});
};
/**
 * $.getFSM - returns the array of FSM linked to the object
 * @param aStateDefinition (optional) - if defined
 * @return an array of the FSMs linked to the object
 */
$.fn.getFSM = function(aStateDefinition) {

	if ( (this.length != 1) || (this.attr('id') == undefined) )
		return [];

	if (aStateDefinition == undefined)
		return iFSMList[$(this).attr('id')];
	else
	{
		var aFSM = null;
		for (var i = 0, aFSMItem = null; i < iFSMList[$(this).attr('id')].length ; i++)
		{
			aFSMItem = iFSMList[$(this).attr('id')][i];
			if (aFSMItem._originalstateDefinition == aStateDefinition)
			{
				aFSM = aFSMItem;
				break;
			}
		}
		return aFSM;

	}


};



})(jQuery);
