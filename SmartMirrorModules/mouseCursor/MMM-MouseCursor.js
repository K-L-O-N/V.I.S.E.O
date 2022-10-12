Module.register("MMM-MouseCursor", {
    default: {},
    start: function () {

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

            console.log(`${x} = ${event.clientX} - ${event.target.offsetLeft}`);
            console.log(`${y} = ${event.clientY} - ${event.target.offsetTop}`);
            // keyframes설정

            let ripples = document.createElement("span");
            ripples.style.position = 'absolute';
            ripples.style.backgroundColor = '#f00';
            ripples.style.borderRadius = '50%';
            ripples.style.pointerEvents = 'none';
            const keyframe = document.createElement('style');
            keyframe.innerHTML = `  
        @keyframes animate {
            0% {
               width: 0px;
              height: 0px;
              opacity: 0.5;
            }
            100% {
              width: 100px;
              height: 100px;
              opacity: 0;
            }
          }`;
            ripples.appendChild(keyframe);
            ripples.style.animation = 'animate 1s linear';
            // 60을 빼줌 왜냐? 기본 margin이 60이 잡혀있기 때문 - 추후 margin값을 가져와서 빼주는 형태로 변경필요
            ripples.style.left = x - 60 + "px";
            ripples.style.top = y - 60 + "px";
            ripples.style.transform = 'translate(-50%,-50%)';

            return ripples;
        }
		$body.addEventListener('click', (e) => {
			// 객체가 계속 생기는 것을 방지하고자 삭제 후 다시 생성
			if (typeof ripples === 'undefined') { 	// 최초로 클릭했을 때
				ripples = clickEvent(e);
				ripples.className ='ripples';
				console.log(ripples.className);
				console.log(ripples.style.backgroundColor);
				$body.appendChild(ripples);
			}else{									// 이후부터는 자식 객체를 제거 후 다시 생성
				$body.removeChild(ripples);
				ripples = undefined;
				ripples = clickEvent(e);
				$body.appendChild(ripples);
			}
		});
    },

})