<?php
include("header.php");

$aBlapyCall = empty($_REQUEST['blapycall'])?0:$_REQUEST['blapycall'];

$GetMore = empty($_REQUEST['More'])?0:$_REQUEST['More'];
$ChangeBlapyBlock = empty($_REQUEST['ChangeBlapyBlock'])?0:$_REQUEST['ChangeBlapyBlock'];

//verify if update of mainContainerApp2 was sent by myBlapyApp1... as we just want myBlapyApp2 doing the time update
if ( 			(array_key_exists('blapyContainerName',$_REQUEST))
			&& 	($_REQUEST['blapyContainerName']=='mainContainerApp2')
		)
{
	if ($_REQUEST['blapyobjectid']=='myBlapyApp1') return;
	else if ( ($_REQUEST['blapyContainerName']=='mainContainerApp2') && ($_REQUEST['blapyobjectid']=='myBlapyApp2'))
	{
		?>
		<div 	data-blapy-container="true"
						data-blapy-container-name="mainContainerApp2"
						data-blapy-container-content="aContent_<?php echo time();?>"
						data-blapy-href = "index.php"
						data-blapy-updateblock-time = "5000"
				>
					<b>Time is:</b> <?php echo date('d-M-Y H:i:s');?> (updated every 5s)
		</div>
		<?php
		return;
	}
}

if ($GetMore==1) $appword='append';
else if ($GetMore==-1) $appword='prepend';
else if ($GetMore==0) $appword='force-update';

if ($ChangeBlapyBlock==1)
	$appword='replace';
else if ($ChangeBlapyBlock==-1)
	$appword='update';

?>
<body id="myBlapyApp1">
	<h1>Some of the Blapy features on Blapy blocks</h1>
	<p></p>
	<div style="border:solid 1px green;margin:20px;padding:0 20px 20px;" id="myBlapyApp4">
		<h4>"myBlapyApp1" Blapy blocks</h4>
		<div 	id="mainContainerApp1"
				data-blapy-container="true"
				data-blapy-container-name="mainContainerApp1"
				data-blapy-container-content="aContent"
				<?php echo 'data-blapy-update="'.$appword.'"';?>
		>
<?php
if ($GetMore)
{

	echo '<p>This is an additional content...<br>
			<span style="margin:0px 0px 0px 50px;font-size:70%">Blapy-update == '.$appword.'</span>
		 </p>';
}
else if ($ChangeBlapyBlock==1)
{
?>
		<div 	id="submainContainerApp1"
				data-blapy-container="true"
				data-blapy-container-name="submainContainerApp1"
				data-blapy-container-content="aSubContent"
		>
		This is a Sub Content
		</div>
		<div 	id="submainContainerApp3"
				data-blapy-container="true"
				data-blapy-container-name="mainContainerApp3"
				data-blapy-container-content="aSubContent"
				data-blapy-update="force-update"
		>
		This is a Sub Content that will now be updated from "mainContainerApp3" Blapy block
		</div>
<?php
}
else
{
?>
			<p>This is a nice content for a demo...</p>

<?php
	if ($ChangeBlapyBlock==-1)
	{
?>
			<!-- remove the sub blocks if any -->
			<div 	data-blapy-container="true"
					data-blapy-container-name="submainContainerApp1"
					data-blapy-container-content="aSubContent"
					data-blapy-update="remove"
			>
			</div>
			<div 	data-blapy-container="true"
					data-blapy-container-name="mainContainerApp3"
					data-blapy-container-content="aSubContent"
					data-blapy-update="replace"
			>
				<div data-blapy-container="true"
					data-blapy-container-name="mainContainerApp1"
					data-blapy-container-content="aContent"
					<?php echo 'data-blapy-update="'.$appword.'"';?>
				>
					<p>This is a nice <b>reinitialized</b> content for a demo...</p>
				</div>
			</div>


<?php
	}
}
?>

		</div>
		<button onclick="$('#myBlapyApp1').trigger('loadUrl',{aUrl:'index.php?More=1',params:{action:'update'}})">Get more content...</button>
		<button onclick="$('#myBlapyApp1').trigger('loadUrl',{aUrl:'index.php?More=-1',params:{action:'update'}})">Prepend new content...</button>
		<button onclick="$('#myBlapyApp1').trigger('loadUrl',{aUrl:'index.php?More=0',params:{action:'update'}})">Forced update of content...</button>
		<button onclick="$('#myBlapyApp1').trigger('loadUrl',{aUrl:'index.php?ChangeBlapyBlock=1',params:{action:'update'}})">Change Blapy Block with two others blocks...</button>
		<button onclick="$('#myBlapyApp1').trigger('loadUrl',{aUrl:'index.php?ChangeBlapyBlock=-1',params:{action:'update'}})">Reinitialize the Blapy Block...</button>
	</div>
	<div style="border:solid 1px green;margin:20px;padding:0px 20px 20px;" id="myBlapyApp3">
		<h4>"myBlapyApp3" Blapy blocks</h4>

		<ul>
			<li><a href="content1_all_app.php" data-blapy-link="true">Content 1 for any Application with a "mainContainerApp3" block</a></li>
			<li><a href="content2_app3.php" data-blapy-link="true">Content 2 only for "mainContainerApp3" block of 'myBlapyApp3' application</a></li>
			<li><a href="content3_app1.php" onclick="$('#myBlapyApp4').trigger('loadUrl',{aUrl:$(this).attr('href')});return false;">Content 3 only for "mainContainerApp3" block of 'myBlapyApp1' application</a></li>
		</ul>
		<div style="width:100%;">
			<div style="padding:20px;border:solid 1px green;width:40%;float:left;">
				<div 	id="left"
						data-blapy-container="true"
						data-blapy-container-name="mainContainerApp3"
						data-blapy-container-content="aContent"
				>
					Fill this part by clicking one of the link above...
				</div>
			</div>
			<div style="padding:20px;border:solid 1px green;width:40%;float:left;">
				<div 	id="right"
						data-blapy-container="true"
						data-blapy-container-name="mainContainerApp3"
						data-blapy-container-content="aContent"
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
