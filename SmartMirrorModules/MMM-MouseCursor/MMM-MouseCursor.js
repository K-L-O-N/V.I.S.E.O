Module.register("MMM-MouseCursor", {
  default: {},

  getStyles: function () {
    return [
      "MMM-MouseCursor.css"
    ];
  },

  start: function () {
    this.isActivity = false;
    this.firstLoad = true;
    
  },

  getDom() {
    let wrapper = document.createElement("div");
    let ripples;

    let $body = document.querySelector("body");
    let $html = document.querySelector("html");
    $html.className="cursor";

    /**
     * 마우스 클릭시 물결의 모양을 만들 수 있는 함수
     * @param {event} event 클릭이벤트를 가져옴
     * @returns 클릭한 위치로부터 퍼져가는 임팩트를 만들기 위한 span 요소를 만들고 반환
     */
    function clickEvent(event) {
      // clientx -> 현재 왼쪽(0)에서부터 현재 마우스가 클릭한 거리
      // offsetLeft -> 현재 맨 왼쪽에서부터 현재 마우스가 클릭한 거리
      //let x = event.clientX - event.target.offsetLeft;
      //let y = event.clientY - event.target.offsetTop;

      let x = event.clientX;
      let y = event.clientY;

      ripples = document.createElement("ripples");
      ripples.className = "ripples";

      // 60을 빼줌 
      //why? -기본 margin이 60이 잡혀있기 때문 
      ripples.style.left = x - parseInt(getComputedStyle($body).margin.split("px")[0]) + "px";
      ripples.style.top = y - parseInt(getComputedStyle($body).margin.split("px")[0]) + "px";
      return ripples;
    }


    /**
     * Home/End키를 통해서 마우스 활성 여부를 확인
     * Home키가 입력되었다면 this.isActivity를 true로 변경하여 마우스의 물결 표시를 추가 
     * End키 입력시 비활성화
     */
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case "Home":
          console.log("Home키가 입력되었습니다.");
          if (!this.isActivity) {
            this.isActivity = true;
            $html.className="";
          }
          break;
        case "End":
          console.log("End키가 입력되었습니다.");
          if (this.isActivity) {
            this.isActivity = false;
            $html.className="cursor";
          }
          break;
      }
    })

    window.addEventListener('click', (e) => {
      if (this.isActivity) {
        // 객체가 계속 생기는 것을 방지하고자 삭제 후 다시 생성
        if (typeof ripples === 'undefined') { // 최초로 클릭했을 때
          ripples = clickEvent(e);
          ripples.className = 'ripples';
          $body.appendChild(ripples);
        } else { // 이후부터는 자식 객체를 제거 후 다시 생성
          $body.removeChild(ripples);
          ripples = undefined;
          ripples = clickEvent(e);
          $body.appendChild(ripples);
        }
      }
    });
    return wrapper;
  },

})