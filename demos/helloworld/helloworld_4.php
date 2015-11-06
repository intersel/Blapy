<?php
$defaultTitle = "Great! That's a new title of Hello World";
include("header.php");
?>
<body>
	<h1>I am <b><?php echo basename(__FILE__)?> file</b> of "helloworld" demo file</h1>
	<p>I was loaded with a pure Blapy link with no routing... </p>
	
	<ul>
		<li><a href="index.php" data-blapy-link="true">Hello World!</a></li>
		<li><a href="helloworld_2.php" data-blapy-link="true">How is it going?</a></li>
		<li><a href="helloworld_3.php" data-blapy-link="true">Load from the optimized code</a></li>
	</ul>
	<div style="border:solid 1px blue;margin:20px;padding:20px;">
		<div id="mainContainer" data-blapy-container="true" data-blapy-container-name="mainContainer" data-blapy-container-content="Simple Blapy Link?">
			<h1>Blapy simple link</h1>
			<p>with no routing meaning that the URL has not changed...</p> 
			<p>sent id: <?php if (!empty($_GET['id'])) echo $_GET['id']?>
		</div>
	</div>
	<div style="font-size:80%">
		<a href="index.php">normal "Hello World" Link</a> - <a href="helloworld_2.php">normal "How is it going" Link</a>
	</div>
</body>

<?php 
include("footer.php");
