	<div id="resultForm" data-blapy-container="true" data-blapy-container-name="resultForm" data-blapy-container-content="resultForm" data-blapy-update="force-update">
	<?php
		echo '<div>your firsname is '.$_POST['fname'].' and your lastname is '.$_POST['lname'].'</div>'; 
	?>
	</div>

	<div id="resultForm3" 
		data-blapy-container="true" 
		data-blapy-container-name="resultFormJson" 
		data-blapy-container-content="resultFormJson"
		data-blapy-update="json"
		data-blapy-update-rule="local" 
	>
	[{fname: "<?php echo $_POST['fname']?>",lname: "<?php echo $_POST['lname']?>"},
	{fname: "<?php echo $_POST['fname']?> bis",lname: "<?php echo $_POST['lname']?> bis"}
	]
	</div>
	