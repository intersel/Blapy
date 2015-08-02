<script type="text/javascript" src="../../UPIApplication.js"></script>
<script>
	$( document ).ready(function() {
		$('#myUPIApp1,#myUPIApp2,#myUPIApp3').UPIApplication();

		$( "#myUPIApp1,#myUPIApp2,#myUPIApp3" ).on( "UPIApplication_ErrorOnPageChange", function(event,anError) {
			  alert( anError );
			});
	});

	$("body").append('<h3>HTML code of the page</h3>').append(jQuery('<pre />').text($('html').html()));
</script>

</html>
