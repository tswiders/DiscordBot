
// Require the necessary discord.js classes
const Discord = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');

// Create a new client instance
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.commands = new Discord.Collection();

const  commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log("Bot is online!");
});

const prefix = '~~';

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(args);
    if(command === 'ping')
        client.commands.get('ping').execute(message, args);
    else if(command === 'add')
        client.commands.get('add').execute(message, args);
    else if(command === 'multiply')
        client.commands.get('multiply').execute(message, args);
    else if(command === 'embed')
        client.commands.get('embed').execute(message, args, Discord);
    else if(command === 'play')
        client.commands.get('play').execute(message, args);
    else if(command === 'leave')
        client.commands.get('leave').execute(message, args);

})


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});



client.login(token);

