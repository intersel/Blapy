<script type="text/javascript" src="../../UPIApplication.js"></script>
<script>
	$( document ).ready(function() {
		$('#myUPIApplication').UPIApplication();

		$( "#myUPIApplication" ).on( "UPIApplication_ErrorOnPageChange", function(event,anError) {
			  alert( anError );
			});
		$( "#myUPIApplication" ).on( "UPIApplication_beforeContentChange", function(event,aUPIBlock) {
			  //alert( 'UPIApplication_beforeContentChange'+$(aUPIBlock).html() );
			});
		$( "#myUPIApplication" ).on( "UPIApplication_afterContentChange", function(event,aUPIBlock) {
			  //alert( 'UPIApplication_afterContentChange' +$(aUPIBlock).html() );
		});
	});

	$("body").append('<h3>HTML code of the page</h3>').append(jQuery('<pre />').text($('html').html()));
</script>

</html>
