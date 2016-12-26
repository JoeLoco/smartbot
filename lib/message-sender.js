var request = require('request');

function MessageSender(){
    this.constructor.apply(this,arguments);
}

MessageSender.prototype.constructor = function(pageAccessToken){

	this.SEND_URL_API = "https://graph.facebook.com/v2.6/me/messages?access_token=" + pageAccessToken;

};

MessageSender.prototype.sendMessage = function(body) {

	console.log("sending message...",body);

	request.post(this.SEND_URL_API,
    { json: body },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('sending message response',body);
            return;
        }
        console.log('sending message error',error);

    });

};

MessageSender.prototype.sendSimpleMessage = function(recipient_id,text) {

	this.sendMessage({
		recipient:{
			id: recipient_id
		},
		message:{
			text: text
		}
	});

};



module.exports = MessageSender;