jQuery(document).ready(function() {
    "use strict";





/* -------- Appears Menu ------ */
	$(window).on('ready , scroll', function() {
	    if ($(window).scrollTop() > 30) {
	        $('.main-menu').addClass('minified');
	    } else {
	        $('.main-menu').removeClass('minified');
	    }
	});

/* ---------- Hide Menu-------- */
  jQuery(".nav a").on("click", function () {
      jQuery("#nav-menu").removeClass("in").addClass("collapse");
  });

  // Close hamburger menu when clicking outside
  $(document).on('click', function(e) {
    var $navbar = $('#collapsingNavbar');
    var $navbarToggle = $('.navbar-toggler');
    
    // Check if the click is outside the navbar and the navbar is currently open
    if (!$navbar.is(e.target) && 
        $navbar.has(e.target).length === 0 && 
        !$navbarToggle.is(e.target) && 
        $navbar.hasClass('in')) {
      
      // Close the menu using Bootstrap's collapse method
      $navbar.collapse('hide');
    }
  });

  // Close hamburger menu when clicking on menu items
  $('#collapsingNavbar .nav a').on('click', function() {
    if ($(window).width() < 768) { // Only on mobile
      $('#collapsingNavbar').collapse('hide');
    }
  });

/* --------- One Page Navigation -------- */
	$('#collapsingNavbar').onePageNav({
	    currentClass: 'active',
      scrollThreshold: 0.3,
	    scrollSpeed: 500,
	    easing: 'linear'
	});


/* ---------- Wow Js ---------- */
var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       250,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    }
  }
);
wow.init();

/*--------Client----------*/
//Owl Carousel
$('#clients-carousel').owlCarousel({
    items:4,
    itemsTablet:3,
    margin:90,
    stagePadding:90,
    smartSpeed:450,
    itemsDesktop : [1199,4],
    itemsDesktopSmall : [980,3],
    itemsTablet: [768,3],
    itemsTablet: [767,2],
    itemsTabletSmall: [480,2],
    itemsMobile : [479,1],
});

/* --------- Scroll Up --------- */
	$.scrollUp({
		scrollName: 'scrollUp', // Element ID
		scrollDistance: 300, // Distance from top/bottom before showing element (px)
		scrollFrom: 'top', // 'top' or 'bottom'
		scrollSpeed: 5000, // Speed back to top (ms)
		easingType: 'linear', // Scroll to top easing (see http://easings.net/)
		animation: 'fade', // Fade, slide, none
		animationInSpeed: 200, // Animation in speed (ms)
		animationOutSpeed: 200, // Animation out speed (ms)
		scrollText: 'Scroll to top', // Text for element, can contain HTML
		scrollTitle: false, // Set a custom <a> title if required. Defaults to scrollText
		scrollImg: true, // Set true to use image
		activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
		zIndex: 99998 // Z-Index for the overlay
	});

/* ---------- lightbox ---------- */
	$('.featured-work-img').magnificPopup({
	  type: 'image',
	  gallery:{
	    enabled:true,
      titleSrc: 'title'
	  }
	});

	$('.flickr-gallery-img').magnificPopup({
	  type: 'image',
	  gallery:{
	    enabled:true
	  }
	});


/* --------- Carousel Slider ---------- */

	// Feature Works
	$("#teams").owlCarousel({
		items : 3,
		itemsDesktop: [1199,1],
		itemsDesktopSmall: [979,1],
		itemsTablet: [768,1],
		itemsMobile : [520,1],
		autoPlay: 5000
	});

/* ------------ Stellar ----------- */
$(window).stellar({
	responsive: true,
    positionProperty: 'position'
});

/* ---------- ISoptope --------- */
  var $container = $('.portfolio-items');

  // filter items on button click
   $container.isotope({
          filter: '*',
          itemSelector: '.item',
          animationOptions: {
              duration: 750,
              easing: 'linear',
              queue: false
          }
      });


  $('#portfolio-filter ul li a').on('click',function(){
      var selector = $(this).attr('data-filter');
      $container.isotope({
          filter: selector,
          animationOptions: {
              duration: 750,
              easing: 'linear',
              queue: false
          }
      });
    return false;
  });

  var $optionSets = $('#portfolio-filter ul'),
         $optionLinks = $optionSets.find('a');

         $optionLinks.on('click',function(){
            var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
            return false;
        }
     var $optionSet = $this.parents('#portfolio-filter ul');
     $optionSet.find('.selected').removeClass('selected');
     $this.addClass('selected');
  });

/* ------------ Home Slider ------------- */
$( '#slider' ).sliderPro({
	width: '100%',
    height: 768,
    fade: true,
    waitForLayers: true,
    buttons: false,
    autoplay: false,
    autoScaleLayers: false,
    slideAnimationDuration: 1500,
    touchSwipe: false,
    breakpoints: {
        600: {
            height: 250
        }
	}
});


});
