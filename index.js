var SmartBot = require('./lib/smart-bot');

var config = {
	pageAccessToken: 'YOUR-PAGE-ACCESS-TOKEN',
	verifyToken: 'YOUR-VERIFY-TOKEN'
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
			goTo: 
		},
		{
			label: 'option 2',
			goTo: optionTwoStep
		}
	]
});

smartBot.step('Say you select option 1',SmartBot.STEP_SENTENCE,{
	message: 'Say you select option 1',
	goTo: goodbyeStep,
	sleep: 3
});

smartBot.step('Say you select option 2',SmartBot.STEP_SENTENCE,{
	message: 'Say you select option 2',
	goTo: goodbyeStep,
	sleep: 3
});

smartBot.step('Say goodbye',SmartBot.STEP_SENTENCE,{
	message: 'Goodbye!!!',
});

smartBot.goTo(firstStep);