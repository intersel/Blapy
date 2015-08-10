<?php
$defaultTitle = "The Hello World example";
include("header.php");
?>
<body>
	<h1>I am <b><?php echo basename(__FILE__)?> file</b> of "helloworld" demo file</h1>
	<p>Click on the <a href="helloworld_2.php" data-upi-link="true">"How is it going?"</a> link, it will then change the UPI content of the current page by the one of the page of this link</p>
	<p>As you click... you will see that some blocks are updated<br> and this text is not... because it is not involved in a UPI block...</p>
	<p>Meaning that <b>THE PAGE IS NOT RELOADED ;-) but ajaxified...</b></p> 
	<ul>
		<li><a href="index.php" data-upi-link="true">Hello World!</a></li>
		<li><a href="helloworld_2.php" data-upi-link="true">How is it going?</a></li>
		<li><a href="helloworld_3.php" data-upi-link="true">Load from the optimized code</a></li>
	</ul>
	<div style="border:solid 1px green;margin:20px;padding:20px;">
		<div id="mainContainer" data-upi-container="true" data-upi-container-name="mainContainer" data-upi-container-content="HelloWorld">
			<h1>Hello World!</h1>
			<p>This is a "Hello World" content</p>
		</div>
	</div>	
	<div style="font-size:80%">
		<a href="index.php">normal "Hello World" Link</a> - <a href="helloworld_2.php">normal "How is it going" Link</a><br>
	</div>
</body>

<?php 
include("footer.php");
