const Discord = require('discord.js');

const bot = new Discord.Client();

const ytdl = require("ytdl-core");

const prefix  = process.env.BOT_PREFIX;

var queue = new Map();

bot.on("ready", () => {
    console.log(`I am ready! I am in ${bot.guilds.size} guilds`);

    bot.user.setActivity(process.env.BOT_STATUS);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const serverQueue = queue.get(message.guild.id);
	
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'Welcome');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

if(command === 'ping') {
	message.react('✅')
  .then(console.log)
  .catch(console.error);
        const msg = await message.channel.send("Pinging...");
        msg.edit(`Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
    }
	
    if(command === 'dev') {
	    message.react('✅')
  .then(console.log)
  .catch(console.error);
	 const devemb = new Discord.RichEmbed()
	.setColor('#00ff7f')
	.setTitle('Developers')
	.setDescription('NJ3ZNAY0MY_#6839')
	.setTimestamp()
	.setFooter('Nonima', 'https://cdn.discordapp.com/avatars/572811135305252895/2ce1d1a63380376fd15d10f1ffa58d50.png?size=2048')
	const msg = await message.channel.send(devemb);
    }
	
	if(command === "say") {
    const sayMessage = args.join(" ");
	message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
     if(command === "purge") {
	     message.react('✅')
  .then(console.log)
  .catch(console.error);
    const deleteCount = parseInt(args[0], 10);
    
if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

    if(command === 'kick') {
	    message.react('✅')
  .then(console.log)
  .catch(console.error);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Sorry you do not have permission!');
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid user");
        if(!member.kickable) return message.channel.send("Sorry I cannot kick that person! Do they have a higher role?");

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";

        await member.kick(reason)
            .catch(e => message.reply(`Sorry I couldn't kick them! Error: ${e}`));
        message.reply(`:white_check_mark: User kicked!`);
    }
	
    if(command === 'uptime') {
	    message.react('✅')
  .then(console.log)
  .catch(console.error);
		message.channel.send('https://nonima.freshstatus.io/');
	}
	
    if(command === 'vote') {
	    message.react('✅')
  .then(console.log)
  .catch(console.error);
		message.channel.send('https://top.gg/bot/674358606233337886/');
	}
	
    if(command === 'help') {
	    message.react('✅')
  .then(console.log)
  .catch(console.error);
	    message.channel.send('ping - show your and api latency');
	    message.channel.send('ban - ban person on server');
	    message.channel.send('kick - kick person from server');
	    message.channel.send('purge - clear chat (max 100 messages at once)');
	    message.channel.send('play - play music (need YouTube link)');
	    message.channel.send('stop - stop music');
	    message.channel.send('say - bot send your message');
	    message.channel.send('dev - show developer nick and tag');
	    message.channel.send('uptime - send link to bot uptime');
	    message.channel.send('vote - this command redirecting to top.gg vote website');
	    message.channel.send('avatar - send your avatar');
	    message.channel.send('more in future');
    }

    if(command === 'ban') {
	    message.react('✅')
  .then(console.log)
  .catch(console.error);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Sorry you do not have permission!');
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid user");
        if(!member.bannable) return message.channel.send("Sorry I cannot ban that person! Do they have a higher role?");

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";

        await member.ban(reason)
            .catch(e => message.reply(`Sorry I couldn't ban them! Error: ${e}`));
        message.reply(`:white_check_mark: User banned!`);
    }
	
	if(command === 'avatar') {
		message.react('✅')
  .then(console.log)
  .catch(console.error);
		message.reply(message.author.avatarURL);
	}
	
	if(command === 'stop') {
		message.react('✅')
  .then(console.log)
  .catch(console.error);
		serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
	message.channel.send('Stopped Music');
        return;
	}

    if(command === 'play') {
	    message.react('✅')
  .then(console.log)
  .catch(console.error);
        // !play url

        play(message, serverQueue);
		message.reply(`This is beta feature. music sometimes can lag and crash`);
    }

});

async function play(message, serverQueue) {
    const args = message.content.split(" ");

    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.reply("You must be in a voice channel!");
    const permission = voiceChannel.permissionsFor(message.client.user);
    if(!permission.has('CONNECT') || !permission.has("SPEAK")) {
        return message.channel.send("I need permission to join and speak in your voice channel!")
    }

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };

    if(!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };
        queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try{
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            playSong(message.guild, queueConstruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id)
            return message.channel.send("There was an error playing! " + err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} has been added to the queue!`);
    }
}

function playSong(guild, song) {
    const serverQueue = queue.get(guild.id);

    if(!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', () => {
            serverQueue.songs.shift();
            playSong(guild, serverQueue.songs[0]);
        })
        .on('error', error => {
            console.log(error);
        })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}


bot.login(process.env.BOT_TOKEN);
