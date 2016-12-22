var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');


function SmartBot(){
    this.constructor.apply(this,arguments);
}

SmartBot.prototype.constructor = function(config){
	
	this.config = config;

	var app = express();
	
	app.set('port', process.env.PORT || 3000);
	app.use(bodyParser.json());

	app.get('/', this.verificationHandler);
	app.post('/',this.messageHandler);

	http.createServer(app).listen(app.get('port'), function() {
		console.log('Smartbot ready');
		console.log('port: ' + app.get('port'));
	});

};

SmartBot.prototype.verificationHandler = function(req, res) {
  console.log(req);
  if (req.query['hub.verify_token'] === this.config.verifyToken) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token!');
};

SmartBot.prototype.messageHandler = function(req, res) {
  console.log(req.body);
  res.send('message received');
};

SmartBot.prototype.step = function() {
  console.log('step');
};

SmartBot.prototype.goTo = function() {
  console.log('goto');
};

module.exports = SmartBot;
