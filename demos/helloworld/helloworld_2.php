<?php
include("header.php");
?>
<body id="myUPIApplication">
	<h1>I am <b>helloworld_2.php</b> of "helloworld" demo file</h1>
	<p>Click on the "Hello world" link, it will then change the UPI content of the current page by the one of the page of this link</p>
	
	<ul>
		<li><a href="index.php" data-upi-link="true">Hello World!</a></li>
		<li><a href="helloworld_2.php" data-upi-link="true">How is it going?</a></li>
	</ul>
	<div style="border:solid 1px blue;margin:20px;padding:20px;">
		<div data-upi-container="true" data-upi-container-name="mainContainer" data-upi-container-content="How is it going?">
			<h1>How is it going?</h1>
		</div>
	</div>
	<div style="font-size:80%">
		<a href="index.php">normal "Hello World" Link</a> - <a href="helloworld_2.php">normal "How is it going" Link</a>
	</div>
</body>
<script>$("#myUPIApplication").append('<h3>HTML code of the page</h3>').append(jQuery('<pre />').text($('#myUPIApplication').html())) </script>

<?php 
include("footer.php");
