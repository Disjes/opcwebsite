/* SORTING */ 

jQuery(function(){
  var $container = $('.portfolio_block');

  $container.isotope({
	itemSelector : '.element'
  });
    
  var $optionSets = $('#options .optionset'),
	  $optionLinks = $optionSets.find('a');

  $optionLinks.click(function(){
	var $this = $(this);
	// don't proceed if already selected
	if ( $this.parent('li').hasClass('selected') ) {
	  return false;
	}
	var $optionSet = $this.parents('.optionset');
	$optionSet.find('.selected').removeClass('selected');
	$optionSet.find('.fltr_before').removeClass('fltr_before');
	$optionSet.find('.fltr_after').removeClass('fltr_after');
	$this.parent('li').addClass('selected');
	$this.parent('li').next('li').addClass('fltr_after');
	$this.parent('li').prev('li').addClass('fltr_before');

	// make option object dynamically, i.e. { filter: '.my-filter-class' }
	var options = {},
		key = $optionSet.attr('data-option-key'),
		value = $this.attr('data-option-value');
	// parse 'false' as false boolean
	value = value === 'false' ? false : value;
	options[ key ] = value;
	if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
	  // changes in layout modes need extra logic
	  changeLayoutMode( $this, options )
	} else {
	  // otherwise, apply new options
	  $container.isotope(options);	  
	}	
	return false;	
  });
	$('.masonry').find('img').load(function(){
		$container.isotope('reLayout');
	}); 	
});

jQuery.fn.portfolio_addon = function(addon_options) {
	//Set Variables
	var addon_el = jQuery(this),
		addon_base = this,
		img_count = addon_options.items.length,
		img_per_load = addon_options.load_count,
		$newEls = '',
		loaded_object = '',
		$container = jQuery('.image-grid');
	
	jQuery('.btn_load_more').click(function(){
		$newEls = '';
		loaded_object = '';									   
		loaded_images = $container.find('.added').size();
		if ((img_count - loaded_images) > img_per_load) {
			now_load = img_per_load;
		} else {
			now_load = img_count - loaded_images;
		}
		
		if ((loaded_images + now_load) == img_count) jQuery(this).fadeOut();

		if (loaded_images < 1) {
			i_start = 1;
		} else {
			i_start = loaded_images+1;
		}

		if (now_load > 0) {
			if (addon_options.type == 0) {
				//1 Column Portfolio Type
				for (i = i_start-1; i < i_start+now_load-1; i++) {
					loaded_object = loaded_object + '<div data-category="'+ addon_options.items[i].category +' " class="'+ addon_options.items[i].category +'  element gt3_row-fluid portfolio_item added"><div class="portfolio_item_img gt3_col6"><a href="'+ addon_options.items[i].url +'"><img src="'+ addon_options.items[i].src +'" width="570" height="380" alt=""></a></div><div class="portfolio_dscr gt3_col6"><div class="portfolio_preview_topline"><h3><a href="'+ addon_options.items[i].url +'">'+ addon_options.items[i].title +'</a></h3><div class="preview_meta"><span class="preview_meta_author">by <a href="'+ addon_options.items[i].auth_url +'">'+ addon_options.items[i].author +'</a></span><span class="preview_categ">in <span class="f_letter">'+ addon_options.items[i].category +'</span></span></div></div>'+ addon_options.items[i].description +' <a href="'+ addon_options.items[i].url +'">Read more!</a></div></div>';
				}
			}  else {
				//2-4 Columns Portfolio Type
				for (i = i_start-1; i < i_start+now_load-1; i++) {
					loaded_object = loaded_object + '<div data-category="'+ addon_options.items[i].category +' " class="'+ addon_options.items[i].category +' element portfolio_item added"><div class="portfolio_item_wrapper"><div class="portfolio_item_img portfolio_item_img_fx"><img src="'+ addon_options.items[i].src +'" alt="" width="570" height="380" /><div class="portfolio_image_fadder"></div><a href="'+ addon_options.items[i].zoom_url +'" class="prettyPhoto portfolio_zoom" rel="prettyPhoto[portfolio1]"><i class="icon-search"></i></a><a href="'+ addon_options.items[i].url +'" class="portfolio_link"><span><i class="icon-link"></i></span></a></div><div class="portfolio_content"><div class="portfolio_content_wrapper"><h3 class="gallery_title"><a href="'+ addon_options.items[i].url +'">'+ addon_options.items[i].title +'</a></h3></div></div></div></div>';

				}
			}
			$newEls = jQuery(loaded_object);
			$container.isotope('insert', $newEls, function() {
				$container.isotope('reLayout');
				
				jQuery('.prettyPhoto').prettyPhoto();
				$('.portfolio_item_img_fx').hover(function(){
					$(this).find('.portfolio_image_fadder').stop().animate({'opacity' : '0.8'},250);
					$(this).find('a').stop().animate({'opacity' : '1'},250);
				}, function() {
					$(this).find('.portfolio_image_fadder').stop().animate({'opacity' : '0'},300);
					$(this).find('a').stop().animate({'opacity' : '0'},50);
				});		
				jQuery('.portfolio_zoom i.icon-search, .portfolio_link i.icon-link').each(function(){
					jQuery(this).removeClass("icon-link");
					jQuery(this).removeClass("icon-search");
				});
				
									
			});			
		}
	});
}
