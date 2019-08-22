<?php

$purejson = empty($_REQUEST['purejson'])?false:true;

if (!$purejson)
{
	//blapy block
	echo <<<EOT
		<div id="results"
			data-blapy-container="true"
			data-blapy-container-name="results"
			data-blapy-container-content="resultsnew"
		>
EOT;
}

switch($_REQUEST['action'])
{
	case 'some':
		echo <<<EOT
			[
				{firstname: "John",lastname: "Doe"},
				{firstname: "Nina",lastname: "Hagen"},
			]
EOT;
		break;
	case 'all':
	default:
		echo <<<EOT
			[
				{firstname: "John",lastname: "Doe"},
				{firstname: "Bob",lastname: "Dylan"},
				{firstname: "Peter",lastname: "Rabbit"},
				{firstname: "Nina",lastname: "Hagen"},
			]
EOT;
		break;
}

if (!$purejson)
{
	echo <<<EOT
	</div>
EOT;
}

exit;
