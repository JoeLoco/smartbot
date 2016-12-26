require('dotenv').config();
var SmartBot = require('./lib/smart-bot');

var config = {
	pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
	verifyToken: process.env.VERIFY_TOKEN
};

smartBot = new SmartBot(config);

smartBot.addStep('first-step','sentence',{
	message: 'Hi, i am a bot',
	goTo: 'menu',
	sleep: 3
});

smartBot.addStep('menu', 'option-menu',{
	message: 'Choose a option',
	options: [
		{
			label: 'option 1',
			goTo: 'option-1-selected'
		},
		{
			label: 'option 2',
			goTo: 'option-2-selected'
		}
	]
});

smartBot.addStep('option-1-selected','sentence',{
	message: 'Say you select option 1',
	goTo: 'option-1-selected',
	sleep: 3
});

smartBot.addStep('option-2-selected','sentence',{
	message: 'Say you select option 2',
	goTo: 'option-2-selected',
	sleep: 3
});

smartBot.addStep('goodbye','sentence',{
	message: 'Goodbye!!!',
});

smartBot.setStartStep('first-step');