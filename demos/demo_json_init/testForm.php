<?php
	if (empty($_POST['firstname'])) $_POST['firstname'] = '[no first name given]'; 
	if (empty($_POST['lastname'])) $_POST['lastname'] = '[no last name given]'; 
	?>
<div id="results" 
	data-blapy-container="true" 
	data-blapy-container-name="results" 
	data-blapy-container-content="resultsnew"
>
[
	{firstname: "<?php echo $_POST['firstname'];?>",lastname: "<?php echo $_POST['lastname'];?>"},
]
</div>	