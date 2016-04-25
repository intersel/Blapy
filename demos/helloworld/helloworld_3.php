<?php

//Test if it is a "Blapy Call"
if (empty($_REQUEST['blapycall'])) 
	die("You're not allowed to get this file this way...<br> Of course that is a possible message ;-)<br> You could have sent a full HTML page...<br><a href='index.php'>Go back to index</a>"); 

//Ok so send the optimized version of the code...
$defaultTitle = "Optimized version... Great as well!";
?>
<title 	data-blapy-container="true" 
		data-blapy-container-name="Title" 
		data-blapy-container-content="<?php echo basename($_SERVER["SCRIPT_FILENAME"]);?>"
		>
	<?php echo $defaultTitle?>
</title>
<div id="mainContainer" 
		data-blapy-container="true" 
		data-blapy-container-name="mainContainer" 
		data-blapy-container-content="Optimized version"
		data-blapy-update="fadeInOut"
		data-blapy-fadeout-delay="100"
		data-blapy-fadein-delay=400"
		>
	<h1>Good as well with an optimized version</h1>
	<p>You can update Blapy block from an optimized version of html code with only the useful Blapy blocks to be loaded</p> 
	<p>and apply an animation effect during content change, like the one applied on this block during loading...</p>
</div>
