<?php
$defaultTitle = "Posted input example";
include("header.php");
?>
<body id="myUPIApplication">
	<h1>I am <b><?php echo basename(__FILE__)?> file</b> of "<?php echo $defaultTitle?>" demo file</h1>
	
	<form name="myForm" action="testForm.php" data-upi-link="true" method="POST">
		First name: <input type="text" name="fname"><br>
		Last name: <input type="text" name="lname"><br>
		<input type="submit" value="Send form data!">
	</form> 
	
	<div id="resultForm" data-upi-container="true" data-upi-container-name="resultForm" data-upi-container-content="resultForm" data-upi-update="force-update">
	</div>
</body>

<?php 
include("footer.php");
