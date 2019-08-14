<?php

$current_id = isset( $_REQUEST['current_id'])?$_REQUEST['current_id']:0;
$max_articles = 10;
?>
<div
	id="mainContainer-<?php echo $current_id?>"
	data-blapy-update="replace"
	data-blapy-container="true"
	data-blapy-container-name="mainContainer-<?php echo $current_id?>"
	data-blapy-container-content="content-<?php echo time()?>"
>
	<div class="row margin-b-2"	id="divB<?php echo $current_id?>">
				<div class="col-sm-6 col-md-3">
					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt="">
					<div class="caption">
						<h4><a href="#">Image title 1 - Row <?php echo $current_id?></a></h4>
						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
					</div>
				</div>
				<div class="col-sm-6 col-md-3">
					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt="">
					<div class="caption">
						<h4><a href="#">Image title 2 - Row <?php echo $current_id?></a></h4>
						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
					</div>
				</div>
				<div class="col-sm-6 col-md-3">
					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt="">
					<div class="caption">
						<h4><a href="#">Image title 3 - Row <?php echo $current_id?></a></h4>
						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
					</div>
				</div>
				<div class="col-sm-6 col-md-3">
					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt="">
					<div class="caption">
						<h4><a href="#">Image title 4 - Row <?php echo $current_id?></a></h4>
						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
					</div>
				</div>
	</div>
	<?php
	if ($current_id < $max_articles)
	{
	?>
	<div
		id="mainContainer-<?php echo $current_id+1?>"
		data-blapy-update="replace"
		data-blapy-container="true"
		data-blapy-container-name="mainContainer-<?php echo $current_id+1?>"
		data-blapy-container-content="content"
		data-blapy-updateblock-ondisplay="true"
		data-blapy-href="blog_articles.php?current_id=<?php echo $current_id+1?>"
	>
	</div>
	<?php
	}
	else echo "<p>no more article...</p>";
	?>
</div>
