<?php
include("header.php");

$aUPICall = empty($_REQUEST['upicall'])?0:$_REQUEST['upicall'];

$GetMore = empty($_REQUEST['More'])?0:$_REQUEST['More'];
$ChangeUPIBlock = empty($_REQUEST['ChangeUPIBlock'])?0:$_REQUEST['ChangeUPIBlock'];

if ($GetMore==1) $appword='append';
else if ($GetMore==-1) $appword='prepend';
else if ($GetMore==0) $appword='force-update';

if ($ChangeUPIBlock==1)
	$appword='replace';
else if ($ChangeUPIBlock==-1)
	$appword='update';

?>
<body>
	<h1>Some of the UPI Application features on UPI blocks</h1>
	<p></p>
	<div style="border:solid 1px green;margin:20px;padding:20px;" id="myUPIApp1">
		<div 	data-upi-container="true" 
				data-upi-container-name="mainContainerApp1" 
				data-upi-container-content="aContent" 
				<?php echo 'data-upi-update="'.$appword.'"';?>
		>
<?php
if ($GetMore)
{

	echo '<p>This is an additional content...<br>
			<span style="margin:0px 0px 0px 50px;font-size:70%">Upi-update == '.$appword.'</span>
		 </p>';
}
else if ($ChangeUPIBlock==1)
{
?>
		<div 	data-upi-container="true" 
				data-upi-container-name="submainContainerApp1" 
				data-upi-container-content="aSubContent" 
		>
		This is a Sub Content
		</div>
		<div 	data-upi-container="true" 
				data-upi-container-name="mainContainerApp3" 
				data-upi-container-content="aSubContent" 
				data-upi-update="force-update"
		>
		This is a Sub Content that will now be updated from APP3
		</div>
<?php 	
}
else 
{
?>
			<p>This is a nice content for a demo...</p>

<?php
	if ($ChangeUPIBlock==-1) 
	{
?>
			<!-- remove the sub blocks if any -->
			<div 	data-upi-container="true" 
					data-upi-container-name="submainContainerApp1" 
					data-upi-container-content="aSubContent" 
					data-upi-update="remove"
			>
			</div>
			<div 	data-upi-container="true" 
					data-upi-container-name="mainContainerApp3" 
					data-upi-container-content="aSubContent" 
					data-upi-update="replace"
			>
				<div data-upi-container="true" 
					data-upi-container-name="mainContainerApp1" 
					data-upi-container-content="aContent" 
					<?php echo 'data-upi-update="'.$appword.'"';?>
				>
					<p>This is a nice <b>reinitialized</b> content for a demo...</p>
				</div>
			</div>
			
			
<?php 
	}
}
?>
			
		</div>
		<button onclick="$('#myUPIApp1').trigger('loadUrl',{aUrl:'index.php?More=1',params:{action:'update'}})">Get more content...</button>
		<button onclick="$('#myUPIApp1').trigger('loadUrl',{aUrl:'index.php?More=-1',params:{action:'update'}})">Prepend new content...</button>
		<button onclick="$('#myUPIApp1').trigger('loadUrl',{aUrl:'index.php?More=0',params:{action:'update'}})">Forced update of content...</button>
		<button onclick="$('#myUPIApp1').trigger('loadUrl',{aUrl:'index.php?ChangeUPIBlock=1',params:{action:'update'}})">Change UPI Block with two others blocks...</button>
		<button onclick="$('#myUPIApp1').trigger('loadUrl',{aUrl:'index.php?ChangeUPIBlock=-1',params:{action:'update'}})">Reinitialize the UPI Block...</button>
	</div>	
	
	<div style="border:solid 1px green;margin:20px;padding:20px;" id="myUPIApp3">
		<ul>
			<li><a href="content1_app3.php" data-upi-link="true">Content 1 for Application 3</a></li>
			<li><a href="content2_app3.php" data-upi-link="true">Content 2 for Application 3</a></li>
		</ul>
		<div style="width:100%;">
			<div style="padding:20px;border:solid 1px green;width:40%;float:left;">
				<div 	data-upi-container="true" 
						data-upi-container-name="mainContainerApp3" 
						data-upi-container-content="aContent" 
				>
					Fill this part by clicking one of the link above...
				</div>
			</div>
			<div style="padding:20px;border:solid 1px green;width:40%;float:left;">
				<div 	data-upi-container="true" 
						data-upi-container-name="mainContainerApp3" 
						data-upi-container-content="aContent" 
				>
					Right part, duplicated from the left part
				</div>
			</div>
			<hr style="clear:both;border: 0;">
			
		</div>
	</div>
	<hr style="clear:both;">
</body>

<?php 
include("footer.php");
