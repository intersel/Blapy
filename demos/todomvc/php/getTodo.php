<?php
session_start();
if (empty($_REQUEST['blapycall'])) 
{
	header('Location: ../index.php');
	exit;
}

if (empty($returnStr)) $returnStr='';

//actions list is stored in $_SESSION['todoAction']
$todo_actions= empty($_SESSION['todoAction'])?array():$_SESSION['todoAction'];

//filter 'all'/'completed'/'active'
if (empty($_SESSION['filter'])) $_SESSION['filter']='all';
if (!empty($setFilter)) $_SESSION['filter']=$setFilter;

$liToDoActions='';
if (empty($getAction)) $getAction=null;

//template for the action items
$liTemplate = <<<EOD
	<li data-id="[[actionId]]" class="[[completedStatus]]">
		<div class="view">
			<input class="toggle" type="checkbox" [[completedStatusChecked]] onclick="$('#myBlapy').trigger('loadUrl',{aUrl:'php/actionCompleted.php?actionId=[[actionId]]'})">
			<label data-id="[[actionId]]">[[actionLabel]]</label><button class="destroy" onclick="$('#myBlapy').trigger('loadUrl',{aUrl:'php/deleteAction.php?actionId=[[actionId]]'})"></button>
		</div>
	</li>
EOD;

// update todo_actions array according to requests
$tagId=uniqid();
switch ($getAction)
{
	case 'addAction':
		$aActionId = $actionName.'_'.$tagId;
		$todo_actions[$actionName.'_'.$tagId]['actionId']=$aActionId;
		$todo_actions[$actionName.'_'.$tagId]['completedStatus']=false;
		$todo_actions[$actionName.'_'.$tagId]['actionLabel']=$actionName;
		break;
	case 'editAction':
		if (!empty($todo_actions[$actionId]['actionId']))
			$todo_actions[$actionId]['actionLabel']=$actionName;
		break;
	case 'actionCompleted':
		$todo_actions[$actionId]['completedStatus']=!$todo_actions[$actionId]['completedStatus'];
		break;
	case 'clearCompleted':
		foreach($todo_actions as $aAction)
		{
			if ($aAction['completedStatus']) unset ($todo_actions[$aAction['actionId']]);
		}
		break;
	case 'allCompleted':
		foreach($todo_actions as $aAction)
		{
			$todo_actions[$aAction['actionId']]['completedStatus'] = $toggleStatus;
		}
		
		break;
	case 'deleteAction':
		unset ($todo_actions[$actionId]);
		break;
	case 'resetActions':
		unset ($todo_actions);
		$_SESSION['filter']='all';
		$todo_actions=array();
		break;
}

$_SESSION['todoAction'] = $todo_actions;

$aVarArray['numberOfItems']		= count($todo_actions);
$aVarArray['numberOfLeftItems']		= 0;

//prepare the list of action items
foreach($todo_actions as $aAction)
{
	$aVarArray['actionId']					= $aAction['actionId'];
	$aVarArray['completedStatus']			= $aAction['completedStatus']?'completed':'';
	$aVarArray['completedStatusChecked']	= $aAction['completedStatus']?'checked=""':'';
	$aVarArray['actionLabel']				= $aAction['actionLabel'];
		
	if ( !$aVarArray['completedStatus'] )
		$aVarArray['numberOfLeftItems']++;
	
	if ( $aVarArray['completedStatus'] && $_SESSION['filter'] == 'active' )  continue;
	if ( !$aVarArray['completedStatus'] && $_SESSION['filter'] == 'completed' )  continue;
	
	$liToDoActions .= getTemplateLi($liTemplate, $aVarArray);
}

//process the action items
$returnStr .= '<ul class="todo-list"
					data-blapy-container="true" 
					data-blapy-container-name="todo-list"
					data-blapy-container-content="todo-list-'.$tagId.'">'.$liToDoActions.'</ul>';
//process the number of left actions 
$returnStr .= '<span data-blapy-container="true" 
					 data-blapy-container-name="numberOfItems"
					 data-blapy-container-content="numberOfItems-'.$aVarArray['numberOfLeftItems'].'">'.$aVarArray['numberOfLeftItems'].'</span>';

//Process if we need to display the button for "clear completed" block if any completed action there
if ($aVarArray['numberOfLeftItems'] != $aVarArray['numberOfItems'])
	$returnStr .= <<<EOD
		<button class="clear-completed" 
				data-blapy-container="true" 
				data-blapy-container-name="showClear"
				data-blapy-container-content="showClear-True"
				onclick="$('#myBlapy').trigger('loadUrl',{aUrl:'php/clearCompleted.php'});">Clear completed</button>'
EOD;
else 
	$returnStr .= <<<EOD
		<button class="clear-completed" 
				data-blapy-container="true" 
				data-blapy-container-name="showClear"
				data-blapy-container-content="showClear-False"
				style="display:none">Clear completed</button>'
EOD;

//returns the different updated blocks for the front end
echo $returnStr;
exit;

//quick and dirty templating function
//templating variables are embedding within '[[namevar]]'
function getTemplateLi($aTemplateString, $varArray)
{
	if (count($varArray)==0) return $aTemplateString;
	foreach ($varArray as $aVarName => $aVarValue)
	{
		$aTemplateString = str_replace("[[$aVarName]]",$aVarValue,$aTemplateString);
	}
	
	return $aTemplateString;
}