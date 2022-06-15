module.exports = {
    name: 'embed',
    description: 'embed command',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('Rules')
        .setURL('https://www.youtube.com/watch?v=I7eZY-SBmf8&list=PLbbLC0BLaGjpyzN1rg-gK4dUqbn8eJQq4&index=5&ab_channel=CodeLyon')
        .setDescription('This is embed')
        .addFields(
            {name: 'Rule 1', value: 'Be nice'},
            {name: 'Rule 2', value: 'Dont cheat'}
            )
        .setImage('https://thumbs.dreamstime.com/b/crazy-cat-tongue-hanging-out-40087599.jpg')
        .setFooter('This is footer');

        message.channel.send({embeds: [newEmbed]});
    }


}