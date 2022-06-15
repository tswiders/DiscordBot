const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'play',
    description: 'Join and play yt music',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
        // console.log(voiceChannel);
        if(!voiceChannel) return message.channel.send('You need to be in channel');

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.channel.send('You dont have permission');
        if(!permissions.has('SPEAK')) return message.channel.send('You dont have permission');
        if(!args.length) return message.channel.send('You need to send 2nd argument');

        // const connection = await voiceChannel.join();
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video){
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('Finish', () => {
                voiceChannel.leave();
            })

            await message.reply(':thumbsup: Now Playing ***${video.title}***');

        } else{
            message.channel.send('No video results found')
        }


    }
}