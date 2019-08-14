<?php

$getAction = 'allCompleted';
$toggleStatus = ($_REQUEST['toggleStatus']=='true')?true:false;
$toggleStatusName = $toggleStatus?'On':'Off';
$toggleChecked = $toggleStatus?'checked':'';

$returnStr = <<<EOD
<input id="selectAllToggle"
		class="toggle-all"
		type="checkbox"
		$toggleChecked
		data-blapy-container="true"
		data-blapy-container-name="selectAllToggle"
		data-blapy-container-content="selectAllToggle-$toggleStatusName"
		onclick="$('#myBlapy').trigger('postData',{aUrl:'php/allCompleted.php',params:{toggleStatus:$(this).prop('checked')}})">
EOD;

include ('getTodo.php');
