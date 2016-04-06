<?php

$currentTime = time();

$returnStr = <<<EOD
<table>
	<tbody 	data-blapy-container="true"
			data-blapy-container-name="barChartExample"
			data-blapy-container-content="barChartExample-$currentTime"
			>
				<tr>
				<td>3326</td>
				<td>10/21/2013</td>
				<td>3:29 PM</td>
				<td>$321.33</td>
				</tr>
				<tr>
				<td>3325</td>
				<td>10/21/2013</td>
				<td>3:20 PM</td>
				<td>$234.34</td>
				</tr>
				<tr>
				<td>3324</td>
				<td>10/21/2013</td>
				<td>3:03 PM</td>
				<td>$724.17</td>
				</tr>
				<tr>
				<td>3323</td>
				<td>10/21/2013</td>
				<td>3:00 PM</td>
				<td>$23.71</td>
				</tr>
				<tr>
				<td>3322</td>
				<td>10/21/2013</td>
				<td>2:49 PM</td>
				<td>$8345.23</td>
				</tr>
				<tr>
				<td>3321</td>
				<td>10/21/2013</td>
				<td>2:23 PM</td>
				<td>$245.12</td>
				</tr>
				<tr>
				<td>3320</td>
				<td>10/21/2013</td>
				<td>2:15 PM</td>
				<td>$5663.54</td>
				</tr>
				<tr>
				<td>3319</td>
				<td>10/21/2013</td>
				<td>2:13 PM</td>
				<td>$943.45</td>
				</tr>
	</tbody>
</table>

EOD;
				
include('callActions.php');
				