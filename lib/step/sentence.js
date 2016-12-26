function Sentence(){
    this.constructor.apply(this,arguments);
}

Sentence.prototype.constructor = function(options,sender_id,text,messageSender){

	this.options = options;
	this.sender_id = sender_id;
	this.text = text;
	this.messageSender = messageSender;

};

Sentence.prototype.run = function(){

	this.messageSender.sendSimpleMessage(this.sender_id,this.options.message);

};

module.exports = Sentence;