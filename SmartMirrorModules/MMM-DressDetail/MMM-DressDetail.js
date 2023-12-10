Module.register("MMM-DressDetail", {
	default: {
		dressCount: 3,
		defaultImgName : [],
	},
	getStyles() {
		return ["MMM-DressDetail.css"];
	},
	getScripts() {
		return [];
	},
	start: function () {
		Log.info("Starting module: " + this.name);
		this.showImgIndex = 0;
		this.imgNumber = 1;
		this.todayCalendar = "";
		this.config.defaultImgName = ["1.png", "2.png", "3.png"];
		this.imgList = this.config.defaultImgName;
/*
		setTimeout(()=>{
			if (this.showImgIndex === 0) {
				this.showImgIndex++;
				setTimeout(() => {
					let target = document.querySelector('tr');
					if (target.childNodes[2].innerText == "오늘") {
						//console.log("체크1");
						this.todayCalendar = target.childNodes[1].innerText;
						today = this.todayCalendar;
					}
				}, 5000)

				setTimeout(() => {
					//today = "결혼식";
					this.sendSocketNotification('TEST', {today});
					//console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
					//this.sendSocketNotification('DATA', {});
				}, 10000)
			}else{
				let target = document.querySelector('tr');
				if (target.childNodes[2].innerText == "오늘") {
					//console.log("체크1");
					this.todayCalendar = target.childNodes[1].innerText;
					today = this.todayCalendar;
				}
				this.sendSocketNotification('TEST', {today});
			}
		},3*60*1000)
*/

	},
	getDom: function () {
		const wrapper = document.createElement("div");
		// 리로드 방법 찾기 및 캘린더에서 문자열 추출 및 이미지 갱신되도록 시도

		//console.log(this.imgList);
		let today;

		if (this.showImgIndex === 0) {
			this.showImgIndex++;
			setTimeout(() => {
				let target = document.querySelector('tr');
				if (target.childNodes[2].innerText == "오늘") {
					//console.log("체크1");
					this.todayCalendar = target.childNodes[1].innerText;
					today = this.todayCalendar;
				}
			}, 5000)

			setTimeout(() => {
				//today = "결혼식";
				this.sendSocketNotification('TEST', {today});
				//console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
				//this.sendSocketNotification('DATA', {});
			}, 10000)
		}

/*
		else{
			let target = document.querySelector('tr');
			if (target.childNodes[2].innerText == "오늘") {
				//console.log("체크1");
				this.todayCalendar = target.childNodes[1].innerText;
				today = this.todayCalendar;
			}
			this.sendSocketNotification('TEST',{today})
		}

*/
/*
                        setTimeout(() => {
                                let target = document.querySelector('tr');
                                if (target.childNodes[2].innerText == "오늘") {
                                        //console.log("체크1");
                                        this.todayCalendar = target.childNodes[1].innerText;
                                        today = this.todayCalendar;
                                }
                        }, 5000)

                        setTimeout(() => {
                                //today = "결혼식";
                                this.sendSocketNotification('TEST', {today});
                                //console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::$
                                //this.sendSocketNotification('DATA', {});
                        }, 10000)
*/

		let container;

		if(wrapper.hasChildNodes()){
			wrapper.removeChild(container);
		}

		container=this.createField(this.imgList);
		//console.log(container);
		wrapper.appendChild(container);
		return wrapper;
	},
	socketNotificationReceived: function (notification, payload) {
		if(notification ==='STRING'){
			//console.log("::22222222222222222::::::::::::::::::::::::::")
			//console.log(payload)
			//console.log(`helper로부터  ${payload.imgName}를 받았습니다.`)
			this.imgList = payload.imgName;
			//console.log(this.imgList);
			this.updateDom();
		}

		if (notification === "CHECK") {
			//console.log(payload)
			//console.log(`helper로부터  ${payload.imgName}를 받았습니다.`)
			this.imgList = payload.imgName1;
			//console.log(this.imgList);
			this.updateDom();
		}

	},

	createField: function (imgArray) {

		// 최상위 박스
		let container = document.createElement("div");
		container.classList.add("contain");

		// 이미지를 담는 박스
		let blockBox = document.createElement("div");
		blockBox.className = "block box";

		let img = document.createElement("img");
		img.className = "img";
		img.src = `modules/MMM-DressDetail/img/${imgArray[this.imgNumber-1]}`
		blockBox.appendChild(img);

		// 이전버튼용
		let preBtn = document.createElement("div");
		preBtn.innerText = "◁";
		preBtn.className = "inline box";
		preBtn.addEventListener('click', () => {
			if (this.imgNumber == 1) {
				this.imgNumber=3;
			} else {
				//console.log("이전버튼이 클릭되었습니다.");
				this.imgNumber--;
			}
			this.updateDom();
		})

		// 몇번째 이미지인지 출력하기 위한 태그
		let content = document.createElement("div");
		content.innerText = `추천 ${this.imgNumber}`;
		content.className = "inline box";

		// 다음버튼용
		let nextBtn = document.createElement("div");
		nextBtn.innerText = "▷";
		nextBtn.className = "inline box";
		nextBtn.addEventListener('click', () => {
			if (this.imgNumber == 3) {
				this.imgNumber=1;
			} else {
				//console.log("다음버튼이 클릭되었습니다.");
				this.imgNumber++;
			}
			this.updateDom();
		})

		container.appendChild(preBtn);
		container.appendChild(content);
		container.appendChild(nextBtn);

		container.appendChild(blockBox);
		return container;
	}
});
