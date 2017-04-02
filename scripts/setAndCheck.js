function setAndCheck(){
	//验证输入的密码是否合法，不合法则更新画板
	if(input1.length<5){
		prompt.innerText = "密码太短，至少需要5个点";
		input1.length = 0;
		ctx2.clearRect(0,0,c2.width,c2.height);
		ctx1.clearRect(0,0,c1.width,c1.height);
		initialCanvas();
		return;
	}
	//输入合法，检测目的
	var radio = document.getElementsByTagName("input");
	for(var i = 0;i < radio.length; i++){
		if(radio[i].checked){
			var radioState = radio[i].getAttribute("value");
			break;
		}
	}

	//输入合法时设置密码
	if(radioState == "set"){
		if(input2.length){//第二次输入
			if(compare(input1,input2)){
				prompt.innerText = "密码设置成功";
				localStorage.psw = JSON.stringify(input2);//保存密码
				initial();
				return;
			}else{
				prompt.innerText = "两次输入的不一致，请重新设置";
				initial();
				return;
			}

		}else{//第一次输入
			input2 = input1.concat();
			prompt.innerText = "请再次输入手势密码";
			input1.length = 0;
			ctx2.clearRect(0,0,c2.width,c2.height);
			ctx1.clearRect(0,0,c1.width,c1.height);
			initialCanvas();
			return;			

		}		
	}
	//输入合法时验证密码
	if(radioState == "check"){
		if(!localStorage.psw){
			prompt.innerText = "未设置密码，请先设置密码";
			initial();
			radio[1].checked = true;
			return;
		}else{
			if(compare(JSON.parse(localStorage.psw),input1)){
				prompt.innerText = "密码正确！";
				initial();
				return;
			}else{
				prompt.innerText = "输入的密码不正确";
				initial();
				return;
			}
		}
	}
			
}

function initial(){
	input1.length = 0;
	input2.length = 0;
	setTimeout(function(){
		ctx1.clearRect(0,0,c1.width,c1.height);
		initialCanvas();
		initialPrompt();
	},1500);
	
}

function compare(arr1,arr2){//比较两个对象数组是否相同
	if(arr1.length!=arr2.length) return false;
	for(var i=0;i<arr1.length;i++){
		if (arr1[i].x!=arr2[i].x || arr1[i].y!=arr2[i].y) {
			return false;
		}
	}

	return true;
}

