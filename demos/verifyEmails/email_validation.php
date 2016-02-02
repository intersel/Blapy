<?php
/*
 * email_validation.php - PHP Email validation: Determine if a given e-mail address is valid.
 *
 * @(#) $Header: /opt2/ena/metal/emailvalidation/email_validation.php,v 1.37 2016/01/24 04:51:36 mlemos Exp $
 * 
 * Class from http://www.phpclasses.org/package/13-PHP-Determine-if-a-given-e-mail-address-is-valid-.html
 * By Manuel Lemos
 * 
 *Class that may be used to determine if a given e-mail address is valid. It features:
 * - Simple validation just by looking at the e-mail address string
 * - Validation of the domain against a list of known domains that are often misspelled (typos) like those of Gmail.com, Hotmail.com, Mail.ru, Ntlworld.com, Rediffmail.com, Rocketmail.com, Yahoo.com, Yandex.com, etc.
 * - Provides did you mean like suggestions for email addresses that were entered with typos
 * - Validation of domain against a list of typical fake domains like test.com, testtest.com, asd.com, asdf.com, etc..
 * - Validation of the email address domain against a list of of known domains for being used as disposable email addresses or temporary domains
 * - Manual whitelisting of domains to avoid trigger false positives of invalid domains
 * - Validation of the e-mail address domain checking the DNS MX record (mail exchange)
 * - Validation of a e-mail address by connecting to the mail host server to determine if there is really a deliverable mail box by simulating part of the message delivery process.
 * - Works under Windows or other platforms that do not have the GetMXRR function enabled
 *
 */
 

class email_validation_class
{
	var $email_regular_expression="^([-!#\$%&'*+./0-9=?A-Z^_`a-z{|}~])+@([-!#\$%&'*+/0-9=?A-Z^_`a-z{|}~]+\\.)+[a-zA-Z]{2,6}\$";
	var $timeout=0;
	var $data_timeout=0;
	var $localhost="";
	var $localuser="";
	var $debug=0;
	var $html_debug=0;
	var $echo_error=0;
	var $log_debug = 0;
	var $exclude_address="";
	var $getmxrr="GetMXRR";
	var $email_domains_white_list_file = '';
	var $invalid_email_users_file = '';
	var $invalid_email_domains_file = '';
	var $invalid_email_servers_file = '';
	var $suggestions = array();
	var $validation_status_code = 0;
	
	var $error_details = '';
	
	var $EMAIL_VALIDATION_STATUS_OK                       =  0;

	var $EMAIL_VALIDATION_STATUS_TEMPORARY_SMTP_REJECTION = -1;
	var $EMAIL_VALIDATION_STATUS_SMTP_DIALOG_REJECTION    = -2;
	var $EMAIL_VALIDATION_STATUS_SMTP_CONNECTION_FAILED   = -3;

	var $EMAIL_VALIDATION_STATUS_BANNED_WORDS_IN_USER     =  1;
	var $EMAIL_VALIDATION_STATUS_BANNED_DOMAIN            =  2;
	var $EMAIL_VALIDATION_STATUS_FAKE_DOMAIN              =  3;
	var $EMAIL_VALIDATION_STATUS_TYPO_IN_DOMAIN           =  4;
	var $EMAIL_VALIDATION_STATUS_DISPOSABLE_ADDRESS       =  5;
	var $EMAIL_VALIDATION_STATUS_TEMPORARY_DOMAIN         =  6;
	var $EMAIL_VALIDATION_STATUS_SPAM_TRAP_ADDRESS        =  7;
	var $EMAIL_VALIDATION_STATUS_BANNED_SERVER_DOMAIN     =  8;
	var $EMAIL_VALIDATION_STATUS_BANNED_SERVER_IP         =  9;
	var $EMAIL_VALIDATION_STATUS_BANNED_SERVER_REVERSE_IP = 10;

	var $last_code="";
	var $email_domains_white_list;
	var $invalid_email_users;
	var $invalid_email_domains;
	var $invalid_email_servers;

	/* private functions */

	Function LoadCSVList($file, &$list)
	{
		if(IsSet($list))
			return('');
		if(!($csv = fopen($file, "r")))
			return('could not open CSV file '.$file);
		$read = array();
		while (($data = fgetcsv($csv, 8000, ',')))
			if(strlen($data[0]))
				$read[] = $data;
    fclose($csv);
		$list = $read;
		return('');
	}

	Function SplitAddress($address, &$user, &$domain)
	{
		if(GetType($at = strpos($address, '@')) == 'integer')
		{
			$user = substr($address, 0, $at);
			$domain = substr($address, $at + 1);
		}
		else
		{
			$user = $address;
			$domain = 'localhost';
		}
	}

	Function OutputDebug($message)
	{
		if($this->log_debug)
			error_log($message);
		else
		{
			$message.="\n";
			if($this->html_debug)
				$message=str_replace("\n","<br>\n",HtmlEntities($message));
			
			$this->error_details .= $message;
			//echo $this->error_details;
			if ($this->echo_error)
			{
				echo $message;
				flush();
			}
		}
	}

	Function GetLine($connection)
	{
		for($line="";;)
		{
			if(@feof($connection))
				return(0);
			$line.=@fgets($connection,100);
			$length=strlen($line);
			if($length>=2
			&& substr($line,$length-2,2)=="\r\n")
			{
				$line=substr($line,0,$length-2);
				if($this->debug)
					$this->OutputDebug("S $line");
				return($line);
			}
		}
	}

	Function PutLine($connection,$line)
	{
		if($this->debug)
			$this->OutputDebug("C $line");
		return(@fputs($connection,"$line\r\n"));
	}

	Function ValidateEmailAddress($email)
	{
		return(preg_match('/'.str_replace('/', '\\/', $this->email_regular_expression).'/', $email));
	}

	Function ValidateEmailHost($email,&$hosts)
	{
		if(!$this->ValidateEmailAddress($email))
			return(0);
		$this->SplitAddress($email, $user, $domain);
		$hosts=$weights=array();
		$getmxrr=$this->getmxrr;
		if(function_exists($getmxrr)
		&& $getmxrr($domain,$hosts,$weights))
		{
			$mxhosts=array();
			for($host=0;$host<count($hosts);$host++)
				$mxhosts[$weights[$host]]=$hosts[$host];
			KSort($mxhosts);
			for(Reset($mxhosts),$host=0;$host<count($mxhosts);Next($mxhosts),$host++)
				$hosts[$host]=$mxhosts[Key($mxhosts)];
		}
		else
		{
			if(strcmp($ip=@gethostbyname($domain),$domain)
			&& (strlen($this->exclude_address)==0
			|| strcmp(@gethostbyname($this->exclude_address),$ip)))
				$hosts[]=$domain;
		}
		return(count($hosts)!=0);
	}

	Function VerifyResultLines($connection,$code)
	{
		while(($line=$this->GetLine($connection)))
		{
			$end = strcspn($line, ' -');
			$this->last_code=substr($line, 0, $end);
			if(strcmp($this->last_code,$code))
				return(0);
			if(!strcmp(substr($line, strlen($this->last_code), 1)," "))
				return(1);
		}
		return(-1);
	}

	/* public functions */

	Function ValidateEmailBox($email)
	{
		if(!$this->ValidateEmailHost($email,$hosts))
			return(0);
		if(!strcmp($localhost=$this->localhost,"")
		&& !strcmp($localhost=getenv("SERVER_NAME"),"")
		&& !strcmp($localhost=getenv("HOST"),""))
		   $localhost="localhost";
		if(!strcmp($localuser=$this->localuser,"")
		&& !strcmp($localuser=getenv("USERNAME"),"")
		&& !strcmp($localuser=getenv("USER"),""))
		   $localuser="root";
		for($host=0;$host<count($hosts);$host++)
		{
			$domain=$hosts[$host];
			if(preg_match('/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/',$domain))
				$ip=$domain;
			else
			{
				if($this->debug)
					$this->OutputDebug("Resolving host name \"".$hosts[$host]."\"...");
				if(!strcmp($ip=@gethostbyname($domain),$domain))
				{
					if($this->debug)
						$this->OutputDebug("Could not resolve host name \"".$hosts[$host]."\".");
					continue;
				}
			}
			if(strlen($this->exclude_address)
			&& !strcmp(@gethostbyname($this->exclude_address),$ip))
			{
				if($this->debug)
					$this->OutputDebug("Host address of \"".$hosts[$host]."\" is the exclude address");
				continue;
			}
			if($this->debug)
				$this->OutputDebug("Connecting to host address \"".$ip."\"...");
			if(($connection=($this->timeout ? @fsockopen($ip,25,$errno,$error,$this->timeout) : @fsockopen($ip,25))))
			{
				$timeout=($this->data_timeout ? $this->data_timeout : $this->timeout);
				if($timeout
				&& function_exists("socket_set_timeout"))
					socket_set_timeout($connection,$timeout,0);
				if($this->debug)
					$this->OutputDebug("Connected.");
				if($this->VerifyResultLines($connection,"220")>0
				&& $this->PutLine($connection,"HELO $localhost")
				&& $this->VerifyResultLines($connection,"250")>0
				&& $this->PutLine($connection,"MAIL FROM: <".$localuser."@".$localhost.">")
				&& $this->VerifyResultLines($connection,"250")>0
				&& $this->PutLine($connection,"RCPT TO: <$email>")
				&& ($result=$this->VerifyResultLines($connection,"250"))>=0)
				{
					if($result)
					{
						if($this->PutLine($connection,"DATA"))
							$result=($this->VerifyResultLines($connection,"354")!=0);
					}
					if(!$result)
					{
						if(strlen($this->last_code)
						&& !strcmp($this->last_code[0],"4"))
						{
							$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_TEMPORARY_SMTP_REJECTION;
							$result=-1;
						}
					}
					else
						$result = 1;
					if($this->debug)
						$this->OutputDebug("This host states that the address is ".($result ? ($result>0 ? "valid" : "undetermined") : "not valid").".");
					@fclose($connection);
					if($this->debug)
						$this->OutputDebug("Disconnected.");
					return($result);
				}
				if($this->debug)
					$this->OutputDebug("Unable to validate the address with this host.");
				@fclose($connection);
				if($this->debug)
					$this->OutputDebug("Disconnected.");
				$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_SMTP_DIALOG_REJECTION;
			}
			else
			{
				if($this->debug)
					$this->OutputDebug("Failed.");
				$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_SMTP_CONNECTION_FAILED;
			}
		}
		return(-1);
	}

	Function ValidateAddress($email, &$valid)
	{
		$valid = -1;
		$this->SplitAddress($email, $email_user, $email_domain);
		$email_user = strtolower($email_user);
		$email_domain = strtolower($email_domain);
		if(strlen($this->email_domains_white_list_file))
		{
			if(strlen($error = $this->LoadCSVList($this->email_domains_white_list_file, $this->email_domains_white_list)))
				return($error);
			foreach($this->email_domains_white_list as $domain)
			{
				if(!strcasecmp($domain[0], $email_domain))
				{
					if($this->debug)
							$this->OutputDebug('email domain '.$email_domain.' is valid because it is in the whitelist');
					$valid = 1;
					return('');
				}
			}
		}
		if(strlen($this->invalid_email_users_file))
		{
			if(strlen($error = $this->LoadCSVList($this->invalid_email_users_file, $this->invalid_email_users)))
				return($error);
			foreach($this->invalid_email_users as $user)
			{
				if(GetType(strpos($email_user, strtolower($user[0]))) == 'integer')
				{
					if($this->debug)
						$this->OutputDebug('email user '.$email_user.' is invalid because it contains '.$user[0]);
					$valid = 0;
					$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_BANNED_WORDS_IN_USER;
					return('');
				}
			}
		}
		if(strlen($this->invalid_email_domains_file))
		{
			if(strlen($error = $this->LoadCSVList($this->invalid_email_domains_file, $this->invalid_email_domains)))
				return($error);
			foreach($this->invalid_email_domains as $domain)
			{
				$match = strtolower($domain[0]);
				$entries = count($domain);
				if($entries != 3
				&& $entries != 4)
				{
					trigger_error('domain entry for '.$match.' is incorrectly defined');
					$check = 'part';
				}
				else
					$check = $domain[2];
				switch($check)
				{
					case '':
						if(!strcmp($match, $email_domain)
						|| !strcmp('.'.$match, substr($email_domain, -strlen('.'.$match))))
						{
							$valid = false;
							break 2;
						}
						break;
					default:
						trigger_error($check.' is not a valid check type for domain entry for '.$match);
					case 'part':
						if(GetType(strpos($email_domain, $match)) == 'integer')
						{
							if($this->debug)
								$this->OutputDebug('email domain '.$email_domain.' is invalid because it contains "'.$match.'"');
							$valid = false;
							break 2;
						}
						break;
				}
			}
			if(!$valid)
			{
				switch($domain[1])
				{
					case 'fake':
						if($this->debug)
							$message = $email_domain.' is fake email domain';
						$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_FAKE_DOMAIN;
						break;
					case 'typo':
						$fix = $domain[3];
						if($this->debug)
							$message = $email_domain.' email domain has a typo, it may be '.$fix;
						$this->suggestions = array($email_user.'@'.$fix);
						$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_TYPO_IN_DOMAIN;
						break;
					case 'disposable':
						if($this->debug)
							$message = $email_domain.' is a disposable email domain';
						$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_DISPOSABLE_ADDRESS;
						break;
					case 'temporary':
						if($this->debug)
							$message = $email_domain.' is a temporary domain';
						$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_TEMPORARY_DOMAIN;
						break;
					case 'spam trap':
						if($this->debug)
							$message = $email_domain.' is a spam trap domain';
						$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_SPAM_TRAP_ADDRESS;
						break;
					case '':
						if($this->debug)
							$message = 'email domain '.$email_domain.' ends in '.$match;
						$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_BANNED_DOMAIN;
						break;
				}
				if($this->debug)
					$this->OutputDebug($message);
				return '';
			}
			
		}
		if(strlen($this->invalid_email_servers_file))
		{
			$getmxrr = $this->getmxrr;
			if(!function_exists($getmxrr))
				return('it was not specified a valid working replacement for function getmxrr');
			if(!$getmxrr($email_domain, $servers, $weights))
			{
				if($this->debug)
					$this->OutputDebug('email domain '.$email_domain.' may be valid because it was not possible to get its MX servers');
				$servers = array();
			}
			else
			{
				if(strlen($error = $this->LoadCSVList($this->invalid_email_servers_file, $this->invalid_email_servers)))
					return($error);
			}
			$ts = count($servers);
			for($s = 0; $s < $ts; ++$s)
			{
				$server = $servers[$s];
				$ip = gethostbyname($server);
				if(!in_array($ip, $servers))
					$servers[] = $ip;
				$host = @gethostbyaddr($ip);
				if($host
				&& !in_array($host, $servers))
					$servers[] = $host;
			}
			foreach($servers as $server)
			{
				$ip = gethostbyname($server);
				$host = @gethostbyaddr($ip);
				gethostbyname($server);
				foreach($this->invalid_email_servers as $invalid_server)
				{
					$match = strtolower($invalid_server[0]);
					if(count($invalid_server) != 3)
					{
						trigger_error('server entry for '.$match.' is incorrectly defined');
						$check = 'part';
					}
					else
						$check = $invalid_server[2];
					switch($check)
					{
						case '':
							if(!strcmp($match, $server)
							|| !strcmp('.'.$match, substr($server, -strlen('.'.$match))))
							{
								if($this->debug)
									$this->OutputDebug('email server '.$server.' is invalid because it ends in '.$match);
								$valid = 0;
								$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_BANNED_SERVER_DOMAIN;
								return('');
							}
							break;
						case 'ip':
							if($ip
							&& !strcmp($match, $ip))
							{
								if($this->debug)
									$this->OutputDebug('email server '.$server.' is invalid because its IP address is '.$match);
								$valid = 0;
								$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_BANNED_SERVER_IP;
								return('');
							}
							break;
						case 'resolve':
							$match_ip = gethostbyname($match);
							if($ip
							&& !strcmp($match_ip, $ip))
							{
								if($this->debug)
									$this->OutputDebug('email server '.$server.' is invalid because its IP address is '.$match_ip);
								$valid = 0;
								$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_BANNED_SERVER_REVERSE_IP;
								return('');
							}
							break;
						default:
							trigger_error($check.' is invalid type check for server entry for '.$match);
						case 'part':
							if(GetType(strpos($server, $match)) == 'integer')
							{
								if($this->debug)
									$this->OutputDebug('email server '.$server.' is invalid because contains '.$match);
								$valid = 0;
								$this->validation_status_code = $this->EMAIL_VALIDATION_STATUS_BANNED_SERVER_DOMAIN;
								return('');
							}
							break;
					}
				}
			}
		}
		$valid = 1;
		return('');
	}
};

?>