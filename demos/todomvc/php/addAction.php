<?php

$getAction = 'addAction';
$actionName = empty($_REQUEST['actionName'])?'':$_REQUEST['actionName'];
if ($actionName == '') exit;

include ('getTodo.php');