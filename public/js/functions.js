$(document).ready(function(){


   $('.hover').hover(
    function () {
        $(this).css('background-position','0 -'+parseInt($(this).css('width'))+'px');

    },
    function () {
        $(this).css('background-position','0px 0px');
    });

    $('.hover24').hover(

    function () {
        $(this).css('background-position','0 -24px');
        
    },
    function () {
        $(this).css('background-position','0px 0px');
    });

    $('.dfw-tool').each(function (){

        size=0;
        if($(this).is('.size-16')) size=16;
        else if ($(this).is('.size-24')) size=24;
        else if($(this).is('.size-32')) size=32;

       
        if($(this).attr('rel')) $(this).css('background', 'url('+$(this).attr('rel')+') no-repeat left top transparent');
        
        style={
            'margin-right':$(this).css('margin-right'), 
            'margin-left':$(this).css('margin-left'),
            'margin-top':$(this).css('margin-top'), 
            'margin-bottom':$(this).css('margin-bottom'),
            'position':$(this).css('position'),
            'top':$(this).css('top'),
            'bottom':$(this).css('bottom'),
            'left':$(this).css('left'),
            'right':$(this).css('right')
        };
        
        $(this).wrap('<span class="wrap size-'+size+'"></span>').css({'margin':'0', 'top':0, 'bottom':0, 'left':0, 'right':0, 'position':'static'}).parents('.wrap').css(style);
 

        $(this).hover(
        function () {
            if($(this).is('.flag')) $(this).css('background-position','0 -'+size+'px');
        //    if($(this).is('.blink')) $(this).toggleClass('blink blink-active');
        },
        function () {
            if($(this).is('.flag')) $(this).css('background-position','0px 0px');
         //   if($(this).is('.blink-active')) $(this).toggleClass('blink blink-active');
        });
      
    })

    $('.dfw-tool.blink').live('mousemove', function (){
        $(this).toggleClass('blink blink-active');
        $(this).parents('.wrap').addClass('wrap-acive');
    });
     $('.dfw-tool.blink-active').live('mouseout', function (){
        $(this).parents('.wrap').removeClass('wrap-acive'); 
        $(this).toggleClass('blink blink-active');
    });


    $('.numeric').live('keyup', function(){
        val=$(this).val();
        val=conv_numeric(val)
        $(this).val(val);
    })
    
    $('.float').live('keyup', function(){
        val=$(this).val();
        val=conv_float(val)
        $(this).val(val);
    })

    $('.select').live('focus', function(){
        $(this).select(); 
    })
});



$(document).ajaxComplete(function(){
    $('.hover24').hover(
    function () {
        $(this).css('background-position','0 -24px');

    },
    function () {
        $(this).css('background-position','0px 0px');
    });

});



window.isset = function (){
	 if (arguments.length===0) return false;
	 var buff=arguments[0];
	 for (var i=0; i<arguments.length; i++){
	  if (typeof(buff)==='undefined') return false;
	  buff = buff[arguments[i+1]];
	 }
	 return true;
	}


var userAgent = navigator.userAgent.toLowerCase();
jQuery.browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/ ) || [])[1],
	chrome: /chrome/.test( userAgent ),
	safari: /webkit/.test( userAgent ) && !/chrome/.test( userAgent ),
	opera: /opera/.test( userAgent ),
	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};
//input[name='имя']




function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
} 


function strip_quote( str ){
    str=str.replace(/(\n|\r)/gi, '');
    return strip_tags(str.replace(/<div.*?\/div>/gi, ''));
}

function nl2br( str ) {
	return str.replace(/([^>])\n/g, '$1<br/>');
}

function br2nl( str ) {
	return str.replace(/<br\s*\/*>/g, "\n");
}
function strip_tags (string) { 
 return string.replace(/<\/?[^>]+>/gi, '');
}


function print_r(arr, level) {
    var print_red_text = "";
    if(!level) level = 0;
    var level_padding = "";
    for(var j=0; j<level+1; j++) level_padding += "    ";
    if(typeof(arr) == 'object') {
        for(var item in arr) {
            var value = arr[item];
            if(typeof(value) == 'object') {
                print_red_text += level_padding + "'" + item + "' :\n";
                print_red_text += print_r(value,level+1);
		}
            else
                print_red_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
        }
    }

    else  print_red_text = "===>"+arr+"<===("+typeof(arr)+")";
    return print_red_text;
}

 function in_array(what, where) {
    for(var i=0; i<where.length; i++)
        if(what == where[i])
            return true;
    return false;
}


$(document).ready(function(){


    $('.spoiler-title').hover(
    function () {
        $(this).addClass('spoiler-title-active');
    },
    function () {
        $(this).removeClass('spoiler-title-active');
    });

	$('.spoiler-title').bind('click', function(){
                body=$(this);
                for(i=0;i<5;i++) {
                    body=body.next();
                    if(body.is('".spoiler-body"')) break;
                }

		if(body.is(':hidden')) {
			body.fadeIn(300);
		} else {
			body.fadeOut(300);
		}
                return false;
	});
        
});

function spoiler(selector) {
    if($(selector).is(':hidden')) {
            body.fadeIn(300);
    } else {
            body.fadeOut(300);
    }
}

function conv_numeric(val) {
     val=parseInt(val.replace(/[^0-9]/g,''));
     if(!val) val=0;
     return val;
}

function conv_float(val) {
    val=val.replace(/,/,'.');
    val=val.replace(/[^0-9\.]+/i,'');
    if(!val) val=0;
    return val;
}

  

(function($) {
    $.fn.valDefault = function (text){
            $(this).attr('default',text);

            if($(this).val()=='') {
                $(this).val(text)
                $(this).addClass('blur');
            }


            $(this).bind("focus", function(){
                    text=$(this).attr('default');
                    if($(this).val()==text) {
                            $(this).val("");
                            $(this).removeClass('blur');
                    }
            });

            $(this).bind("keyup", function(){

                    text=$(this).attr('default');
                    if($(this).val()==text) {
                            $(this).val("");
                            $(this).removeClass('blur');
                    }
            });

            $(this).bind("blur", function(){
                    text=$(this).attr('default');
                    if($(this).val()=='' || $(this).val()==text) {
                            $(this).addClass('blur');
                            $(this).val(text);
                    }
            });
        }

    $.fn.blockEnter =   function (){
        $(this).find('input').keydown(function(event){
            if(event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });
    }
    $.fn.runMenu =   function (){
        $(this).find('li').hover(
            function () {
                $(this).addClass('hover');
                $(this).find('> ul').show();
            },
            function () {
                $(this).removeClass('hover');
                $(this).find('> ul').hide();
            });
   }

   $.fn.setHover=function (){
              $(this).hover(
            function () {
                $(this).addClass('hover');
            },
            function () {
                $(this).removeClass('hover');
            });
   }

   $.fn.realVal=function () {
       val=$(this).val();
       if(!$(this).attr('default')) return false;
       if(val==$(this).attr('default')) val='';
       $(this).val(val);
   }
   
   
   $.fn.smartSubmit=function () {
       $(this).submit(function () {
           $(this).find('input, select, textarea').each(function () {
               $(this).realVal();
           })
        });
   }

   $.fn.smartReset=function () {
       $(this).click(function () {
           $(this).parents('form').find('input, select, textarea').each(function () {
               if(!$(this).attr('default')) return true;
               val=$(this).attr('default');
               $(this).val(val).addClass('blur');
               
           });
           return false;
        });
   }
   

    $.fn.setSearchForm=function () {
        $(this).submit(function () {
           if($(this).find('input[type=text]').is('.blur')) return false;
        });
    }

     $.fn.serializeJSON=function() {
          var json = {};
         jQuery.map($(this).serializeArray(), function(n, i){
            json[n['name']] = n['value'];
         });
         return json;
     };
 
     $.fn.fidsJSON=function() {
         var json = {};
         jQuery.map($(this).find('input, select, textarea'), function(n, i){
            json[n['id']] = n['value'].substr(0,64);
         });
         return json;
     };
     
     $.fn.fieldsJSON=function() {
          var json = {};
         jQuery.map($(this).find('input, select, textarea'), function(n, i){
            json[n['name']] = n['value'];
         });
         return json;
     };
     
 })(jQuery);