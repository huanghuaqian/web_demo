$(document).ready(function(){
	var cur=0;
	var $article=$("article");
	refresh("精选");	
	$("nav a").click(function(e){
		e.preventDefault;
		var type=$(this).text();
		refresh(type);
	})
	function refresh(type){
		
		$("#newslist").empty();
		//解除“更多”按钮绑定的点击事件
		$article.off('click','.more');
		// 当前显示的新闻条目
		cur=3;
		$.ajax({
			url:'/news',
			type:'get',
			data:{newstype:type},
			datatype:'json',
			success:function(data){
				$.each(data,function(index,value){
					var $lists=$("article .news-lists");
					var $list=$("<li></li>").addClass("news-list").appendTo($lists);
					var $newsimg=$("<div></div>").addClass("newsimg").appendTo($list);
					var $img=$("<img></img>").attr("src",value.newsimg).appendTo($newsimg);
					var $newstxt=$("<div></div>").addClass("newstxt").appendTo($list);
					var $h1=$("<h2></h2>").html(value.newstitle).appendTo($newstxt);
					var $p=$("<p></p>").appendTo($newstxt);
					var $newstime=$("<span></span>").addClass("newstime").html(value.newstime).appendTo($p);
					var $newssrc=$("<span></span>").addClass("newssrc").html(value.newssrc).appendTo($p);
				});
				// moreEvent();
			}
		});
	}
	function moreEvent(){
		if($("#newslist li").length>=cur){
					$("<div>").addClass("more").text("更多").appendTo($article);
					$("#newslist li:gt(3)").hide();
					//绑定点击事件				
					$article.on('click','.more',function(e){
						e=e||window.event;
						e.stopPropagation();
						for(var i=0;i<4;i++){
							if(cur>=$("#newslist li").length){
								break;
							}					
							cur++;
							$("#newslist li").eq(cur).show();
						}					
					});
				}else{
					$("article div.more").remove();
				}
	}
})
