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

<table>
	<tbody 	data-blapy-container="true" 
		data-blapy-container-name="barChartExample" 
		data-blapy-container-content="barChartExample-$currentTime"
	>
		<tr>
	    	<td>3326</td>
	    	<td>10/21/2013</td>
	    	<td>3:29 PM</td>
		    <td>$321.33</td>
		</tr>
		<tr>
		    <td>3325</td>
		    <td>10/21/2013</td>
		    <td>3:20 PM</td>
		    <td>$234.34</td>
		</tr>
		<tr>
		    <td>3324</td>
		    <td>10/21/2013</td>
		    <td>3:03 PM</td>
		    <td>$724.17</td>
		</tr>
		<tr>
		    <td>3323</td>
		    <td>10/21/2013</td>
		    <td>3:00 PM</td>
		    <td>$23.71</td>
		</tr>
		<tr>
		    <td>3322</td>
		    <td>10/21/2013</td>
		    <td>2:49 PM</td>
		    <td>$8345.23</td>
		</tr>
		<tr>
		    <td>3321</td>
		    <td>10/21/2013</td>
		    <td>2:23 PM</td>
		    <td>$245.12</td>
		</tr>
		<tr>
		    <td>3320</td>
		    <td>10/21/2013</td>
		    <td>2:15 PM</td>
		    <td>$5663.54</td>
		</tr>
		<tr>
		    <td>3319</td>
		    <td>10/21/2013</td>
		    <td>2:13 PM</td>
		    <td>$943.45</td>
		</tr>
	</tbody>
</table>
EOD;

include('callActions.php');

