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
	}
	
	};

Object.merge(CommandParser.commands, components);
