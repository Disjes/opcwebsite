"use strict";
var fixed_menu = true;
window.jQuery = window.$ = jQuery;
var demo = true;

jQuery(document).ready(function() {
	jQuery('.sponsors_works').each(function(){
		var partnNum = parseInt(jQuery(this).attr('data-count'));
		var partn_w = 100/partnNum;		
		jQuery(this).find('li').css({'width': partn_w + '%'});		
	});
	jQuery('.teamslider').each(function(){
		var teamNum = parseInt(jQuery(this).attr('data-count'));
		var team_w = 100/teamNum;		
		jQuery(this).find('li').css({'width': team_w + '%'});		
	});
	
    $('.portfolio_item_img_fx').hover(function(){
        $(this).find('.portfolio_image_fadder').stop().animate({'opacity' : '0.8'},250);
        $(this).find('a').stop().animate({'opacity' : '1'},250);
    }, function() {
        $(this).find('.portfolio_image_fadder').stop().animate({'opacity' : '0'},300);
        $(this).find('a').stop().animate({'opacity' : '0'},50);
    });
		
	if ($(window).height() > $('header').height()+$('footer').height()+$('.main_wrapper').height()+$('.pre_footer').height()+159) {
		$('.main_wrapper').css('min-height', ($(window).height()-$('header').height()-$('footer').height()-$('.pre_footer').height()-159)+'px')
	}
	
	jQuery('.feedback_go').click(function(){
		var par = jQuery(this).parents(".feedback_form");
		var name = par.find(".field-name").val();
		var email = par.find(".field-email").val();
		var message = par.find(".field-message").val();
		var subject = par.find(".field-subject").val();
		if (email.indexOf('@') < 0) {			
			email = "mail_error";
		}
		if (email.indexOf('.') < 0) {			
			email = "mail_error";
		}
		$.ajax({
			url: "mail.php",
			type: "POST",
			data: { name: name, email: email, message: message, subject: subject },
			success: function(data) {
				jQuery('.ajaxanswer').hide().empty().html(data).show("slow");
				setTimeout("jQuery('.ajaxanswer').fadeOut('slow')",5000);
		  }
		});
	});
	
	//Header
	if ($(window).width() > 760) {
		jQuery('.main_wrapper').css('padding-top', jQuery('header').height()+'px');
	}

	//MobileMenu
	jQuery('.header_wrapper').append('<a href="javascript:void(0)" class="menu_toggler"></a>');
	jQuery('header').append('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');	
	jQuery('.mobile_menu').html(jQuery('header').find('.menu').html());
	jQuery('.mobile_menu_wrapper').hide();
	jQuery('.menu_toggler').click(function(){
		jQuery('.mobile_menu_wrapper').slideToggle(300);
	});	
	
	//Input and Textarea Click-Clear
	jQuery('input[type=text]').focus(function() {
		if(jQuery(this).attr('readonly') || jQuery(this).attr('readonly') == 'readonly') return false;
		if (jQuery(this).val() === jQuery(this).attr('title')) {
				jQuery(this).val('');
		}   
		}).blur(function() {
		if(jQuery(this).attr('readonly') || jQuery(this).attr('readonly') == 'readonly') return false;
		if (jQuery(this).val().length === 0) {
			jQuery(this).val(jQuery(this).attr('title'));
		}                        
	});	
	jQuery('textarea').focus(function() {
		if (jQuery(this).text() === jQuery(this).attr('title')) {
				jQuery(this).text('');
			}        
		}).blur(function() {
		if (jQuery(this).text().length === 0) {
			jQuery(this).text(jQuery(this).attr('title'));
		}                        
	});	
	
	//FeedBack Form
	jQuery('.content_block').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-32);
	});	
	jQuery('.login_form').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-32);
	});	
	jQuery('.mc_input').each(function(){
		jQuery(this).width(jQuery(this).parents('.widget_mailchimpsf_widget').width()-22);
	});			
	jQuery('.sidepanel').find('.field_search').each(function(){
		jQuery(this).width(jQuery(this).parent('.search_form').width()-32);
	});	

	jQuery('.searchbox_toggle').click(function(){
		jQuery('.header_wrapper').toggleClass('search_show');
	});

	if (jQuery('.layout_trigger').hasClass('boxed_bg_cont')) {
		jQuery('html').addClass('user_bg_layout');
		jQuery('.header_wrapper').wrap('<div class="header_layout"/>');
	}
	if (jQuery('.layout_trigger').hasClass('image_bg_cont')) {
		jQuery('html').addClass('user_bg_layout');
		jQuery('.custom_bg_cont').height(jQuery(window).height());
		jQuery('html').addClass('user_pic_layout');
	}

	if (jQuery('.content_block').hasClass('no-sidebar')) {
		if (jQuery('html').hasClass('user_bg_layout')) {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());
				jQuery(this).wrapInner('<div class="module_line '+jQuery(this).attr('data-option')+'" style="background:'+jQuery(this).attr('data-background')+'; padding-top:'+jQuery(this).attr('data-top-padding')+'"><div class="module_line_wrapper container"></div></div>');
			});
		} else {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
				jQuery(this).wrapInner('<div class="module_line '+jQuery(this).attr('data-option')+'" style="background:'+jQuery(this).attr('data-background')+'; padding-top:'+jQuery(this).attr('data-top-padding')+'"><div class="module_line_wrapper container"></div></div>');
			});
		}
	} else {
		jQuery('.module_line_trigger').each(function(){			
			jQuery(this).wrapInner('<div class="module_line '+jQuery(this).attr('data-option')+'" style="background:'+jQuery(this).attr('data-background')+'; padding-top:'+jQuery(this).attr('data-top-padding')+'"></div>');
		});		
	}

	jQuery('.nivoSlider').each(function(){
		jQuery(this).nivoSlider({
            directionNav: false,
            controlNav: true,
            effect:'fade',
			pauseTime:4000,
			slices: 1
		});
	});
	
	/*Blog post prev/next seperator*/
	if ($('.prev_next_links .fleft').html() !== '' && $('.prev_next_links .fright').html() !== '') {
		$('.prev_next_links .fleft').after('<span class="prev_next_links_seperator">/</span>');
	}
	$('.ls-wp-fullwidth-container').parents('.module_layer_slider').addClass('fullwidth_layer_slider');

	$('#comments ol > li .commentava.wrapped_img').not("ol li ul li .commentava.wrapped_img").addClass("nolc");

    jQuery('.featured_items i.icon-link, .gallery_item i.icon-search, .portfolio_zoom i.icon-search, .portfolio_link i.icon-link').each(function(){
        jQuery(this).removeClass("icon-link");
        jQuery(this).removeClass("icon-search");
    });

    jQuery('.teamslider h5, .testimonials_text h5').each(function(){
        jQuery(this).append(",");
    });

    jQuery('.page_title_block').parents(".content_wrapper").css("border-top", "none");

	if (fixed_menu) {
		var header_text = $('.header_wrapper').html();
		$('body').append('<header class="fixed_menu"><div class="container">'+header_text+'</div></header>');
	}

    var comment_heading = $("#respond #reply-title").html();
    $("#respond #reply-title").wrap("<div class='bg_title'></div>");
    $("#respond #reply-title").parent().html("<h3 id='reply-title'>"+comment_heading+"</h3>");
    $(".mc_signup_submit .button").addClass("mc_submit");

/*    jQuery('header .menu > li .sub-menu').each(function(){
        jQuery(this).width(jQuery(this).parent('.search_form').width()-32);
    });*/
	jQuery('.rs-fullscreen').parent('.module_revolution_slider').addClass('fullscreen_slider');
	if (jQuery('.rs-fullscreen').size() > 0) {
		jQuery('html').addClass('fullscreen_layout');
	}
	
	
});	

jQuery(window).load(function(){
	jQuery('.rs-fullscreen').css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
	//Widget Flickr
	/*$('.flickr_badge_image a').append('<div class="flickr_border"></div>');	*/
	
	jQuery('.feedback_form .form_field').each(function(){		
		jQuery(this).width(jQuery(this).parents('.feedback_form').width()-32);
	});	
	jQuery('.feedback_form .field-message').each(function(){		
		jQuery(this).width(jQuery(this).parents('.feedback_form').width()-32);
	});	

	if (fixed_menu) {
		//if ($(window).scrollTop() > $('header#main_header').height()+100) {
		if ($(window).scrollTop() > $('#header_tagline').height()) {
			$('.fixed_menu').addClass('fixed_showed');
		} else {
			$('.fixed_menu').removeClass('fixed_showed');
		}
	}	
});

jQuery(window).scroll(function(){
	if (fixed_menu) {
		//if ($(window).scrollTop() > $('header#main_header').height()+100) {
		if ($(window).scrollTop() > $('#header_tagline').height()) {
			$('.fixed_menu').addClass('fixed_showed');
		} else {
			$('.fixed_menu').removeClass('fixed_showed');
		}
	}
});

jQuery(window).resize(function(){
	jQuery('.rs-fullscreen').css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
	if ($(window).height() > $('header').height()+$('footer').height()+$('.main_wrapper').height()+$('.pre_footer').height()+159) {
		$('.main_wrapper').css('min-height', ($(window).height()-$('header').height()-$('footer').height()-$('.pre_footer').height()-159)+'px')
	}
	//Header
	if ($(window).width() > 760) {
		jQuery('.main_wrapper').css('padding-top', jQuery('header').height()+'px');
	}	
	//FeedBack Form
	jQuery('.content_block').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-32);
	});	
	jQuery('.login_form').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-32);
	});	
	jQuery('.mc_input').each(function(){
		jQuery(this).width(jQuery(this).parents('.widget_mailchimpsf_widget').width()-22);
	});
	jQuery('.sidepanel').find('.field_search').each(function(){
		jQuery(this).width(jQuery(this).parent('.search_form').width()-32);
	});

	jQuery('.feedback_form .form_field').each(function(){		
		jQuery(this).width(jQuery(this).parents('.feedback_form').width()-32);
	});	
	jQuery('.feedback_form .field-message').each(function(){		
		jQuery(this).width(jQuery(this).parents('.feedback_form').width()-32);
	});		

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
});
