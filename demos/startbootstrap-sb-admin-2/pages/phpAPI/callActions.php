<?php
session_start();
if (empty($_REQUEST['blapycall']))
{
	header('Location: ../index.php');
	exit;
}

if (empty($returnStr)) $returnStr='';

//environment is stored in $_SESSION['currentEnvironment']
$currentEnvironment = empty($_SESSION['currentEnvironment'])?array():$_SESSION['currentEnvironment'];

if (empty($getAction)) $getAction=null;

echo $returnStr;