
$(function(){

	var tab=new $.fn.tab();
/*hover事件*/ 
    var t;
	 $(".header-nav li").hover(function(){
		$(this).find("i").stop(true,true).addClass("rotate");
	 	$(this).find("div").stop(true,true).fadeIn(100);
	 	$(this).css("color","rgb(53, 181, 88)");
	},function(){
	 	$(".header-nav li div").stop(true,true).fadeOut(100);
		$(this).find("i").stop(true,true).removeClass("rotate");		
		$(this).css("color","#000");
	});

	$(".hover_tab").hover(function(){	
		$(this).find(".none").fadeIn(100);//1s淡入
		$(this).find(".arrow-icon").hide();
	},function(){	
		$(this).find(".none").stop(true).fadeOut(100);//1s淡出
		$(this).find(".arrow-icon").show();
	});
	$(".hover_tab2").hover(function(){
		_this=this;
		t=setTimeout(function(){
			$(_this).find(".none").fadeIn(100);//1s淡入
			$(_this).find(".arrow-icon").hide();
			$(_this).css({"border":"solid 1px #eee"});
		},200);
		
	},function(){
		clearTimeout(t);
		$(_this).find(".none").fadeOut(100);//1s淡出
		$(_this).find(".arrow-icon").show();
		$(_this).css("border","");
	});
    blockHover();
    /*块样式的hover事件*/ 
    function blockHover(){
    	$(".lessens ul li").hover(function(){		
		var $div1=$(this).children().eq(0);
		var $div2=$(this).children().eq(1);
		t=setTimeout(function(){
			$div1.children("i").fadeIn(500);
			$div1.children("div").animate({opacity:"0.4"},500);
			$div2.find("p").slideDown("fast","linear");
			bool1=$div2.find(".timeAndIcon").find("i").eq(1).hasClass("js-icon");
			if(bool1){
				$div2.find(".timeAndIcon").find("i").eq(1).removeClass("js-icon").text("有3755人学习");
			}else{
				$div2.find(".timeAndIcon").find("i").eq(1).removeClass("app-icon").text("有3755人学习");
			}

		},200);		
	},function(){		
			clearTimeout(t);
			var $div1=$(this).children().eq(0);
			var $div2=$(this).children().eq(1); 
			$div1.children("i").fadeOut(500);
			$div1.children("div").animate({opacity:"0"},500);
			$div2.find("p").slideUp("fast","linear");
			if(bool1){
				$div2.find(".timeAndIcon").find("i").eq(1).addClass("js-icon").text("");	
			}
			else{
				$div2.find(".timeAndIcon").find("i").eq(1).addClass("app-icon").text("");	
			}
		
	});
    } /*块样式是的hover事件结束*/
    /*列表样式的hover事件*/ 
    function listHover(){
    	$(".lessens ul li").hover(function(){
				_this=this;
				t=setTimeout(function(){
					$(_this).children().eq(0).find('i').fadeIn(500);
				    $(_this).children().eq(0).children("div").animate({opacity:"0.4"},500);},
				    200);
				
			},function(){
				clearTimeout(t);
				$(this).children().eq(0).find('i').fadeOut(500);
				$(this).children().eq(0).children("div").animate({opacity:"0"},500);
			});
    }
	
/*点击事件*/ 
//样式的变换 
	$("#close-icon").click(function(){
		$(".search-hidden").css("display","none");
	});

	$("#search-btn").click(function(){
		 $(".search-hidden").css("display","block");
		$(".search-hidden").animate({width:0+"px"},0)
		                   .animate({width:300+"px"},100)
		                   .animate({width:850+"px"},500);
	});
	$(".previewMOde .block").click(function(){
		if($(".lessens").hasClass("lesson-block")){
			return;
		}
		else{
			    $(".lessens ul li").unbind("mouseenter mouseleave");
				$(".lessens").removeClass("lesson-list");
				$(".lessens").addClass("lesson-block");
				blockHover();
				$(".lesson-block .div-two p").hide();
			}
	});
	$(".previewMOde .list").click(function(){		
		if($(".lessens").hasClass("lesson-list")){
			return;
		}
		else{
			$(".lessens ul li").unbind("mouseenter mouseleave");
			$(".lessens").removeClass("lesson-block");
			$(".lessens").addClass("lesson-list");	
			$(".div-two p").show();
			listHover();
		}
	});
	$(window).scroll( function() { 
		$(".fixed-div .top").css("display","block");
		if ($(document).scrollTop() ==0) {    //判断滚动条是否回到了顶部
			$(".fixed-div .top").css("display","none");
		}
	} );
});
