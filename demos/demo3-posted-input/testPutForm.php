<?php

	parse_str(file_get_contents('php://input'), $_POST);

	if (empty($_POST['fname'])) $_POST['fname'] = '[no first name given]';
	if (empty($_POST['lname'])) $_POST['lname'] = '[no last name given]';
	?>
	<div id="resultForm" data-blapy-container="true" data-blapy-container-name="resultForm" data-blapy-container-content="resultForm" data-blapy-update="force-update">
	<?php
		echo '<div>your firsname is <b>'.$_POST['fname'].'</b> and your lastname is <b>'.$_POST['lname'].'</b></div>';
	?>
	</div>

	<div id="resultForm3"
		data-blapy-container="true"
		data-blapy-container-name="resultFormJson"
		data-blapy-update="json"
	>
	{"fname": "<?php echo $_POST['fname']?>","lname": "<?php echo $_POST['lname']?>"}
	</div>
	<div id="resultForm3"
		data-blapy-container="true"
		data-blapy-container-name="resultForm2Json"
		data-blapy-update="json"
	>
	[
	{"fname": "<?php echo $_POST['fname']?>","lname": "<?php echo $_POST['lname']?>"},
	{"fname": "<?php echo $_POST['fname']?> bis","lname": "<?php echo $_POST['lname']?> bis"}
	]
	</div>
