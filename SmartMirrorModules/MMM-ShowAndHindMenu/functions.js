/** 
 * 화면에 나오는 모듈을 숨기는 함수
 * @param {string} moduleName 숨기고자하는 모듈의 이름 작성  
 */
 function hind(moduleName) { // module hind
    MM.getModules().withClass([`${moduleName}`]).enumerate(function (module) {
        module.hide();
    });
}

/** 
 * 화면에 숨겨진 모듈을 보여주는 함수
 * @param {string} moduleName 보여주고자 하는 모듈의 이름 작성  
 */
function show(moduleName) { // module show
    MM.getModules().withClass([`${moduleName}`]).enumerate(function (module) {
        module.show();
    });
}

/**
 * 메뉴를 생성하는 데 필요한 div를 만들기 위한 함수
 * @param {string} context 메뉴에 표시될 문자열
 * @param {number} width 메뉴의 가로 크기
 * @param {number} height 메뉴의 세로 크기
 */
function createDiv(context, width, height) {
    let div = document.createElement('div');
    div.className = "menuDiv";
    div.innerHTML = `${context}`;
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.lineHeight = `${height}px`;
    return div;
}
