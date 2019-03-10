// JavaScript Document
$(document).ready(function() {
  
	// ??????? ????
	$('#feedbackForm').on('click', '#openFeedbackForm', function(){
        if($(this).hasClass("active")){
            $("#feedbackFormContainer").slideUp(300);
            $(this).removeClass("active");
        }else{
            $("#feedbackFormContainer").slideDown(300);
            $(this).addClass("active");
        }
        return false;
    });
	
	$('a#openFeedbackForm2').click(function() {
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top}, 400, function() {
		if (!$('a#openFeedbackForm').hasClass('active')){
			$('a#openFeedbackForm').click();
			}
		});
		return false; 
	});
	
	$(".topmenu a").each(function(index, element) {
    $(this).wrapInner('<span></span>');
  });
	
	$(".topmenu ul ul").each(function(index, element) {
		if($(this).find("ul").length) 
			$(this).addClass("parent");
  });
		
	$(".topmenu li").hover(function(e){
		
		if($(this).parents(".parent").length) return;
		
	  var ofset = $(this).offset(),
				firstUL = $(this).find("ul:first"),
				parentUL = $(this).find("ul.parent");
						
		firstUL.stop().slideDown(200);		
		parentUL.css({
			width: $(document).width(),
			marginLeft: - ofset.left
		});
		
  },function(e){
		if($(this).parents(".parent").length) return;
	  $(this).find("ul:first").stop().slideUp(200);
  });
	
	// ?????
	$("header .search-block").click(function(){
		if($(this).hasClass("active")) return;
		$(this).addClass("active").animate({width:650,marginLeft:-650}, function(){
			$("header .search-block .clouse-block").fadeIn(300);
			$("header .search-block .search-field").focus();	
		});
	});
	
	$("header .search-block .clouse-block").click(function(){
		$(this).parent().animate({width:0,marginLeft:0},function(){
			$("header .search-block").removeClass("active");	
		});
		$("header .search-block .clouse-block").fadeOut(100);
	});
		
	// ??????? ?????????????? ????
	$(".undertopmenu li").each(function(index, element) {
		if($(this).find("ul").length) 
			$(this).addClass("parent");
  });
	
	$(".undertopmenu li").hover(function(e){
		
	  var ofset = $(this).offset(),
				firstUL = $(this).find("ul:first");
										
		firstUL.stop().slideDown(200);		
		
  },function(e){
		
	  var ofset = $(this).offset(),
				firstUL = $(this).find("ul:first");
										
		firstUL.stop().slideUp(200);		
		
  });
	
	// ??????? ??? ?????????
	$(window).load(function(e) {
			$(".types-slider li, .types-categories .category-box, .photo-sections-top .section-box").hover(function(e){
			
			var liHeight = $(this).height(),
					liCaption = $(this).find(".caption"),
					captionHeight = liCaption.attr("data-height");
											
			liCaption.css({
				height:	captionHeight
			}).stop().animate({
				height: liHeight - 16 - 16
			}, 200);
			
			$(this).find(".description").stop().slideDown(200);
			
		}, function(e){
			
			var liHeight = $(this).height(),
					liCaption = $(this).find(".caption"),
					captionHeight = liCaption.attr("data-height");
							
			liCaption.stop().animate({
				height: captionHeight
			}, 200);
			
			$(this).find(".description").stop().slideUp(200);
			
		}).each(function(){
			
			var liCaption = $(this).find(".caption"),
					captionHeight = liCaption.height();
			
			liCaption.wrapInner('<span class="inner"></span>').append('<span class="helper"></span>').attr("data-height",captionHeight);
	
		});
  });

	// ???????? ?? ????????? ???????
	var isMobile = {
			Android: function(){return navigator.userAgent.match(/Android/i);},
			BlackBerry: function(){return navigator.userAgent.match(/BlackBerry/i);},
			iOS: function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
			Opera: function(){return navigator.userAgent.match(/Opera Mini/i);},
			Windows: function(){return navigator.userAgent.match(/IEMobile/i);},
			any: function(){
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
	};

    // ????????? ????????? placeholder IE
    var ie = navigator.userAgent.indexOf("MSIE");
    if((ie!=-1 && parseInt(navigator.userAgent.substr(ie + 5, 2))<=9)){
        $("input[placeholder], textarea[placeholder]").each(function(index, element){
            if($(element).val() == "") $(element).val($(element).attr("placeholder"));
        });
		$("input[placeholder], textarea[placeholder]").focus(function(){
            if($(this).attr("value") == $(this).attr("placeholder")) $(this).attr("value", "");
        }).focusout(function(){
			if($(this).attr("value") == "") $(this).attr("value", $(this).attr("placeholder"));
		});
    }
	
    var floatingMenu = $(".section-menu");
    if(floatingMenu.length){ // а???, ??? ?????
        var floatingMenuOffset = floatingMenu.offset(),
            minHeight = $(window).outerHeight()-$(".page-footer").outerHeight()-$(".top-floating-bar.to-footer").outerHeight();
        if(!isMobile.any() && floatingMenu.outerHeight()<=minHeight) $(window).bind('scroll',function(event){
            var top = getScrollTop();
            if(top>=floatingMenuOffset.top){
                floatingMenu.css({
                    position:"fixed",
                    top:"70px"
                });
            }else{
                floatingMenu.css({
                    position:"relative",
                    top:"auto"
                });
            }
        });
    }

    function getScrollTop(){
        if(typeof pageYOffset!= 'undefined') return pageYOffset; // ?????????? ????????
        else{
            var B= document.body; //IE 'quirks'
            var D= document.documentElement; //IE with doctype
            D= (D.clientHeight)? D: B;
            return D.scrollTop;
        }
    }

    $('.popup-gallery').click(function(){ // ?? ??????? ?????
        $(this).fadeOut(200);
    }).children().click(function(e){ // ?? ?????
        e.stopPropagation(); // ?????????
    });

	$(".popup-gallery .clouse-icon").click(function(){
		$(this).parents(".popup-gallery").fadeOut(200);
	});

	$(".popup-gallery .slider-box").on('click', 'li', function(){
        var image = $(this).find(".image"),
            description = $(this).find(".description"),
            name = $(this).find(".name"),
            imageBox = $(this).parents(".popup-gallery").find(".show-box .box-image"),
            descriptionBox = $(this).parents(".popup-gallery").find(".show-box .description"),
            nameBox = $(this).parents(".popup-gallery").find(".box-title");

        imageBox.html(image.html());
        descriptionBox.html(description.html());
        nameBox.html(name.html());
	});

    $(document).keydown(function(e) {
        if( e.keyCode === 27 ) {
            $(".popup-gallery .clouse-icon").click();
        }
    });

	function resizePopupGallery (){
		$this = $(".popup-gallery");
		var winWidth = $(window).width()*0.6,
				winHeight = $(window).height()*0.8,
				show = $this.find(".show-box");
		show.height(winHeight-150).width(winWidth);
		$this.find(".block-content").css({
			marginTop:-winHeight/2,
			marginLeft:-winWidth/2
		});
	}
	
	resizePopupGallery();

    $(window).resize(function(e) {
        resizePopupGallery();
    });
	
	
});

(function($) {
    $(function() {

			var topSlider = $('.topslider');
			topSlider.on('jcarousel:reload jcarousel:create', function () {
				var width = topSlider.innerWidth();
				topSlider.jcarousel('items').css('width', width + 'px');
				// ?????????? ??????? ?? ??????? ???????
				margin = (width/2>540)?540:width/2+60;
				$('.topslider-wrapper .prev').css("margin-left",-margin);
						$('.topslider-wrapper .next').css("margin-left", margin-$('.topslider-wrapper .next').width());

			}).jcarousel({wrap:'circular'});
					$('.topslider-wrapper .prev').jcarouselControl({target:'-=1', carousel:topSlider});
					$('.topslider-wrapper .next').jcarouselControl({target:'+=1', carousel:topSlider});
					$('.topslider-wrapper .slider-pagination')
				.on('jcarouselpagination:createend',function(){
					var width = $('.slider-pagination').innerWidth()/2;
					$('.topslider-wrapper .slider-pagination').css('margin-left',-width);
				})
				.on('jcarouselpagination:active','a',function(){
					$(this).addClass('active');
				})
				.on('jcarouselpagination:inactive','a',function(){
					$(this).removeClass('active');
				 })
				 .on('click',function(e){
					e.preventDefault();
				})
				.jcarouselPagination({
					perPage: 1,
					carousel:topSlider,
					item: function(page) {
					return '<a href="#' + page + '">' + page + '</a>';
				}
				}).jcarouselAutoscroll({
					target: '+=1',
					autostart: true,
					interval: 3000
				});

			// ??????? ?????
			var typeSlider = $('.types-slider');
			typeSlider.on('jcarousel:reload jcarousel:create', function () {
				var width = typeSlider.innerWidth();
				// ?????????? ??????? ?? ??????? ???????
				margin = (width/2>540)?540:width/2+60;
				$('.types-slider-wrapper .prev').css("margin-left",-margin);
						$('.types-slider-wrapper .next').css("margin-left", margin-$('.types-slider-wrapper .next').width());

			}).jcarousel();
					$('.types-slider-wrapper .prev').jcarouselControl({target:'-=1', carousel:typeSlider});
					$('.types-slider-wrapper .next').jcarouselControl({target:'+=1', carousel:typeSlider});
					$('.types-slider-wrapper .slider-pagination')
				.on('jcarouselpagination:createend',function(){
					var width = $('.slider-pagination').innerWidth()/2;
					$('.types-slider-wrapper .slider-pagination').css('margin-left',-width);
				})
				.on('jcarouselpagination:active','a',function(){
					$(this).addClass('active');
				})
				.on('jcarouselpagination:inactive','a',function(){
					$(this).removeClass('active');
				 })
				 .on('click',function(e){
					e.preventDefault();
				});


			// ??????? ?????????
			var sImagesSlider = $('.s-images-slider');
			sImagesSlider.each(function(index, element) {
		      slider = $(element);
			  slider.on('jcarousel:reload jcarousel:create', function(){
                    var width = $(this).width(),
					    arrowWidth = $(this).parent().find('.prev').width();
					if(width<=0) width = 650
					// ?????????? ??????? ?? ??????? ???????
					margin = width/2+10;
					$(this).parent().find('.prev').css("margin-left",-margin-arrowWidth);
					$(this).parent().find('.next').css("margin-left", margin);
				}).jcarousel();
					$(this).parent().find('.prev').jcarouselControl({target:'-=1', carousel:slider});
					$(this).parent().find('.next').jcarouselControl({target:'+=1', carousel:slider});
					$(this).parent().find('.slider-pagination')
				.on('jcarouselpagination:createend',function(){
					var width = $('.slider-pagination').innerWidth()/2;
					$(this).parent().find('.slider-pagination').css('margin-left',-width);
				})
				.on('jcarouselpagination:active','a',function(){
					$(this).addClass('active');
				})
				.on('jcarouselpagination:inactive','a',function(){
					$(this).removeClass('active');
				 })
				 .on('click',function(e){
					e.preventDefault();
				})
      });

  });
})(jQuery);


// ?????????? ????? (??????????)

$(function(){
    var wrapper = $( ".file-upload" ),
        inp = wrapper.find( "input" ),
        btn = wrapper.find( ".button" ),
        lbl = wrapper.find( ".caption" );

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if(!file_name.length )
            return;

        lbl.text( file_name );
				btn.text( 'Прикрепить другой?' );

    }).change();

});
$( window ).resize(function(){
    $( ".file_upload input" ).triggerHandler( "change" );
});


jQuery(function($){
    // U?????? ????
    $(".forms input[name=user_phone]").mask("+7 (999) 999-99-99");
});
$(document).ready(function() {
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
        afterLoad: addbtn
	});
    function addbtn(cur,prev){
	$(".wnd_btn_order").remove();

	var cur_img = cur.href;

	//var btn_wrap = $('<a style="display:none" class="button order-button huge-button bg-red middle-size rounded" href="/to-ask-a-question-make-a-reservation/?backLink='+cur_img+'">Хочу такой!</a>');

	//btn_wrap.appendTo('.fancybox-outer');

    setTimeout(function(){
    var left = $('.fancybox-inner').width()/2-$('.fancybox-skin .order-button').outerWidth()/2;
    $('.fancybox-skin .order-button').css("left", left+"px").show();

    },300);
    }
});