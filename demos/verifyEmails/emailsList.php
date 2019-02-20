<?php
/*

email files with a email per line

*/
$emailList = array();
$emailListJson ='';

if (array_key_exists('file',$_GET)) 
{
	$filename=$_GET['file'];
	if (file_exists($filename)) $emailList = file($filename,FILE_SKIP_EMPTY_LINES);
	if (count($emailList)>0)
	{
		foreach($emailList as $aEmail)
		{
			$emailListJson .= "{email: \"".trim($aEmail,"\n")."\"},\n";
		}
		$emailListJson = trim(trim($emailListJson,"\n"),',');
	}
}

if (empty($emailListJson)) $emailListJson ='
{email: "emmanuel.podvin@intersel.fr"},
{email: "em.blapy@yahoo.com"},
{email: "blapy"},
{email: "blapy@yahoo"},
{email: "blapy@yahoo.fr.com"}
';

?>
<div id="results" 
	data-blapy-container="true" 
	data-blapy-container-name="results" 
	data-blapy-container-content="resultsnew"<?php echo time();?>
>
[
<?php echo $emailListJson."\n"; ?>
]
</div>