<?php
include("header.php");
?>
<body id="myUPIApplication">
	<p>I am <b>helloworld_1.php</b> file</p>
	<ul>
		<li><a href="helloworld_1.php" data-upi-link="true">Hello World!</a></li>
		<li><a href="helloworld_2.php" data-upi-link="true">How is it going?</a></li>
	</ul>
	<div data-upi-container="true" data-upi-container-name="mainContainer" data-upi-container-content="HelloWorld">
		<h1>Hello World!</h1>
	</div>
	
	<div style="font-size:80%">
		<a href="helloworld_1.php">normal "Hello World" Link</a> - <a href="helloworld_2.php">normal "How is it going" Link</a>
	</div>
</body>

<?php 
include("footer.php");
