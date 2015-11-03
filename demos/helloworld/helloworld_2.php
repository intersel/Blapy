<?php
$defaultTitle = "Great! That's a new title of Hello World";
include("header.php");
?>
<body>
	<h1>I am <b><?php echo basename(__FILE__)?> file</b> of "helloworld" demo file</h1>
	<p>Click on the <a href="index.php" data-blapy-link="true">"Hello world"</a> link, it will then change the Blapy content of the current page by the one coming from the page of this link</p>
	
	<ul>
		<li><a href="index.php" data-blapy-link="true">Hello World!</a></li>
		<li><a href="helloworld_2.php" data-blapy-link="true">How is it going?</a></li>
		<li><a href="helloworld_3.php" data-blapy-link="true">Load from the optimized code</a></li>
	</ul>
	<div style="border:solid 1px blue;margin:20px;padding:20px;">
		<div id="mainContainer" data-blapy-container="true" data-blapy-container-name="mainContainer" data-blapy-container-content="How is it going?">
			<h1>How is it going?</h1>
			<p>Did you see that the title block was changed? The "&lt;title&gt;" is a Blapy block too!</p> 
			<p>Click on the "Hello world!" link to load back its content...</p> 
			<p>sent id: <?php if (!empty($_GET['id'])) echo $_GET['id']?>
		</div>
	</div>
	<div style="font-size:80%">
		<a href="index.php">normal "Hello World" Link</a> - <a href="helloworld_2.php">normal "How is it going" Link</a>
	</div>
</body>

<?php 
include("footer.php");
