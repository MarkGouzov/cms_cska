/*
Jquery plugin name : Fade Iterator v 0.1
description : iterate throw some elements in a container, 
			fade first then show the nex hidden and so on.
author : Emad Elsaid
Date : Feb 20 2010 
Application : Dreamweaver CS4
paramters : 
limit: the elements number in container default:3 (optional)
speed: elements animation speed default:1000(one second) (optional)
*/
(function($) {
 
   $.fn.fadeIterator = function(settings) {
     var config = $(settings).extend({limit:3,speed:1000},settings);
     if (settings) $.extend(config, settings);
  	 
	 
     this.each(function() {
		var $cont = $(this);
        var $ele = new Array();
		//get all the elements from container
		var $elements = $cont.children().each(function(){
									$ele.push(
											  $(this)
											  	.clone()
												.css('opacity',1)
											  )
									$(this).remove();
					});
		//reverse them to be in the right order
		$ele.reverse();
		//add the initial elements to container
		for(i=0;i<config.limit && $ele.length>0 ;Math.floor(Math.random()*11))
		{
			$ele.pop().appendTo($cont).css('opacity',1);
		}
		
		
		function step()
		{
			$cont.children(':first').animate({opacity:1},config.speed,function(){
												$ele.reverse();
												$ele.push( $(this).clone() );
												$(this).remove();
												$ele.reverse()
													.pop()
													.appendTo($cont)
													.animate({opacity:1},config.speed,step);
										});
		}
		step();
     });
 
     return this;
 
   };
 
 })(jQuery);