$(document).ready(function(){
	$("div.p-thumb a").hover(function() {
		var thumbOver = $(this).find("img").attr("src");
		$(this).css({'background' : 'url(' + thumbOver + ') no-repeat center bottom'});
		$(this).find("img").stop().fadeTo('normal', 0);
	}, function() {
		$(this).find("img").stop().fadeTo('normal', 1).show();
	});

    $("#b-city_list-opener").hover(function() {
       $("#b-city_list-div").stop().fadeTo('normal', 1);
    }, function() {
       $("#b-city_list-div").stop().fadeTo('normal', 0, function() {
            $("#b-city_list-div").hide();
        });
    });
    $("#b-city_list-div").hover(function() {
        $(this).stop().fadeTo('normal', 1);
    }, function() {
        $(this).stop().fadeTo('normal', 0, function() {
            $(this).hide();
        });
    });
    
});



(function($) {
     
     
    $.fn.driveSave = function (options){
        var defaults = {
            suc_url: '',
            callback: false, 
            refresh: false
        };
        var options = $.extend(defaults, options);

        $(this).bind('submit', function (){
            t=$(this);
            t.find('input[type=submit]').attr('disabled', 'true');
            $.ajax({
                    type: "POST",
                    url: t.attr('action'),
                    data: t.serializeJSON(),
                    success: function(msg){
                        
                        if(msg=='ok') {
                            if(options.suc_url) tbSuc(options)
                            else tb_remove();
                            if(options.callback) tb_callback();
                        } else {
                            t.find('.errors').html(msg);
                            t.find('input[type="submit"]').removeAttr('disabled');
                        }
                    }
            });
            return false;
            
       });
    }   

  $.fn.ajaxSubmit = function (options){
        var defaults = {
            url: '',
            alert:false
        };
        var options = $.extend(defaults, options);
        t=$(this);
        
        t.find('input').bind('focus', function (){
            if($(this).is('.valid-field-error')) {
                $(this).removeClass('valid-field-error');
                $(this).parents('.row').removeClass('valid-row-error'); 
                $(this).removeErrorTip();
            }
        });
        
        t.bind('submit', function (){
            t=$(this);
            t.find('input[type=submit]').attr('disabled', 'true');
            t.find('.valid-field-error').removeClass('valid-field-error');
            t.find('.valid-row-error').removeClass('valid-row-error');

            $.ajax({
                    type: "POST",
                    url: options.url,
                    data: t.serializeJSON(),
                    success: function(data){
                        t.find('input[type="submit"]').removeAttr('disabled');
                        
                        if(!data) return false;
                        json = $.evalJSON(data);
                        if(!json) return false;
   
                        if(json.result) {
                            t.unbind('submit');
                            t.submit();
                            return true;
                        } else  {
                            msg='';
                            $.each(json.errors, function(key, val) {
                                el=$('input[name='+key+']');
                                if(el.size()) {
                                    el.addClass('valid-field-error');
                                   // el.parents('.row').addClass('valid-row-error');
                                    el.setErrorTip(val);
                                }    
                            });
                        }
                    }
            });
            return false;
            
       });
    }   
    
    $.fn.setErrorTip = function (content){
        t=$(this);
        name=$(this).attr('name');
        var id_etip_obj = name +'_error_tip';
        var id_etip_ar =name +'_error_tip_arrow';
        
        $('#'+ id_etip_obj).remove();
        $('#'+ id_etip_ar).remove();
        
        $("body").append('<div id="'+ id_etip_ar +'" class="error-tip-arrow"></div><div id="'+ id_etip_obj +'" class="error-tip">'+ content +"</div>");
        
        var etip_obj=$('#'+ id_etip_obj);
        var etip_ar=$('#'+ id_etip_ar);
        var f = t.offset();
        
        var opc=etip_obj.css('opacity');
        
        etip_obj.css({
            top : (parseInt(f.top)+(t.outerHeight()/2)-parseInt(etip_obj.outerHeight())/2)+'px',
            left : (parseInt(f.left)+(t.outerWidth())+20)+'px'
        }).css('opacity',0).animate({opacity:opc}, 300);
        
        opc=etip_ar.css('opacity');
        
        etip_ar.css({
            top : (parseInt(f.top)+(t.outerHeight()/2)-6)+'px',
            left : (parseInt(f.left)+(t.outerWidth())+12)+'px'
        }).css('opacity',0).animate({opacity:opc}, 300);
        
        etip_obj.hover(function() {
            $(this).css('z-index',11);
        }, function() {
            $(this).css('z-index',10);
        });
    }
        
    $.fn.removeErrorTip = function (){
        name=$(this).attr('name');
        if(!name) return false;
        $('#'+ name +'_error_tip').stop(true,true).fadeOut(300, function (){$(this).remove()})
        $('#'+ name +'_error_tip_arrow').stop(true,true).fadeOut(300, function (){$(this).remove()})
    }
    
  
    $.fn.inputFile = function (){
        $(this).wrap('<div class="file-upload-wrap"></div>');
    }


})(jQuery);

    function tbSuc (options){
           $.ajax({
                    type: "POST",
                    url: options.suc_url,
                    data: {},
                    success: function(msg){
                        if(msg!='error') {
                            $('#TB_ajaxContent').html(msg).animate({opacity:1},3500, function(){
                                tb_remove();
                            });
                            if(options.refresh) location.reload(true); 
                        } else {

                        }
                    }
            });
    }
    
