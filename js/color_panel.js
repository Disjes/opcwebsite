window.jQuery = window.$ = jQuery;
/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

$(document).ready(function(){
	
	if(jQuery.cookie("cookie_color")) {
		set_color = jQuery.cookie("cookie_color");
	}
	else {
		set_color = 'color-default';
	}
	if (set_color == 'color-default') {
		jQuery('head').append('<link rel="stylesheet" type="text/css" href="css/color_theme.css" id="theme_color">');
	} else {
		jQuery('head').append('<link rel="stylesheet" type="text/css" href="css/colors/' + set_color + '.css" id="theme_color">');
	}

	if(jQuery.cookie("panel_showed")) {
		show_panel = "";
	}
	else {
		show_panel = "showed";
		jQuery.cookie("panel_showed", 'showed', {expires: 1, path: "/"});
	}
	
	//Start Control Panel Script
	/*$('body').append('<div class="demo_panel opacity '+show_panel+'"><a href="javascript:void(0)" class="panel_toggler"></a><span class="panel_title">Settings</span><div class="demo_panel_body"></div></div>');
	demo_panel_main = $('body').find('.demo_panel');
	demo_panel = $('body').find('.demo_panel_body');
	
	demo_panel.append('<div class="panel_item color_panel"><div class="panel_sub-title">Predefined Color</div><ul class="color_list"><li class="color_item"><a class="color1" rel="color-default" href="javascript:void(0)"></a></li><li class="color_item"><a class="color2" rel="color-set2" href="javascript:void(0)"></a></li><li class="color_item"><a class="color3" rel="color-set3" href="javascript:void(0)"></a></li><li class="color_item"><a class="color4" rel="color-set4" href="javascript:void(0)"></a></li><li class="color_item"><a class="color5" rel="color-set5" href="javascript:void(0)"></a></li><li class="color_item"><a class="color6" rel="color-set6" href="javascript:void(0)"></a></li><li class="color_item"><a class="color7" rel="color-set7" href="javascript:void(0)"></a></li><li class="color_item"><a class="color8" rel="color-set8" href="javascript:void(0)"></a></li><li class="color_item"><a class="color9" rel="color-set9" href="javascript:void(0)"></a></li><li class="color_item"><a class="color10" rel="color-set10" href="javascript:void(0)"></a></li></ul><div class="clear"></div><div/>');

	demo_panel.append('<div class="panel_tagline"><div class="panel_sub-title">Tag Line Types</div><div class="panel_toggle_wrapper"><div class="panel_item tagline_item"><a href="javascript:void(0)" rel="type0" class="current">Without Tagline</a></div><div class="panel_item tagline_item"><a href="javascript:void(0)" rel="type1">Tag Line Type 1</a></div><div class="panel_item tagline_item"><a href="javascript:void(0)" rel="type2">Tag Line Type 2</a></div><div class="panel_item tagline_item"><a href="javascript:void(0)" rel="type3">Tag Line Type 3</a></div><div class="panel_item tagline_item"><a href="javascript:void(0)" rel="type4">Tag Line Type 4</a></div></div></div>');
	demo_panel.append('<div class="panel_headers"><div class="panel_sub-title">Headers</div><div class="panel_toggle_wrapper"><div class="panel_item header_item"><a href="javascript:void(0)" rel="type0" class="current">Default Header</a></div><div class="panel_item header_item"><a href="javascript:void(0)" rel="type2">Header Type 2</a></div><div class="panel_item header_item"><a href="javascript:void(0)" rel="type3">Header Type 3</a></div></div></div>');

	demo_panel.append('<div class="panel_layouts"><div class="panel_sub-title">Layout</div><div class="panel_item layout_item"><a href="javascript:void(0)" class="layout_default">Clean Style</a></div><div class="panel_item layout_item"><a href="javascript:void(0)" class="layout_user_bg">Boxed</a></div><div class="panel_item layout_item"><a href="javascript:void(0)" class="layout_user_image">Background Image</a></div></div>');
	
	demo_panel.append('<div class="panel_patterns"><div class="panel_sub-title">Background Color &amp; Pattern</div><ul class="pattern_list"><li class="pattern_item"><a class="pattern1" rel="bg_pattern1" href="javascript:void(0)"></a></li><li class="pattern_item"><a class="pattern2" rel="bg_pattern2" href="javascript:void(0)"></a></li><li class="pattern_item"><a class="pattern3" rel="bg_pattern3" href="javascript:void(0)"></a></li><li class="pattern_item"><a class="pattern4" rel="bg_pattern4" href="javascript:void(0)"></a></li><li class="pattern_item"><a class="pattern5" rel="bg_pattern5" href="javascript:void(0)"></a></li><li class="pattern_item"><a class="pattern6" rel="bg_pattern6" href="javascript:void(0)"></a></li><li class="pattern_item"><a class="pattern7" rel="bg_pattern7" href="javascript:void(0)"></a></li><li class="pattern_item"><a class="pattern8" rel="bg_pattern8" href="javascript:void(0)"></a></li><li class="pattern_item"><a class="pattern9" rel="bg_pattern9" href="javascript:void(0)"></a></li><li class="pattern_item"><a class="pattern10" rel="bg_pattern10" href="javascript:void(0)"></a></li></ul><div class="clear"></div></div>');

	demo_panel.append('<div class="panel_images"><div class="panel_sub-title">Background Image</div><ul class="bgimg_list"><li class="bgimg_item"><a class="item_img1" rel="bg_img1" href="javascript:void(0)"></a></li><li class="bgimg_item"><a class="item_img2" rel="bg_img2" href="javascript:void(0)"></a></li><li class="bgimg_item"><a class="item_img3" rel="bg_img3" href="javascript:void(0)"></a></li><li class="bgimg_item"><a class="item_img4" rel="bg_img4" href="javascript:void(0)"></a></li><li class="bgimg_item"><a class="item_img5" rel="bg_img5" href="javascript:void(0)"></a></li></ul><div class="clear"></div></div>');

	demo_panel.append('<div class="demo_text"><div class="panel_sub-title">For demo purposes only.</div><div class="clear"></div></div>');
		
	$('.panel_toggler').click(function(){
		demo_panel_main.toggleClass('showed');
	});
*/
	cur_head = 'head_type1';
	cur_tagline = 'tag_type0';

	/*jQuery('.panel_headers').find('a[rel="'+cur_head+'"]').addClass('current');
	jQuery('.panel_tagline').find('a[rel="'+cur_tagline+'"]').addClass('current');

	jQuery('.panel_toggle_wrapper').slideUp(1);
	
	jQuery('.panel_headers').find('.panel_sub-title').click(function(){
		jQuery(this).parents('.panel_headers').find('.panel_toggle_wrapper').slideToggle();
		jQuery(this).parents('.panel_headers').toggleClass('showed');
	});
	jQuery('.panel_tagline').find('.panel_sub-title').click(function(){
		jQuery(this).parents('.panel_tagline').find('.panel_toggle_wrapper').slideToggle();
		jQuery(this).parents('.panel_tagline').toggleClass('showed');		
	});
	
	jQuery('.panel_tagline').find('a').click(function(){
		jQuery('.panel_tagline').find('.current').removeClass('current');
		jQuery('#header_tagline').removeClass();
		jQuery('#header_tagline').addClass(jQuery(this).attr('rel'));
		cur_tagline = jQuery(this).attr('rel');
		jQuery(this).addClass('current');
		update_content();
	});

	jQuery('.panel_headers').find('a').click(function(){
		jQuery('.panel_headers').find('.current').removeClass('current');
		jQuery('#main_header').removeClass(cur_head);
		jQuery('#main_header').addClass(jQuery(this).attr('rel'));
		cur_head = jQuery(this).attr('rel');
		jQuery(this).addClass('current');		
		update_content();
	});*/
	
	jQuery('.color_item a').click(function(){
		jQuery('.color_item').find('.current').removeClass('current');
		jQuery(this).addClass('current');
		set_color = jQuery(this).attr('rel');

		if (set_color == 'color-default') {
			jQuery('#theme_color').attr('href', 'css/color_theme.css');
		} else {
			jQuery('#theme_color').attr('href', 'css/colors/' + set_color + '.css');
		}		
		jQuery.cookie("cookie_color", set_color);
	});

	$('.pattern_item a').click(function(){
		$('.pattern_item').find('.current').removeClass('current');
		$(this).addClass('current');
		$('.layout_trigger').remove();
		$('html').removeClass('user_pic_layout');
		$('html').removeClass('user_bg_layout');
		$('footer').find('.footer_addon').remove();

		$('html').addClass('user_bg_layout');
		$('body').append('<div class="layout_trigger  boxed_bg_cont '+$(this).attr('rel')+'"/>');
		update_line();
	});

	$('.bgimg_item a').click(function(){
		$('.bgimg_item').find('.current').removeClass('current');
		$(this).addClass('current');
		$('.layout_trigger').remove();
		$('footer').find('.footer_addon').remove();
		$('html').removeClass('user_pic_layout');
		$('html').removeClass('user_bg_layout');

		$('html').addClass('user_bg_layout');
		$('html').addClass('user_pic_layout');
		$('body').append('<div class="layout_trigger image_bg_cont '+$(this).attr('rel')+'" data-addon_color="c8c8c8" data-addon_pattern=""/>');
		update_line();
	});
	
	$('.layout_user_bg').click(function(){
		$('.panel_layouts').find('.current').removeClass('current');
		$('.panel_images').slideUp(400);
		$('.panel_patterns').slideDown(400);
		$(this).addClass('current');
	});
	$('.layout_user_image').click(function(){
		$('.panel_layouts').find('.current').removeClass('current');
		$('.panel_images').slideDown(400);
		$('.panel_patterns').slideUp(400);
		$(this).addClass('current');
	});

	$('.layout_default').click(function(){
		$('.panel_layouts').find('.current').removeClass('current');
		$('.panel_images').slideUp(400);
		$('.panel_patterns').slideUp(400);
		$(this).addClass('current');
		$('.layout_trigger').remove();		
		$('footer').find('.footer_addon').remove();		
		$('html').removeClass('user_pic_layout');
		$('html').removeClass('user_bg_layout');
		$('body').append('<div class="layout_trigger clean_bg_cont"/>');
		update_line();
	});
   
});

/*$(window).load(function(){
	setTimeout("$('body').find('.demo_panel').removeClass('opacity')",800);
	if(!$.cookie("panel_showed")) {	
		setTimeout("$('body').find('.demo_panel').removeClass('showed')",1800);
	}
	if ($('html').hasClass('user_bg_layout')) {
		if ($('html').hasClass('user_pic_layout')) {
			$('html').find('.layout_user_image').click();
		} else {
			$('html').find('.layout_user_bg').click();
		}
	} else {
		$('html').find('a.layout_default').addClass('current');
	}
});*/

function update_content() {
	if ($(window).width() > 760) {
		jQuery('.main_wrapper').css('padding-top', jQuery('header').height()+'px');
	}	
}

function update_line() {
	if (jQuery('.content_block').hasClass('no-sidebar')) {
		if (jQuery('html').hasClass('user_bg_layout')) {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());				
			});			
		} else {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
			});
		}
	}
}