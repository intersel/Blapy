<script type="text/javascript" src="../../UPIApplication.js"></script>
<script type="text/javascript" src="../../UPIApplication_AnimationPlugins.js"></script>
<script>
	$( document ).ready(function() {

		//start UPI Application
		$('#myUPIApplication').UPIApplication();

		//catch errors
		$( "#myUPIApplication" ).on( "UPIApplication_ErrorOnPageChange", function(event,anError) {
			  alert( anError );
			});
		
		//this way to apply the event binding will assure we get event when DOM changed
		$(document).on( "UPIApplication_beforeContentChange","#mainContainer", function(event,previousObject) {
			  //alert( 'UPIApplication_beforeContentChange' +$(this).html() );
			});
		$( document ).on( "UPIApplication_doCustomChange","#mainContainer", function(event,aUPIContainer) {
			  //alert( 'UPIApplication_doCustomChange'+$(this).html() );
			  $("#mainContainer").animate({opacity:0},{duration:200, complete	: function(){
				  $(aUPIContainer).css({opacity:0});
				  $("#mainContainer").replaceWith(aUPIContainer);//replace content with the new one
				  $("#mainContainer").animate({opacity:1},{duration:200});
			  }});
			});
		$(document).on( "UPIApplication_afterContentChange","#mainContainer", function(event,previousObject) {
			  //alert( 'UPIApplication_afterContentChange' +$(this).html() );
			});
	});

	$("body").append('<h3>HTML code of the page</h3>').append(jQuery('<pre />').text($('html').html()));
</script>

</html>
