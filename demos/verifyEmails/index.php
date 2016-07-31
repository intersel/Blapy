<!DOCTYPE html>
<!-- To run the current sample code in your own environment, copy this to an html page. -->
<html id="myBlapy">
<?php
$defaultTitle = "Email tester";
include("header.php");
?>
<body>
	<h1>Email Tester</h1>
	<p>This demo shows the embeddingBlock feature that allows to update blapy block content directly...</p>
	<p>It checks emails that are listed in the file "emailList.txt".</p> 
	<p> It uses the class "email_validation_class" from <a href="http://www.phpclasses.org/browse/author/1.html"></a>Manuel Lemos to do the hard job</a><br> 
	 from <a href="http://www.phpclasses.org/package/13-PHP-Determine-if-a-given-e-mail-address-is-valid-.html">http://www.phpclasses.org/package/13-PHP-Determine-if-a-given-e-mail-address-is-valid-.html</a>
	 </p>
	<ul>
		<li>
			<!--  tells that we want to update blapy blocks named "oneresult" from the get request to verifyEmail... -->
			<a href="verifyEmail.php?email=emmanuel@podvin.net" 
				data-blapy-link="true" 
				data-blapy-embedding-blockid="oneresult" 
			>Test emmanuel@podvin.net</a></li>
		<li><a href="#" onClick="oneTesting();return false;">Start Testing Email List</a></li>
	</ul>
	
	<!--  tells that we want to update blapy blocks named "oneresult" from the posted request to verifyEmail... -->
	<form name="myForm" 
			action="verifyEmail.php" 
			data-blapy-link="true" 
			data-blapy-embedding-blockid="oneresult" 
			method="POST" >
		Email: <input type="text" name="email"><br>
		<input type="submit" value="Send form data!">
	</form> 
	
	<!-- store last result... -->
	<h3>Result for a Email check</h3>
	request returns:
	<div id="oneresultbrut" 
		data-blapy-container="true" 
		data-blapy-container-name="oneresult" 
		data-blapy-container-content="oneresult"
	>
	</div>	
	... once parsed:
	<div id="oneresult" 
		data-blapy-container="true" 
		data-blapy-container-name="oneresult" 
		data-blapy-container-content="oneresult"
		data-blapy-update="json"
		data-blapy-template-file="resultValues.tpl"
		data-blapy-template-wrap="<table>"
	>
	</div>	
	
	<h3>Emails List</h3>
	<div id="results" 
		data-blapy-container="true" 
		data-blapy-container-name="results" 
		data-blapy-container-content="results"
		data-blapy-update="json"
		data-blapy-template-file="resultValues.tpl"
		data-blapy-template-wrap="<table>"
		data-blapy-template-init="emailsList.php"
	>
	</div>	
</body>
<?php 
include("footer.php");
?>
</html>