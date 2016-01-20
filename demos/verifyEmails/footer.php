<script type="text/javascript" src="../../Blapy.js"></script>
<script type="text/javascript" src="../../Blapy_AnimationPlugins.js"></script>
<script>
	$( document ).ready(function() {

		//start Blapy
		$('#myBlapy').Blapy({activeSammy:true});

		//catch errors
		$( "#myBlapy" ).on( "Blapy_ErrorOnPageChange", function(event,anError) {
			  alert( anError );
			});

	});

	//do the testing from a URL...
	var emailPos=0;
	function oneTesting()
	{
		//get our next email to check
		emailPos++;
		emailToGet=$("#results tr:nth-child("+emailPos+") td:first-child").html();
		$("#results tr:nth-child("+emailPos+") td:nth-child(2)").html("wait...");
		if (!emailToGet) 
		{
			emailPos=0;
			return;
		}

		//call blapy with the result stored in #oneresult block
		$( "#myBlapy" ).trigger('loadUrl',{aUrl:'verifyEmail.php?email='+emailToGet,params:{embeddingBlockId:'oneresult'}});
	}

	//activate the next search when last has been done
	$(document).on('Blapy_afterContentChange','#oneresult', function(event,aBlock) {

		if (emailPos == 0) return; 
		//update the general result table
		$("#results tr:nth-child("+emailPos+") td:nth-child(2)").html($('#oneresult td:nth-child(2)').html());
		$("#results tr:nth-child("+emailPos+") td:nth-child(3)").html($('#oneresult td:nth-child(3)').html());
		
		//call for the next test
		oneTesting(); 
	});
	
	$("body").append('<h3>HTML code of the page</h3>').append(jQuery('<pre />').text($('html').html()));
</script>


