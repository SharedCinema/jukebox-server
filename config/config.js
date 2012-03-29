var settings = {
	'sessionSecret': 'sessionSecret'
	, 'port': 8080
	, 'uri': 'http://localhost:8080' // Without trailing /

	/*
	// Enter API keys to enable auth services, remove entire object if they aren't used.
	, 'external': {
		'facebook': {
			appId: '123983866527489',
			appSecret: '6edf1327ege27bbba2e239f73cd866c4'
		}
	}
	*/
	, 'debug': (process.env.NODE_ENV !== 'production')
};

if (process.env.NODE_ENV == 'production') {
	settings.uri = 'http://baseballgm.com';
	settings.port = process.env.PORT || 80;
}
module.exports = settings;