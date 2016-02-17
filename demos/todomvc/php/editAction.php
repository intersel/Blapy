<?php

$getAction = 'editAction';
$actionName = empty($_REQUEST['actionName'])?'':$_REQUEST['actionName'];
$actionId = empty($_REQUEST['actionId'])?'':$_REQUEST['actionId'];
if ($actionName=='') return;

include ('getTodo.php');