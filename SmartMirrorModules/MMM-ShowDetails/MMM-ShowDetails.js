Module.register("MMM-ShowDetails", {
  defaults: {
    hindStyle: "all", //options: "one", "all" 
    defaultModuleCount: 8 // length기준으로 설정  
  },
  getStyles: function () {
    return [
      "MMM-ShowDetails.css"
    ];
  },
  getScripts: function () {
    return [
      "ShowHindeModule.js",
      "Stack.js"
    ];
  },
  start: function () {
    Log.info("Starting module: " + this.name);

    this.loadCount = 0;
    this.hindStyle = this.config.hindStyle;
    this.defaultModuleCount = this.config.defaultModuleCount;
  },
  getDom: function () {
    const wrapper = document.createElement("div"); // 테스트용
    wrapper.classList.add("wrapperTest");
    wrapper.addEventListener('click', () => {
      let testDiv = document.createElement("div");
      testDiv.className = "testDiv";
      wrapper.appendChild(testDiv);
    });

    if (this.loadCount == 0) {
      /**
       * 모듈의 정보를 담을 배열들을 선언
       */
      let mouduleStatus = [];
      let moduleId = [];
      let mouduleName = [];

      let defaultModuleList = []; // 기본적으로 사용되는 모듈로 생성한 객체를 담을 배열 선언
      let detailModuleList = []; // 상세정보에 사용되는 모듈로 생성된 객체를 담는 배열 선언

      /**
       * 각 배열에 맞는 값을 추가
       */
      mouduleStatus = MM.getModules().map(e => e.hidden); // false -> 활성화 상태를 의미 
      moduleId = MM.getModules().map(e => e.identifier);
      mouduleName = MM.getModules().map(e => e.name);

      console.log(this.defaultModuleCount);
      
      // 접근에 용이하기 위해 하나의 객체로 만든 뒤 배열로 push
      for (let i = 0; i < this.defaultModuleCount; i++) {
        let target = document.getElementById(moduleId[i]);
        let obj = {
          "id": moduleId[i],
          "name": mouduleName[i],
          "status": mouduleStatus[i],
          "target": target,
          "detail": null
        }
        defaultModuleList.push(obj);
      }

      // [기본으로 보유하는 모듈]각 객체에 이벤트 리스너를 추가
      for (let i = 0; i < defaultModuleList.length; i++) {
        if (defaultModuleList[i].target != null) {
          defaultModuleList[i].target.addEventListener('click', () => { // 해당 객체에 클릭 이벤트 리스너를 추가
            console.log(this.hindStyle);
            // 클릭한 친구만 숨기고 싶은 경우
            if (this.hindStyle === "one") {
              if (!defaultModuleList[i].status) { // 해당 인덱스를 갖는 객체의 status가 활성화 상태라면 비활성화 시키고 모듈을 숨김
                hind(defaultModuleList[i].name);
                defaultModuleList[i].status = true;
                //console.log(`name : ${defaultModuleList[i].name} ::: hidden : ${defaultModuleList[i].status}`);
              }
              // 클릭시 모든 모듈을 hind
            } else if (this.hindStyle === "all") {
              defaultModuleList.forEach(e => {
                if (e.status === false) {
                  e.status = true;
                  hind(e.name);
                  //console.log(`name : ${defaultModuleList[i].name} ::: hidden : ${defaultModuleList[i].status}`);

                  // 임시로 모든 모듈이 숨겨질 경우 해당 모듈이 상세적으로 나올 수 있도록 설정
                  detailModuleList[0].status = false;
                  show(detailModuleList[0].name);
                }
              })
            }
          });
        }
      }

      // 상세 내용을 표시할 모듈용 객체 생성를 생성하고 배열에 push
      for (let i = this.defaultModuleCount; i < mouduleName.length; i++) {
        mouduleStatus[i] = true;
        hind(mouduleName[i]);
        let obj = {
          "id": moduleId[i],
          "name": mouduleName[i],
          "status": mouduleStatus[i]
        }
        detailModuleList.push(obj);
      }

      // ESC입력시 숨겨져 있던 모든 모듈을 출력하는 이벤트를 추가
      window.addEventListener('keydown', (e) => {
        for (let i = 0; i < defaultModuleList.length; i++) {
          if (e.keyCode == 27 && defaultModuleList[i].status) {
            // 임시로 ESC입력시 상세히 보여주던 모듈을 hind시킴
            detailModuleList[0].status = true;
            hind(detailModuleList[0].name);

            show(defaultModuleList[i].name);
            defaultModuleList[i].status = false;
            //console.log(`name : ${defaultModuleList[i].name} ::: hidden : ${defaultModuleList[i].status}`);

          }
        }
      })

      console.log(defaultModuleList);
      console.log(detailModuleList);
      this.loadCount++;
    }
    return wrapper;
  },

});