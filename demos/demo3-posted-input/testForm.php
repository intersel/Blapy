	<div id="resultForm" data-upi-container="true" data-upi-container-name="resultForm" data-upi-container-content="resultForm" data-upi-update="force-update">
	<?php
		echo '<div>your firsname is '.$_POST['fname'].' and your lastname is '.$_POST['lname'].'</div>'; 
	?>
	</div>

	<div id="resultForm3" 
		data-upi-container="true" 
		data-upi-container-name="resultFormJson" 
		data-upi-container-content="resultFormJson"
		data-upi-update="json"
		data-upi-update-rule="local" 
	>
	[{fname: "<?php echo $_POST['fname']?>",lname: "<?php echo $_POST['lname']?>"},
	{fname: "<?php echo $_POST['fname']?> bis",lname: "<?php echo $_POST['lname']?> bis"}
	]
	</div>
	