/**
 * jQuery Carousel Plugin v1.0
 * http://zheltov.su/
 *
 * Copyright 2011, Dmitry Zheltov <dmzhelt@rambler.ru>
 * Licensed like jQuery, see http://jquery.org/license
 *
 * Date: Mon Oct 31 22:56:48 2011 +0400
 */
(function($) {
	$.extend({	
		carousel: {
			defaults: {
				'cropClass'     : 'crop',
				'prevClass'     : 'prev',	
				'nextClass'     : 'next',	
				'activeClass'   : 'active',
				'inactiveClass' : 'inactive',				
				'prevHtml'      : '',
				'nextHtml'      : '',
				'slideBy'       :  1		
			},
			// key for data storing
			key: 'carousel',
			init: function($obj, opts) {
				var opts     = $.extend(this.defaults, opts);
				var liWidth  = $obj.find('ul li').first().width();	
				var liCount  = $obj.find('ul li').size();
				var ulWidth  = liWidth * liCount;
				// count of li-elements in crop layer
				var perFrame = $obj.width()/liWidth;
				// set croping layer & ul width				
				$obj.find('ul').wrap('<div class="' + opts.cropClass + '"></div>').width(ulWidth);	
				// controls appending
				$obj.append('<div class="' + opts.prevClass + '">' + opts.prevHtml + '</div>')
					.append('<div class="' + opts.nextClass + '">' + opts.nextHtml + '</div>');	
				// prev/next selectors
				var prevSelector = 'div[class*=' + opts.prevClass + ']';
				var nextSelector = 'div[class*=' + opts.nextClass + ']';					
				// data association
				$obj.data(this.key, {
					'opts'         : opts, 
					'width'        : liWidth,
					'count'        : liCount, 
					'perFrame'     : perFrame, 
					'prevSelector' : prevSelector,
					'nextSelector' : nextSelector,
					'frontPos'     : 0, 
					'endPos'       : perFrame
				});				
				// binding click events
				$obj.find(prevSelector).bind('click', {carousel: this}, function(e) {
					var self = e.data.carousel;
					if (!self.isPrevControlActive($obj)) return;
					self.slide($obj, $obj.data(self.key).opts.slideBy).updateControlsStatus($obj);			
				});
				$obj.find(nextSelector).bind('click', {carousel: this}, function(e) {
					var self = e.data.carousel;
					if (!self.isNextControlActive($obj)) return;
					self.slide($obj, -$obj.data(self.key).opts.slideBy).updateControlsStatus($obj);	
				});	
				// updating status
				this.updateControlsStatus($obj);
			},			
			isPrevControlActive: function($obj) {
				var data = $obj.data(this.key);
				return (data.count > data.perFrame && 0 != data.frontPos) ? true : false;
			},
			isNextControlActive: function($obj) {
				var data = $obj.data(this.key);
				return (data.count > data.perFrame && data.count != data.endPos) ? true : false;
			},
			setControlStatus: function($obj, selector, isActive) {
				var data = $obj.data(this.key);
				$obj.find(selector).removeClass(data.opts.activeClass).removeClass(data.opts.inactiveClass)
								   .addClass( isActive ? data.opts.activeClass : data.opts.inactiveClass );			
			},
			updateControlsStatus: function($obj) {
				var data = $obj.data(this.key);
				this.setControlStatus($obj, data.prevSelector, this.isPrevControlActive($obj));			
				this.setControlStatus($obj, data.nextSelector, this.isNextControlActive($obj));
			},			
			// dir -- direction of ul sliding
			// > 0 -- sliding to the right
			// < 0 -- sliding to the left			
			slide: function($obj, dir) {
				var data = $obj.data(this.key);
				// limit out of range if slideBy > 1
				if (data.opts.slideBy > 1) {
					if (dir < 0 && data.count - data.endPos < data.opts.slideBy) {
						dir = -(data.count - data.endPos);
					}
					if (dir > 0 && data.frontPos < data.opts.slideBy) {
						dir = data.frontPos;
					}					
				}
				$obj. find('ul').animate({'margin-left': (dir > 0 ? '+' : '-') + '=' + data.width * Math.abs(dir) + 'px'}, 500);	
				data.frontPos -= dir;
				data.endPos   -= dir;
				$obj.data(this.key, data);
				return this;
			} 
		}
	});	
	$.fn.carousel = function(opts) { 
		return this.each(function() {
			$.carousel.init($(this), opts);
		});		 
	};
})(jQuery);