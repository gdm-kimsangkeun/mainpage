/* *******************************************************
 * filename : main.js
 * description : 메인에만 사용되는 JS
 * date : 2021-06-15
******************************************************** */

$(document).ready(function  () {	
	/* ************************
	* Func : 메인 비주얼 높이 설정 및 slick 슬라이드
	* slick.js , getWindowWidth(), getWindowHeight() 필요
	************************ */
	// 메인 비주얼 높이값 설정
	if ($.exists('#mainVisual.full-height')) {
		mainVisualHeight();
		$(window).on('resize', mainVisualHeight);

		function mainVisualHeight () {
			var visual_height = getWindowHeight()	;// - $("#header").height();	// header가 fixed or absolute일경우 - $("#header").height() 삭제
			if ( getWindowWidth() > 800 ) {
				$("#mainVisual").height(visual_height);
			}else {
				$("#mainVisual").css("height","auto");
			}
		}
	}
	
	/* ************************
	* Func : 스크롤 다운아이콘
	************************ */
	window.addEventListener('scroll', toFit(function  () {
		var topMenuStart =  checkOffset("#mainContent") * 0.7;
		if (getScrollTop() > topMenuStart) {
			objectFixed($("#scrollDown"), topMenuStart, "black");
		}else {
			$("#scrollDown").removeClass("black");
		}
		// footer 도달하면 fixed해제
		if (getScrollTop() > checkOffset("#footer") - $(window).height()) {
			var scrollDown = $("#scrollDown").height() / 2;
			$("#scrollDown").addClass("static").css({"bottom":$("#footer").height() + ($(window).height() / 2) - scrollDown })
		}else {
			$("#scrollDown").removeClass("static");
		}

	}, {
	}),{ passive: true })


	/* ************************
	* Func : 메인 브랜드 :: 이미지 체인지
	************************ */
	if ($.exists('.main-brand-list')) {
		var $mainBrandImgBox = $("#mainBrandCon").find(".img-box");
		var $mainBrandTxtBox = $("#mainBrandCon").find(".txt-box");

		// 첫번째 이미지 초기화
		$(window).resize(function(){
			if (getWindowWidth() > tabletWidth) {
				var imgUrl = $mainBrandTxtBox.find("li").eq(0).attr("data-img");
				$mainBrandImgBox.find(".img-wrap").attr("style","background-image:url("+imgUrl+")");
			}
		})
		// 모바일에서 active
		$(".main-brand-list").each(function  (index) {
			$itemList = $(this);
			$item = $itemList.find("li");
			itemLength = $item.length;
			startNum = 0;
			rollingSpeed = $itemList.data("rolling-time");
			
			function visualTime(){
				if(startNum < ( itemLength - 1)){
					startNum++; 
				}else{
					startNum = 0;
				}
				visualPlay();
			}
			function visualPlay(){
				$item.each(function(id){
					if(id == startNum){
						$(this).addClass("active"); // li에 클래스 붙이기
						if (getWindowWidth() < tabletWidth) {
							var imgUrl = $mainBrandTxtBox.find("li.active").attr("data-img");
							$mainBrandImgBox.find(".img-wrap").attr("style","background-image:url("+imgUrl+")");
						}
					}else{
						$(this).removeClass("active");
					}
				});
			};
			visualPlay();
			visual_timer = setInterval(visualTime,rollingSpeed);
		});


		// pc에서 오버 이벤트
		$mainBrandTxtBox.find("li").mouseenter(function  () {
			if (getWindowWidth() > tabletWidth) {
				var imgIndex = $(this).index();
				var imgUrl = $(this).attr("data-img");
				$mainBrandImgBox.addClass("on");
				$mainBrandTxtBox.find("li").removeClass("on");
				if ($mainBrandImgBox.hasClass("on")) {
					var imgUrl = $(this).attr("data-img");
				}else {
					var imgUrl = $mainBrandTxtBox.find("li").eq(0).attr("data-img");
				}
				$mainBrandImgBox.find(".img-wrap").attr("style","background-image:url("+imgUrl+")");
			}
		})
		$mainBrandTxtBox.find(".con-box").mouseleave(function  () {
			if (getWindowWidth() > tabletWidth) {
				var imgUrl = $mainBrandTxtBox.find("li").eq(0).addClass("on").attr("data-img");
				$mainBrandImgBox.removeClass("on");
				$mainBrandImgBox.find(".img-wrap").attr("style","background-image:url("+imgUrl+")");
			}
		})
	}

	
	/* ************************
	* Func : 메인 연혁 슬라이드
	* slick.js 필요
	************************ */
	$('.main-history-slide').on('init', function(event, slick, currentSlide, nextSlide) {
		if (getWindowWidth() > 1024) {
			$(".main-history-slide li").eq(0).addClass("active");
			$(".main-history-slide li").eq(1).addClass("active");
			$(".main-history-slide li").eq(2).addClass("active");
		}else if (getWindowWidth() > 480) {
			$(".main-history-slide li").eq(2).addClass("slick-hide");
		}
	});
	$('.main-history-slide').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$(".main-history-slide li").removeClass("active slick-hide");
		if (getWindowWidth() > 1024) {
			$(".main-history-slide li").eq(nextSlide).addClass("active");
			$(".main-history-slide li").eq(nextSlide+1).addClass("active");
			$(".main-history-slide li").eq(nextSlide+2).addClass("active");
		}else if (getWindowWidth() > 480) {
			$(".main-history-slide li").eq(nextSlide+1).addClass("active");
			$(".main-history-slide li").eq(nextSlide+2).addClass("slick-hide");
		}
	});

	$('.main-history-slide').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: false,
		dots:false,
		autoplay: false,
		speed:800,
		infinite:false,
		autoplaySpeed: 3000,
		easing: 'easeInOutQuint',
		pauseOnHover:false,
		variableWidth: true,
		prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Prev" tabindex="0" role="button"><i class="xi-arrow-left"></i></button>',
		nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><i class="xi-arrow-right"></i></button>',
		responsive: [
					{
					  breakpoint: 1025,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					  }
					},
					{
					  breakpoint: 481,
					  settings: {
						slidesToShow:1,
						slidesToScroll: 1,
					  }
					},
					{
					  breakpoint: 360,
					  settings: {
						slidesToShow:1,
						slidesToScroll: 1,
						variableWidth: false,
					  }
					}
				  ]
	});
	
	/* ************************
	* Func : 메인 뉴스 슬라이드
	* swiper.js 필요
	************************ */
	if ($.exists(".main-news-list")) {
		var swiper = new Swiper(".main-news-swiper", {
		slidesPerView:1,
        spaceBetween: 30,
		watchSlidesVisibility: true,
        scrollbar: {
          el: ".main-news-swiper-controls .swiper-scrollbar",
          hide: false,
		  draggable: true,
        },
		navigation: {
          prevEl: ".main-news-swiper-controls .arrow-prev",
          nextEl: ".main-news-swiper-controls .arrow-next",
        },
		breakpoints: {
          359: {
            slidesPerView: 'auto',
            spaceBetween: 30,
          },
		  480: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        },
      });

		if (getWindowWidth() > 1024) {
			// 슬라이드 효과 delay 초기화
			$('.main-news-list .swiper-slide-visible').each(function  () {
				for (var i=0; i<4; i++) {
					$('.main-news-list .swiper-slide-visible').eq(i-1).css("transition-delay",(i*0.2)+"s");
				}
			})
		}
	}
	
	/* ************************
	* Func : 해당영역갔을때 슬라이드 autoPlay
	* wayPoint.js 필요
	************************ */
	// 해당영역갔을때 슬라이드 autoPlay
	if ($.exists('.start-autoplay-scroll-object')) {
		$(".start-autoplay-scroll-object").slick("slickPause");
		$(".start-autoplay-scroll-object").waypoint(function  () {
			$(this).slick("slickPlay");
		}, { 
			offset: startOffset
		});
	}

	/* ************************
	* Func : 사이드바 FIXED
	* objectFixed() 필요
	************************ */
	if ($.exists('#rightBar')) {
		$(window).scroll(function  () {
			var rightStartTop = $(window).height() / 2;
			objectFixed($("#rightBar"), rightStartTop);
		});
	}
});
