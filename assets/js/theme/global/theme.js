/*eslint-disable*/
import $ from 'jquery';
import superfish from 'superfish/src/js/superfish';
import Instafeed from 'instafeed.js/instafeed.min';
import responsiveTabs from 'responsive-tabs/js/jquery.responsiveTabs.min';
import treeviewjs from 'treemenu.js/treemenu.js';
import Cookies from 'js-cookie/src/js.cookie';
import fancybox from '@fancyapps/fancybox/dist/jquery.fancybox.min';
import compareProducts from './compare-products';
$.fancybox.defaults.hash = false;

export default function() {

  function maketreeview(){
    /* treeview accordion toggle menu */
    jQuery('.navList-treeview').not('.navList-treeview.treeview').treeview({
      collapsed: true,
      animated: "medium"
    });
  }

  function setHeight(elegrid) {
		let ele = $(elegrid),
			maxHeight = 0;
		ele
       .removeAttr('style')
    	.css('min-height', 'auto')
			.each(function() {
				if ($(this).outerHeight() > maxHeight) {
					maxHeight = $(this).outerHeight();
				}
			})
			// and set them all to the greatest height
			.css('height', maxHeight);
	}

	function setHeightRows(selector) {
		let $elements = $(selector),
				rows = {},
				key;
		$elements.each(function() {
			let $this = $(this),
					currentTop = $this.offset().top;
			if (typeof rows[currentTop] === 'undefined')
				rows[currentTop] = $this;
			else
				rows[currentTop] = rows[currentTop].add(this);
		});
		for (key in rows) {
			if (!Object.hasOwnProperty.call(rows, key))
				continue;
			setHeight(rows[key]);
		}
	}

  function themeInit(){
     compareProducts();
     }

     function responsiveView(){

      if(jQuery(window).width() < 1024 && !jQuery("body").hasClass('lt-1024')) {
          jQuery("body").addClass('lt-1024');
          jQuery("body").removeClass('gt-1024');
          jQuery(".product-side-bar .ups-section").detach().prependTo(".footer");
          jQuery(".product-side-bar .related-product").detach().appendTo("#ProductTabs");

      } else if(jQuery(window).width() >= 1024 && !jQuery("body").hasClass('gt-1024')) {
          jQuery("body").addClass('gt-1024');
          jQuery("body").removeClass('lt-1024');
          jQuery(".footer .ups-section").detach().prependTo(".product-side-bar");
          jQuery("#ProductTabs .related-product").detach().appendTo(".product-side-bar");
       }

       if(jQuery(window).width() <= 667 && !jQuery("body").hasClass('lt-667')){
          jQuery("body").addClass('lt-667');
          jQuery("body").removeClass('gt-667');
          $('.sidebar-toggle-content,.footer-toggle-content').hide();
          $('.sidebar-toggle-title,.footer-navigation-block .footer-toggle-title').removeClass('active');
      } else if(jQuery(window).width() > 667 && !jQuery("body").hasClass('gt-667')){
          jQuery("body").addClass('gt-667');
          jQuery("body").removeClass('lt-667');
          $('.sidebar-toggle-content,.footer-toggle-content').show();
          $('.sidebar-toggle-title,.footer-navigation-block .footer-toggle-title').removeClass('active');
       }

       /* PRODUCT page related products */

      $('[data-slick-apply]').each(function(index){

       let customslickview = 1023;
       if($(this).attr('data-custom-slick-view')!='' && $(this).attr('data-custom-slick-view')!= undefined){
         customslickview = parseInt($(this).data('custom-slick-view'));
       }
       let slickoptions = {
                "dots": true,
                "infinite": false,
                "slidesToShow": 2,
                "slidesToScroll":2,
                "vertical": false,
                "centerMode": false,
                "responsive": [
                    {
                        "breakpoint": 1440,
                        "settings":"unslick"
                    },
                    {
                        "breakpoint": 1279,
                        "settings": "unslick"
                    },
                    {
                        "breakpoint": 1023,
                        "settings": {
                          "slidesToScroll": 1,
                          "slidesToShow": 4
                        }
                    },
                    {
                        "breakpoint": 769,
                        "settings": {
                          "slidesToScroll": 2,
                          "slidesToShow": 3,
                          "dots": true,
                          "arrows": false
                        }
                    },
                    {
                        "breakpoint": 666,
                        "settings": {
                          "slidesToScroll": 2,
                          "slidesToShow": 2,
                          "draggable": true,
                          "dots": true,
                          "arrows": false
                        }
                    },
                    {
                        "breakpoint": 567,
                        "settings": {
                          "slidesToScroll": 2,
                          "slidesToShow": 2,
                          "dots": true,
                          "arrows": false
                        }
                    },
                    {
                        "breakpoint": 479,
                        "settings": {
                          "slidesToScroll": 2,
                          "slidesToShow": 2,
                          "draggable": false,
                          "dots": true,
                          "arrows": false
                        }
                    },
                    {
                        "breakpoint": 319,
                        "settings":"unslick"
                    }
                ]
            }
        if($(this).attr('data-custom-slick')!=undefined && $(this).attr('data-custom-slick')!='' ){
          slickoptions = $(this).data('custom-slick');

        }
       let customslickclass = customslickview+'-'+index;

       let item = this;
        if($(window).width()<= customslickview && !$('body').hasClass('slick-lt-'+customslickclass)){
          $('body').addClass('slick-lt-'+customslickclass);
          $('body').removeClass('slick-gt-'+customslickclass);
            if(!$(item).hasClass('slick-initialized')){
               $(item).slick(slickoptions);
          }

        } else if($(window).width() > customslickview && !$('body').hasClass('slick-gt-'+customslickclass)){

            $('body').addClass('slick-gt-'+customslickclass);
            $('body').removeClass('slick-lt-'+customslickclass);
            //setTimeout(function(){
                if($(item).hasClass('slick-initialized')){
                    $(item).slick('unslick');
                }
            //},500);
          }
       });
       //setTimeout(function(){
         $('.slick-initialized').slick('setPosition');
      //},1000);
     /* PRODUCT page related products */

     }

     (function() {
      var send = XMLHttpRequest.prototype.send
      XMLHttpRequest.prototype.send = function() {
          this.addEventListener('load', function() {
            product_view();
          });
          return send.apply(this, arguments)
      }
  })();


  /* PRODUCT VIEW ON LOAD START */
  function product_view()
  {
    let view_val=Cookies.get('product-view');
    if(view_val !== undefined) {
      if(view_val === 'product-grid-view') {
        jQuery('.product-view-btn.list-view').removeClass('active');
        jQuery('.product-view-btn.grid-view').addClass('active');
        jQuery('.product-view-mode .productGrid').removeClass('product-list-view');
        jQuery('.product-view-mode .productGrid').addClass('product-grid-view product-grid-view');
      }else {
        jQuery('.product-view-btn.grid-view').removeClass('active');
        jQuery('.product-view-btn.list-view').addClass('active');
        jQuery('.product-view-mode .productGrid').removeClass('product-grid-view');
        jQuery('.product-view-mode .productGrid').addClass('product-list-view product-list-style');
      }
    } else {

      jQuery('.product-view-btn.list-view').removeClass('active');
      jQuery('.product-view-btn.grid-view').addClass('active');
      jQuery('.product-view-mode .productGrid').removeClass('product-list-view');
      jQuery('.product-view-mode .productGrid').addClass('product-grid-view product-grid-view');
    }
  }



  function matchBoxHeight(){

    /* ==== MATCH HEIGHT SCRIPT ==== */
    setHeightRows($('.card .product-item-price').not('.slick-initialized .card .product-item-price'));
    setHeightRows($('.card .card-body .card-title').not('.slick-initialized .card .card-body .card-title'));
    setHeightRows($('.card .card-body .brandName').not('.slick-initialized .card .card-body .brandName'));
    setHeightRows($('.card .card-body').not('.slick-initialized .card .card-body'));
    setHeightRows($('.card').not('.slick-initialized .card').not('.brandGrid .brand .card'));
    setHeightRows('.service-wrap .service-banner-item');
    setHeightRows('.category-image-inner .sub-category-img');
    setHeightRows('.category-image-inner .sub-category-name');
    setHeightRows('.category-image-inner .sub-category-img-block');
    setHeightRows('.category-image-inner');
    setHeightRows('.productView-thumbnails .slick-slide');


    setHeight('.slick-initialized .card .product-item-price');
    setHeight('.slick-initialized .card .card-body .card-title');
    setHeight('.slick-initialized .card .card-body .brandName');
    setHeight('.slick-initialized .card .card-reting-price');
    setHeight('.slick-initialized .card .card-body');
    setHeight('.slick-initialized .card');

}
(function() {
  var send = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send = function() {
      this.addEventListener('load', function() {
          maketreeview();
        });
        return send.apply(this, arguments)
    }
})();

  /* === READY START === */
  jQuery(document).ready(function() {

    maketreeview();

    // Active class in menu
   let path = window.location.pathname;
   jQuery("[data-menu] li a").each(function(){
   if(path==jQuery(this)[0].pathname || path=="/"+jQuery(this)[0].pathname){
      jQuery(this).parents('li').addClass("ActivePage");
      jQuery(this).parent().addClass("ActivePage");
    }
   });

    $('.heroCarousel .heroCarousel-slide').each(function(){
          let txt = $(this).find('.heroCarousel-title').text();
          $(this).find('.heroCarousel-title').text("");
          $(this).find(".heroCarousel-title").append(txt);
    });

  /* ==== header search opne close js ==== */
    $(".navUser-action--quickSearch").click(function() {
      $("body").addClass('disable-scroll');
    });

    $(".dropdown--quickSearch .close-icon").click(function(){
      $("body").removeClass('disable-scroll');
    });


    /* ==== header side bar ==== */
    $('#headerSidebar .close-icon').click(function(e){
      if($('.headerSidebarOn').length){
        $('#headerSidebar').removeClass('headerSidebarOn');
      }
    });
    $('#quickSearch .close-icon').click(function(e){
      $('#quickSearch').removeClass('is-open');
    });

    // close top pencil banner in mobile
    jQuery(document).on('click','.control-close-btn', function() {
      jQuery('.pencil-banner').slideUp();
    });

    $('html,body').click(function(e){
        if(!$(e.target).hasClass("headerSidebarOn") && ($(e.target).hasClass("headerSidebarOn") || !$(e.target).parents('.headerSidebarOn').length)){
          if($('.headerSidebarOn').length){
            $('#headerSidebar').removeClass('headerSidebarOn');
          }
        }

    })
    $('.control-otherlinks').click(function(event){
      event.preventDefault();
      setTimeout(function(){
        if($('.headerSidebarOn').length){
          $('#headerSidebar').removeClass('headerSidebarOn');
        } else {
          $('#headerSidebar').addClass('headerSidebarOn');
        }
      },5);
    });


    /* sticky menu  */
    let headerHeight = $('header').height();
    let scrollElement = false;
    let hHeader = $('.header').height();
    let hInner = hHeader - 10;
    $(window).scroll(function(){
      if(hHeader < $(window).scrollTop() && !scrollElement){
        if($('.header').length){
          $('.header').addClass('stuck');
          $('.body').addClass('body-stuck').css('margin-top',headerHeight+'px');
        }
        scrollElement = true;
      } else if(hInner > $(window).scrollTop() && scrollElement){
        $('.header').removeClass('stuck');
        $('.body').removeClass('body-stuck').css('margin-top','0px');
        scrollElement = false;
      }
    });
    /* ============ SUPERFISH SCRIPT ============ */
    let speed = 0;
    jQuery('.sf-menu').each(function(){
      if($(this).attr('data-speed')!=undefined && $(this).attr('data-speed')!=''){
        speed = parseFloat($(this).attr('data-speed'));
      }
      jQuery(this).superfish({
        delay: speed
      });
    });

  /* ==================  ResponsiveView  ========*/
      responsiveView();
  /* ==================  ResponsiveView  ========*/


          // disable 0 value in qty input field
          $(document).on('keyup', '.productView .form-input--incrementTotal', function() {
            if (parseInt($(this).val()) < 1 || $(this).val() == '') {
              if ($(this).attr('data-quantity-min') != '0') {
                $(this).val($(this).attr('data-quantity-min'));
              } else {
                $(this).val(1);
              }
            }
          });


    /* ==================  Product page - Description tabs  ========*/
    let $Descriptiontabs = $('#Product-descrTabs');
    $Descriptiontabs.responsiveTabs({
      rotate: false,
      startCollapsed: 'accordion',
      collapsible: 'accordion',
      setHash: false,
      click: function(e, tab) {},
      deactivate: function(event, tab){ },
      activate: function(e, tab) {
        $(".productCarousel.slick-initialized").slick('setPosition');
      },
      activateState: function(e, state) {}
    });

    /*  Fancybox  */

    //Don't enable Cloud Zoom (product image zoom) on touch device
    //Mouseenter/Mouseover events are not ideal for touch devices
    //for more info search for this code in /script/main.js
    if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)){
         $('body').addClass('touch-device');
    }

    $('.fancythumb').click(function(){
      $('ul.productView-thumbnails li a.is-active').attr('data-fancybox','gallery');
      $('ul.productView-thumbnails li a.is-active').attr('href',$('ul.productView-thumbnails li a.is-active').attr('data-fancybox-href'));
      $('ul.productView-thumbnails li a.is-active').trigger('click');
    });

    $('ul.productView-thumbnails li a').mouseenter(function(){
      $(this).removeAttr('data-fancybox');
      $(this).attr("href","javascript:void(0)");
    });
    $('ul.productView-thumbnails li a').mouseleave(function(){
      $(this).attr('data-fancybox','gallery');
      $(this).attr("href",$(this).attr('data-fancybox-href'));
    });

    /* LIST AND GRID VIEW SCRIPT */
    $(document).on('click','.product-view-button a',(e) => {
      $('.product-view-button a').removeClass('active');
      let currentTarget=$(e.currentTarget).data('view-val');
      $(e.currentTarget).addClass('active');
      switch (currentTarget) {
        case 'product-grid-view':
        $('.product-view-mode .productGrid').removeClass('product-list-style');
        $('.product-view-mode .productGrid').addClass(currentTarget);
        Cookies.set('product-view', currentTarget);
        setTimeout(function(){
          matchBoxHeight();
        },100);
        break;
        case 'product-list-style':
        $('.product-view-mode .productGrid').removeClass('product-grid-view');
        $('.product-view-mode .productGrid').addClass(currentTarget);
        Cookies.set('product-view', currentTarget);
        //distroyHeight();
        setTimeout(function(){
          matchBoxHeight();
        },100);
        break;
        default:
      }
    });
    product_view();
    /* LIST AND GRID VIEW SCRIPT ENd*/

    /* ============ sidebar TOGGLE SCRIPT ============ */
    jQuery(document).on('click','.sidebar-toggle-title', function(){
      if(jQuery(window).width() <768){
        jQuery(this).parent().find('.sidebar-toggle-content').slideToggle();
        jQuery(this).toggleClass('active');
      }
    });

    /* ============ FOOTER TOGGLE SCRIPT ============ */
    jQuery(document).on('click','.footer-navigation-block .footer-toggle-title', function(){
      if(jQuery(window).width() <= 667){
        jQuery(this).parent().find('.footer-toggle-content').slideToggle();
        jQuery(this).toggleClass('active');
      }
    });

    /* ============ INSTAGRAM SCRIPT START ============ */
    let loadingImg = $('[data-loading]').data('loading');
    let feed = new Instafeed({
      get: 'user',
      limit:'20',
      userId: jQuery("#instafeed").attr("data-id"),
      accessToken: jQuery("#instafeed").attr("data-key"),
      resolution: "low_resolution",
      template: '<div class="insta-item-wrap {{orientation}}"><div class="insta-item"><a class="animation" href="{{link}}" target="_blank"><img class="lazyload" src="'+loadingImg+'" data-src="{{image}}" /></a></div></div>',
      after: function() {
        if($('body.milano-layout--Blue').length){
        jQuery('#instafeed').slick({
          dots: false,
          //infinite: false,
          centerMode: true,
          centerPadding: '100px',
          slidesToShow: 6,
          arrows: true,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          responsive: [
            {
              breakpoint: 1901,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1651,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1441,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1023,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 668,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 569,
              settings: {
                slidesToShow: 3,
                centerPadding: '80px',
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 481,
              settings: {
                slidesToShow: 2,
                centerPadding: '70px',
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 321,
              settings: {
                slidesToShow: 1,
                centerPadding: '70px',
                slidesToScroll: 1
              }
            }
          ]
        });
      } else{
        jQuery('#instafeed').slick({
          dots: false,
          //infinite: false,
          centerMode: false,
          centerPadding: '100px',
          slidesToShow: 9,
          arrows: false,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          responsive: [
            {
              breakpoint: 1901,
              settings: {
                slidesToShow: 9,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1651,
              settings: {
                slidesToShow: 9,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1441,
              settings: {
                slidesToShow: 9,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 9,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1023,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 569,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 481,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 321,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]
        });

      }
      }
    });
    if(jQuery("#instafeed").length && jQuery("#instafeed").attr("data-id")!="" && jQuery("#instafeed").attr("data-key")!=""){
      feed.run();
    }
    /* ============ INSTAGRAM SCRIPT END ============ */

   /*============== One page Scroll and scroll to top ================*/

  $(window).scroll(function(){
    if($(window).scrollTop() > 0){
      $('.one-page-scroll').fadeOut('slow');
    } else {
      $('.one-page-scroll').fadeIn('slow');
    }
    let scrollHeight = $(document).height();
  	let scrollPosition = $(window).height() + $(window).scrollTop();
    let footertop = $('.footer').offset();

    if(jQuery(window).scrollTop() > (parseInt($(window).height())*2)-150){
         $('.page-scroll-top').fadeIn('slow');
    } else {
         $('.page-scroll-top').fadeOut('slow');
    }

  });

 $('.page-scroll-top').click(function(event) {
   let scrolltopSpeed = 1000;
   if($(this).attr('data-scroll-speed')!=undefined && $(this).attr('data-scroll-speed')!=''){
     scrolltopSpeed = parseInt($(this).data('scroll-speed'));
   }
   jQuery('html, body').animate({
         'scrollTop' : 0
     },scrolltopSpeed);
      $('.page-scroll-top').fadeOut('slow');
 });

   $('.one-page-scroll').click(function(event) {
     let scrolltop = $(window).scrollTop();
     if(scrolltop <= $(window).height()){
     let scrollSpeed = 1000;
     if($(this).attr('data-scroll-speed')!=undefined && $(this).attr('data-scroll-speed')!=''){
       scrollSpeed = parseInt($(this).data('scroll-speed'));
     }
     jQuery('html, body').animate({
           'scrollTop' : jQuery(window).height() + scrolltop - $('.headerMain').outerHeight()
       },scrollSpeed);
       $('.one-page-scroll').fadeOut('slow');
     }
   });
   /*============== One page Scroll and scroll to top ================*/

   matchBoxHeight();


  });
  /* === READY END === */
  let windowWidth = $(window).width();

   jQuery(window).resize(function() {
    if ($(window).width() != windowWidth) {
        // Update the window width for next time
        windowWidth = $(window).width();
        responsiveView();
        setTimeout(function(){
          matchBoxHeight();
        },100);
     }
  });


  //ajaxComplete start
  $(document).ajaxStop(function(){

    jQuery('.card').not('.quickSearchResults .card').matchHeight();

    product_view();
    matchBoxHeight();
  });
    //ajaxComplete END

   $(window).load(function(){
      matchBoxHeight();
    });


  themeInit();
}
/*eslint-enable*/
