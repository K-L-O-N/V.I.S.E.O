Module.register("MMM-ShowDetails", {
  defaults: {
    hindStyle: "all", //options: "one", "all" 
    defaultModuleCount: 8, // length기준으로 설정  
  },
  getStyles() {
    return ["MMM-ShowDetails.css"];
  },
  getScripts() {
    return [
      "test.js"
    ]
  },
  start: function () {
    Log.info("Starting module: " + this.name);

    this.loadCount = 0;
    this.hindStyle = this.config.hindStyle;
    this.defaultModuleCount = this.config.defaultModuleCount;
  },
  getDom: function () {
    const wrapper = document.createElement("div");

    if (this.loadCount == 0) {

      /**
       * 모듈의 정보를 담을 배열들을 선언
       */
      let mouduleStatus = [];
      let moduleId = [];
      let mouduleName = [];

      let defaultModule = []; // 기본적으로 사용되는 모듈로 생성한 객체를 담을 배열 선언
      let detailModule = []; // 상세정보에 사용되는 모듈로 생성된 객체를 담는 배열 선언

      /**
       * 각 배열에 맞는 값을 추가
       */
      mouduleStatus = MM.getModules().map(e => e.hidden); // false -> 활성화 상태를 의미 
      moduleId = MM.getModules().map(e => e.identifier);
      mouduleName = MM.getModules().map(e => e.name);
      // 접근에 용이하기 위해 하나의 객체로 만든 뒤 배열로 push
      for (let i = 0; i < this.defaultModuleCount; i++) {
        let target = document.getElementById(moduleId[i]);
        let obj = {
          "id": moduleId[i],
          "name": mouduleName[i],
          "status": mouduleStatus[i],
          "target": target,
          "detail": null    // 배열로 넣는다.
        }
        defaultModule.push(obj);
      }

      // 상세 내용을 표시할 모듈용 객체 생성를 생성하고 배열에 push
      for (let i = this.defaultModuleCount; i < mouduleName.length; i++) {
        mouduleStatus[i] = true;
        let target = document.getElementById(moduleId[i]);
        this.hind(mouduleName[i]);
        let obj = {
          "id": moduleId[i],
          "name": mouduleName[i],
          "status": mouduleStatus[i],
          "target": target
        }
        detailModule.push(obj);
      }


      let header = document.createElement("div");;  // 모듈의 앞에서 내용을 추가 해줄 요소를 저장할 변수
      let body = document.createElement("div");     // 모듈의 뒤에서 내용을 추가 해줄 요소를 저장할 변수

      header.classList.add("header");
      body.classList.add("body");

      // [기본으로 보유하는 모듈]각 객체에 이벤트 리스너를 추가
      for (let i = 0; i < defaultModule.length; i++) {
        if (defaultModule[i].target != null) {
          defaultModule[i].target.addEventListener('click', () => { // 해당 객체에 클릭 이벤트 리스너를 추가

            // 클릭한 친구만 숨기고 싶은 경우
            if (this.hindStyle === "one") {
              if (!defaultModule[i].status) { // 해당 인덱스를 갖는 객체의 status가 활성화 상태라면 비활성화 시키고 모듈을 숨김
                this.hind(defaultModule[i].name);
                defaultModule[i].status = true;
                //console.log(`name : ${defaultModule[i].name} ::: hidden : ${defaultModule[i].status}`);
              }

              // 클릭시 모든 모듈을 hind
            } else if (this.hindStyle === "all") {

              //detail에 연결해주기위한 과정
              let targetName = defaultModule[i].name; // 클릭한 객체의 이름
              console.log(targetName);
              let targetIndex = 0; // 클릭한 객체의 배열 인덱스

              switch (targetName) { // 객체의 이름에 따라 알맞은 모듈 연결
                case "weather":
                  defaultModule[i].detail = 'MMM-WeatherChart'; // detail로 연결
                  // 모듈외에 추가하고 싶은 내용
                  header.innerHTML="요일별 날씨";
                  body.innerHTML="내용이 보이나요?";
                  break;
              }

              // detail로 연결되어 있다면
              console.log(defaultModule[i].detail);
              if (defaultModule[i].detail != null) {
                // 모든 모듈을 hind
                defaultModule.forEach(e => {
                  if (e.status === false) {
                    e.status = true;
                    this.hind(e.name);
                    //console.log(`name : ${defaultModule[i].name} ::: hidden : ${defaultModule[i].status}`);
                  }
                })

                // 상세 정보배열에서 detail로 연결한 이름과 동일한 이름을 갖는 모듈인덱스를 저장
                targetIndex = detailModule.findIndex(e => e.name === defaultModule[i].detail);
                document.getElementById(detailModule[targetIndex].id).prepend(header);
                document.getElementById(detailModule[targetIndex].id).appendChild(body);
                // 해당 인덱스에 맞는 상세 정보 모듈의 상태를 false(활성화)상태로 변경
                detailModule[targetIndex].status = false;
                // 해당 인덱스에 맞는 모듈을을 숨김
                this.show(detailModule[targetIndex].name);
              }
            }
          });
        }
      }

      // ESC입력시 숨겨져 있던 모든 모듈을 출력하는 이벤트를 추가
      window.addEventListener('keydown', (e) => {
        for (let i = 0; i < detailModule.length; i++) {
          /**
           * ESC를 입력하였을 때 활성화 되어있는 상세정보모듈이 있을 경우 
           * 해당 모듈(상세정보)을 비활성화 / 기본 모듈을 활성화 
           */
          if (e.keyCode == 27 && !detailModule[i].status) {
            detailModule[i].status = true;
            document.getElementById(detailModule[i].id).removeChild(header);
            document.getElementById(detailModule[i].id).removeChild(body);
            this.hind(detailModule[i].name);

            for (let j = 0; j < defaultModule.length; j++) {
              defaultModule[j].status = false;
              this.show(defaultModule[j].name);
            }
            break;
          }
        }
      })

      this.loadCount++;
    }
    return wrapper;
  },

  /** 
   * 화면에 나오는 모듈을 숨기는 함수
   * @param {string} moduleName 숨기고자하는 모듈의 이름 작성  
   */
  hind(moduleName) { // module hind
    MM.getModules().withClass([`${moduleName}`]).enumerate(function (module) {
      module.hide();
    });
  },

  /** 
   * 화면에 숨겨진 모듈을 보여주는 함수
   * @param {string} moduleName 보여주고자 하는 모듈의 이름 작성  
   */
  show(moduleName) { // module show
    MM.getModules().withClass([`${moduleName}`]).enumerate(function (module) {
      module.show();
    });
  },
});