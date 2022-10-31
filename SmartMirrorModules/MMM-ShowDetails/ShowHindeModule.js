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
 * 
 */