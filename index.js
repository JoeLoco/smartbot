require('dotenv').config();
var SmartBot = require('./lib/smart-bot');

var config = {
	pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
	verifyToken: process.env.VERIFY_TOKEN
};

smartBot = new SmartBot(config);

smartBot.step('first-step',SmartBot.STEP_SENTENCE,{
	message: 'Hi, i am a bot',
	goTo: 'menu',
	sleep: 3
});

smartBot.step('menu', SmartBot.STEP_OPTION_MENU,{
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

smartBot.step('option-1-selected',SmartBot.STEP_SENTENCE,{
	message: 'Say you select option 1',
	goTo: 'option-1-selected',
	sleep: 3
});

smartBot.step('option-2-selected',SmartBot.STEP_SENTENCE,{
	message: 'Say you select option 2',
	goTo: 'option-2-selected',
	sleep: 3
});

smartBot.step('goodbye',SmartBot.STEP_SENTENCE,{
	message: 'Goodbye!!!',
});

smartBot.goTo('first-step');