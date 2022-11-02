Module.register("MMM-MouseCursor", {
  default: {},

  getStyles: function () {
    return [
      "MMM-MouseCursor.css"
    ];
  },

  start: function () {
    this.isActivity = true;
  },

  getDom(){
    let ripples;
    let $body = document.querySelector("body");

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
      //why? -기본 margin이 60이 잡혀있기 때문 - 추후 margin값을 가져와서 빼주는 형태로 변경필요
      ripples.style.left = x - 60 + "px";
      ripples.style.top = y - 60 + "px";
      return ripples;
    }
    
    window.addEventListener('click', (e) => {
      console.log(this.isActivity , typeof this.isActivity);
      if(this.isActivity){
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

  }

})