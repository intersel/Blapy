<script type="text/javascript" src="../../Blapy.js"></script>
<script>
	$( document ).ready(function() {
//		$('#myBlapyApp1,#myBlapyApp2,#myBlapyApp3').Blapy();
		$('#myBlapyApp1,#myBlapyApp3,#myBlapyApp4').Blapy();

//		$( "#myBlapyApp1,#myBlapyApp2,#myBlapyApp3" ).on( "Blapy_ErrorOnPageChange", function(event,anError) {
		$( "#myBlapyApp1" ).on( "Blapy_ErrorOnPageChange", function(event,anError) {
			  alert( anError );
			});
	});

	$("body").append('<h3>HTML code of the page</h3>').append(jQuery('<pre />').text($('html').html()));
</script>

</html>
