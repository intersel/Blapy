<script type="text/javascript" src="../../UPIApplication.js"></script>
<script>
	$( document ).ready(function() {
		$('#myUPIApplication').UPIApplication();

		$( "#myUPIApplication" ).on( "UPIApplication_ErrorOnPageChange", function(event,anError) {
			  alert( anError );
			});
	});
</script>

</html>
