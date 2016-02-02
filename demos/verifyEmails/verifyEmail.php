<?php
	$fromEmail = 'github@intersel.org';
	$fromEmailInfos =  explode('@',$fromEmail);
	if (empty($_REQUEST['email'])) $_REQUEST['email']='';

	$email = $_REQUEST['email'];

	require("email_validation.php");

	$validator=new email_validation_class;

	/*
	 * If you are running under Windows or any other platform that does not
	 * have enabled the MX resolution function GetMXRR() , you need to
	 * include code that emulates that function so the class knows which
	 * SMTP server it should connect to verify if the specified address is
	 * valid.
	 */
	if(!function_exists("GetMXRR"))
	{
		/*
		 * If possible specify in this array the address of at least on local
		 * DNS that may be queried from your network.
		 */
		$_NAMESERVERS=array();
		include("getmxrr.php");
	}
	/*
	 * If GetMXRR function is available but it is not functional, you may
	 * use a replacement function.
	 */
	/*
	else
	{
		$_NAMESERVERS=array();
		if(count($_NAMESERVERS)==0)
			Unset($_NAMESERVERS);
		include("rrcompat.php");
		$validator->getmxrr="_getmxrr";
	}
	*/

	/* how many seconds to wait before each attempt to connect to the
	   destination e-mail server */
	$validator->timeout=10;

	/* how many seconds to wait for data exchanged with the server.
	   set to a non zero value if the data timeout will be different
		 than the connection timeout. */
	$validator->data_timeout=0;

	/* user part of the e-mail address of the sending user
	   (info@phpclasses.org in this example) */
	$validator->localuser=$fromEmailInfos[0];//"info";

	/* domain part of the e-mail address of the sending user */
	$validator->localhost=$fromEmailInfos[1];//"phpclasses.org";

	/* Set to 1 if you want to output of the dialog with the
	   destination mail server */
	$validator->debug=1;

	/* Set to 1 if you want the debug output to be formatted to be
	displayed properly in a HTML page. */
	$validator->html_debug=1;


	/* When it is not possible to resolve the e-mail address of
	   destination server (MX record) eventually because the domain is
	   invalid, this class tries to resolve the domain address (A
	   record). If it fails, usually the resolver library assumes that
	   could be because the specified domain is just the subdomain
	   part. So, it appends the local default domain and tries to
	   resolve the resulting domain. It may happen that the local DNS
	   has an * for the A record, so any sub-domain is resolved to some
	   local IP address. This  prevents the class from figuring if the
	   specified e-mail address domain is valid. To avoid this problem,
	   just specify in this variable the local address that the
	   resolver library would return with gethostbyname() function for
	   invalid global domains that would be confused with valid local
	   domains. Here it can be either the domain name or its IP address. */
	$validator->exclude_address="";
	$validator->invalid_email_domains_file = 'invalidemaildomains.csv';
	$validator->invalid_email_servers_file = 'invalidemailservers.csv';
	$validator->email_domains_white_list_file = 'emaildomainswhitelist.csv';

//array('email'=>$toemail,'result'=>$result,'details'=>$details);

	$error = '';
	$resultStatus  = "invalid";

	if(strlen($error = $validator->ValidateAddress($email, $valid)))
	{
			$error .= HtmlSpecialChars($error);
	}
	elseif(!$valid)
	{
		$error .= "$email is not a valid deliverable e-mail box address.<br>\n";
		if(count($validator->suggestions))
		{
			$suggestion = $validator->suggestions[0];
			$link = '?email='.UrlEncode($suggestion);
			$error .= "Did you mean ".HtmlSpecialChars($suggestion).'('.HtmlSpecialChars($link).")?<br>\n";
		}
	}
	elseif(($result=$validator->ValidateEmailBox($email))<0)
	{
		$error .= "It was not possible to determine if $email is a valid deliverable e-mail box address.<br>\n";
	}
	else
	{
		$error .= "$email is ".($result ? "" : "not ")."a valid deliverable e-mail box address.\n";
		if ($result) $resultStatus  = "valid";
	}
		
		
//returns {email:<toemail>,result:<result>,details:<details>}
$res = array('email'=>$email,'result'=>$resultStatus,'details'=>$error."<br>\n".str_replace('&quot;','"',$validator->error_details),'time'=>date("Y-m-d H:i:s"));
echo json_encode($res);
/*
function verifyEmail($toemail, $fromemail, $testRealConnection=true){
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
*/