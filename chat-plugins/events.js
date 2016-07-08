//Events Plugin by Robophill & Memeing
'use strict';
const fs = require('fs');
const serialize = require('node-serialize');
let EventsOn = {};
//Event Style Consts//
const EVENT_TOP_STYLE = 'background-color: gray ; border: solid, 1px, darkgray ; border-top-left-radius: 0em ; border-top-right-radius: 6em ; color: white ; font-size: 20px; text-align: center ; text-decoration: underline ; padding: 4px ;';
const EVENT_CENTER_STYLE = 'background-color: white ; border-left: solid, 1px, gray ; border-right: solid, 1px, gray ; color: darkgray; font-size: 12px ; text-align: center ; padding: 8px, 4px ;';
const EVENT_BOTTOM_STYLE = 'background-color: gray ; border: solid, 1px, darkgray ; border-bottom-left-radius: 6em ; border-bottom-right-radius: 0em ; color: white ; font-size: 20px; text-align: center ; text-decoration: underline ; padding: 4px ;';
const EVENT_BUTTON_STYLE = 'background-color: white ; border: double, 4px, darkgray ; color: gray ; margin: 2px ; padding: 2px ; width: 35% ;';
const EVENT_TABLE_STYLE = 'background-color: white ; border: solid, 1px, black ; border-collapse: collapse ; color: gray ; text-align: center ; width:100% ;';
const EVENT_OUTER_TH_STYLE = 'background-color: darkgray ; border: solid, 1px, black ; color: white ; width: 20% ;';
const EVENT_INNER_TH_STYLE = 'background-color: darkgray ; border: solid, 1px, black ; color: white ; width: 60% ;';
const EVENT_TD_STYLE = 'border: solid, 1px, black';
const EVENT_TABLE_BUTTON_STYLE = 'background-color: gray ; border: double, 4px, darkgray ; color: white ; margin: 2px ; padding: 2px ; width: 85%;';

function loadEvents() {
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
	let key, count = 0;
	for (key in eventList) {
		if (eventList.hasOwnProperty(key)) {
			count++;
		}
	}
	eventList[count] = EventsOn;
	fs.writeFileSync('config/events.json', JSON.stringify(eventList));
}
exports.commands = {
	event: {
		create: function (target, room, user) {
			let params = target.split("| ") || target.split("|");
			if (!target || !params[0] || !params[1] || !params[2]) return this.errorReply('Usage: /event create [Name]| [Desc]| [Room]');
			if (params[1].length > 500) return this.errorReply('Descriptions must be a maximum of 500 characters!');
			if (EventsOn[toId(params[0])]) return this.sendReply("/event - The event \"" + params[0] + "\" already exists.");
			if (!this.can('lock')) return false;
			if (!target) return;
			if (!fs.existsSync('config/events.json')) {
				fs.writeFileSync('config/events.json', '{}');
			}
			let eventList = JSON.parse(fs.readFileSync('config/events.json'));
			for (let event in eventList) {
				if (eventList[event]["Name"] === params[0]) {
					return this.sendReply("There is already an Event named " + params[0]);
					break;
				}
			}
			for (let id in Rooms.rooms) {
				if (id !== 'global') Rooms.rooms[id].addRaw('<div style="' + EVENT_TOP_STYLE + '">' + params[0] + '</div><div style="' + EVENT_CENTER_STYLE + '">' + params[1] + '</div><div style="' + EVENT_BOTTOM_STYLE + '"><button style="' + EVENT_BUTTON_STYLE + '" name="joinRoom" value="' + toId(params[2]) + '">' + params[0] + ' Event in here!</button></div>');
			}
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
			if (JSON.stringify(eventList).indexOf(params) >= 0) {
				for (let event in eventList) {
					if (eventList[event]["Name"] === params || eventList[event]["DisplayName"] === params) {
						this.sendReply("The Event: \"" + params + "\" has been removed.");
						delete eventList[event];
						fs.writeFileSync('config/events.json', JSON.stringify(eventList));
						break;
					}
				}
			} else {
				return this.sendReply("/event - The Event: \"" + params + "\" does not exist, or was added manually.");
			}
		},
		display: function (target, room, user) {
			if (!this.runBroadcast()) return;
			if (!fs.existsSync('config/events.json')) {
				return this.sendReply("No events could be found");
			}
			let eventList = JSON.parse(fs.readFileSync('config/events.json'));
			if (Object.keys(EventsOn).length < 1);
			if (!eventList) return this.sendReply("No events could be found");
			let display = '<center><strong style="font-size: 20px; font-weight: bold;">Events Running</strong><br><table style="' + EVENT_TABLE_STYLE + '"><tr><th style="' + EVENT_OUTER_TH_STYLE + '">Event Name</th><th style="' + EVENT_INNER_TH_STYLE + '">Description</th><th style="' + EVENT_OUTER_TH_STYLE + '">Event Room</th>'
			for (let event in eventList) {
				display += '<tr><td style="' + EVENT_TD_STYLE + '">' + eventList[event]["DisplayName"] + '</td><td style="' + EVENT_TD_STYLE + '">' + eventList[event]["Desc"] + '</td><td style="' + EVENT_TD_STYLE + '"><button style="' + EVENT_TABLE_BUTTON_STYLE + '" name="joinRoom" value="' + toId(eventList[event]["Room"]) + '">' + eventList[event]["Room"] + '</button></td></tr><tr>';
			}
			this.sendReply('|raw|' + display);
		},
	},
	eventhelp: ['Event Command by Memeing & RoboPhill',
	'- /event create [name]| [description]| [room] - Creates, Stores and Declares the event.',
	'- /event remove [name] - Removes said event from being displayed.',
	'- /event display - Displays all events on at this time.'],
};
