<script type="text/javascript" src="../../Blapy.js"></script>
<script type="text/javascript" src="../../Blapy_AnimationPlugins.js"></script>
<script>
	$( document ).ready(function() {

		//start Blapy
		$('#myBlapy').Blapy();

		//catch errors
		$( "#myBlapy" ).on( "Blapy_ErrorOnPageChange", function(event,anError) {
			  alert( anError );
			});
		
	});

	$("body").append('<h3>HTML code of the page</h3>').append(jQuery('<pre />').text($('html').html()));
</script>

</html>
