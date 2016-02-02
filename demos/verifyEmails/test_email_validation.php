<?php
/*
 * test_email_validation.html
 *
 * @(#) $Header: /opt2/ena/metal/emailvalidation/test_email_validation.php,v 1.13 2014/03/29 11:49:30 mlemos Exp $
 *
 * * Class from http://www.phpclasses.org/package/13-PHP-Determine-if-a-given-e-mail-address-is-valid-.html
 * By Manuel Lemos
 *
 */

?><html>
<head>
<title>Test for Manuel Lemos's PHP E-mail validation class</title>
</head>
<body>
<h1 align="center">Test for Manuel Lemos's PHP E-mail validation class</h1>
<hr>
<?php
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
	$validator->localuser="info";

	/* domain part of the e-mail address of the sending user */
	$validator->localhost="phpclasses.org";

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

	if(IsSet($_GET["email"]))
		$email=$_GET["email"];
	if(IsSet($email)
	&& strcmp($email,""))
	{
		if(strlen($error = $validator->ValidateAddress($email, $valid)))
		{
			echo "<h2 align=\"center\">Error: ".HtmlSpecialChars($error)."</h2>\n";
		}
		elseif(!$valid)
		{
			echo "<h2 align=\"center\"><tt>$email</tt> is not a valid deliverable e-mail box address.</h2>\n";
			if(count($validator->suggestions))
			{
				$suggestion = $validator->suggestions[0];
				$link = '?email='.UrlEncode($suggestion);
				echo "<H2 align=\"center\">Did you mean <a href=\"".HtmlSpecialChars($link)."\"><tt>".HtmlSpecialChars($suggestion)."</tt></a>?</H2>\n";
			}
		}
		elseif(($result=$validator->ValidateEmailBox($email))<0)
			echo "<h2 align=\"center\">It was not possible to determine if <tt>$email</tt> is a valid deliverable e-mail box address.</h2>\n";
		else
			echo "<h2 align=\"center\"><tt>$email</tt> is ".($result ? "" : "not ")."a valid deliverable e-mail box address.</h2>\n";
	}
	else
	{
		$email = 'your@test.email.here';
		$link = '?email='.$email;
		echo "<h2 align=\"center\">Access this page using passing the email to validate here: <a href=\"".HtmlSpecialChars($link)."\"><tt>".$email."</tt></a></h2>\n";
	}
?>
<hr>
</body>
</html>
