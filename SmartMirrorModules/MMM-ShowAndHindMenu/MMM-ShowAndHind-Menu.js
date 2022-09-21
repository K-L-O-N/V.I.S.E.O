Module.register("MMM-ShowAndHind-Menu",{

	defaults : {
		clickCount : 0,
		width: 200,
		height: 200,
		menuCount : 3,
		menuText : ["dress", "weather", "option"],
	},

	start : function(){
		Log.info("Starting module: " + this.name);
		console.log(`mouseClick : ${this.config.clickCount}`);

		var count = this.config.clickCount;
		var menuWidth = this.config.width;
		var menuHeight = this.config.height;
		var menuCount = this.config.menuCount; 
		var menuContext = this.config.menuText;

		// set target
		var $body = document.querySelector("body");
		var menu = []
		var isMenu = false;

		// python file
/*		
		var {spawn} = require('child_process');
		var result = spawn('python',['test.py']);
		result.stdout.on('data',function(data){ console.log(data.toString());});
*/

		$body.addEventListener('click',function(){
			
			if(!isMenu){
				isMenu = true;
				MM.getModules().withClass(['newsfeed']).enumerate(function(module){module.hide();});
				for(let i = 0; i< menuCount; i++){
					// make menu
					menu[i] = document.createElement('div');
					menu[i].innerHTML = `${menuContext[i]}`;
					menu[i].style.position = 'absolute';
					menu[i].style.width = `${menuWidth}px`;
					menu[i].style.height = `${menuHeight}px`;
					menu[i].style.textAlign = 'center';
					menu[i].style.lineHeight = '100px';
					menu[i].style.border = '5px solid red';
					menu[i].style.borderRadius = '10px';
					menu[i].style.top = '80%';
					if(menuCount == 2){
						menu[i].style.left = `${25 + i*50}%`;
					}else if(menuCount == 3){
						menu[i].style.left = `${25 + i*25}%`;
					}else{
						menu[i].style.left = '50%';
					}
					menu[i].style.transform = 'translate(-50%)';
					$body.appendChild(menu[i]);
				}
			}else{
				isMenu = false;
				MM.getModules().withClass(['newsfeed']).enumerate(function(module){module.show();});
				for(let i = 0; i< menuCount; i++){
					$body.removeChild(menu[i]);
				}
				
			}
			
		});
	
		setInterval(function(){
			console.log(`mouseClick : ${count}`)}, 1000);
	},
		
});
