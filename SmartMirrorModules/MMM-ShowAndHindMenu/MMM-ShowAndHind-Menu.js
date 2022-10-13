Module.register("MMM-ShowAndHind-Menu", {

	config: null,

	defaults: {
		width: 200, // 초기 가로 길이
		height: 200, // 초기 세로 길이
		menuCount: 3, // 클릭시 발생하는 첫 메뉴의 개수
		mainMenuText: ["dress", "weather", "option"], // 메뉴에 들어갈 텍스트
		itemCount: [2, 1, 1], // 메뉴별 항목의 초기 개수
		//message : "default message if none supplied in config.js",
	},

	getStyles: function () {
		return ["MMM-ShowAndHind-Menu.css"];
	},

	getScripts: function() {
		return [
			'functions.js'	
		];
	},

	start: function () {
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

		let isMenu = false; 	// 초기 메뉴의 활성화 여부를 확인하기 위한 변수
		let isMenuActive = false; // 각 메뉴를 사용하고 있는지 확인하기 위한 함수

		let subMenuContainer; 	// 메뉴의 아이템을 띄우는 공간을 만들어주기 위한 변수 - 일단 현재는 필요가 없음
		let subMenuItemCount; 	// 클릭된 메뉴의 아이템의 개수를 파악하기 위한 변수
		let next; 				// 다음 버튼 생성용 변수
		let prev;

		let ripples; 			// 마우스 클릭 시 물결을 표시하기 위한 변수

		console.log(itemCount);
		/**
		 * 초기 메뉴를 제거하는 함수
		 * 메뉴 활성화 여부 true -> false / 자식객체 삭제
		 */
		function hindMenu() { // delete menu item
			isMenu = false;
			show('newsfeed');
			for (let i = 0; i < menuCount; i++) {
				$body.removeChild(mainMenu[i]);
			}
		}

		/**
		 * 메뉴의 아이템을 제거하는 함수
		 * 메뉴 활성화 여부 true -> false / 자식객체 삭제 
		 * @param {string} index 서브 메뉴의 아이템 수를 문자열로 가져옴
		 */
		function hindSubMenu(index) {
			isMenuActive = false;
			show('calendar');
			show('clock');
			show('weather');
			show('MMM-AirQuality');

			$body.removeChild(next);
			$body.removeChild(prev);

			for (let i = 0; i < itemCount[parseInt(index)]; i++) {
				//subMenuContainer.removeChild(subMenu[i]);
				$body.removeChild(subMenu[i]);
			}

			console.log(subMenu);
			console.log("index" + index)
			//$body.removeChild(subMenuContainer);	
		}

		/**
		 * 메뉴를 생성
		 */
		function createMenu() {
			if (!isMenu && !isMenuActive) {
				isMenu = true;
				hind('newsfeed');
				for (let i = 0; i < menuCount; i++) {
					// make menu
					mainMenu[i] = createDiv(menuContext[i], menuWidth, menuHeight);
					mainMenu[i].style.top = '90%';
					if (menuCount == 2) {
						mainMenu[i].style.left = `${25 + i*50}%`;
					} else if (menuCount == 3) {
						mainMenu[i].style.left = `${25 + i*25}%`;
					} else {
						mainMenu[i].style.left = '50%';
					}
					mainMenu[i].style.transform = 'translate(-50%,-50%)';
					mainMenu[i].addEventListener('click', function () { // subMenuEvent 
						subMenuEvent(i);
					}, false);
					$body.appendChild(mainMenu[i]);
				}
			}
		}

		/**
		 * 서브 메뉴를 생성
		 * @param {number} index 해당 메뉴에서 보여줘야 할 아이템 개수
		 */
		function subMenuEvent(index) {
			hindMenu();
			isMenuActive = true;
			subMenuItemCount = index;

			let showItemIndex = 0;		// 현재 중앙에 보여주고 있는 아이템의 인덱스 번호
			let clickOption = 1;		// 현재 클릭한 옵션이 무엇인지 확인하기 위한 변수 next => 양수 / prev => 음수

			/*
			subMenuContainer = createDiv('container', 700,700);
			subMenuContainer.style.top = '50%';
			subMenuContainer.style.left = '50%';
			subMenuContainer.style.transform = 'translate(-50%,-50%)';
			*/

			//$body.appendChild(subMenuContainer);

			for (let i = 0; i < itemCount[parseInt(index)]; i++) {
				subMenu[i] = createDiv(i, menuWidth, menuHeight);
				subMenu[i].style.top = `${50}%`;
				if (i == 2){
					subMenu[i].style.left = `${75 - i*25}%`;
				}else if (i == 1) {
					subMenu[i].style.left = `${75 - i*25}%`;
				} else {
					subMenu[i].style.left = '75%';
				}
				subMenu[i].style.transform = `translate(-50%,-50%)`;
				//subMenuContainer.appendChild(subMenu[i]);

/* 				
				// 현재 테스트 중임 아래 방법으로는 안움직임
				const keyframe = document.createElement('style');
				keyframe.innerHTML = `  
					@keyframes move {
						0% {
							left = ${subMenu[i].style.left}%;
						}
						100% {
							left = ${subMenu[i].style.left} + 25 * ${clickOption}%;
						}
					}`;

				subMenu[i].appendChild(keyframe);
				subMenu[i].animation = 'move 1s linear'; */

				$body.appendChild(subMenu[i]);
			}

			/*
			for(let i = 0; i < itemCount[parseInt(index)]; i++){
				subMenu[i] = createDiv(i,menuWidth,menuHeight);
			}
						
			showListReserch(0);
			*/


			next = createDiv('next', 100, 100);
			next.style.top = '50%';
			next.style.left = '90%';
			next.style.transform = `translate(-50%,-50%)`;

			next.addEventListener('click', function () { // subMenuEvent 
				if(itemCount[parseInt(index)] >= showItemIndex){
					console.log('다음으로 넘어갈 수 있음');
					console.log(subMenu[showItemIndex].style.left);
					subMenu[showItemIndex].style.left += '25%';
					showItemIndex++;
					clickOption = 1;
				}else{
					console.log('다음으로 갈 수가 없음');
				}
			}, false);

			prev = createDiv('prev', 100, 100);
			prev.style.top = '50%';
			prev.style.left = '10%';
			prev.style.transform = `translate(-50%,-50%)`;
			prev.addEventListener('click', function () { // subMenuEvent 
				console.log('prev click');
				if(itemCount[parseInt(index)] >= showItemIndex && showItemIndex >= 0){
					console.log('이전으로 갈 수 있음');
					showItemIndex--;
					clickOption = -1;
					subMenu[showItemIndex].style.left -= '25%';
				}else{
					console.log('이전으로 갈 수가 없음');
				}
			}, false);
			
			console.log("showItemIndex : "+showItemIndex);
			$body.appendChild(next);
			$body.appendChild(prev);

			hind('calendar');
			hind('clock');
			hind('weather');
			hind('MMM-AirQuality');
		}


		$body.addEventListener('click', createMenu, false);

		// keycode => 27 (ESC) 
		window.addEventListener('keydown', (e) => {
			if (e.keyCode == 27 && isMenu) {
				hindMenu();
			} else if (e.keyCode == 27 && isMenuActive) {
				hindSubMenu(subMenuItemCount);
				createMenu();
			}
		});

		// 30초간 아무런 움직임이 없을 때, 메뉴가 활성화 되어 있다면 해당 메뉴를 제거
		setInterval(function () {
			if (isMenu) hindMenu();
			if (isMenuActive) hindSubMenu(subMenuItemCount);
		}, 60000);
	},


	notificationReceived: function (notification, payload, sender) {
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