<!DOCTYPE html>
<!-- To run the current sample code in your own environment, copy this to an html page. -->
<html id="myBlapy">
<head>
	<title id="headtitle" data-blapy-container="true" data-blapy-container-name="Title" data-blapy-container-content="<?php echo basename($_SERVER["SCRIPT_FILENAME"]);?>"><?php echo $defaultTitle?></title>
	<meta content='text/html; charset=UTF-8' http-equiv='Content-Type'>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="assets/main.css" />
	<script type="text/javascript" src="../../extlib/jquery.js"></script>
	<script type="text/javascript" src="../../extlib/sammy/lib/sammy.js"></script>
	<script type="text/javascript" src="../../extlib/iFSM/extlib/jquery.dotimeout.js"></script>
	<script type="text/javascript" src="../../extlib/iFSM/extlib/jquery.attrchange.js"></script>
	<script type="text/javascript" src="../../extlib/iFSM/iFSM.js"></script>
	<script type="text/javascript" src="../../extlib/json5/index.min.js"></script>
</head>
<body>
	<div class="wrapper style1 first">
		<article class="container" id="top">
			<div class="row">
				<div class="4u 12u(mobile)">
					<span class="image fit"><img src="assets/blapy.png" alt="" /></span>
					<ul>
						<li><a href="index.php" data-blapy-link="true">Hello World!</a></li>
						<li><a href="helloworld_2.php?id=myNiceId" data-blapy-link="true">How is it going?</a></li>
						<li><a href="helloworld_3.php" data-blapy-link="true">Load from an optimized code</a></li>
						<li><span data-blapy-link="true" data-blapy-href="helloworld_4.php?id=myNiceId2" class="anchor" style="">Load with a blapy link with no routing</span></li>
					</ul>
				</div>
				<div class="8u 12u(mobile)">
