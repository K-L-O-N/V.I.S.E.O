Module.register("MMM-ShowAndHind-Menu",{

	defaults : {
		menuWidth : 200,
		menuHeight : 200,
	},

	start : function(){
		Log.info("Starting module: " + this.name);
		console.log(`mouseClick : ${this.config.clickCount}`);

		var menu = [];							// 메뉴를 만들 배열
		var isMenuActivity = false;				// 메뉴 활성화를 확인할 변수
		var count=0;							// 아무런 움직임이 없는지 확인하기위함
		var width = this.config.menuWidth;
		var height = this.config.menuHeight;
		
		var $div = document.querySelector("body"); // body를 기준으로 설정

/* 		var cam = document.createElement('video');
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		
		var constraints = {auto:false, video:true};
		navigator.getUserMedia(constraints, function(stream){ 
			cam.srcObject=stream; cam.play();
			}, function(error){
				console.log(error);
			});

		$div.appendChild(cam); */

		// 바디부분이 클릭될 경우
		$div.addEventListener('click',function(){
			count = 0;
			if(!isMenuActivity){
				isMenuActivity = true;	
				// 현재 하단 모듈을 hide
				MM.getModules().withClass(['newsfeed']).enumerate(function(module){module.hide();});

				for(let i = 0; i < 2; i++){
					menu[i] = document.createElement('div');
					
					menu[i].style.position = 'absolute';	
					menu[i].style.bottom = `0%`;
					if(i == 0){ 
						menu[i].innerHTML = `옷 추천`;
						menu[i].style.left = `50%`; 
						menu[i].style.transform = 'translate(-200%, -50%)'; 
					}else {
						menu[i].innerHTML = `환경설정`;
						menu[i].style.right = `50%`; 
						menu[i].style.transform = 'translate(200%, -50%)';
					}
					menu[i].style.width = `${width}px`;
					menu[i].style.height = `${height}px`;
					menu[i].style.textAlign = 'center';
					menu[i].style.lineHeight = `${height}px`;
					menu[i].style.border = '1px solid black';
					menu[i].style.borderRadius = "10px";
					menu[i].style.boxShadow = '2px 2px 5px white, -2px -2px 5px white';
					$div.appendChild(menu[i]);
				}
				
			}
		});
	
		setInterval(function(){
			console.log(`mouseClick : ${count++}`)
			if(count > 0){
				// 하단 모듈을 show
				count=0;
				isMenuActivity = false;				
				MM.getModules().withClass(['newsfeed']).enumerate(function(module){module.show();});
				$div.removeChild(menu[0]);
				$div.removeChild(menu[1]);
			}
		}, 60000);
	},
		
});
