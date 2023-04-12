jQuery(document).ready(function($){

  
  $('.slides').slick({
  centerMode: true,
  slidesToShow: 5,
  infinite: true,
    arrows: true,
    dots: false,
     slidesToScroll: 1,
    appendArrows: '.slider-nav',
    prevArrow: '<button type="button" class="slick-prev"><span class="sr-text">Previous</span><img class="prev" aria-hidden="true" width="50px" src="https://assets.codepen.io/588944/noun-arrow-1920806-1a1a1a.svg" /></button>',
    nextArrow: '<button type="button" class="slick-next"><span class="sr-text">Next</span><img class="next" aria-hidden="true" width="50px" src="https://assets.codepen.io/588944/noun-arrow-1920806-1a1a1a.svg" /></button>',
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
   ]
});
  
   $('.slick-current').addClass('active');    
  $('.slick-current').next('.slick-slide').addClass('next1');
  $('.slick-current').prev('.slick-slide').addClass('prev1');
  $('.slick-slide.next1').next('.slick-slide').addClass('next2');
  $('.slick-slide.prev1').prev('.slick-slide').addClass('prev2');
  
  // On before slide change
$('.slides').on('beforeChange', function(event, { slideCount: count }, currentSlide, nextSlide){
  let selectors = [nextSlide, nextSlide - count, nextSlide + count].map(n => `[data-slick-index="${n}"]`).join(', ');
  $('.slick-slide').removeClass('active').removeClass('next1').removeClass('next2').removeClass('prev1').removeClass('prev2');
  $(selectors).addClass('active');
  $('.slick-slide.active').next('.slick-slide').addClass('next1');
  $('.slick-slide.active').prev('.slick-slide').addClass('prev1');
  $('.slick-slide.next1').next('.slick-slide').addClass('next2');
  $('.slick-slide.prev1').prev('.slick-slide').addClass('prev2');
});

//  $('a[data-slide]').click(function(e) {
//    e.preventDefault();
//    var slideno = $(this).data('slide');
//    $('.slides').slick('slickGoTo', slideno - 1);
//  });
  
 
  


  
  });