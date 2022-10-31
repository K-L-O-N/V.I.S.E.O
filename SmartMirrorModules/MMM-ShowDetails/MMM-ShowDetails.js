Module.register("MMM-ShowDetails", {
  defaults: {

  },
  getStyles: function () {
    return [
      "MMM-ShowDetails.css"
    ];
  },
  getScripts: function () {
    return [
      "ShowHindeModule.js"
    ];
  },
  start: function () {
    Log.info("Starting module: " + this.name);
  },
  getDom: function () {
    const wrapper = document.createElement("div"); // 테스트용
    wrapper.classList.add("wrapperTest");
    wrapper.addEventListener('click', () => {
      let testDiv = document.createElement("div");
      testDiv.className = "testDiv";
      wrapper.appendChild(testDiv);
    });

    /**
     * 모듈의 정보를 담을 배열들을 선언
     */
    let modulesId = MM.getModules().map(e => e.identifier); // 각 모듈의 id값음 담을 배열 
    let moduleStatus = MM.getModules().map(e => e.hidden); // 각 모듈의 활성화 여부를 확인하기 위한 배열 false -> 활성화 상태
    let moduleName = []; // 각 모듈의 이름을 담을 배열
    let moduleObj = []; // 각 모듈에 의해 만들어진 객체를 담을 배열

    // moduleObj 배열에 모듈에 의해 생성된 객체를 저장
    for (let i = 0; i < modulesId.length; i++) {
      let target = document.getElementById(modulesId[i]);
      moduleName[i] = modulesId[i].substring(modulesId[i].lastIndexOf('_') + 1); // 타겟의 id안에서 이름을 추출
      if (target != null) { // 타겟으로 잡은 객체가 null이 아니라면
        // 클릭시 해당 객체를 hind시키는 이벤트를 추가
        target.addEventListener('click', e => {
          if (!moduleStatus[i]) { // 활성화 상태라면
            moduleStatus[i] = true;
            hind(moduleName[i]);
          }
          this.updateDom(0); // 해당 Dom을 갱신 딜레이는 0
        });
      }
      moduleObj.push(target);
    }

    //10초마다 해당 객체들을 show해줌 이는 추후 비활성화 객체에게만 전달하는 걸로 수정
    setTimeout(() => {
      moduleStatus.forEach((e, index) => {
        if (moduleStatus[index]) {
          moduleStatus[index] = false;
          show(moduleName[index]);
        }
      });

    }, 10000)
    return wrapper;
  },

});