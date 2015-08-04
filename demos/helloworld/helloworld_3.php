<?php

//Test if it is a "UPI Call"
if (empty($_REQUEST['upicall'])) 
	die("You're not allowed to get this file this way...<br> Of course that is a possible message ;-)<br> You could have sent a full HTML page...<br><a href='index.php'>Go back to index</a>"); 

//Ok so send the optimized version of the code...
$defaultTitle = "Optimized version... Great as well!";
?>
<title 	data-upi-container="true" 
		data-upi-container-name="Title" 
		data-upi-container-content="<?php echo basename($_SERVER["SCRIPT_FILENAME"]);?>">
	<?php echo $defaultTitle?>
</title>
<div data-upi-container="true" data-upi-container-name="mainContainer" data-upi-container-content="Optimized version">
	<h1>Good as well with an optimized version</h1>
	<p>You can send an optimized version html code with only the useful UPI blocks</p> 
</div>
