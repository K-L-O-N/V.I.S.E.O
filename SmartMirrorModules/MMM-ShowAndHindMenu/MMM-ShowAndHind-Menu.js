Module.register("MMM-ShowAndHind-Menu",{

	config:null,	
	
	defaults : {
		width: 200,													// 초기 가로 길이
		height: 200,												// 초기 세로 길이
		menuCount : 3,												// 클릭시 발생하는 첫 메뉴의 개수
		mainMenuText : ["dress", "weather", "option"],				// 메뉴에 들어갈 텍스트
		itemCount: [2,1,1],											// 메뉴별 항목의 초기 개수
		//message : "default message if none supplied in config.js",
	},	

	start : function(){
		Log.info("Starting module: " + this.name);

		// 자주 사용하기 위해서 세팅
		const menuWidth = this.config.width;
		const menuHeight = this.config.height;
		const menuCount = this.config.menuCount; 
		const menuContext = this.config.mainMenuText;
		const itemCount = this.config.itemCount;

		// set target
		let $body = document.querySelector("body");
		let mainMenu = [];
		let subMenu = [];
		let showSubMenu = [3];		
	
		let isMenu = false;			// 초기 메뉴의 활성화 여부를 확인하기 위한 변수
		let isMenuActive = false;		// 각 메뉴를 사용하고 있는지 확인하기 위한 함수
		
		let subMenuContainer;			// 메뉴의 아이템을 띄우는 공간을 만들어주기 위한 변수
		let subMenuItemCount;			// 클릭된 메뉴의 아이템의 개수를 파악하기 위한 변수
		let next;						// 다음 버튼 생성용 변수
		let prev;

		console.log(itemCount);
		/** 
		 * 화면에 나오는 모듈을 숨기는 함수
		 * @param {string} moduleName 숨기고자하는 모듈의 이름 작성  
		 */
		function hind(moduleName){	// module hind
			MM.getModules().withClass([`${moduleName}`]).enumerate(function(module){module.hide();});
		}

		/** 
		 * 화면에 숨겨진 모듈을 보여주는 함수
		 * @param {string} moduleName 보여주고자 하는 모듈의 이름 작성  
		 */
		function show(moduleName){	// module show
			MM.getModules().withClass([`${moduleName}`]).enumerate(function(module){module.show();});
		}

		/**
		 * 마우스 커서 설정
		 */
		function setCursor(obj, mouseCursor){
			obj.style.cursor = `${mouseCursor}`;
		}

/*
		function showListReserch(x){
			for(let i = 0; i < parseInt(x); i++){
				showSubMenu[i] = subMenu[`${i+x}`];
			}
			for(let i = 0; i < 3; i++){
				showSubMenu[i].style.top = `50%`;
				showSubMenu[i].style.left = `(75-${25*i})%`;
				showSubMenu[i].style.transfrom = `translate(-50%, -50%)`;
				$body.appendChild(showSubMenu[i]); 	
			}
		}
*/

		/**
		 * 메뉴를 생성하는 데 필요한 div를 만들기 위한 함수
		 * @param {string} context 메뉴에 표시될 문자열
		 * @param {number} width 메뉴의 가로 크기
		 * @param {number} height 메뉴의 세로 크기
		 */
		function createDiv(context, width, height){	
			var div = document.createElement('div');
			div.innerHTML = `${context}`;
			div.style.position = 'absolute';
			div.style.width = `${width}px`;
			div.style.height = `${height}px`;
			div.style.textAlign = 'center';
			div.style.lineHeight = `${height}px`;
			div.style.border = '5px solid white';
			div.style.borderRadius = '10px';
			div.style.onmouseover= `${setCursor(div,'pointer')}`;
			return div;
		}

		/**
		 * 초기 메뉴를 제거하는 함수
		 * 메뉴 활성화 여부 true -> false / 자식객체 삭제
		 */
		function hindMenu(){					// delete menu item
			isMenu = false;
			show('newsfeed');
			for(let i = 0; i< menuCount; i++){
				$body.removeChild(mainMenu[i]);		
			}
		}

		/**
		 * 메뉴의 아이템을 제거하는 함수
		 * 메뉴 활성화 여부 true -> false / 자식객체 삭제 
		 */
		function hindSubMenu(index){				
			isMenuActive = false;
			show('calendar');
			show('clock');
			show('weather');
			show('MMM-AirQuality');		

			$body.removeChild(next);
			$body.removeChild(prev);

			for(let i = 0; i< itemCount[parseInt(index)]; i++){
				//subMenuContainer.removeChild(subMenu[i]);

				$body.removeChild(subMenu[i]);
			}
	
			console.log(subMenu);
			console.log("index"+index)
			//$body.removeChild(subMenuContainer);	
		}
		
		/**
		 * 메뉴를 생성
		 */
		function createMenu(){
			if(!isMenu && !isMenuActive){
				isMenu = true;
				hind('newsfeed');
				for(let i = 0; i< menuCount; i++){
					// make menu
					mainMenu[i] = createDiv(menuContext[i],menuWidth,menuHeight);
					mainMenu[i].style.top = '90%';
					if(menuCount == 2){
						mainMenu[i].style.left = `${25 + i*50}%`;
					}else if(menuCount == 3){
						mainMenu[i].style.left = `${25 + i*25}%`;
					}else{
						mainMenu[i].style.left = '50%';
					}
					mainMenu[i].style.transform = 'translate(-50%,-50%)';
					mainMenu[i].addEventListener('click',function(){ // subMenuEvent 
						subMenuEvent(i);
					},false);  
					$body.appendChild(mainMenu[i]);
				}
			}
		}
			
		/**
		 * 서브 메뉴를 생성
		 * @param {number} index 해당 메뉴에서 보여줘야 할 아이템 개수
		 */	
		function subMenuEvent(index){
			hindMenu();
			isMenuActive = true;
			
			subMenuItemCount = index;

			/*
			subMenuContainer = createDiv('container', 700,700);
			subMenuContainer.style.top = '50%';
			subMenuContainer.style.left = '50%';
			subMenuContainer.style.transform = 'translate(-50%,-50%)';
			*/

			//$body.appendChild(subMenuContainer);

			for(let i = 0; i < itemCount[parseInt(index)]; i++){
				subMenu[i] = createDiv(i,menuWidth,menuHeight);
				subMenu[i].style.top = `${50}%`;
				if(itemCount[parseInt(index)] == 2){
					subMenu[i].style.left = `${50 - i*25}%`;
				}else{
					subMenu[i].style.left = '50%';
				}
				subMenu[i].style.transform = `translate(-50%,-50%)`;
				//subMenuContainer.appendChild(subMenu[i]);
				$body.appendChild(subMenu[i]);
			}			

/*
			for(let i = 0; i < itemCount[parseInt(index)]; i++){
				subMenu[i] = createDiv(i,menuWidth,menuHeight);
			}
			
			showListReserch(0);
*/

			next = createDiv('next' , 100,100);
			next.style.top = '50%';
			next.style.left = '90%';
			next.style.transform = `translate(-50%,-50%)`;
			next.addEventListener('click',function(){ // subMenuEvent 
						console.log('next click');
					},false);  

			prev = createDiv('prev' , 100,100);
			prev.style.top = '50%';
			prev.style.left = '10%';
			prev.style.transform = `translate(-50%,-50%)`;
			prev.addEventListener('click',function(){ // subMenuEvent 
						console.log('prev click');
					},false); 
			
			$body.appendChild(next);
			$body.appendChild(prev);

			hind('calendar');
			hind('clock');
			hind('weather');
			hind('MMM-AirQuality');
		}

		$body.addEventListener('click', createMenu, false);
		
		// keycode => 27 (ESC) 
		window.addEventListener('keydown', (e) =>{
			if(e.keyCode == 27 && isMenu) {
				hindMenu();
			}
			else if(e.keyCode == 27 && isMenuActive) {
				hindSubMenu(subMenuItemCount);
				createMenu();
			}
		});
	
		// 30초간 아무런 움직임이 없을 때, 메뉴가 활성화 되어 있다면 해당 메뉴를 제거
		setInterval(function(){
			if(isMenu) hindMenu();
			if(isMenuActive) hindSubMenu(subMenuItemCount);
		}, 60000); 
	},

	notificationReceived: function(notification, payload, sender){
		//if(notification ==="All modules started!") this.sendSocketNotification("CONFIG",this.config);
		//if(sender) Log.log(this.name + " received a module notification: " + notification + " form sender: " + sender.name + " check : " + payload);
		//else Log.log(this.name + "received a system notification: " + notification);
	},

	socketNotificationReceived: function (notification, payload) {
/*		Log.log(this.name + " received a socket notification: " + notification + " - payload: " +  payload);
		switch(notification){
			case "message_from_helper":
				this.config.message = payload;
				this.updateDom(1000);
				break;
		}
*/
	},		
});