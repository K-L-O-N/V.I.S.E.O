const NodeHelper = require("node_helper");
const spawn  = require('child_process').spawn;
const fs = require('fs');
// const main_config = null;
let check = "";
let name ="";
let imgName = [];
let myPath = "/home/smart/MagicMirror/modules/MMM-DressDetail/";

module.exports = NodeHelper.create({
	start: function () {
	},
	socketNotificationReceived: function (notification, payload) {
		let self = this;
		if (notification === 'TEST') {
			console.log(`메인모듈로부터 ${payload.today}를 받았습니다.`);
			check = `${payload.today} 네 보내지고 있어요`;
			console.log(check);
			console.log(`${myPath}pyFile/recommand.py  ${payload.today}`)
			// 파이썬 파일 실행 및 인수들 전달
			const process = spawn('python3', [`${myPath}pyFile/recommand.py`, ` ${payload.today}`] );

			 // 데이터를 수신
			 process.stdout.on('data', function (data) {
			 	//console.log(data.toString());
			 	name = data.toString();

			 	let subName = name.substring(1,name.length-1);
				//console.log(subName);
			 	let subSubName = subName.split(",");
				//console.log(subSubName);
			 	let subSubSubName = [];
			 	subSubSubName[0] = subSubName[0].split(":");
			 	subSubSubName[1] = subSubName[1].split(":");
			 	subSubSubName[2] = subSubName[2].split(":");
				//console.log(subSubSubName);


				let subSubSubSubName = [];
				subSubSubSubName[0] = subSubSubName[0][1].split("'");
				subSubSubSubName[1] = subSubSubName[1][1].split("'");
				subSubSubSubName[2] = subSubSubName[2][1].split("'");

			 	imgName[0] = subSubSubSubName[0][1].split('/')[subSubSubName[0][1].split('/').length-1];
			 	imgName[1] = subSubSubSubName[1][1].split('/')[subSubSubName[1][1].split('/').length-1];
			 	imgName[2] = subSubSubSubName[2][1].split('/')[subSubSubName[2][1].split('/').length-1];
				//console.log(imgName);
			 	self.sendSocketNotification("STRING", {imgName});
				
			 });

			process.stderr.on('data', function (data) {
				console.error(data.toString());
			});

		}
		// DATA가 호출되었을 경우 Json파일을 열어서 해당 내용의 값을 분할하여
		else if(notification === 'DATA'){
			fs.readFile(`${myPath}pyFile/file_name.json`, (err, data)=>{
				if(err) throw err;
				const fileName = JSON.parse(data);
				let imgName1 = [];

				imgName1[0] = fileName.outwear.split('/')[fileName.outwear.split('/').length - 1];
				imgName1[1] = fileName.top.split('/')[fileName.top.split('/').length - 1]
				imgName1[2] = fileName.bottom.split('/')[fileName.bottom.split('/').length - 1]
				this.sendSocketNotification("CHECK", {imgName1});
			});
		}

	}
});
