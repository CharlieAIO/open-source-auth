const express = require('express');
const router = express.Router();
const { Client, MessageEmbed } = require("discord.js");
var request = require("request");

const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message ) => {
    if(message.content.startsWith(process.env.PREFIX)){

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if(command == "help"){
            const embed = new MessageEmbed()
            .setTitle('CharlieAIO Auth')
            .setColor(0x4bd670)
            .setDescription(`${message.author}'s Key`)
            .addFields(
                { name: '!bind <key>', value: 'Use this command to bind your key', inline:false },
                { name: '!unbind <key>', value: 'Use this command to unbind your key', inline:false },
                { name: '!reset <key>', value: 'Use this command to reset your key', inline:false },
                { name: '!key', value: 'Use this command to view your key and other info', inline:false },
            )
            const user = client.users.cache.get(message.author.id);
            user.send(embed);
            
        }
        if(command == "bind"){
            var key = args[0]

            var options = {
                url: `${process.env.API_BASE}/api/bind/user`,
                method: "POST",
                body: {
                  key: key,
                  userID: message.author.id,
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
            request(options, function(error, response, body){
                if(response.statusCode == 200){
                    const guild = client.guilds.cache.get(process.env.GUILD_ID);
                    let guildMember = guild.member(message.author.id);
                    guildMember.roles
                        .add(process.env.ROLE_ID)
                        .catch(console.error);

                    const embed = new MessageEmbed()
                    .setTitle('CharlieAIO Auth')
                    .setColor(0x4bd670)
                    .setDescription(`Successfully bound!`);
                    const user = client.users.cache.get(message.author.id);
                    user.send(embed);
                }else{
                    const embed = new MessageEmbed()
                    .setTitle('CharlieAIO Auth')
                    .setColor(0x4bd670)
                    .setDescription(`Failed to bind`);
                    const user = client.users.cache.get(message.author.id);
                    user.send(embed)
                }

            })


        }

        if(command == "unbind"){
            var key = args[0]

            var options = {
                url: `${process.env.API_BASE}/api/unbind/user`,
                method: "POST",
                body: {
                  key: key,
                  userID: message.author.id,
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
            request(options, function(error, response, body){
                if(response.statusCode == 200){
                    const guild = client.guilds.cache.get(process.env.GUILD_ID);
                    let guildMember = guild.member(message.author.id);
                    guildMember.roles
                        .remove(process.env.ROLE_ID)
                        .catch(console.error);
                        
                    const embed = new MessageEmbed()
                    .setTitle('CharlieAIO Auth')
                    .setColor(0x4bd670)
                    .setDescription(`Successfully unbound!`);
                    const user = client.users.cache.get(message.author.id);
                    user.send(embed);
                }else{
                    const embed = new MessageEmbed()
                    .setTitle('CharlieAIO Auth')
                    .setColor(0x4bd670)
                    .setDescription(`Failed to unbind`);
                    const user = client.users.cache.get(message.author.id);
                    user.send(embed)
                }

            })


        }

        if(command == "reset"){
            var key = args[0]

            var options = {
                url: `${process.env.API_BASE}/api/reset/machine`,
                method: "POST",
                body: {
                  key: key,
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
            request(options, function(error, response, body){
                if(response.statusCode == 200){
                    const embed = new MessageEmbed()
                    .setTitle('CharlieAIO Auth')
                    .setColor(0x4bd670)
                    .setDescription(`Successfully reset!`);
                    const user = client.users.cache.get(message.author.id);
                    user.send(embed);
                }else{
                    const embed = new MessageEmbed()
                    .setTitle('CharlieAIO Auth')
                    .setColor(0x4bd670)
                    .setDescription(`Failed to reset`);
                    const user = client.users.cache.get(message.author.id);
                    user.send(embed)
                }

            })


        }

        if(command == "key"){
            var key = args[0]

            var options = {
                url: `${process.env.API_BASE}/api/key`,
                method: "POST",
                body: {
                  userID: message.author.id,
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
            request(options, function(error, response, body){
                if(response.statusCode == 200){
                    if(body == undefined){
                        const embed = new MessageEmbed()
                        .setTitle('CharlieAIO Auth')
                        .setColor(0x4bd670)
                        .setDescription(`${message.author} has no key bound.`)
                        const user = client.users.cache.get(message.author.id);
                        user.send(embed);

                    }else{
                        const embed = new MessageEmbed()
                        .setTitle('CharlieAIO Auth')
                        .setColor(0x4bd670)
                        .setDescription(`${message.author}'s Key`)
                        .addFields(
                            { name: 'License Key', value: body.key, inline:false },
                            { name: 'License Type', value: body.type, inline: false },
                            { name: 'Machine', value: body.machineId , inline: false },
                        )
                        const user = client.users.cache.get(message.author.id);
                        user.send(embed);
                    }
                }

            })


        }
        if(command == "gen"){
            var type = args[0]

            var options = {
                url: `${process.env.API_BASE}/api/insert/key`,
                method: "POST",
                body: {
                  type: type,
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
            request(options, function(error, response, body){
                if(response.statusCode == 200){
                    const embed = new MessageEmbed()
                        .setTitle('CharlieAIO Auth')
                        .setColor(0x4bd670)
                        .addFields(
                            { name: 'License Key', value: body.key, inline:false },
                            { name: 'License Type', value: body.type, inline:false },
                        )
                        .setDescription('Key Generated')
                        const user = client.users.cache.get(message.author.id);
                        user.send(embed);


                }
                else{
                    const embed = new MessageEmbed()
                    .setTitle('CharlieAIO Auth')
                    .setColor(0x4bd670)
                    .setDescription('Failed to generate key')
                    const user = client.users.cache.get(message.author.id);
                    user.send(embed);
                }

            })


        }
        if(!(['help','reset','bind','unbind','key','gen'].includes(command))){
            const embed = new MessageEmbed()
            .setTitle('CharlieAIO Auth')
            .setColor(0x4bd670)
            .setDescription(`That command wasnt found, use !help`)

            const user = client.users.cache.get(message.author.id);
            user.send(embed);
        }


    }
});
  

client.login(process.env.BOT_TOKEN);
module.exports = router