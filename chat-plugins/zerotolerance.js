//Zero Tolerance Plugin for Marketplace Staff by Skyla (Full)
'use strict';
const fs = require('fs');
const serialize = require('node-serialize');
let ZeroTolUsers = {};
//Table Style Consts - Borrowed from Events xaa//
const TABLE_STYLE = 'background-color: white ; border: solid, 1px, black ; border-collapse: collapse ; color: gray ; text-align: center ; width:100% ;';
const OUTER_TH_STYLE = 'background-color: darkgray ; border: solid, 1px, black ; color: white ; width: 25% ;';
const INNER_TH_STYLE = 'background-color: darkgray ; border: solid, 1px, black ; color: white ; width: 75% ;';
const TD_STYLE = 'border: solid, 1px, black';

function loadUsers() {
	try {
		ZeroTolUsers = serialize.unserialize(fs.readFileSync('config/zerotol.json', 'utf8'));
	} catch (e) {}
}
setTimeout(function load() {
	loadUsers();
}, 1000);

function saveUsers() {
	let UserList = JSON.parse(fs.readFileSync('config/zerotol.json'));
	let key, count = 0;
	for (key in UserList) {
		if (UserList.hasOwnProperty(key)) {
			count++;
		}
	}
	UserList[count] = ZeroTolUsers;
	fs.writeFileSync('config/zerotol.json', JSON.stringify(UserList));
}
exports.commands = {
  zerotol: "0tol",
	0tol: {
		create: function (target, room, user) {
			let params = target.split("| ") || target.split("|");
			if (!this.can('mute', null, room)) return this.errorReply('/0tol - Access denied.');
			if (room.id !== 'marketplace' || room.id !== 'marketplacestaff') return this.errorReply('This command can only be used in Marketplace Staff');
			if (!target || !params[0] || !params[1]) return this.errorReply('Usage: /0tol add [Name]| [Reason]');
			if (params[1].length > 500) return this.errorReply('Reasons must be a maximum of 500 characters!');
			if (ZeroTolUsers[toId(params[0])]) return this.sendReply("/0tol - The User: \"" + params[0] + "\" is already on the Zero Tolerance List.");
			if (!target) return;
			if (!fs.existsSync('config/zerotol.json')) {
				fs.writeFileSync('config/zerotol.json', '{}');
			}
			let UserList = JSON.parse(fs.readFileSync('config/zerotol.json'));
			for (let zerotol in UserList) {
				if (UserList[zerotol]["Name"] === params[0]) {
					return this.sendReply("There is already an User named: " + params[0] + " on the Zero Tolerance List.");
				}
			}
			ZeroTolUsers["Name"] = toId(params[0]);
			ZeroTolUsers["DisplayName"] = params[0];
			ZeroTolUsers["Reason"] = params[1];
			saveUsers();
		},
		remove: function (target, room, user) {
			if (!this.can('mute', null, room)) return this.errorReply('/0tol - Access denied.');
			if (room.id !== 'marketplace' || room.id !== 'marketplacestaff') return this.errorReply('This command can only be used in Marketplace Staff');
			let params = toId(target);
			if (!target) return this.errorReply('Usage: /0tol remove [Name]');
			let UserList = JSON.parse(fs.readFileSync('config/zerotol.json'));
			if (JSON.stringify(UserList).indexOf(params) >= 0) {
				for (let zerotol in UserList) {
					if (UserList[zerotol]["Name"] === params || UserList[zerotol]["DisplayName"] === params) {
						this.sendReply("The User: \"" + params + "\" has been removed from the Zero Tolerance List.");
						delete UserList[zerotol];
						fs.writeFileSync('config/zerotol.json', JSON.stringify(UserList));
						break;
					}
				}
			} else {
				return this.sendReply("/0tol - The User: \"" + params + "\" is not on the Zero Tolerance List");
			}
		},
		display: function (target, room, user) {
			if (!this.can('mute', null, room)) return this.errorReply('/0tol - Access denied.');
			if (room.id !== 'marketplace' || room.id !== 'marketplacestaff') return this.errorReply('This command can only be used in Marketplace Staff');
			if (!this.runBroadcast()) return;
			if (!fs.existsSync('config/zerotol.json')) {
				return this.sendReply("No users could be found.");
			}
			let UserList = JSON.parse(fs.readFileSync('config/zerotol.json'));
			if (Object.keys(ZeroTolUsers).length < 1 || !UserList) {
				return this.sendReply("No users could be found.");
			}
			let display = '<center><strong style="font-size: 20px; font-weight: bold;">Zero Tolerance Users</strong><br><table style="' + TABLE_STYLE + '"><tr><th style="' + OUTER_TH_STYLE + '">User Name</th><th style="' + INNER_TH_STYLE + '">Reason</th>';
			for (let zerotol in UserList) {
				display += '<tr><td style="' + TD_STYLE + '">' + UserList[zerotol]["DisplayName"] + '</td><td style="' + TD_STYLE + '">' + UserList[zerotol]["Reason"] + '</td></tr><tr>';
			}
			this.sendReply('|raw|' + display);
		},
	},
	0tolhelp: ['Event Command by Skyla (Full)',
	'- /0tol create [name]| [description] - Creates and stores an entry in the Zero Tolerance Database.',
	'- /0tol remove [name] - Removes user from Zero Tolerance Database.',
	'- /0tol display - Displays all Zero Tolerance Users.'],
};
