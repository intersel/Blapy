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
								data-blapy-container-content="Simple Blapy Content"
						>
							<h1>A simple Blapy link</h1>
							<p>This content is loaded from a "blapy link" set on span tag... Automagically, the span reacts to the click and activates the loading of the blapy block.</p> 
							<p>Surely you have noticed that blapy links may have "get" variables.</p>
							<p>sent id: <?php if (!empty($_GET['id'])) echo $_GET['id']?>
						</div>
					</div>	
					<p>Click on the <a href="index.php" data-blapy-link="true">"Hello world"</a> link, it will then change the Blapy content of the current page by the one coming from the page of this link</p>

<?php 
include("footer.php");
