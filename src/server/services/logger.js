var bunyan = require('bunyan');
var BunyanSlack = require('bunyan-slack');
var log;

var formatter = function(record, levelName){
	return {text: '[' + levelName + '] ' + record.msg + ' (source: ' + record.src.file + ' line: ' + record.src.line + ')' };
};

try{
	log = bunyan.createLogger({
		src: true,
		name: config.server.http.host,
		streams: [{
			path: 'log'
		},
		{
			level: 'error',
			stream: new BunyanSlack({
				webhook_url: config.server.slack_url,
				channel: '#cla-assistant',
				username: 'CLA assistant',
				customFormatter: formatter
			})
		},
		{
			level: 'info',
			stream: new BunyanSlack({
				webhook_url: config.server.slack_url,
				channel: '@kharitonov',
				username: 'CLA assistant',
				customFormatter: formatter
			})
		}

		]
	});

	// log.warn('hello form bunyan to slack');
} catch (e) {
	log = bunyan.createLogger({
		src: true,
		name: config.server.http.host,
		streams: [{
			path: 'log'
		}]
	});
}

module.exports = log;
