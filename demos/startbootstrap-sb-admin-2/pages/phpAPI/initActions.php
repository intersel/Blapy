<?php

$returnStr = <<<EOD
<ul class="dropdown-menu dropdown-messages" 
                    	data-blapy-container="true" 
						data-blapy-container-name="messagesList" 
						data-blapy-container-content="messagesListValues"
						data-blapy-update="json"
>
						[
						{firstname: "John",	lastname: "Smith", 	date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
						{firstname: "Bob",	lastname: "Dylan", 	date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
						{firstname: "Peter",lastname: "Rabbit", date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
						{firstname: "Nina",	lastname: "Hagen", 	date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
						]
</ul>
EOD;

include('callActions.php');

