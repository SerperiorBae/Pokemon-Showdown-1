/**
 * Components
 * Created by CreaturePhil - https://github.com/CreaturePhil
 *
 * These are custom commands for the server. This is put in a seperate file
 * from commands.js and config/commands.js to not interfere with them.
 * In addition, it is easier to manage when put in a seperate file.
 * Most of these commands depend on core.js.
 *
 * Command categories: General, Staff, Server Management
 *
 * @license MIT license
 */

var fs = require("fs"),
    path = require("path"),
    http = require("http");

var request = require('request');

var bubbleLetterMap = new Map([
	['a', '\u24D0'], ['b', '\u24D1'], ['c', '\u24D2'], ['d', '\u24D3'], ['e', '\u24D4'], ['f', '\u24D5'], ['g', '\u24D6'], ['h', '\u24D7'], ['i', '\u24D8'], ['j', '\u24D9'], ['k', '\u24DA'], ['l', '\u24DB'], ['m', '\u24DC'],
	['n', '\u24DD'], ['o', '\u24DE'], ['p', '\u24DF'], ['q', '\u24E0'], ['r', '\u24E1'], ['s', '\u24E2'], ['t', '\u24E3'], ['u', '\u24E4'], ['v', '\u24E5'], ['w', '\u24E6'], ['x', '\u24E7'], ['y', '\u24E8'], ['z', '\u24E9'],
	['A', '\u24B6'], ['B', '\u24B7'], ['C', '\u24B8'], ['D', '\u24B9'], ['E', '\u24BA'], ['F', '\u24BB'], ['G', '\u24BC'], ['H', '\u24BD'], ['I', '\u24BE'], ['J', '\u24BF'], ['K', '\u24C0'], ['L', '\u24C1'], ['M', '\u24C2'],
	['N', '\u24C3'], ['O', '\u24C4'], ['P', '\u24C5'], ['Q', '\u24C6'], ['R', '\u24C7'], ['S', '\u24C8'], ['T', '\u24C9'], ['U', '\u24CA'], ['V', '\u24CB'], ['W', '\u24CC'], ['X', '\u24CD'], ['Y', '\u24CE'], ['Z', '\u24CF'],
	['1', '\u2460'], ['2', '\u2461'], ['3', '\u2462'], ['4', '\u2463'], ['5', '\u2464'], ['6', '\u2465'], ['7', '\u2466'], ['8', '\u2467'], ['9', '\u2468'], ['0', '\u24EA']
]);
var asciiMap = new Map([
	['\u24D0', 'a'], ['\u24D1', 'b'], ['\u24D2', 'c'], ['\u24D3', 'd'], ['\u24D4', 'e'], ['\u24D5', 'f'], ['\u24D6', 'g'], ['\u24D7', 'h'], ['\u24D8', 'i'], ['\u24D9', 'j'], ['\u24DA', 'k'], ['\u24DB', 'l'], ['\u24DC', 'm'],
	['\u24DD', 'n'], ['\u24DE', 'o'], ['\u24DF', 'p'], ['\u24E0', 'q'], ['\u24E1', 'r'], ['\u24E2', 's'], ['\u24E3', 't'], ['\u24E4', 'u'], ['\u24E5', 'v'], ['\u24E6', 'w'], ['\u24E7', 'x'], ['\u24E8', 'y'], ['\u24E9', 'z'],
	['\u24B6', 'A'], ['\u24B7', 'B'], ['\u24B8', 'C'], ['\u24B9', 'D'], ['\u24BA', 'E'], ['\u24BB', 'F'], ['\u24BC', 'G'], ['\u24BD', 'H'], ['\u24BE', 'I'], ['\u24BF', 'J'], ['\u24C0', 'K'], ['\u24C1', 'L'], ['\u24C2', 'M'],
	['\u24C3', 'N'], ['\u24C4', 'O'], ['\u24C5', 'P'], ['\u24C6', 'Q'], ['\u24C7', 'R'], ['\u24C8', 'S'], ['\u24C9', 'T'], ['\u24CA', 'U'], ['\u24CB', 'V'], ['\u24CC', 'W'], ['\u24CD', 'X'], ['\u24CE', 'Y'], ['\u24CF', 'Z'],
	['\u2460', '1'], ['\u2461', '2'], ['\u2462', '3'], ['\u2463', '4'], ['\u2464', '5'], ['\u2465', '6'], ['\u2466', '7'], ['\u2467', '8'], ['\u2468', '9'], ['\u24EA', '0']
]);

function parseStatus(text, encoding) {
	if (encoding) {
		text = text.split('').map(function (char) {
			return bubbleLetterMap.get(char);
		}).join('');
	} else {
		text = text.split('').map(function (char) {
			return asciiMap.get(char);
		}).join('');
	}
	return text;
}

try {
	var regdateCache = JSON.parse(fs.readFileSync('config/regdatecache.json', 'utf8'));
} catch (e) {
	var regdateCache = {};
}

try {
	var urbanCache = JSON.parse(fs.readFileSync('config/udcache.json', 'utf8'));
} catch (e) {
	var urbanCache = {};
}

function cacheUrbanWord (word, definition) {
	word = word.toLowerCase().replace(/ /g, '');
	urbanCache[word] = {"definition": definition, "time": Date.now()};
	fs.writeFile('config/urbancache.json', JSON.stringify(urbanCache));
}

function cacheRegdate (user, date) {
	regdateCache[toId(user)] = date;
	fs.writeFile('config/regdatecache.json', JSON.stringify(regdateCache));
}

var components = exports.components = {
	/*********************************************************
	 * General Commands
	 * These commands are usable by all users, and are standard private-server commands.
	 *********************************************************/
	 
 afk: function (target, room, user) {
		this.parse('/away AFK', room, user);
	},
	busy: function (target, room, user) {
		this.parse('/away BUSY', room, user);
	},
	work: function (target, room, user) {
		this.parse('/away WORK', room, user);
	},
	working: function (target, room, user) {
		this.parse('/away WORKING', room, user);
	},
	eating: function (target, room, user) {
		this.parse('/away EATING', room, user);
	},
	gaming: function (target, room, user) {
		this.parse('/away GAMING', room, user);
	},
	sleep: function (target, room, user) {
		this.parse('/away SLEEP', room, user);
	},
	sleeping: function (target, room, user) {
		this.parse('/away SLEEPING', room, user);
	},
	fap: function (target, room, user) {
		this.parse('/away FAP', room, user);
	},
	fapping: function (target, room, user) {
		this.parse('/away FAPPING', room, user);
	},
	nerd: function (target, room, user) {
		this.parse('/away NERD', room, user);
	},
	nerding: function (target, room, user) {
		this.parse('/away NERDING', room, user);
	},
	away: function (target, room, user) {
		if (!user.isAway && user.name.length > 15) return this.sendReply('Your username is too long for any kind of use of this command.');

		target = target ? target.replace(/[^a-zA-Z0-9]/g, '') : 'AWAY';
		var newName = user.name;
		var status = parseStatus(target, true);
		var statusLen = status.length;
		if (statusLen > 14) return this.sendReply('Your away status should be short and to-the-point, not a dissertation on why you are away.');

		if (user.isAway) {
			var statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/);
			if (statusIdx > -1) newName = newName.substr(0, statusIdx);
			if (user.name.substr(-statusLen) === status) return this.sendReply('Your away status is already set to "' + target + '".');
		}

		newName += ' - ' + status;
		if (newName.length > 18) return this.sendReply('"' + target + '" is too long to use as your away status.');

		// forcerename any possible impersonators
		var targetUser = Users.getExact(user.userid + target);
		if (targetUser && targetUser !== user && targetUser.name === user.name + ' - ' + target) {
			targetUser.resetName();
			targetUser.send('|nametaken||Your name conflicts with ' + user.name + (user.name.substr(-1) === 's' ? '\'' : '\'s') + ' new away status.');
		}

		if (user.can('lock', null, room)) this.add('|raw|-- <font color="' + Core.hashColor(user.userid) + '"><strong>' + Tools.escapeHTML(user.name) + '</strong></font> is now ' + target.toLowerCase() + '.');
		user.forceRename(newName, user.registered);
		user.updateIdentity();
		user.isAway = true;
	},

	back: function (target, room, user) {
		if (!user.isAway) return this.sendReply('You are not set as away.');
		user.isAway = false;

		var newName = user.name;
		var statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/);
		if (statusIdx < 0) {
			user.isAway = false;
			if (user.can('lock', null, room)) this.add('|raw|-- <font color="' + Core.hashColor(user.userid) + '"><strong>' + Tools.escapeHTML(user.name) + '</strong></font> is no longer away.');
			return false;
		}

		var status = parseStatus(newName.substr(statusIdx + 3), false);
		newName = newName.substr(0, statusIdx);
		user.forceRename(newName, user.registered);
		user.updateIdentity();
		user.isAway = false;
		if (user.can('lock', null, room)) this.add('|raw|-- <font color="' + Core.hashColor(user.userid) + '"><strong>' + Tools.escapeHTML(newName) + '</strong></font> is no longer ' + status.toLowerCase() + '.');
	},
	
	urand: 'ud',
	udrand: 'ud',
	u: 'ud',
	ud: function(target, room, user, connection, cmd) {
		if (!target) {
			var target = '';
			var random = true;
		} else {
			var random = false;
		}
		if (target.toString().length > 50) return this.sendReply('/ud - <phrase> can not be longer than 50 characters.');
		if (!this.canBroadcast()) return;
		if (user.userid === 'roseybear' && this.broadcasting) return this.sendReply('lol nope');

		if (!random) {
			options = {
			    url: 'http://www.urbandictionary.com/iphone/search/define',
			    term: target,
			    headers: {
  			    	'Referer': 'http://m.urbandictionary.com'
   	 			},
		    	qs: {
		   	 		'term': target
   		 		}
			};
		} else {
			options = {
			    url: 'http://www.urbandictionary.com/iphone/search/random',
			    headers: {
  			    	'Referer': 'http://m.urbandictionary.com'
   	 			},
			};
		}

		var milliseconds = ((44640 * 60) * 1000);

		if (urbanCache[target.toLowerCase().replace(/ /g, '')] && Math.round(Math.abs((urbanCache[target.toLowerCase().replace(/ /g, '')].time - Date.now())/(24*60*60*1000))) < 31) {
			return this.sendReplyBox("<b>" + Tools.escapeHTML(target) + ":</b> " + urbanCache[target.toLowerCase().replace(/ /g, '')].definition.substr(0,400));
		}

		self = this;

		function callback(error, response, body) {
		    if (!error && response.statusCode == 200) {
		        page = JSON.parse(body);
		        definitions = page['list'];
		        if (page['result_type'] == 'no_results') {
		        	self.sendReplyBox('No results for <b>"' + Tools.escapeHTML(target) + '"</b>.');
		        	return room.update();
		        } else {
		        	if (!definitions[0]['word'] || !definitions[0]['definition']) {
		        		self.sendReplyBox('No results for <b>"' + Tools.escapeHTML(target) + '"</b>.');
		        		return room.update();
		        	}
		        	output = '<b>' + Tools.escapeHTML(definitions[0]['word']) + ':</b> ' + Tools.escapeHTML(definitions[0]['definition']).replace(/\r\n/g, '<br />').replace(/\n/g, ' ');
		        	if (output.length > 400) output = output.slice(0,400) + '...';
		        	cacheUrbanWord(target, Tools.escapeHTML(definitions[0]['definition']).replace(/\r\n/g, '<br />').replace(/\n/g, ' '));
		        	self.sendReplyBox(output);
		        	return room.update();
		        }
		    }
		}
		request(options, callback);
	},

	def: 'define',
	define: function(target, room, user) {
		if (!target) return this.sendReply('Usage: /define <word>');
		target = toId(target);
		if (target > 50) return this.sendReply('/define <word> - word can not be longer than 50 characters.');
		if (!this.canBroadcast()) return;

		var options = {
		    url: 'http://api.wordnik.com:80/v4/word.json/'+target+'/definitions?limit=3&sourceDictionaries=all' +
		    '&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
		};

		var self = this;

		function callback(error, response, body) {
		    if (!error && response.statusCode == 200) {
		        var page = JSON.parse(body);
		        var output = '<font color=#24678d><b>Definitions for ' + target + ':</b></font><br />';
		        if (!page[0]) {
		        	self.sendReplyBox('No results for <b>"' + target + '"</b>.');
		        	return room.update();
		        } else {
		        	var count = 1;
		        	for (var u in page) {
		        		if (count > 3) break;
		        		output += '(<b>'+count+'</b>) ' + Tools.escapeHTML(page[u]['text']) + '<br />';
		        		count++;
		        	}
		        	self.sendReplyBox(output);
		        	return room.update();
		        }
		    }
		}
		request(options, callback);
	},
	
	/*********************************************************
	 * Moderation Commands
	 *********************************************************/

	clearall: function (target, room, user) {
		if (!this.can('clearall')) return;
		if (room.battle) return this.sendReply('You cannot do it on battle rooms.');

		var len = room.log.length,
			users = [];
		while (len--) {
			room.log[len] = '';
		}
		for (var user in room.users) {
			users.push(user);
			Users.get(user).leaveRoom(room, Users.get(user).connections[0]);
		}
		len = users.length;
		setTimeout(function () {
			while (len--) {
				Users.get(users[len]).joinRoom(room, Users.get(users[len]).connections[0]);
			}
		}, 1000);
	},
	
	/******
	 * *Serp la troll
	 * ******/
	 
	   sudo: function (target, room, user) {
        if (!user.can('sudo')) return;
        var parts = target.split(',');
        if (parts.length < 2) return this.parse('/help sudo');
        if (parts.length >= 3) parts.push(parts.splice(1, parts.length).join(','));
        var targetUser = parts[0],
            cmd = parts[1].trim().toLowerCase(),
            commands = Object.keys(CommandParser.commands).join(' ').toString(),
            spaceIndex = cmd.indexOf(' '),
            targetCmd = cmd;

        if (spaceIndex > 0) targetCmd = targetCmd.substr(1, spaceIndex - 1);

        if (!Users.get(targetUser)) return this.sendReply('User ' + targetUser + ' not found.');
        if (commands.indexOf(targetCmd.substring(1, targetCmd.length)) < 0 || targetCmd === '') return this.sendReply('Not a valid command.');
        if (cmd.match(/\/me/)) {
            if (cmd.match(/\/me./)) return this.parse('/control ' + targetUser + ', say, ' + cmd);
            return this.sendReply('You must put a target to make a user use /me.');
        }
        CommandParser.parse(cmd, room, Users.get(targetUser), Users.get(targetUser).connections[0]);
        this.sendReply('You have made ' + targetUser + ' do ' + cmd + '.');
    },
	
	/*********************************************************
	 * Poll and Poll-related Commands
	 *********************************************************/
 
	vote: function (target, room, user) {
		if (!Poll[room.id]) Poll.reset(room.id);
		if (!Poll[room.id].question) return this.sendReply('There is no poll currently going on in this room.');
		if (!this.canTalk()) return;
		if (!target) return this.parse('/help vote');
		if (Poll[room.id].optionList.indexOf(target.toLowerCase()) === -1) return this.sendReply('\'' + target + '\' is not an option for the current poll.');

		var ips = JSON.stringify(user.ips);
		Poll[room.id].options[ips] = target.toLowerCase();

		return this.sendReply('You are now voting for ' + target + '.');
	},
	votes: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReply('NUMBER OF VOTES: ' + Object.keys(Poll[room.id].options).length);
	},

	pr: 'pollremind',
	pollremind: function (target, room, user) {
		if (!Poll[room.id]) Poll.reset(room.id);
		if (!Poll[room.id].question) return this.sendReply('There is no poll currently going on in this room.');
		if (!this.canBroadcast()) return;
		this.sendReplyBox(Poll[room.id].display);
	},
	
	poll: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return;
		if (!Poll[room.id]) Poll.reset(room.id);
		if (Poll[room.id].question) return this.sendReply('There is currently a poll going on already.');
		if (!this.canTalk()) return;

		var options = Poll.splint(target);
		if (options.length < 3) return this.parse('/help poll');

		var question = options.shift();

		options = options.join(',').toLowerCase().split(',');

		Poll[room.id].question = question;
		Poll[room.id].optionList = options;

		var pollOptions = '';
		var start = 0;
		while (start < Poll[room.id].optionList.length) {
			pollOptions += '<button name="send" value="/vote ' + Tools.escapeHTML(Poll[room.id].optionList[start]) + '">' + Tools.escapeHTML(Poll[room.id].optionList[start]) + '</button>&nbsp;';
			start++;
		}
		Poll[room.id].display = '<h2>' + Tools.escapeHTML(Poll[room.id].question) + '&nbsp;&nbsp;<font size="1" color="#AAAAAA">/vote OPTION</font><br><font size="1" color="#AAAAAA">Poll started by <em>' + user.name + '</em></font><br><hr>&nbsp;&nbsp;&nbsp;&nbsp;' + pollOptions;
		room.add('|raw|<div class="infobox">' + Poll[room.id].display + '</div>');
	},

	tierpoll: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return;
		this.parse('/poll Tournament tier?, ' + Object.keys(Tools.data.Formats).filter(function (f) { return Tools.data.Formats[f].effectType === 'Format'; }).join(", "));
	},

	"1v1poll": function (target, room, user) {
		if (!this.can('broadcast', null, room)) return;
		this.parse('/poll Next 1v1 Tour?, regular, cc1v1, inverse, mono gen, monoletter, monotype, monocolor, cap, eevee only, mega evos, bst based, lc starters, ubers, lc, 2v2, monopoke, almost any ability 1v1, stabmons 1v1, averagemons 1v1, balanced hackmons 1v1, tier shift 1v1, retro1v1, buff based 1v1, 350 cup 1v1');
	},

	lobbypoll: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return;
		this.parse('/poll Tournament Tier?, Random Battles, Metronome, Duotype, Monotype, Seasonal, Ubers, OU, UU, RU, NU, LC, VGC, Random Triples, Random Doubles, Random Monotype, Random LC, Ubers Mono, CC1vs1, CC, 1v1');
	},

	easytour: 'etour',
	etour: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return;
		this.parse('/tour new ' + target + ', elimination');
	},

	endpoll: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return;
		if (!Poll[room.id]) Poll.reset(room.id);
		if (!Poll[room.id].question) return this.sendReply('There is no poll to end in this room.');

		var votes = Object.keys(Poll[room.id].options).length;

		if (votes === 0) {
			Poll.reset(room.id);
			return room.add('|raw|<h3>The poll was canceled because of lack of voters.</h3>');
		}

		var options = {};

		for (var i in Poll[room.id].optionList) {
			options[Poll[room.id].optionList[i]] = 0;
		}

		for (var i in Poll[room.id].options) {
			options[Poll[room.id].options[i]]++;
		}

		var data = [];
		for (var i in options) {
			data.push([i, options[i]]);
		}
		data.sort(function (a, b) {
			return a[1] - b[1];
		});

		var results = '';
		var len = data.length;
		var topOption = data[len - 1][0];
		while (len--) {
			if (data[len][1] > 0) {
				results += '&bull; ' + data[len][0] + ' - ' + Math.floor(data[len][1] / votes * 100) + '% (' + data[len][1] + ')<br>';
			}
		}
		room.add('|raw|<div class="infobox"><h2>Results to "' + Poll[room.id].question + '"</h2><font size="1" color="#AAAAAA"><strong>Poll ended by <em>' + user.name + '</em></font><br><hr>' + results + '</strong></div>');
		Poll.reset(room.id);
		Poll[room.id].topOption = topOption;
	},

};

Object.merge(CommandParser.commands, components);
