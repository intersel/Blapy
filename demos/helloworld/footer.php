				</div>
			</div>
		</article>
	</div>
	<div style="font-size:80%">
		<a href="index.php">normal "Hello World" Link</a> 
		- <a href="helloworld_2.php">normal "How is it going" Link</a><br>
		<a href="helloworld_3.php">normal "Load from an optimized code" Link</a> 
		- <a href="helloworld_4.php">normal "Load with a blapy link" Link</a><br>
	</div>
</body>

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
		
		//this way to apply the event binding will assure we get event when DOM changed
		$(document).on( "Blapy_beforeContentChange","#mainContainer", function(event,previousObject) {
			  //alert( 'Blapy_beforeContentChange' +$(this).html() );
			});
		$( document ).on( "Blapy_doCustomChange","#mainContainer", function(event,aBlapyContainer) {
			  //alert( 'Blapy_doCustomChange'+$(this).html() );
			  $("#mainContainer").animate({opacity:0},{duration:200, complete	: function(){
				  $(aBlapyContainer).css({opacity:0});
				  $("#mainContainer").replaceWith(aBlapyContainer);//replace content with the new one
				  $("#mainContainer").animate({opacity:1},{duration:200});
			  }});
			});
		$(document).on( "Blapy_afterContentChange","#mainContainer", function(event,previousObject) {
			  //alert( 'Blapy_afterContentChange' +$(this).html() );
			});
		$( "#myBlapy" ).on( "Blapy_beforePageLoad", function(event,data) {
			  //alert( 'Blapy_beforePageLoad:' +data.aUrl );
			});
		
	});

	$("body").append('<h3>HTML code of the page</h3>').append(jQuery('<pre />').text($('html').html()));
</script>

</html>
