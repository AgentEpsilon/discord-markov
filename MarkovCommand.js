const { Command } = require("discord.js-commando")
const markov = require('markov')

module.exports = class MarkovCommand extends Command {
    
    constructor(client) {
        super(client, {
            name: 'markov',
            description: 'Generate a markov chain',
            group: 'markov',
            memberName: 'markov'
        })
        this.m = markov()
    }

    seed(arr) {
        //console.log(arr)
        return new Promise((resolve, reject) => {
            this.m.seed(arr.join('\n'), resolve)
        })
    }

    async run(msg, args) {
        msg.channel.startTyping()
        const history = (await msg.channel.fetchMessages({limit: 100}))
            .filter(x => !x.author.bot && !x.content.startsWith('!') && !x.content.startsWith('.'))
            .map(x => x.content)
        await this.seed(history)
        msg.channel.stopTyping()
        return msg.reply(this.m.respond(args).join(' '))
    }
}