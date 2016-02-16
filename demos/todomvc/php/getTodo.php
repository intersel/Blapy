<?php
session_start();

$todo_actions= empty($_SESSION['todoAction'])?array():$_SESSION['todoAction'];

if (empty($_SESSION['filter'])) $_SESSION['filter']='all';
if (!empty($setFilter)) $_SESSION['filter']=$setFilter;

$liToDoActions='';
if (empty($getAction)) $getAction=null;

$liTemplate = <<<EOD
	<li data-id="[[actionId]]" class="[[completedStatus]]">
		<div class="view">
			<input class="toggle" type="checkbox" [[completedStatusChecked]] onclick="$('#myBlapy').trigger('loadUrl',{aUrl:'php/actionCompleted.php?actionId=[[actionId]]'})">
			<label>[[actionLabel]]</label><button class="destroy" onclick="$('#myBlapy').trigger('loadUrl',{aUrl:'php/deleteAction.php?actionId=[[actionId]]'})"></button>
		</div>
	</li>
EOD;

switch ($getAction)
{
	case 'addAction':
		$aActionId = $actionName.'_'.time();
		$todo_actions[$actionName.'_'.time()]['actionId']=$aActionId;
		$todo_actions[$actionName.'_'.time()]['completedStatus']=false;
		$todo_actions[$actionName.'_'.time()]['actionLabel']=$actionName;
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
foreach($todo_actions as $aAction)
{
	$aVarArray['actionId']					= $aAction['actionId'];
	$aVarArray['completedStatus']			= $aAction['completedStatus']?'completed':'';
	$aVarArray['completedStatusChecked']	= $aAction['completedStatus']?'checked=""':'';
	$aVarArray['actionLabel']				= $aAction['actionLabel'];
		
	if ( $aVarArray['completedStatus'] && $_SESSION['filter'] == 'active' )  continue;
	if ( !$aVarArray['completedStatus'] && $_SESSION['filter'] == 'completed' )  continue;
	
	if ( !$aVarArray['completedStatus'] )
		$aVarArray['numberOfLeftItems']++;
	$liToDoActions .= getTemplateLi($liTemplate, $aVarArray);
}

$returnStr .= '<ul class="todo-list"
					data-blapy-container="true" 
					data-blapy-container-name="todo-list"
					data-blapy-container-content="todo-list-'.time().'">'.$liToDoActions.'</ul>';
$returnStr .= '<span data-blapy-container="true" 
					 data-blapy-container-name="numberOfItems"
					 data-blapy-container-content="numberOfItems-'.$aVarArray['numberOfLeftItems'].'">'.$aVarArray['numberOfLeftItems'].'</span>';


if ($aVarArray['numberOfItems'])
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

echo $returnStr;
	
function getTemplateLi($aTemplateString, $varArray)
{
	if (count($varArray)==0) return $aTemplateString;
	foreach ($varArray as $aVarName => $aVarValue)
	{
//		echo "[[$aVarName]] - $aVarValue \n";
		$aTemplateString = str_replace("[[$aVarName]]",$aVarValue,$aTemplateString);
//		echo ">>>>$aTemplateString \n";
	}
	
	return $aTemplateString;
}