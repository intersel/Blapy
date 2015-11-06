<?php
$defaultTitle = "The Hello World example";
include("header.php");
?>
<body>
	<h1>I am <b><?php echo basename(__FILE__)?> file</b> of "helloworld" demo file</h1>
	<p>	Click on the <a href="helloworld_2.php" data-blapy-link="true">"How is it going?"</a> link, 
		it will then change the Blapy content of the current page by the one coming from the page of this link</p>
	<p>	As you click... you will see that some blocks are updated<br> 
		and this text is not... because it is not involved in a Blapy block...</p>
	<p>Meaning that <b>THE PAGE IS NOT RELOADED ;-) but ajaxified...</b></p> 
	<ul>
		<li><a href="index.php" data-blapy-link="true">Hello World!</a></li>
		<li><a href="helloworld_2.php?id=myNiceId" data-blapy-link="true">How is it going?</a></li>
		<li><span data-blapy-link="true" data-blapy-href="helloworld_3.php" class="anchor" style="">Load from the optimized code</span></li>
	</ul>
	<div style="border:solid 1px green;margin:20px;padding:20px;">
		<div 	id="mainContainer" 
				data-blapy-container="true" 
				data-blapy-container-name="mainContainer" 
				data-blapy-container-content="HelloWorld">
			
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
