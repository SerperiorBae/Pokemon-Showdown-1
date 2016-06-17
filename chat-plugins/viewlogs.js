/*
 * Chat log viewer plugin by jd
 */
'use strict';

const fs = require('fs');
const MAX_LINES = 1000;

exports.commands = {
	viewlogs: function (target, room, user) {
		if (!target) return this.sendReply("Usage: /viewlogs [room], [year-month-day / 2014-12-08] - Provides you with a temporary link to view the target rooms chat logs.");
		let targetSplit = target.split(',');
		if (!targetSplit[1]) return this.sendReply("Usage: /viewlogs [room], [year-month-day / 2014-12-08] -Provides you with a temporary link to view the target rooms chat logs.");
		for (let u in targetSplit) targetSplit[u] = targetSplit[u].trim();
		let targetRoom = targetSplit[0];
		if (!user.can('lock') && !user.can('warn', null, Rooms(targetRoom))) return this.errorReply("/viewlogs - Access denied.");
		if (toId(targetRoom) === 'staff' && !user.can('warn')) return this.errorReply("/viewlogs - Access denied.");
		if (toId(targetRoom) === 'administrators' && !user.can('hotpatch')) return this.errorReply("/viewlogs - Access denied.");
		if (toId(targetRoom) === 'upperstaff' && !user.can('pban')) return this.errorReply("/viewlogs - Access denied.");
		if (Rooms(targetRoom) && Rooms(targetRoom).isPrivate && !user.can('pban')) {
			if (Rooms(targetRoom) && Rooms(targetRoom).isPrivate && !user.can('warn', null, Rooms(targetRoom))) return this.errorReply("/viewlogs - Access denied.");
		}
		let date;
		if (toId(targetSplit[1]) === 'today' || toId(targetSplit[1]) === 'yesterday') {
			date = new Date();
			if (toId(targetSplit[1]) === 'yesterday') date.setDate(date.getDate() - 1);
			date = date.toLocaleDateString('en-US', {
				day : 'numeric',
				month : 'numeric',
				year : 'numeric',
			}).split('/').reverse();
			if (date[1] < 10) date[1] = "0" + date[1];
			if (date[2] < 10) date[2] = "0" + date[2];
			targetSplit[1] = date[0] + '-' + date[2] + '-' + date[1];
		}
		date = targetSplit[1];
		let splitDate = date.split('-');
		if (splitDate.length < 3) return this.sendReply("Usage: /viewlogs [room], [year-month-day / 2014-12-08] -Provides you with a temporary link to view the target rooms chat logs.");

		fs.readFile('logs/chat/' + toId(targetRoom) + '/' + splitDate[0] + '-' + splitDate[1] + '/' + date + '.txt', 'utf8', (err, data) => {
			if (err) return this.errorReply("/viewlogs - Error: " + err);
			let filename = require('crypto').randomBytes(4).toString('hex');

			if (!user.can('warn', null, Rooms(targetRoom))) {
				let lines = data.split('\n');
				for (let line in lines) {
					if (lines[line].substr(9).trim().charAt(0) === '(') lines.slice(line, 1);
				}
				data = lines.join('\n');
			}

			data = targetRoom + "|" + date + "|" + JSON.stringify(Wisp.customColors) + "\n" + data;

			fs.writeFile('static/logs/' + filename, data, err => {
				if (err) return this.errorReply("/viewlogs - " + err);
				this.sendReply(
					"|raw|You can view the logs at <a href=\"http://158.69.196.64:" + Config.port +
					"/logs/logviewer.html?file=" + filename + "\">http://158.69.196.64:" + Config.port +
					"/logs/logviewer.html?file=" + filename + "</a>"
				);
				setTimeout(function () {
					fs.unlink('static/logs/' + filename);
				}, 1 * 1000 * 60);
			});
		});
	},

	searchlogs: function (target, room, user) {
		if (!target) return this.parse('/help searchlogs');
		let targets = target.split(',');
		for (let u in targets) targets[u] = targets[u].trim();
		if (!targets[1]) return this.errorReply("Please specify a phrase to search.");

		if (toId(targets[0]) === 'all' && !this.can('hotpatch')) return false;
		if (!Rooms(targets[0]) && !this.can('hotpatch') || !this.can('mute', null, Rooms(targets[0]))) return false;

		let pattern = escapeRegExp(targets[1]).replace(/\\\*/g, '.*');
		let command = 'grep -Rnw \'./logs/chat/' + (toId(targets[0]) === 'all' ? '' : toId(targets[0])) + '\' -e "' + pattern + '"';

		require('child_process').exec(command, function (error, stdout, stderr) {
			if (error && stderr) {
				user.popup("/searchlogs doesn't support Windows.");
				console.log("/searchlogs error: " + error);
				return false;
			}
			if (!stdout) return user.popup('Could not find any logs containing "' + pattern + '".');
			let output = '';
			stdout = stdout.split('\n');
			for (let i = 0; i < stdout.length; i++) {
				if (stdout[i].length < 1 || i > MAX_LINES) continue;
				let file = stdout[i].substr(0, stdout[i].indexOf(':'));
				let lineNumber = stdout[i].split(':')[1];
				let line = stdout[i].split(':');
				line.splice(0, 2);
				line = line.join(':');
				let message = parseMessage(line, user.userid);
				if (message.length < 1) continue;
				output += '<font color="#970097">' + Tools.escapeHTML(file) + '</font><font color="#00AAAA">:</font><font color="#008700">' + lineNumber +
					'</font><font color="#00AAAA">:</font>' + message + '<br />';
			}
			user.send('|popup||wide||html|Displaying last ' + MAX_LINES + ' lines containing "' + Tools.escapeHTML(pattern) + '"' +
				(toId(targets[0]) === 'all' ? '' : ' in "' + Tools.escapeHTML(targets[0]) + '"') + ':<br /><br />' + output);
		});
	},
};

function escapeRegExp(s) {
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function parseMessage(message, user) {
	let timestamp = message.substr(0, 9).trim();
	message = message.substr(9).trim();
	let lineSplit = message.split('|');

	switch (lineSplit[1]) {
	case 'c':
		let name = lineSplit[2];
		if (name === '~') break;
		let highlight = new RegExp("\\b" + toId(user) + "\\b", 'gi');
		let div = "chat";
		if (lineSplit.slice(3).join('|').match(highlight)) div = "chat highlighted";
		message = '<span class="' + div + '"><small>[' + timestamp + ']</small> ' + '<small>' + name.substr(0, 1) +
		'</small><b><font color="' + Wisp.hashColor(name.substr(1)) + '">' + name.substr(1, name.length) + ':</font></b><em>' +
		Wisp.parseMessage(lineSplit.slice(3).join('|')) + '</em></span>';
		break;
	case 'uhtml':
		message = '<span class="notice">' + lineSplit.slice(3).join('|').trim() + '</span>';
		break;
	case 'raw':
	case 'html':
		message = '<span class="notice">' + lineSplit.slice(2).join('|').trim() + '</span>';
		break;
	case '':
		message = '<span class="notice">' + Tools.escapeHTML(lineSplit.slice(1).join('|')) + '</span>';
		break;
	case 'j':
	case 'J':
	case 'l':
	case 'L':
	case 'N':
	case 'unlink':
	case 'userstats':
	case 'tournament':
	case 'uhtmlchange':
		message = "";
		break;
	default:
		message = '<span class="notice">' + Tools.escapeHTML(message) + '</span>';
		break;
	}
	return message;
}
