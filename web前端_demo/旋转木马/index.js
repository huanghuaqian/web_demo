$(document).ready(function(){
	$(window).load(function(){	
		minHeight();
		var dataImg={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"}]};
		$(window).scroll(function(){
             if(isScroll()){
             	//加载图片
             	//console.log("gun");
             	 $.each(dataImg.data,function(index,value){
             	 	var wrapper=$(".wrapper");
             	 	var box=$("<div class='box'>").appendTo(wrapper);
             		var content=$("<div class='content'>").appendTo(box);
             	 	$("<img>").attr('src','images/'+value.src).appendTo(content);
             	   console.log(value.src);
             	 });
             	minHeight();
             }
		});
	});
});
//判断是否允许滚动
function isScroll(){
	var box=$(".box");
	var offHeight=box[box.size()-1].offsetTop+$(box[box.size()-1]).width()/2;
	console.log(offHeight);
	var scrollHeight=$(window).height()+$(window).scrollTop();
	//console.log($(document).height());
	return (scrollHeight>offHeight)?true:false;
}
function minHeight(){
	var box=$(".box");
	var boxWidth=box.eq(0).width();
	var rowBoxNum=Math.floor($(window).width()/boxWidth); //一行的图片数
	//console.log(rowBoxNum);
	var hArr=[];
	box.each(function(inx,val){
		//console.log(inx+"---"+$(val));
		if(inx<rowBoxNum){
			hArr[inx]=$(val).height();//第一行中图片的高度
			//console.log(hArr[inx]);
		}else{
			var minH=Math.min.apply(null,hArr);
			var minHeightIndex=$.inArray(minH,hArr);
			$(val).css({
				'position':'absolute',
				'left':box.eq(minHeightIndex).position().left+"px",//boxWidth*(minHeightIndex)+"px",
				'top':minH+"px"
			});
			hArr[minHeightIndex]+=$(val).height();
		}

	});
}