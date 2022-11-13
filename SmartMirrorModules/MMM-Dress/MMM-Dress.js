Module.register("MMM-Dress", {
    default: {

    },
    getStyles() {
        return ["MMM-Dress.css"];
    },
    getScripts() {
        return [

        ];
    },
    start: function () {
        Log.info("Starting module: " + this.name);

    },
    getDom: function () {
        const wrapper = document.createElement("div");
        let div = document.createElement("img");
        div.classList.add("test");
        div.src="modules/MMM-Dress/2.png";
        div.width=100;
        div.height=100;

        div.addEventListener('click', (e)=>{
            console.log("클릭되었습니다.");
        });
        
        wrapper.appendChild(div);
        return wrapper;
    },
});