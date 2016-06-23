'use strict';

const http = require('http');
const fs = require('fs');
const serialize = require('node-serialize');
const EventsOn = {};


function loadEvents () {
	try {
		
		EventsOn = serialize.unserialize(fs.readFileSync('config/events.json', 'utf8'));
		Object.assign(CommandParser.commands, eventList);
	} catch (e) {}
}

setTimeout(function load() {
	loadEvents();
}, 1000);

function saveEvents() {
	let eventList = JSON.parse(fs.readFileSync('config/events.json'));
	var key, count = 0;
	for(key in eventList) {
		if(eventList.hasOwnProperty(key)) {
			count++;
		}
	}
	eventList[count] = EventsOn;
	fs.writeFileSync('config/events.json', JSON.stringify(eventList));
}

exports.commands = {

// Animal command by Sapience
	animal: 'animals',
	animals: function(target, room, user) {
		if (!target) return this.parse('/help animals')
		let tarId = toId(target);
		let validTargets = ['cat', 'otter', 'dog', 'bunny', 'pokemon', 'kitten', 'puppy'];
		if (!validTargets.includes(tarId)) return this.parse('/help animals');
		let self = this;
		let reqOpt = {
			hostname: 'api.giphy.com', // Do not change this
			path: '/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + tarId,
			method: 'GET',
		};
		let req = http.request(reqOpt, function(res) {
			res.on('data', function(chunk) {
				try {
					let data = JSON.parse(chunk);
					let output = '<center><img src="' + data.data["image_url"] + '" width="75%"></center>';
					if (!self.runBroadcast()) return;
					if (data.data["image_url"] === undefined) {
						self.errorReply("ERROR CODE 404: No images found!");
						return room.update();
					} else {
						self.sendReplyBox(output);
						return room.update();
					}
				} catch (e) {
					self.errorReply("ERROR CODE 503: Giphy is unavaliable right now. Try again later."); //Anti Spam Filter
					return room.update();
				}
			});
		});
		req.end();
	},
	animalshelp: ['|html|<div class="infobox">Animals Plugin by <font color="orange">Sapience</font>' +
		'<ul><li>/animals cat - Displays a cat.</li>' +
		'<li>/animals kitten - Displays a kitten.</li>' +
		'<li>/animals dog - Displays a dog.</li>' +
		'<li>/animals puppy - Displays a puppy.</li>' +
		'<li>/animals bunny - Displays a bunny.</li>' +
		'<li>/animals otter - Displays an otter.</li>' +
		'<li>/animals pokemon - Displays a pokemon.</li>' +
		'<li>/animals help - Displays this help box.</li></ul></div>'
],
	gif: 'giphy',
	giphy: function(target, room, user) {
		if (!target) return this.parse('/help giphy')
		let tarId = toId(target);
		let self = this;
		let reqOpt = {
			hostname: 'api.giphy.com', // Do not change this
			path: '/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + tarId,
			method: 'GET',
		};
		let req = http.request(reqOpt, function(res) {
			res.on('data', function(chunk) {
				try {
					let data = JSON.parse(chunk);
					let output = '<center><img src="' + data.data["image_url"] + '" width="50%"></center>';
					if (!self.runBroadcast()) return;
					if (data.data["image_url"] === undefined) {
						self.errorReply("ERROR CODE 404: No images found!");
						return room.update();
					} else {
						self.sendReplyBox(output);
						return room.update();
					}
				} catch (e) {
					self.errorReply("ERROR CODE 503: Giphy is unavaliable right now. Try again later.");
					return room.update();
				}
			});
		});
		req.end();
	},
	giphyhelp: ['- /giphy [word] - Displays a random Gif with your chosen keyword.'],
	
	
	
/****************************************
* Events Plugin by RoboPhill & Sapience *
****************************************/

    event: {
        create: function (target, room, user) {
            let params = target.split(", ") || target.split(",");
            if (!target || !params[0] || !params[1] || !params[2]) return this.errorReply('Usage: /event create [Name], [Desc], [Room]');
            if (params[1].length > 500) return this.errorReply('Descriptions must be a maximum of 500 characters!');
            if (EventsOn[toId(params[0])]) return this.sendReply("/event - The event \"" + params[0] + "\" already exists.");
            if (!this.can('lock')) return false;
            if (!target) return;
			if (!fs.existsSync('config/events.json')){
				fs.writeFileSync('config/events.json', '{}');
			}
			let eventList = JSON.parse(fs.readFileSync('config/events.json'));
			for (let event in eventList){
				if (eventList[event]["Name"] == params[0]){
					return this.sendReply("There is already an Event named " + params[0]);
					break;
				}
			}
            for (let id in Rooms.rooms) {
				if (id !== 'global') Rooms.rooms[id].addRaw('<div style="background-color: #ff560e ; border: solid, 1px, #ffc775 ; border-top-left-radius: 0em ; border-top-right-radius: 6em ; color: #ffc775 ; font-size: 20px; text-align: center ; text-decoration: underline ; padding: 4px ;">' + 
                                                            params[0] + '</div><div style="background-color: #ff560e ; border-left: solid, 1px, #ffc775 ; border-right: solid, 1px, #ffc775 ; font-size: 12px ; text-align: center ; padding: 8px, 4px ;">' +
                                                            params[1] + '</div><div style="background-color: #ff560e ; border: solid, 1px, #ffc775 ; border-bottom-left-radius: 6em ; border-bottom-right-radius: 0em ; color: #ffc775 ; font-size: 20px; text-align: center ; text-decoration: underline ; padding: 4px ;"><button style="background-color: #ffc775 ; border: solid, 1px, #ff560e ; border-radius: 15px 0px ; color: #ff560e" name="joinRoom" value="' +
                                                            toId(params[2]) + '">' + params[0] + ' Event in here!</button></div>');
            }
            this.logModCommand(user.name + " created event in: " + params[2]);
            		EventsOn["Name"] = toId(params[0]);
			EventsOn["DisplayName"] = params[0];
			EventsOn["Desc"] = params[1];
			EventsOn["Room"] = params[2];
			saveEvents();
				
	    },
	    remove: function (target, room, user) {
	        if (!this.can('lock')) return false;
	        let params = toId(target);
	        if (!target) return this.errorReply('Usage: /event remove [Name]');
			let eventList = JSON.parse(fs.readFileSync('config/events.json'));
			console.log(params);
			if (JSON.stringify(eventList).indexOf(params) >= 0) {
				for (let event in eventList){
					if (eventList[event]["Name"] == params || eventList[event]["DisplayName"] == params){
						this.sendReply("The Event: \"" + params + "\" has been removed.");
						this.logModCommand(user.name + " removed the Event " + params);
						delete CommandParser.commands[params];
						delete eventList[event];
						fs.writeFileSync('config/events.json', JSON.stringify(eventList));
						break;
					}
				}
			}else{
				return this.sendReply("/event - The Event: \"" + params + "\" does not exist, or was added manually.");
			}
	        /*if (!EventsOn[params]) return this.sendReply("/event - The Event: \"" + params + "\" does not exist, or was added manually.");
	        	this.sendReply("The Event: \"" + params + "\" has been removed.");
				this.logModCommand(user.name + " removed the Event " + params);
				delete CommandParser.commands[params];
				delete EventsOn[params];
				saveEvents();*/
	    },
	    display: function (target, room, user) {
	        if (!this.runBroadcast()) return;
			if (!fs.existsSync('config/events.json')){
				return this.sendReply("No events could be found");
			}
			let eventList = JSON.parse(fs.readFileSync('config/events.json'))
			if (Object.keys(EventsOn).length < 1);
			if(!eventList) return this.sendReply("No events could be found");
	        let display = '<center><strong style="font-size: 20px; font-weight: bold;">Events Running</strong><br><table style="border: solid, 1px, #ffc775; border-collapse: collapse; text-align: center; width:100%;"><tr><th style="background-color: #ff560e ; border: solid, 1px, #ffc775; width: 20%;">Event Name</th><th style="background-color: #ff560e ; border: solid, 1px, #ffc775; width: 60%;">Description</th><th style="background-color: #ff560e ; border: solid, 1px, #ffc775; width: 20%;">Event Room</th>';
	        for (let event in eventList) {
				
					display += '<tr><td style="border: solid, 1px, #ffc775;">' + eventList[event]["DisplayName"] + '</td><td style="border: solid, 1px, #ffc775;">' + eventList[event]["Desc"] + '</td><td style="border: solid, 1px, #ffc775;"><button style="background-color: #ff560e ; border: solid, 1px, #ffc775 ; border-radius: 15px 0px ; color: #ffc775" name="joinRoom" value="' + toId(eventList[event]["Room"]) + '">'  + eventList[event]["Room"] + '</button></td></tr><tr>';
	        }
			
	        this.sendReply('|raw|' + display)
    },
    },
    eventhelp: ['|raw|<div class="infobox">Event Command by <font style="color: orange">Sapience</font> & <font style="color: rgb(170, 100, 8)">RoboPhill</font><br>' +
	            '<ul><li> /event create [name], [description], [room] - Creates, Stores and Declares the event <small>Don\'t use commas in Desc</small></li>' + 
	            '<li> /event remove [name] - Removes said event from being displayed</li>' + 
	            '<li> /event display - Displays all events on at this time</li></div>'],
};
