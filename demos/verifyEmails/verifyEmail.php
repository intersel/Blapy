<?php
$fromemail = 'github@intersel.org';
if (empty($_REQUEST['email'])) $_REQUEST['email']='';
//returns {email:<toemail>,result:<result>,details:<details>}
$res = verifyEmail($_REQUEST['email'],$fromemail);
echo json_encode($res);

function verifyEmail($toemail, $fromemail, $testRealConnection=false){
	$email_arr = explode("@", $toemail);
	
	if (!filter_var($toemail, FILTER_VALIDATE_EMAIL)) 
	{
			$result  = "invalid";
			$details = "Bad email format.";

			return array('email'=>$toemail,'result'=>$result,'details'=>$details);
	}
	
	$domain = array_slice($email_arr, -1);
	$domain = $domain[0];
	$details ='';
	$result = 'valid';

	// Trim [ and ] from beginning and end of domain string, respectively
	$domain = ltrim($domain, "[");
	$domain = rtrim($domain, "]");

	if( "IPv6:" == substr($domain, 0, strlen("IPv6:")) ) {
		$domain = substr($domain, strlen("IPv6") + 1);
	}

	$mxhosts = array();
	if( filter_var($domain, FILTER_VALIDATE_IP) )
		$mx_ip = $domain;
	else
		getmxrr($domain, $mxhosts, $mxweight);

	if(!empty($mxhosts) )
		$mx_ip = $mxhosts[array_search(min($mxweight), $mxhosts)];
	else {
		if( filter_var($domain, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) ) {
			$record_a = dns_get_record($domain, DNS_A);
		}
		elseif( filter_var($domain, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) ) {
			$record_a = dns_get_record($domain, DNS_AAAA);
		}

		if( !empty($record_a) )
			$mx_ip = $record_a[0]['ip'];
		else {

			$result   = "invalid";
			$details .= "No suitable MX records found.";

			return array('email'=>$toemail,'result'=>$result,'details'=>$details);
		}
	}
	
	if ($testRealConnection)
	{
	
		$connect = @fsockopen($mx_ip, 25);
		if($connect){
			if(preg_match("/^220/i", $out = fgets($connect, 1024))){
				fputs ($connect , "HELO $mx_ip\r\n");
				$out = fgets ($connect, 1024);
				$details .= $out."\n";
				//echo 'd:'.$details.'<br>';
				fputs ($connect , "MAIL FROM: <$fromemail>\r\n");
				$from = fgets ($connect, 1024);
				$details .= $from."\n";
				//echo 'd:'.$details.'<br>';
	
				fputs ($connect , "RCPT TO: <$toemail>\r\n");
				$to = fgets ($connect, 1024);
				$details .= $to."\n";
				//echo 'd:'.$details.'<br>';
	
				fputs ($connect , "QUIT");
				fclose($connect);
	
				if(!preg_match("/^250/i", $from) || !preg_match("/^250/i", $to)){
					$result = "invalid";
				}
				else{
					$result = "valid";
				}
			}
		}
		else{
			$result = "invalid";
			$details .= "Could not connect to server";
		}
			
	}
	
	return array('email'=>$toemail,'result'=>$result,'details'=>$details);
}
