<?php
include("header.php");
$GetMore = empty($_REQUEST['More'])?0:$_REQUEST['More'];
if ($GetMore==1) $appword='append';
else if ($GetMore==-1) $appword='prepend';
?>
<body>
	<h1>Some of the UPI Application features on UPI blocks</h1>
	<p></p>
	<div style="border:solid 1px green;margin:20px;padding:20px;" id="myUPIApp1">
		<div 	data-upi-container="true" 
				data-upi-container-name="mainContainerApp1" 
				data-upi-container-content="aContent" 
				<?php if ($GetMore) echo 'data-upi-update="'.$appword.'"';?>
		>
<?php
if ($GetMore)
{
?>
			<p>This is an additional content...</p>
<?php 
}
else 
{
?>
			<p>This is a nice content for a demo...</p>
<?php 
}
?>
			
		</div>
		<button onclick="$('#myUPIApp1').trigger('loadUrl',{aUrl:'index.php?More=1',params:{action:'update'}})">Get more content...</button>
		<button onclick="$('#myUPIApp1').trigger('loadUrl',{aUrl:'index.php?More=-1',params:{action:'update'}})">Prepend new content...</button>
		<button onclick="$('#myUPIApp1').trigger('loadUrl',{aUrl:'index.php?ReplaceAll=1',params:{action:'replace'}})">Replace all available contents...</button>
		<button onclick="$('#myUPIApp1').trigger('loadUrl',{aUrl:'index.php?ForceUpdate=1',params:{action:'update'}})">Forced update of content...</button>
		<button onclick="$('#myUPIApp1').trigger('loadUrl',{aUrl:'index.php?ChangeUPIBlock=1',params:{action:'update'}})">Change UPI Blocks...</button>
	</div>	
	<div style="border:solid 1px green;margin:20px;padding:20px;" id="myUPIApp2">
		<div 	data-upi-container="true" 
				data-upi-container-name="mainContainerApp2" 
				data-upi-container-content="aContent" 
				<?php if ($GetMore) echo 'data-upi-update="append"';?>
		>
		</div>
	</div>
	
	<div style="border:solid 1px green;margin:20px;padding:20px;" id="myUPIApp3">
		<ul>
			<li><a href="content1_app3.php" data-upi-link="true">Content 1 for Application 3</a></li>
			<li><a href="content2_app3.php" data-upi-link="true">Content 2 for Application 3</a></li>
		</ul>
		<div 	data-upi-container="true" 
				data-upi-container-name="mainContainerApp3" 
				data-upi-container-content="aContent" 
		>
		Fill this part by clicking one of the link above...
		</div>
	</div>
	
</body>

<?php 
include("footer.php");
