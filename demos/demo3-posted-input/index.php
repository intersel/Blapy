<?php
$defaultTitle = "Posted input example";
include("header.php");
?>
<body id="myBlapy">
	<h1>I am <b><?php echo basename(__FILE__)?> file</b> of "<?php echo $defaultTitle?>" demo file</h1>
	<p>Fill the following form:</p>
	<h2>Form "post" the Data</h2>
	<form id="myFormPost" name="myFormPost" action="testForm.php" data-blapy-link="true" method="POST">
		First name: <input type="text" name="fname"><br>
		Last name: <input type="text" name="lname"><br>
		<button type="submit" name="SendWithPost" value="Send form data with method POST!">Send form data with method POST</button>
	</form> 

	<h2>Form "put" the Data</h2>
	<form id="myFormPut" name="myFormPut" action="testPutForm.php" data-blapy-link="true" method="PUT">
		First name: <input type="text" name="fname"><br>
		Last name: <input type="text" name="lname"><br>
		<input type="submit" name="SendWithPut" value="Send form data with method PUT!">
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
	<h2>from a blapy block template definition</h2>
	<div id="resultForm3" 
		data-blapy-container="true" 
		data-blapy-container-name="resultFormJson" 
		data-blapy-container-content="resultFormJson"
		data-blapy-update="json"
	>
		<b>First name</b>: ${fname}<br>
		<b>Last name</b>: ${lname}<br>
	</div>
	<h2>from a file template</h2>
	<div id="resultForm4" 
		data-blapy-container="true" 
		data-blapy-container-name="resultForm2Json" 
		data-blapy-container-content="resultForm2Json"
		data-blapy-update="json"
		data-blapy-template-file="form.tpl"
		data-blapy-template-init="testInitForm.php"
	>
	</div>
	
</body>

<?php 
include("footer.php");
