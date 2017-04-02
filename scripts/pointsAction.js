function pointsAction(){
	input1 = [];//存放正要输入的手势密码
	input2 = [];//存放第二遍设置密码时第一次输入的

//在上层canvas上绑定触摸事件
	c2.addEventListener("touchstart",function(event){
		var po = getPosition(event);
		for(var i=0;i<points.length;i++){
			//检测触摸点是否在解锁点内，若是解锁点，改变样式，并将该点添加至input队列
				if(Math.abs(po.x-points[i].x)<r && Math.abs(po.y-points[i].y)<r){
				selectPoint(i);
				break;
			}
		}
	},false);

	c2.addEventListener("touchmove",function(event){
		event.preventDefault();
		var po = getPosition(event);
		for(var i=0;i<9;i++){
			//新选中解锁点后，更新input1并将新的轨迹边画在底层canvas
			if(Math.abs(po.x-points[i].x)<r && Math.abs(po.y-points[i].y)<r && points[i].tag == 0){
				selectPoint(i);
				var length = input1.length;
				if(length>1){//确定不是选中的第一个点时，在底层canvas上画出边
					var former_x = input1[length-2].x;
					var former_y = input1[length-2].y;
					var latter_x = input1[length-1].x;
					var latter_y = input1[length-1].y;
					ctx1.beginPath();
					ctx1.moveTo(former_x , former_y);
					ctx1.lineTo(latter_x , latter_y);
					ctx1.lineWidth = 2;
					ctx1.strokeStyle = "#d02806";
					ctx1.stroke();
				}
				break;
			}
		 }
		//通过反复擦除顶层canvas画布并划线以达到轨迹跟踪
		ctx2.clearRect(0,0,c2.width,c2.height);
		if(input1.length){
			ctx2.beginPath();
			ctx2.moveTo(input1[input1.length-1].x , input1[input1.length-1].y);
			ctx2.lineTo(po.x,po.y);//顶层画布显示最近确认的解锁点到触摸点的连线
			ctx2.lineWidth = 2;
			ctx2.strokeStyle = "#d02806";
			ctx2.stroke();
		}

	}, false);

	c2.addEventListener("touchend",function(event){
		if(input1.length){
			ctx2.clearRect(0,0,c2.width,c2.width);
			setAndCheck();//手指离开屏幕时触发设置或验证逻辑
		}
	},false);
}

function selectPoint(i){
	//为被选中的解锁圆改变样式
	ctx1.beginPath();
	ctx1.arc(points[i].x,points[i].y,r,0,2*Math.PI);
	ctx1.lineWidth = 2;
	ctx1.strokeStyle = "#ff5a00";
	ctx1.stroke();
	ctx1.fillStyle = "#ff9900";
	ctx1.fill();
	points[i].tag = 1;//标识为1时表示该点已选，不能重复选择一个解锁点
	input1.push({x:points[i].x, y:points[i].y});
}

function getPosition(event){
	var rect = c2.getBoundingClientRect();
        var po = {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top
        };
        return po;
 }

addLoadEvent(pointsAction);

