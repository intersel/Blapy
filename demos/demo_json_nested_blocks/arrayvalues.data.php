<?php
$values=array(
		array('firstname'=> "John",	'lastname'=> "Doe"),
		array('firstname'=> "Bob",	'lastname'=> "Dylan"),
		array('firstname'=> "Peter",'lastname'=> "Rabbit"),
		array('firstname'=> "Nina",	'lastname'=> "Hagen"),
		array('firstname'=> "Albert",'lastname'=> "Carter"),
		array('firstname'=> "Patricia",'lastname'=> "Portmann"),
		array('firstname'=> "Lewis",'lastname'=> "Violet"),
		array('firstname'=> "Paul",	'lastname'=> "Ochon"),
		array('firstname'=> "Andrew",'lastname'=> "Gales"),
		array('firstname'=> "Alicia",'lastname'=> "Bootstrap"),
		array('firstname'=> "Sylvester",'lastname'=> "Stallone"),
);
$action=empty($_REQUEST['action'])?'list':$_REQUEST['action'];

//when nothing in the search => list all values...
$lastnameSearch = empty($_REQUEST['lastname'])? '':$_REQUEST['lastname'];
$firstnameSearch = empty($_REQUEST['firstname'])? '':$_REQUEST['firstname'];
if (empty($firstnameSearch) && empty($lastnameSearch)) $action = 'list';

$outputData = '
[
';

switch ($action)
{
	case 'search':
		if (!empty($firstnameSearch) || !empty($lastnameSearch))
		foreach($values as $aData)
		{
			if ($lastnameSearch && $firstnameSearch)
			{
				$matches1=preg_match("/$firstnameSearch/i", $aData['firstname']);
				$matches2=preg_match("/$lastnameSearch/i", $aData['lastname']);
				if ($matches1&& $matches2)
					$outputData .= '{"firstname":"'.$aData['firstname'].'","lastname":"'.$aData['lastname'].'"},'."\n";
			}
			else if ($firstnameSearch)
			{
				$matches1=preg_match("/$firstnameSearch/i", $aData['firstname']);
				if ($matches1)
					$outputData .= '{"firstname":"'.$aData['firstname'].'","lastname":"'.$aData['lastname'].'"},'."\n";
			}
			else if ($lastnameSearch)
			{
				$matches2=preg_match("/$lastnameSearch/i", $aData['lastname']);
				if ($matches2)
					$outputData .= '{"firstname":"'.$aData['firstname'].'","lastname":"'.$aData['lastname'].'"},'."\n";
			}

		}
		break;

	case 'list':
	default:
			foreach($values as $aData)
			{
				$outputData .= '{"firstname":"'.$aData['firstname'].'","lastname":"'.$aData['lastname'].'"},'."\n";
			}
		break;
}

$outputData = rtrim($outputData,",\n");//trim ','

$outputData .= '
]
';

echo $outputData ;
