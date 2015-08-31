/**
 * -----------------------------------------------------------------------------------------
 * INTERSEL - 4 cité d'Hauteville - 75010 PARIS
 * RCS PARIS 488 379 660 - NAF 721Z
 *
 * File : Blapy_AnimationPlugins.js
 * Blapy : Blapy plugin functions to animate content changes
 * 
 * plugin functions
 * - fadeInOut
 * 
 * How to add a new plugin function:
 *	theBlapy.prototype.myNewFunction = function (oldContainer,newContainer) {
 *    /* do your change stuff here
 *  }
 * 
 *
 * -----------------------------------------------------------------------------------------
 * Modifications :
 * - 2015/08/10 - E.Podvin - V1.0.0 - Creation
 * -----------------------------------------------------------------------------------------
 *
 * @copyright Intersel 2015
 * @fileoverview : Blapy function plugins to animate contents
 * @see {@link https://github.com/intersel/Blapy}
 * @author : Emmanuel Podvin - emmanuel.podvin@intersel.fr
 * @version : 1.0.0
 * -----------------------------------------------------------------------------------------
 */

	/**
	 * this.rightOutIn - plugin function to fade in then out contents
	 * @param oldContainer
	 * @param newContainer
	 * 
	 * parameters for Blapy block:
	 * - data-blapy-fadein-delay
	 * - data-blapy-fadeout-delay
	 */
	theBlapy.prototype.rightOutIn = function (oldContainer,newContainer) {
		var fadeOutDelay = parseInt(newContainer.attr('data-blapy-fadeout-delay'));
		var fadeInDelay = parseInt(newContainer.attr('data-blapy-fadein-delay'));
		if (!fadeOutDelay) fadeOutDelay = 500;
		if (!fadeInDelay) fadeInDelay = 500;
		
		oldContainer.css({overflow:"hidden",position:"relative",left:oldContainer.position().left});
		oldContainer.animate(
				  {opacity:0,left:oldContainer.position().left+$(document).width()},
				  {	duration:fadeOutDelay,
					complete	: function(){
					  newContainer.css({opacity:0,overflow:"hidden",left:$(document).width(),position:"relative"});
					  oldContainer.replaceWith(newContainer);//replace content with the new one
					  newContainer.animate(
							  {opacity:1,left:oldContainer.position().left},
							  {duration:fadeInDelay,
							   complete : function() {
								   newContainer.css({position:"static",left:"0px"}); 								  
							   }
							  });
					}
				  });
	};//end fadeInOut
	
	/**
	 * this.fadeInOut - plugin function to fade in then out contents
	 * @param oldContainer
	 * @param newContainer
	 * 
	 * parameters for Blapy block:
	 * - data-blapy-fadein-delay
	 * - data-blapy-fadeout-delay
	 */
	theBlapy.prototype.fadeInOut = function (oldContainer,newContainer) {
		var fadeOutDelay = parseInt(newContainer.attr('data-blapy-fadeout-delay'));
		var fadeInDelay = parseInt(newContainer.attr('data-blapy-fadein-delay'));
		if (!fadeOutDelay) fadeOutDelay = 500;
		if (!fadeInDelay) fadeInDelay = 500;
		
		oldContainer.animate(
				  {opacity:0},
				  {	duration:fadeOutDelay,
					complete	: function(){
					  newContainer.css({opacity:0});
					  oldContainer.replaceWith(newContainer);//replace content with the new one
					  newContainer.animate({opacity:1},{duration:fadeInDelay});
					}
				  });
	};//end fadeInOut

