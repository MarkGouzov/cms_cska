/*
	Name: 				Mootols Random class
	Version: 			0.0.1
	Author:     		cleverscripr
	Author web site:	http://cleverscript.ru
	Support:			toorr2p@bigmir.net
	Date:				29.06.10
	
	Example:
		<script type="text/javascript" src="mootools-1.2.4-core-yc.js"></script>
		<script type="text/javascript" src="random.js"></script>
		<script type="text/javascript">
			window.addEvent('domready', function(){
				new Random({
					container : $('random'),
					typeNode  : 'li',
					speed     : 5000,
					duration  : 700
				});
			});
		</script>
		
		<ul id="random">
			<li>Lorem ipsum...</li>
			...
		</ul>
*/

Random = new Class({
	Implements: [Options],
	options: {
		container   : null,
		typeNode    : null,
		opacity     : 1,
		speed       : 5000,
		duration    : 700,
		list        : null
	},
	initialize: function(options){
		this.setOptions(options); 
		var options = this.options;
		options.this_class = this; 
		
        if (options.container == null){alert('Error: container not found');return false;}
		if (options.typeNode == null){alert('Error: undefined type node');return false;}

		options.list = options.container.getElements(options.typeNode); //get elements
		options.list.setStyle('display', 'none'); 						//hide all block
		options.list.getRandom().setStyle('display', 'block'); 			//first random block to show
		
		this.prepareHtml();
	},
	prepareHtml: function()
	{
		var options = this.options;
		var obj = options.list;
		function randomer(){
			var show = obj.getRandom(); 			//get random object from array
			obj.setStyle('display', 'none'); 		//hide all block
			show.setStyle('display', 'block');		//show random object from array
			if(options.opacity == 1){
				obj.setStyle('opacity', 0);			//set opacity =0 to all object
				show.set('tween', {
					duration: options.duration, 
					onStart: function (){},
					onComplete: function (){}
				}).tween('opacity', 1);
			}
		}
		randomer.periodical(options.speed, null);
	}
});