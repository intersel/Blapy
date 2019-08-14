<?php
	if (empty($_REQUEST['firstname'])) $_REQUEST['firstname'] = '[no first name given]';
	if (empty($_REQUEST['lastname'])) $_REQUEST['lastname'] = '[no last name given]';
	$_REQUEST['pureJson'] = (empty($_REQUEST['pureJson']))? 0:1;

	$output = '{"firstname":"'.$_REQUEST['firstname'].'","lastname":"'.$_REQUEST['lastname'].'"}';

if ($_REQUEST['pureJson'])
{
	header('Content-type:application/json;charset=utf-8');
	echo $output;
}
else
{
?>
<div id="results"
	data-blapy-container="true"
	data-blapy-container-name="results"
	data-blapy-container-content="resultsnew"
>
[
	<?php echo $output;?>
]
</div>
<?php
}//end else
?>
