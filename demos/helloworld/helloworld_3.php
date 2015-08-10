<?php

//Test if it is a "UPI Call"
if (empty($_REQUEST['upicall'])) 
	die("You're not allowed to get this file this way...<br> Of course that is a possible message ;-)<br> You could have sent a full HTML page...<br><a href='index.php'>Go back to index</a>"); 

//Ok so send the optimized version of the code...
$defaultTitle = "Optimized version... Great as well!";
?>
<title 	data-upi-container="true" 
		data-upi-container-name="Title" 
		data-upi-container-content="<?php echo basename($_SERVER["SCRIPT_FILENAME"]);?>"
		>
	<?php echo $defaultTitle?>
</title>
<div id="mainContainer" 
		data-upi-container="true" 
		data-upi-container-name="mainContainer" 
		data-upi-container-content="Optimized version"
		data-upi-update="fadeInOut"
		data-upi-fadeout-delay="100"
		data-upi-fadein-delay=400"
		>
	<h1>Good as well with an optimized version</h1>
	<p>You can update UPI block from an optimized version of html code with only the useful UPI blocks to be loaded</p> 
	<p>and apply animation during content change</p>
</div>
