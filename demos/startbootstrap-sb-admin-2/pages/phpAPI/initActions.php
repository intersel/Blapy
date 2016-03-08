<?php

$currentTime = time();

$returnStr = <<<EOD
<ul class="dropdown-menu dropdown-messages" 
                    	data-blapy-container="true" 
						data-blapy-container-name="messagesList" 
						data-blapy-container-content="messagesListValues-$currentTime"
						data-blapy-update="json"
>
	[
		{firstname: "John",	lastname: "Smith", 	date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
		{firstname: "Bob",	lastname: "Dylan", 	date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
		{firstname: "Peter",lastname: "Rabbit", date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
		{firstname: "Nina",	lastname: "Hagen", 	date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
	]
</ul>

<ul class="dropdown-menu dropdown-tasks"
	                   	data-blapy-container="true" 
						data-blapy-container-name="tasksList" 
						data-blapy-container-content="tasksListValues-$currentTime"
						data-blapy-update="json"
>
	[
		{taskId: "Blapy Task 1",completeness: "40",statusTask:"success"},
		{taskId: "Blapy Task 2",completeness: "20",statusTask:"info"},
		{taskId: "Blapy Task 3",completeness: "60",statusTask:"warning"},
		{taskId: "Blapy Task 4",completeness: "80",statusTask:"danger"},
	]
</ul>

<ul class="dropdown-menu dropdown-alerts"  style="margin-top: 42px;"
	                   	data-blapy-container="true" 
						data-blapy-container-name="alertsList" 
						data-blapy-container-content="alertsListValues-$currentTime"
						data-blapy-update="json"
					>
	[
		{alertType:"comment",alertTitle:"New Comment",alertElapsedTime:"4 minutes ago"},
		{alertType:"twitter",alertTitle:"3 New Followers",alertElapsedTime:"12 minutes ago"},
		{alertType:"envelope",alertTitle:"Message Sent",alertElapsedTime:"4 minutes ago"},
		{alertType:"tasks",alertTitle:"New Task",alertElapsedTime:"6 minutes ago"},
		{alertType:"upload",alertTitle:"Server Rebooted",alertElapsedTime:"40 minutes ago"},
		]
</ul>

<div class="huge" 
	data-blapy-container="true" 
	data-blapy-container-name="nbNewComments" 
	data-blapy-container-content="nbNewComments-$currentTime"
>26</div>

<div class="huge" 
	data-blapy-container="true" 
	data-blapy-container-name="nbNewTasks" 
	data-blapy-container-content="nbNewTasks-$currentTime"
>12</div>

<div class="huge" 
	data-blapy-container="true" 
	data-blapy-container-name="nbNewOrders" 
	data-blapy-container-content="nbNewOrders-$currentTime"
>124</div>

<div class="huge" 
	data-blapy-container="true" 
	data-blapy-container-name="nbNewTickets" 
	data-blapy-container-content="nbNewTickets-$currentTime"
>13</div>

EOD;

include('callActions.php');

