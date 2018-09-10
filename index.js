const {CommandoClient} = require('discord.js-commando')
const MarkovCommand = require('./MarkovCommand.js')
const {token} = require('./token.json')

const c = new CommandoClient({
	owner: '103343895785533440',
	commandPrefix: '!'
})

c
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(`Client ready; logged in as ${c.user.username}#${c.user.discriminator} (${c.user.id})`);
	})
	.on('commandError', (cmd, err) => {
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})

c.registry.registerGroup('markov').registerCommand(MarkovCommand)

c.login(token)