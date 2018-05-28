iFSM - a Flexible Finite and Hierarchical State Machine ( FSM / HSM ) for JQuery Objects
========================================================================================

Designed to manage the complexity of graphic user interface behaviours with javascript, this jQuery package can animate and manage HTML elements with their dynamic behaviours using Finite State Machines.

It takes jQuery objects to define the states of the Web page elements and the events the page elements should react on.

Each state may be defined with the code that has to be executed when the element enters or leaves a state.

The state definition may also define what is the next state when a given event happens on that element, like for instance the user clicks on the element. All jQuery events are supported to trigger the change of state. An autobinding mecanism automatically binds the events defined in the states.

It also supports conditional processing of events and state changes using sub-machine states, as well creating new states and events dynamically.

The FSM has Push/Pop state capabilities and offers different useful features as:
  * complete integration with jQuery
  * automatic javascript event bindings
  * attribute or css change on jQuery object linked to a machine detected, triggering events to the machine
  * conditional processing of events allowing defining rules
  * conditional state change according to submachines states, allowing to describe promises
  * delayed and asynchronous event processing
  * capability to create or change dynamically states and events on the machines
  * ...


Official website
================
http://www.intersel.fr/ifsm-jquery-plugin-demos.html with some live demos


The "Hello world" example
=========================

This example shows a really simple example implementing the following state diagram:
![](http://www.intersel.fr/assets/gitdemos/wiki_images/helloexample.png)

```html
<!DOCTYPE html>
<html>
<head>
    <title>iFSM in action! a Finite State Machine for jQuery</title>
	<script type="text/javascript" src="extlib/jquery-3.2.0.min.js"></script>
	<script type="text/javascript" src="extlib/jquery.dotimeout.js"></script>
	<script type="text/javascript" src="extlib/jquery.attrchange.js"></script>
	<script type="text/javascript" src="iFSM.js"></script>

    <script type="text/javascript">
    	var aStateDefinition = {
		FirstState:
		{
		     enterState:
		    {
		        init_function: function(){alert("Hello! First State");}
		    },
		    click:   
		    {
		        next_state: 'NextState'
		    }
		},
		NextState:
		{
		    enterState:   
		    {
		        init_function: function(){alert("Please to meet you! Next State");}
		    },
		    click:   
		    {
		        next_state: 'FirstState'
		    }
		},
		DefaultState:
		{
		    start:
		    {
		        next_state: 'FirstState'
		    }
		}
	};
	$(document).ready(function() {
		$('#myButton').iFSM(aStateDefinition);
	});

    </script>
</head>
<body style="margin:100px;">
    <button id="myButton">Click Me</button>
</body>
</html>
```
Examples
========
See them live: http://www.intersel.fr/ifsm-jquery-plugin-demos.html#demolist

  - [Example_Basic.html](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_Basic.html) - the above example in action
  - [Example_1.html](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_1.html) - simple example of independent buttons using the same machine definition
  - [Example_2.html](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_2.html) - simple example of sub-machine delegation. It shows how to set conditions on state change according to submachine states.
  - [Example_DropdownMenu.html](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_DropdownMenu.html) - a dropdown menu example.
  - [Example_PushPopState.html](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_PushPopState.html) - simple example of using the "Push/Pop" capabilities on states.
  - [Example_AnalyseString.html](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_AnalyseString.html)  - show analysis on string input analysis with palindrome, showing that iFSM is more than a simple FSM using a Push/Pop states Stack-Based.
  - [Example_Rulers](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_Rulers.html) - showing how to use iFSM to validate input data according to rules, with an example of the management of the keyboard input filtering only number input
  - [Example_Request](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_Request.html) - simple example of a 'request' process with a diagram showing the state changes according to the triggered events
  - [Example_HSM_calculator](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_HSM_calculator.html) - a simple working calculator managed with states and events...
  - The [Mastermind game](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Mastermind.html)...
  - A [Bouncing ball](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_BouncingBall.html) using canvas (with jcanvas) showing a game loop example and [a little game](http://www.intersel.fr/assets/gitdemos/iFSM/Examples/Example_BouncingBall_reacting_to_mouse.html) with requestframeanimation support for the game loop...

See some nice HTML5 animations done with specific machines made with [iFSMAnimation](https://github.com/intersel/iFSMAnimation):
  - http://intersel.net/demos/intersel/voeux_demo/

.iFSM(aStateDefinition, [options])
==================================
Create a Finite State Machine from the "aStateDefinition" object to bind with the jQuery object.

  * aStateDefinition: object, defines the different states and bound events. See "Machine State Definition" chapter.
  * options: object, defines the options of the FSM:
    * startEvent: name of the starting event (default: 'start')
    * initState: name of the state to set at start of the machine
    * debug (true|false): show debug message on the console (default true)
    * LogLevel
      * '1' only errors displayed
      * '2' - errors and warnings (default)
      * '3' - all  
    * logFSM:  list of FSM names to follow on debug (ex: "FSM_1 FSM_4"). If void, then displays all machine messages
    * <myProperties>: any properties that could be used and accessed by the machine with this.opts as this.opts.<myProperties>

  Call Examples
  =============

```html
  <button id="myButton">Button</button>
  <script>
  	aFSMDefinition = {
  		aState:{
  			click:{
  				init_function:function(){
  					alert(this.opts.inputFunction(this.opts.inputData));
  				}
  			}
  		}
  	};
	$('#myButton').iFSM(aFSMDefinition,{
		 initState:'aState'
		,inputData:'Hello World :-)'
		,inputFunction:function(aText){return aText;}
		,LogLevel:1
		});  
  </script>
```

.getFSM([aStateDefinition])
===========================
returns the array of FSMs bound to the jQuery object or the FSM if "aStateDefinition" is set.

  * aStateDefinition: object, a state definition used to define a FSM. it Allows to find a specific FSM if several are defined on the same jQuery object. So, when defined, it returns the FSM itself (and not an array).

  Call Examples
  =============

```html
  <script>
  myFSMs = $('#myButton').getFSM(); //get the linked FSM objects in an array
  </script>
```

Machine State Definition
========================

The states are defined with a javascript object with the following organization:

```javascript
var aStateDefinition =
{
 <aStateName1>:
 {
 	delegate_machines	:
 	{
 		<aSubMachine name 1>:
 		{
 			submachine: <a State definition>,
 			no_reinitialisation: <boolean, default:false>
 		},			
 		<aSubMachine name i>:
 		{
 			submachine: <a State definition>
 		},			
 		...
 	},	  		
 	<aEventName1>:
 	{
		how_process_event: <immediate||push (default)||{delay:<adelay>,preventcancel:<false(default)|true>}>,
		init_function: <a function(parameters, event, data)>,
 		properties_init_function: <parameters for init_function>,
 		next_state: <aStateName>,
 		pushpop_state: <'PushState'||'PopState'>,
 		next_state_when: <a statement that returns boolean>,
 		next_state_on_target:
 		{
 			condition 			: <'||'||'&&'>
 			submachines			:
 			{
 				<submachineName1> 	:
 				{
 					condition	: <''(default)||'not'>
					target_list: [<targetState1>,...,<targetStaten>],
 				}
 				...
 				<submachineNamen> 	: ...
	 		}
 		}
 		next_state_if_error: <aStateName>,
 		pushpop_state_if_error: <'PushState'||'PopState'>,
 		propagate_event: <true||anEventName||[anEventName1,anEventName2,...]>
 		process_event_if: <a statement that returns boolean>,
 		propagate_event_on_refused: <anEventName>
 		out_function: <a function(parameters, event, data)>,
 		properties_out_function: <parameters for out_function>,
 		prevent_bubble: <true|false(default)>
 		propagate_event_on_localmachine: <true|false(default)>
 		process_on_UItarget: <true|false(default)>
 		UI_event_bubble: <true|false(default)>
 	},
 	<aEventName....>: <anOtherEventName>,
 	<aEventName....>:
 	{
 		....
 	},
 	enterState: ...
 	exitState:  ...
 },
 <aStateName...>: <anAnotherStateName>,
 <aStateName...>:
 {
 	....
 },
 DefaultState:
 {
 	start: //a default start event received at the FSM start
 	{
 	},
 	<aEventName....>:
 	{
 	},
 	catchEvent:
 	{
 	}
 }
}
```

- **statename**:
  - **delegate_machines**: sub machines list to delegate the events on the state
  	- submachine: the variable name of a state definition or a state definition description
  - **eventname**: <br>
  the name of an event. It may be any event name, supported by javascript or manually triggered.<br>
  It defines an event we want to be alerted when it occurs on the object<br>
	specific events:<br>
	- 'start': this event is automatically sent when the FSM starts. should be defined in the initial state (or 'DefaultState')
	- 'enterState': this event is automatically sent and immediatly executed when the FSM enter the state
	- 'exitState': this event is automatically sent and immediatly executed when the FSM exit the state
	- 'attrchange': received if any attribute of the jquery object (myUIObject) changed
		- data sent: event - event object
			* event.attributeName - Name of the attribute modified
			* event.oldValue      - Previous value of the modified attribute
			* event.newValue      - New value of the modified attribute
	- 'attrchange_<attributename>' (ex: 'attrchange_class'): received if the attribute of the jquery object changed
		- data sent:
			* newValue      - New value of the modified attribute
			* oldValue      - Previous value of the modified attribute
	- 'attrchange_style_[cssattributename_in_camelcase]' (ex:'attrchange_style_width'): received if the css attribute of the jquery object changed
		- data sent:
		    * newValue      - New value of the modified attribute
		    * oldValue      - Previous value of the modified attribute
	- 'catchEvent': if a received event is not defined in the state, catchEvent becomes the default event configurator
  An event can be the synonymous to an other event. Then give the name of the synomymous event instead of its definition.
  - **how_process_event** [default:{push}]: {immediate}||{push}||{delay:delay_value,preventcancel:[false(default)|true]}
  	- if delay is defined, the processing of the event is delayed and activated at 'delay'
  	- by default, any event delayed will be cancelled if the state changes
  	- if preventcancel is defined, the delayed event won't be cancelled
	- **Remark**: this configuration value has no effect on generic events as 'enterState', 'exitState'...
  - **process_event_if**:
  	- Definition of condition test that will be evaluated, and if result is true then event will be processed: init_function will be called, state will change, propagate_event will be propagated, ...
  	- if not, see if a propagate_event_on_refused to trigger it... and do nothing more.. it does not change state if any is defined.
  - **propagate_event_on_refused**: an event name to trigger if process_event_if is false
  - **init_function(parameters,event,data)**: function name or anonymous function, called before the state change when processing the event
    - function should return a boolean: true: ok works fine; false: error
    - function has the following input:
  	  * parameters: the properties_init_function
  	  * event: the event
  	  * data: the data sent with the event
  - **properties_init_function**: optional parameters to send to init_function
  - **next_state**: next state to go once init_function done and change conditions are fullfiled
  - **pushpop_state**: <br>
	If 'PushState', then current state is pushed in the StateStack then next_state takes place. If set in an event defined in 'DefaultState', the system will get the actual state.
	If 'PopState', then the next state will be the one on top of the StateStack which is poped. next_state is so overwritten... If the stack is void, there is no state change.
  - **next_state_when**: <br>
	Definition of condition test that will be evaluated, and if result is true then state will change
	Following variables may be used for the test:
	- this	: the FSM object
	- this.EventIteration: variable that gives the iteration of the number of calls of the current event.
	EventIteration is reset when the state changes
  - **next_state_on_target**:<br>
	Definition of condition test based on the current states of the defined submachines
	The test consist to:
	- get the current states of each defined sub-machines,
	- match the current state to the targeted state array, resulting to true if found
	- apply the defined operator between the results
	- if the result is positive, then the next state processing is done
  - **out_function(properties_out_function,event,data)**: function name or anonymous function, called just before ending the processing of an event
    - function has the following input:
  	  * parameters: the properties_out_function
  	  * event: the event
  	  * data: the data sent with the event
  - **properties_out_function**: optional parameters to send to out_function
  - **next_state_if_error** (default: does not change state): state set if init_function return false
  - **pushpop_state_if_error**:
	If 'PushState', then current state is pushed in the StateStack then next_state_if_error takes place.
	If 'PopState', then the next state will be the one on top of the StateStack which is poped. next_state_if_error is so overwritten... If the stack is void, there is no state change.
  - **propagate_event**: if defined to true, the current event is propagated to the next state
  				if it's the name of an event, the event is triggered
				if it's an array of events, events are triggered in sequence
  - **propagate_event_on_localmachine**: for submachines use, if defined and true, the events are not send to the root machine (default behaviour) but only to the submachine locally.
  - **prevent_bubble**: for submachines use, if defined and true, the current event will not bubble to its parent machine. By default, events bubble from submachines to their parent
  - **UI_event_bubble**: for graphic events use, if defined and true, the current event will bubble. By default, no UI event bubbling...
  - **process_on_UItarget**: if defined and true, the current event will be processed only if the event was directly targeting the UI jQuery object linked to the machine


The start of a machine or a sub-machine
=======================================

When the machine starts, the starting state is 'DefaultState'.

A 'start' event is always triggered when the FSM is started.

The 'DefaultState' state may be used to define the default behaviours of some events...

There is no 'enterState' event triggered for this default state. This kind of event may be managed when 'start' event is received in order to initialize the machine.

The initial state of the FSM may be redefined with the option 'options.initState'.


Event Processing
================

When a event is received by the machine, it is first searched in the current state, and if not found, then searched in the 'DefaultState'.

When an event is not found, then it is dropped and nothing is done...

It is possible to trigger any event to a machine with the jquery trigger function.
Examples:
```
  $('#myButton1').trigger('aEventName');
  $('#myButton1').trigger('aEventName',data);
  $('#myButton1').trigger('aEventName',{data1:adata1,data2:adata2});
```

In a state/event function, you can trigger event to the current machine:
```
   this.trigger('aEventName')
```

By default, when a machine receives a new event and is currently processing one, it will push it in its next event list to be processed... and gives back the hand...

This way, any function that triggers an event will have immediatly the hand back without changing the processing context. It prevents any uncontrolled effects that could arouse with the normal trigger mecanisms that process the (sub)events immediatly and may change/disturb the context of event processing.

Of course, if you want to have the event immediatly processed, you can ask it with the "immediate" option.

Or on the contrary, to have the event processed after a delay, you can use the "delay:[delay_value]" option.

Delayed Events
==============

By default, any delayed event will be cancelled if the state of the machine change, as it is considered that the event has its context changed...

It is possible to keep it even though the state changed with the 'preventcancel' option but beware to side effects.

If a delayed event is sent again before a previous one on the same event was processed, the previous event is cancelled and the new one replaces it starting with the initial delay.

The "how_process_event" allows to define how the event should be processed by the machine.



SubMachine
==========
  - when there are sub machines defined for a state:
	- the events are sent to each defined submachines in the order
	- once the event is processed by the submachines, it is bubbled to the upper machines
	- it is possible to prevent the bubbling of events with the directive 'prevent_bubble' to true
	- it is possible to propagate event only to the local submachine with the directive 'propagate_event_on_localmachine' to true
	- a submachine works as the main one:
		- if no_reinitialisation == false (default), it is initialized each time we enter the main state
		- a start event is triggered to it (if initialized)
		- once initialized, the submachine is ready to listen to the triggered events
  - a sub machine can manage its first state by handling the 'start' event in the DefaultState

The public available variables
==============================
 - myFSM.currentState: current state name
 - myFSM.lastState: previous state name of the current state
 - myFSM.eventCalled: current event name
 - myFSM.myUIObject: the jQuery object associated to the FSM
 - myFSM._stateDefinition: the definition of the states and events
 - myFSM._stateDefinition.[statename].[eventname].EventIteration - the number of times an event has been called since we entered the state
 - myFSM.opts - the defined options
 - myFSM.rootMachine: the root machine
 - myFSM.parentMachine: the parent machine if we're in a sub machine (null if none)

Within the call of FSM function, you can refer to the FSM by 'this':
 - this.currentState
 - this.lastState
 - this.myUIObject
 - this._stateDefinition
 - this.opts
 - this.EventIteration: the current event iteration since we entered the state


LIBRARY DEPENDENCIES
====================

To work properly, you need to include the following javascript library:
- jQuery (>= 1.10) `<script type="text/javascript" src="extlib/jquery-3.2.0.min.js"></script>`
- doTimeout by ["Cowboy" Ben Alman](http://benalman.com/projects/jquery-dotimeout-plugin/)
	- this library brings some very usefull feature on the usual javascript setTimeout function like Debouncing, Delays & Polling Loops, Hover Intent...
	- `<script type="text/javascript" src="extlib/jquery.dotimeout.js"></script>`
- attrchange by Selvakumar Arumugam](http://meetselva.github.io/attrchange/)
	- a simple jQuery function to bind a listener function to any HTML element on attribute change
	- `<script type="text/javascript" src="extlib/jquery.attrchange.js"></script>`

FAQ
===

If you have questions or unsolved problems, you can have a look on the our [FAQs](https://github.com/intersel/iFSM/wiki)
or leave a message on the [Issue board](https://github.com/intersel/iFSM/issues).


Contact
=======
If you have any ideas, feedback, requests or bug reports, you can reach me at github@intersel.org,
or via my website: http://www.intersel.fr
