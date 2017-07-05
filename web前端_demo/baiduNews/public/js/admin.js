$(document).ready(function(){
	var $newstable=$("#newstable tbody");
	refreshNews();//刷新新闻列表
	
	/*
	添加新闻
	*/
	//读取添加新闻的内容
	$("#submit").click(function(e){
		e.preventDefault();
		//判断输入是否为空
		if($("#newstitle").val()=="" || $("#newsimg").val()=="" || $("#newssrc").val()=="" || $("#newstime").val()==""){
			if($("#newstitle").val()=="" ){
				$("#newstitle").parent().addClass("has-error");
			}else{
				$("#newstitle").parent().removeClass("has-error"); 
			}
			if($("#newsimg").val()=="" ){
				$("#newsimg").parent().addClass("has-error");
			}else{
				$("#newsimg").parent().removeClass("has-error"); 
			}
			if($("#newssrc").val()=="" ){
				$("#newssrc").parent().addClass("has-error");
			}else{
				$("#newssrc").parent().removeClass("has-error"); 
			}
			if($("#newstime").val()=="" ){
				$("#newstime").parent().addClass("has-error");
			}else{
				$("#newstime").parent().removeClass("has-error"); 
			}			
		}else{
	    //提交新闻
		    var newsdata={
		    	'newstitle':$('#newstitle').val(),
		    	'newsimg':$('#newsimg').val(),
		    	'newssrc':$('#newssrc').val(),
		    	'newstype':$('#newstype').val(),
		    	'newstime':$('#newstime').val()
		    }
		    $.ajax({
		    	url:"admin/insertnews",
		    	type:"post",
		    	data:newsdata,
		    	datatype:'json',
		    	success:function(data){
		    		console.log(data);
		    		refreshNews();
		    	}
		    }); 
		}

	});

	/*
	删除新闻
	*/
	var deleteId=null;
	$newstable.on('click','.btn-danger',function(e){
		$('#deleteModal').modal('show');
		deleteId=$(this).parent().prevAll().eq(5).html();	
	});
	$('#deleteModal #confirmDelete').click(function(e){
		if (deleteId) {
			$.ajax({
				url:"admin/deletenews",
				type:"post",
				data:{newsid:deleteId},
				datatype:'json',
				success:function(data){
					$('#deleteModal').modal('hide');
					refreshNews();
				}
			});

		}
	});

	/*
	显示编辑模态框
	*/
	var updateId=null;
	$newstable.on('click','.btn-primary',function(e){
		$('#updataModal').modal('show');
		updateId=$(this).parent().prevAll().eq(5).html();
		console.log('sendupdateId=='+updateId);
		if (updateId) {
			$.ajax({
				url:"/admin/curnews",
				type:"get",
				data:{id: updateId},
				datatype:'json',
				success:function(data){
					$('#unewstitle').val(data[0].newstitle);
					$('#unewstype').val(data[0].newstype);
					$('#unewsimg').val(data[0].newsimg);
					$('#unewssrc').val(data[0].newssrc);
					var utime=data[0].newstime.split("T")[0];
					$('#unewstime').val(utime);
					console.log('utime==='+utime);
				}
			});
		}
    });

	/*
	编辑确定后更新
	*/
    $('#updataModal #confirmUpdata').click(function(e){
    	if (updateId) {
			$.ajax({
				url:"/admin/updatenews",
				type:"post",
				data:{
					newstitle:$('#unewstitle').val(),
					newstype:$('#unewstype').val(),
					newsimg:$('#unewsimg').val(),
		      		newssrc:$('#unewssrc').val(),					
					newstime:$('#unewstime').val(),
					newsid:updateId
				},
				datatype:'json',
				success:function(data){
					console.log("after update...");
					$('#updataModal').modal('hide');
					refreshNews();
				}
			});
		}
    });

    /*
	刷新显示新闻
    */
	function refreshNews(){
		$newstable.empty();

		$.ajax({
			url:"/admin/getnews",
			type:"get",
			data:{
				newstype:""
			},
			datatype:"json",
			success:function(data){
				$.each(data,function(index,value){
					var $row=$("<tr></tr>");
					var $newsid=$("<td>").html(value.id);
					var $newstype=$("<td></td>").html(value.newstype);
					var $newstitle=$("<td></td>").html(value.newstitle);
					var $newsimg=$("<td></td>").html(value.newsimg);
					var $newstime=$("<td></td>").html(value.newstime);
					var $newssrc=$("<td></td>").html(value.newssrc);
					var $btn=$("<td>");
					var $btnedit=$("<button>").addClass("btn btn-primary btn-xs").html("编辑");
					var $btndelete=$("<button>").addClass("btn btn-danger btn-xs").html("删除");
					$btn.append($btnedit,$btndelete);
					$row.append($newsid,$newstype,$newstitle,$newsimg,$newstime,$newssrc,$btn);
					$newstable.append($row);
				});
			}
		});
	}
})