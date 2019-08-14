<?php

$setFilter = 'all';

$returnStr = <<<EOD
<ul id="filters"
		class="filters"
		data-blapy-container="true"
		data-blapy-container-name="filters"
		data-blapy-container-content="filters-All"
		>
		<li>
			<a href="php/getAll.php" data-blapy-link="true" class="selected">All</a>
		</li>
		<li>
			<a href="php/getActive.php" data-blapy-link="true">Active</a>
		</li>
		<li>
			<a href="php/getCompleted.php" data-blapy-link="true">Completed</a>
		</li>
</ul>
EOD;

include ('getTodo.php');
