module.exports = {
    name: 'ping',
    description: 'ping command',
    execute(message, args){

        let role = message.guild.roles.cache.find(r => r.name === 'Mod')

        if(message.member.permissions.has('KICK_MEMBERS')){
            message.channel.send('You have permision to kick members');
        }else{
            message.channel.send('You dont have permision to kick members');
        }


        // // if(message.member.roles.cache.has('985968756595507220'))
        // if(message.member.roles.cache.some(r => r.name === 'Mod'))
        //     message.channel.send('pong!');
        // else{
        //     message.channel.send('You dont have permission - till now');
        //     message.member.roles.add(role).catch(console.error);
        // }

    }

}