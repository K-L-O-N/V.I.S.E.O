/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "localhost", // Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", // The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, // Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", // HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", // HTTPS Certificate path, only require when useHttps is true

	language: "ko",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [{
			module: "alert",
		},
		// {
		// 	module: "updatenotification",
		// 	position: "top_bar"
		// },
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "나의 일정",
			position: "top_left",
			config: {
				broadcastPastEvents: true, // <= IMPORTANT to see past events
				calendars: [{
					symbol: "calendar-check",
					//url: "https://calendar.google.com/calendar/ical/devilljh1%40gmail.com/public/basic.ics"
					//url: "https://www.calendarlabs.com/templates/ical/US-Holidays.ics",
					url: "https://calendar.google.com/calendar/ical/devilljh1%40gmail.com/public/basic.ics",
				}]
			}
		},
		/*
				{
					module: "compliments",
					position: "lower_third"
				},
		*/
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Seoul",
				locationID: "1835848", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "d6f43e085fcbdfb6ca7d3b6daeed3b43"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "날씨",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Seoul",
				locationID: "1835848", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "d6f43e085fcbdfb6ca7d3b6daeed3b43"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [{
					//title: "New York Times",
					title: "뉴스",
					//url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					url: "https://www.yonhapnewstv.co.kr/browse/feed/"
				}],
				showSourceTitle: true,
				showPublishDate: true,
				//showDescription: true,
				//showAsList:true,

				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true,
			}
		},
		{
			module: "MMM-AirQuality",
			position: "top_right",
			header: "미세먼지",
			config: {
				location: "Seoul",
				lang: "kr"
			}
		},
		{
			module: "MMM-MouseCursor",
			position: "center",
		},
		{
			module: "MMM-Dress",
			position: "top_left",
		},
		{
			"module": "MMM-WeatherChart",
			"position": "center",
			"config": {
				"apiKey": "d6f43e085fcbdfb6ca7d3b6daeed3b43",
				"dataNum": 16,
				"dataType": "daily",
				"height": "500px",
				"width": "1000px",
				"lat": 35.571337,
				"lon": 139.633989,
				"units": "metric",
				"showRain": true,
				"includeSnow": true,
				"showSnow": true,
				"showIcon": true,
				"colorMin": "rgba(2, 103, 181, 1)",
				"colorMax": "rgba(181, 63, 63, 1)",
				"colorRain": "rgba(19, 4, 181, 1)",
				"colorSnow": "rgba(255, 255, 255, 1)",
			}
		},
		{
			module: "MMM-CalendarExt3",
			position: "top_bar",
			config: {
				fontSize: '14px',
				mode: "month",
				firstDayOfWeek: 0,
				instanceId: "basicCalendar",
				locale: 'ko-KR',
			},
		},
		{
			module: "second-newsfeed",
			position: "top_bar",
			config: {
				feeds: [{
					//title: "New York Times",
					title: "뉴스",
					//url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					url: "https://www.yonhapnewstv.co.kr/browse/feed/"
				}],
				showSourceTitle: true,
				showPublishDate: true,
				showDescription: true,
				showAsList:true,
				maxNewsItems:8,

				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true,
			}
		},
		{
			module: "MMM-ShowDetails",
			position: "bottom_bar",
			config:{
				defaultModuleCount:9,
			},
		},


	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
	module.exports = config;
}