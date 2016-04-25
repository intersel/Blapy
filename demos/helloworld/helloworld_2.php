<?php
$defaultTitle = "Great! That's a new title of Hello World";
include("header.php");
?>

					<header>
						<h1>Welcome to the "Hello World" demo of <strong>BLAPY</strong>!</h1>
						<h2>I am the "<b><?php echo basename(__FILE__)?>" file</b> of the "Hello world" demo</h2>
					</header>					
					<div style="border:solid 1px green;margin:20px;padding:20px;">
						<div 	id="mainContainer" 
								data-blapy-container="true" 
								data-blapy-container-name="mainContainer" 
								data-blapy-container-content="How is it going?"
						>
							<h1>How is it going?</h1>
							<p>Did you see that the title block was changed? The "&lt;title&gt;" is a Blapy block too!</p> 
							<p>Click on the "Hello world!" link to load back its content...</p> 
							<p><?php if (!empty($_GET['id'])) echo "sent id: ".$_GET['id']?>
						</div>
					</div>	
					<p>Click on the <a href="index.php" data-blapy-link="true">"Hello world"</a> link, it will then change the Blapy content of the current page by the one coming from the page of this link</p>

<?php 
include("footer.php");
