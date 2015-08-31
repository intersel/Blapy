<?php
$defaultTitle = "Posted input example";
include("header.php");
?>
<body id="myUPIApplication">
	<h1>I am <b><?php echo basename(__FILE__)?> file</b> of "<?php echo $defaultTitle?>" demo file</h1>
	<p>Fill the following form:</p>
	<form name="myForm" action="testForm.php" data-upi-link="true" method="POST">
		First name: <input type="text" name="fname"><br>
		Last name: <input type="text" name="lname"><br>
		<input type="submit" value="Send form data!">
	</form> 
	
	<h1>UPI Block update</h1>
	<div id="resultForm" 
		data-upi-container="true" 
		data-upi-container-name="resultForm" 
		data-upi-container-content="resultForm" 
		data-upi-update="update"
	>
	</div>

	<h1>UPI Block append</h1>
	<div id="resultForm2" 
		data-upi-container="true" 
		data-upi-container-name="resultForm" 
		data-upi-container-content="resultForm"
		data-upi-update="append"
		data-upi-update-rule="local" 
	>
	</div>
	<h1>json templating</h1>
	<div id="resultForm3" 
		data-upi-container="true" 
		data-upi-container-name="resultFormJson" 
		data-upi-container-content="resultFormJson"
		data-upi-update="json"
		data-upi-update-rule="local" 
	>
		<div data-upi-container-tpl="true" style="display:none">
		First name: ${fname}<br>
		Last name: ${lname}<br>
		</div>
	</div>
	
</body>

<?php 
include("footer.php");
