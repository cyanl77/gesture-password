function initialCanvas(){
	if(!document.getElementById) return false;
	if(!document.getElementById("background")) return false;
	if(!document.getElementsByTagName) return false;
	//两个canvas分层叠放，background层用来保存初始原样和已选路径，painting层响应touch事件并不断更新轨迹
	c1 = document.getElementById("background");
	ctx1 = c1.getContext("2d");
	c2 = document.getElementById("painting");
	ctx2 = c2.getContext("2d");
	console.log(document.body.clientWidth);//发现第一次打开时数值与网页本身宽度不符，未解决T T
	if(document.body.clientWidth<462){//这里依据网页可见区域大小来调整画布宽度
		c1.width = 0.65*document.body.clientWidth;
		c2.width = 0.65*document.body.clientWidth;
	}else{//屏宽大于462时，画板保持300px宽度不变
		c1.width = 300;
		c2.width = 300;
	}
	c1.height = c1.width;
	c2.height = c2.width;
	r =  parseInt(c1.width)/12;//将画布宽高分为12等分，每份为半径长度
	var center_x = r * 2;
	var center_y = r * 2;
	points = [];//存放九个点的圆心位置信息
	var k = 0;
	//底层canvas上循环画出九个初始解锁点
	for(var i=0; i<3; i++){ 
		for(var n=0;n<3;n++){
			ctx1.beginPath();
			ctx1.arc(center_x,center_y,r,0,2*Math.PI);
			ctx1.lineWidth = 2;
			ctx1.strokeStyle = "#bbbbbb";
			ctx1.stroke();
			ctx1.fillStyle = "#ffffff";
			ctx1.fill();
			points[k]={x: center_x , y: center_y , tag : 0};
			k++;
			center_x = center_x + 4 * r;
		}
		center_y = center_y + 4 * r;
		center_x = r * 2;		
	}


}
//提示信息初始化
function initialPrompt(){
	prompt = document.getElementById("prompt");
	prompt.innerText = "请输入手势密码";
}


//当窗口大小改变时重新初始化画板以更新九个点的坐标
window.onresize = function(){
	initialCanvas();
}

addLoadEvent(initialCanvas);
addLoadEvent(initialPrompt);