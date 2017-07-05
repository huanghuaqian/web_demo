(function($){
	isShow=false;
	$.extend($.fn,{
		tab:function(options){
			this.opts=$.extend({},$.fn.tab.defaults,options);
			this._init();
			this.disableArr=[0];

		}
	});
	$.fn.tab.prototype={
		_init:function(){
			var _this=this;
			if($(_this.opts.tabList).length>0){		
			console.log($(_this.opts.tabList).length);		
				$(_this.opts.tabList).each(function(index){
					$(this).bind({
						mouseenter:function(){
							if($.inArray(index,_this.disableArr)==-1 && $(this).attr("class").indexOf(_this.opts.tabActiveClass)==-1){							
								$(_this.opts.tabList).removeClass(_this.opts.tabActiveClass);
								$(this).addClass(_this.opts.tabActiveClass);
								showContent(index,_this.opts);
							}
						},
						 mouseleave:function(){
						 	closeContent(index,_this.opts);
						 }
					});
				});
			}
		},
		setDisable:function(index){
			var _this=this;
			if($.inArray(index,this.disableArr)==-1){
				this.disableArr.push(index);
				$(_this.opts.tabList).eq(index).addClass(_this.opts.tabDisableClass);
			}
		},
		setEnable:function(index){
			var _this=this;
			var i=$.inArray(index,this.disableArr);
			if(i>-1){
				this.disableArr.splice(i,1); //删除一位数
				$(_this.opts.tabList).eq(index).removerClass(_this.opts.tabDisableClass);

			}
		},
		triggleTab:function(index){
			$(this.opts.tabList).eq(index).triggler(this.opts.eventType);
		}
	}
	$.fn.tab.defaults={
		tabList:".tab_list li",
		contentList:".tab_content",
		tabActiveClass:"active",
		tabDisableClass:"disable",
		statusClass:"hover",
		eventType:"click",
		showType:"show",
		showSpeed:200
	};
	function showContent(index,opts){
		isShow=true;
		var _this=this;
		switch(opts.showType){
			case "show":
				$(opts.contentList+":visible").hide();
				$(opts.contentList).eq(index).show();
				$(opts.tabList).eq(index).addClass(opts.statusClass);
				isShow=false;
			    break;
			case "fade":
				$(opts.contentList+":visible").fadeOut(opts.showSpeed);
				$(opts.contentList).eq(index).fadeIn(opts.showSpeed);
				isShow=false;
				break;
			case "slide":
				$(opts.contentList+":visible").slideUp(opts.showSpeed);
				$(opts.contentList).eq(index).slideDown(opts.showSpeed);
				isShow=false;
				break;
		}
	};
	function closeContent(index,opts){
		$(opts.contentList).eq(index).hide();
		$(opts.tabList).eq(index).removeClass(opts.statusClass);
	}
})(jQuery)