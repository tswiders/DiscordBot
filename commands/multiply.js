module.exports = {
    name: 'multiply',
    description: 'multiply two integers',
    execute(message, args){

        sum = parseInt(args[0])*parseInt(args[1])
        message.channel.send(String(sum))
    }
}