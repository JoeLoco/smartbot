var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var HashTable = require('hashtable');
var MessageSender = require('./message-sender');

function SmartBot(){
    this.constructor.apply(this,arguments);
}

SmartBot.prototype.constructor = function(config){
	
	this.config = config;
	this.messageSender = new MessageSender(config.pageAccessToken);

	this.senderData = new HashTable();
	this.steps = new HashTable();

	this.startStep = 'start';

	var app = express();
	
	app.set('port', process.env.PORT || 3000);
	app.use(bodyParser.json());

	app.get('/', this.verificationHandler.bind(this));
	app.post('/',this.messageHandler.bind(this));

	http.createServer(app).listen(app.get('port'), function() {
		console.log('Smartbot ready');
		console.log('listening on port: ' + app.get('port'));
	});

};


SmartBot.prototype.verificationHandler = function(req, res) {

  if (req.query['hub.verify_token'] === this.config.verifyToken) {
	console.log('verify_token ok, sending hub.challenge back');
	console.log(req.query['hub.challenge']);
    res.send(req.query['hub.challenge']);
  }

  console.log('Error, wrong validation token!');
  res.send('Error, wrong validation token!');

};

SmartBot.prototype.messageHandler = function(req, res) {

  res.send('message received');
  req.body.entry.map(this.entryHandler.bind(this));

};

SmartBot.prototype.entryHandler = function(entry) {

  entry.messaging.map(this.messagingHandler.bind(this));

};

SmartBot.prototype.messagingHandler = function(messaging) {

	var sender_id = messaging.sender.id;
	var text = messaging.message.text;

	console.log("Message received");

	console.log("sender_id: ",sender_id);
	console.log("text: ",text);

	var data = this.getNextStep(sender_id);

	console.log("getNextStep: ",data);

	var Step = require("./step/" + data.type);
	var step = new Step(data.config,sender_id,text,this.messageSender);
	step.run();

};

SmartBot.prototype.addStep = function(id,type,config) {

	this.steps.put(id,{
		type: type,
		config: config
	});

};

SmartBot.prototype.getNextStep = function(sender_id) {

	var senderData = this.getSenderData(sender_id);
	return this.steps.get(senderData.step);
};

SmartBot.prototype.getSenderData = function(sender_id) {

	if(!this.senderData.has(sender_id))
	{
		this.senderData.put(sender_id,{
			step: this.startStep
		});
	}
	return this.senderData.get(sender_id);

};

SmartBot.prototype.setStartStep = function(id) {
  this.startStep = id;
};

module.exports = SmartBot;
