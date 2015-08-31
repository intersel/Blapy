<?php
$defaultTitle = "Posted input example";
include("header.php");
?>
<body id="myBlapy">
	<h1>I am <b><?php echo basename(__FILE__)?> file</b> of "<?php echo $defaultTitle?>" demo file</h1>
	<p>Fill the following form:</p>
	<form name="myForm" action="testForm.php" data-blapy-link="true" method="POST">
		First name: <input type="text" name="fname"><br>
		Last name: <input type="text" name="lname"><br>
		<input type="submit" value="Send form data!">
	</form> 
	
	<h1>Blapy Block update</h1>
	<div id="resultForm" 
		data-blapy-container="true" 
		data-blapy-container-name="resultForm" 
		data-blapy-container-content="resultForm" 
		data-blapy-update="update"
	>
	</div>

	<h1>Blapy Block append</h1>
	<div id="resultForm2" 
		data-blapy-container="true" 
		data-blapy-container-name="resultForm" 
		data-blapy-container-content="resultForm"
		data-blapy-update="append"
		data-blapy-update-rule="local" 
	>
	</div>
	<h1>json templating</h1>
	<div id="resultForm3" 
		data-blapy-container="true" 
		data-blapy-container-name="resultFormJson" 
		data-blapy-container-content="resultFormJson"
		data-blapy-update="json"
		data-blapy-update-rule="local" 
	>
		<div data-blapy-container-tpl="true" style="display:none">
		First name: ${fname}<br>
		Last name: ${lname}<br>
		</div>
	</div>
	
</body>

<?php 
include("footer.php");
