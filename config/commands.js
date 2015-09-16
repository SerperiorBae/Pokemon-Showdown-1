/**
 * Commands
 * Pokemon Showdown - https://pokemonshowdown.com/
 *
 * These are commands. For instance, you can define the command 'whois'
 * here, then use it by typing /whois into Pokemon Showdown.k
 *
 * A command can be in the form:
 *   ip: 'whois',
 * This is called an alias: it makes it so /ip does the same thing as
 * /whois.
 *
 * But to actually define a command, it's a function:
 *
 *   allowchallenges: function (target, room, user) {
 *     user.blockChallenges = false;
 *     this.sendReply("You are available for challenges from now on.");
 *   }
 *
 * Commands are actually passed five parameters:
 *   function (target, room, user, connection, cmd, message)
 * Most of the time, you only need the first three, though.
 *
 * target = the part of the message after the command
 * room = the room object the message was sent to
 *   The room name is room.id
 * user = the user object that sent the message
 *   The user's name is user.name
 * connection = the connection that the message was sent from
 * cmd = the name of the command
 * message = the entire message sent by the user
 *
 * If a user types in "/msg zarel, hello"
 *   target = "zarel, hello"
 *   cmd = "msg"
 *   message = "/msg zarel, hello"
 *
 * Commands return the message the user should say. If they don't
 * return anything or return something falsy, the user won't say
 * anything.
 *
 * Commands have access to the following functions:
 *
 * this.sendReply(message)
 *   Sends a message back to the room the user typed the command into.
 *
 * this.sendReplyBox(html)
 *   Same as sendReply, but shows it in a box, and you can put HTML in
 *   it.
 *
 * this.popupReply(message)
 *   Shows a popup in the window the user typed the command into.
 *
 * this.add(message)
 *   Adds a message to the room so that everyone can see it.
 *   This is like this.sendReply, except everyone in the room gets it,
 *   instead of just the user that typed the command.
 *
 * this.send(message)
 *   Sends a message to the room so that everyone can see it.
 *   This is like this.add, except it's not logged, and users who join
 *   the room later won't see it in the log, and if it's a battle, it
 *   won't show up in saved replays.
 *   You USUALLY want to use this.add instead.
 *
 * this.logEntry(message)
 *   Log a message to the room's log without sending it to anyone. This
 *   is like this.add, except no one will see it.
 *
 * this.addModCommand(message)
 *   Like this.add, but also logs the message to the moderator log
 *   which can be seen with /modlog.
 *
 * this.logModCommand(message)
 *   Like this.addModCommand, except users in the room won't see it.
 *
 * this.can(permission)
 * this.can(permission, targetUser)
 *   Checks if the user has the permission to do something, or if a
 *   targetUser is passed, check if the user has permission to do
 *   it to that user. Will automatically give the user an "Access
 *   denied" message if the user doesn't have permission: use
 *   user.can() if you don't want that message.
 *
 *   Should usually be near the top of the command, like:
 *     if (!this.can('potd')) return false;
 *
 * this.canBroadcast()
 *   Signifies that a message can be broadcast, as long as the user
 *   has permission to. This will check to see if the user used
 *   "!command" instead of "/command". If so, it will check to see
 *   if the user has permission to broadcast (by default, voice+ can),
 *   and return false if not. Otherwise, it will add the message to
 *   the room, and turn on the flag this.broadcasting, so that
 *   this.sendReply and this.sendReplyBox will broadcast to the room
 *   instead of just the user that used the command.
 *
 *   Should usually be near the top of the command, like:
 *     if (!this.canBroadcast()) return false;
 *
 * this.canBroadcast(suppressMessage)
 *   Functionally the same as this.canBroadcast(). However, it
 *   will look as if the user had written the text suppressMessage.
 *
 * this.canTalk()
 *   Checks to see if the user can speak in the room. Returns false
 *   if the user can't speak (is muted, the room has modchat on, etc),
 *   or true otherwise.
 *
 *   Should usually be near the top of the command, like:
 *     if (!this.canTalk()) return false;
 *
 * this.canTalk(message, room)
 *   Checks to see if the user can say the message in the room.
 *   If a room is not specified, it will default to the current one.
 *   If it has a falsy value, the check won't be attached to any room.
 *   In addition to running the checks from this.canTalk(), it also
 *   checks to see if the message has any banned words, is too long,
 *   or was just sent by the user. Returns the filtered message, or a
 *   falsy value if the user can't speak.
 *
 *   Should usually be near the top of the command, like:
 *     target = this.canTalk(target);
 *     if (!target) return false;
 *
 * this.parse(message)
 *   Runs the message as if the user had typed it in.
 *
 *   Mostly useful for giving help messages, like for commands that
 *   require a target:
 *     if (!target) return this.parse('/help msg');
 *
 *   After 10 levels of recursion (calling this.parse from a command
 *   called by this.parse from a command called by this.parse etc)
 *   we will assume it's a bug in your command and error out.
 *
 * this.targetUserOrSelf(target, exactName)
 *   If target is blank, returns the user that sent the message.
 *   Otherwise, returns the user with the username in target, or
 *   a falsy value if no user with that username exists.
 *   By default, this will track users across name changes. However,
 *   if exactName is true, it will enforce exact matches.
 *
 * this.getLastIdOf(user)
 *   Returns the last userid of an specified user.
 *
 * this.splitTarget(target, exactName)
 *   Splits a target in the form "user, message" into its
 *   constituent parts. Returns message, and sets this.targetUser to
 *   the user, and this.targetUsername to the username.
 *   By default, this will track users across name changes. However,
 *   if exactName is true, it will enforce exact matches.
 *
 *   Remember to check if this.targetUser exists before going further.
 *
 * Unless otherwise specified, these functions will return undefined,
 * so you can return this.sendReply or something to send a reply and
 * stop the command there.
 *
 * @license MIT license
 */

var commands = exports.commands = {

	ip: 'whois',
	rooms: 'whois',
	alt: 'whois',
	alts: 'whois',
	whoare: 'whois',
	whois: function (target, room, user, connection, cmd) {
		var targetUser = this.targetUserOrSelf(target, user.group === ' ');
		if (!targetUser) {
			return this.sendReply("User " + this.targetUsername + " not found.");
		}

		this.sendReply("|raw|User: " + targetUser.name + (!targetUser.connected ? ' <font color="gray"><em>(offline)</em></font>' : ''));
		if (user.can('alts', targetUser)) {
			var alts = targetUser.getAlts(true);
			var output = Object.keys(targetUser.prevNames).join(", ");
			if (output) this.sendReply("Previous names: " + output);

			for (var j = 0; j < alts.length; ++j) {
				var targetAlt = Users.get(alts[j]);
				if (!targetAlt.named && !targetAlt.connected) continue;
				if (targetAlt.group === '~' && user.group !== '~') continue;

				this.sendReply("|raw|Alt: " + targetAlt.name + (!targetAlt.connected ? ' <font color="gray"><em>(offline)</em></font>' : ''));
				output = Object.keys(targetAlt.prevNames).join(", ");
				if (output) this.sendReply("Previous names: " + output);
			}
			if (targetUser.locked) {
				switch (targetUser.locked) {
				case '#dnsbl':
					this.sendReply("Locked: IP is in a DNS-based blacklist. ");
					break;
				case '#range':
					this.sendReply("Locked: IP or host is in a temporary range-lock.");
					break;
				case '#hostfilter':
					this.sendReply("Locked: host is permanently locked for being a proxy.");
					break;
				default:
					this.sendReply("Locked under the username: " + targetUser.locked);
				}
			}
		}
		if (Config.groups[targetUser.group] && Config.groups[targetUser.group].name) {
			this.sendReply("Group: " + Config.groups[targetUser.group].name + " (" + targetUser.group + ")");
		}
		if (targetUser.isSysop) {
			this.sendReply("(Pok\xE9mon Showdown System Operator)");
		}
		if (!targetUser.authenticated) {
			this.sendReply("(Unregistered)");
		}
		if ((cmd === 'ip' || cmd === 'whoare') && (user.can('ip', targetUser) || user === targetUser)) {
			var ips = Object.keys(targetUser.ips);
			this.sendReply("IP" + ((ips.length > 1) ? "s" : "") + ": " + ips.join(", ") +
					(user.group !== ' ' && targetUser.latestHost ? "\nHost: " + targetUser.latestHost : ""));
		}
		var publicrooms = "In rooms: ";
		var hiddenrooms = "In hidden rooms: ";
		var first = true;
		var hiddencount = 0;
		for (var i in targetUser.roomCount) {
			var targetRoom = Rooms.get(i);
			if (i === 'global' || targetRoom.isPrivate === true) continue;

			var output = (targetRoom.auth && targetRoom.auth[targetUser.userid] ? targetRoom.auth[targetUser.userid] : '') + '<a href="/' + i + '" room="' + i + '">' + i + '</a>';
			if (targetRoom.isPrivate) {
				if (hiddencount > 0) hiddenrooms += " | ";
				++hiddencount;
				hiddenrooms += output;
			} else {
				if (!first) publicrooms += " | ";
				first = false;
				publicrooms += output;
			}
		}
		this.sendReply('|raw|' + publicrooms);
		if (cmd === 'whoare' && user.can('lock') && hiddencount > 0) {
			this.sendReply('|raw|' + hiddenrooms);
		}
	},

	ipsearchall: 'ipsearch',
	ipsearch: function (target, room, user, connection, cmd) {
		if (!this.can('rangeban')) return;
		var results = [];
		this.sendReply("Users with IP " + target + ":");

		var isRange;
		if (target.slice(-1) === '*') {
			isRange = true;
			target = target.slice(0, -1);
		}
		var isAll = (cmd === 'ipsearchall');

		if (isRange) {
			for (var userid in Users.users) {
				var curUser = Users.users[userid];
				if (curUser.group === '~') continue;
				if (!curUser.latestIp.startsWith(target)) continue;
				if (results.push((curUser.connected ? " + " : "-") + " " + curUser.name) > 100 && !isAll) {
					return this.sendReply("More than 100 users match the specified IP range. Use /ipsearchall to retrieve the full list.");
				}
			}
		} else {
			for (var userid in Users.users) {
				var curUser = Users.users[userid];
				if (curUser.latestIp === target) {
					results.push((curUser.connected ? " + " : "-") + " " + curUser.name);
				}
			}
		}
		if (!results.length) return this.sendReply("No results found.");
		return this.sendReply(results.join('; '));
	},

	/*********************************************************
	 * Shortcuts
	 *********************************************************/

	invite: function (target, room, user) {
		target = this.splitTarget(target);
		if (!this.targetUser) {
			return this.sendReply("User " + this.targetUsername + " not found.");
		}
		var targetRoom = (target ? Rooms.search(target) : room);
		if (!targetRoom) {
			return this.sendReply("Room " + target + " not found.");
		}
		return this.parse('/msg ' + this.targetUsername + ', /invite ' + targetRoom.id);
	},

	/*********************************************************
	 * Informational commands
	 *********************************************************/

	pstats: 'data',
	stats: 'data',
	dex: 'data',
	pokedex: 'data',
	details: 'data',
	dt: 'data',
	data: function (target, room, user, connection, cmd) {
		if (!this.canBroadcast()) return;

		var buffer = '';
		var targetId = toId(target);
		if (targetId === '' + parseInt(targetId)) {
			for (var p in Tools.data.Pokedex) {
				var pokemon = Tools.getTemplate(p);
				if (pokemon.num === parseInt(target)) {
					target = pokemon.species;
					targetId = pokemon.id;
					break;
				}
			}
		}
		var newTargets = Tools.dataSearch(target);
		var showDetails = (cmd === 'dt' || cmd === 'details');
		if (newTargets && newTargets.length) {
			for (var i = 0; i < newTargets.length; ++i) {
				if (newTargets[i].id !== targetId && !Tools.data.Aliases[targetId] && !i) {
					buffer = "No Pokemon, item, move, ability or nature named '" + target + "' was found. Showing the data of '" + newTargets[0].name + "' instead.\n";
				}
				if (newTargets[i].searchType === 'nature') {
					buffer += "" + newTargets[i].name + " nature: ";
					if (newTargets[i].plus) {
						var statNames = {'atk': "Attack", 'def': "Defense", 'spa': "Special Attack", 'spd': "Special Defense", 'spe': "Speed"};
						buffer += "+10% " + statNames[newTargets[i].plus] + ", -10% " + statNames[newTargets[i].minus] + ".";
					} else {
						buffer += "No effect.";
					}
					return this.sendReply(buffer);
				} else {
					buffer += '|c|~|/data-' + newTargets[i].searchType + ' ' + newTargets[i].name + '\n';
				}
			}
		} else {
			return this.sendReply("No Pokemon, item, move, ability or nature named '" + target + "' was found. (Check your spelling?)");
		}

		if (showDetails) {
			var details;
			if (newTargets[0].searchType === 'pokemon') {
				var pokemon = Tools.getTemplate(newTargets[0].name);
				var weighthit = 20;
				if (pokemon.weightkg >= 200) {
					weighthit = 120;
				} else if (pokemon.weightkg >= 100) {
					weighthit = 100;
				} else if (pokemon.weightkg >= 50) {
					weighthit = 80;
				} else if (pokemon.weightkg >= 25) {
					weighthit = 60;
				} else if (pokemon.weightkg >= 10) {
					weighthit = 40;
				}
				details = {
					"Dex#": pokemon.num,
					"Height": pokemon.heightm + " m",
					"Weight": pokemon.weightkg + " kg <em>(" + weighthit + " BP)</em>",
					"Dex Colour": pokemon.color,
					"Egg Group(s)": pokemon.eggGroups.join(", ")
				};
				if (!pokemon.evos.length) {
					details["<font color=#585858>Does Not Evolve</font>"] = "";
				} else {
					details["Evolution"] = pokemon.evos.map(function (evo) {
						evo = Tools.getTemplate(evo);
						return evo.name + " (" + evo.evoLevel + ")";
					}).join(", ");
				}
			} else if (newTargets[0].searchType === 'move') {
				var move = Tools.getMove(newTargets[0].name);
				details = {
					"Priority": move.priority
				};

				if (move.secondary || move.secondaries) details["<font color=black>&#10003; Secondary effect</font>"] = "";
				if (move.flags['contact']) details["<font color=black>&#10003; Contact</font>"] = "";
				if (move.flags['sound']) details["<font color=black>&#10003; Sound</font>"] = "";
				if (move.flags['bullet']) details["<font color=black>&#10003; Bullet</font>"] = "";
				if (move.flags['pulse']) details["<font color=black>&#10003; Pulse</font>"] = "";
				if (move.flags['protect']) details["<font color=black>&#10003; Blocked by Protect</font>"] = "";
				if (move.flags['authentic']) details["<font color=black>&#10003; Ignores substitutes</font>"] = "";
				if (move.flags['defrost']) details["<font color=black>&#10003; Thaws user</font>"] = "";
				if (move.flags['bite']) details["<font color=black>&#10003; Bite</font>"] = "";
				if (move.flags['punch']) details["<font color=black>&#10003; Punch</font>"] = "";
				if (move.flags['powder']) details["<font color=black>&#10003; Powder</font>"] = "";
				if (move.flags['reflectable']) details["<font color=black>&#10003; Bounceable</font>"] = "";

				details["Target"] = {
					'normal': "One Adjacent Pokemon",
					'self': "User",
					'adjacentAlly': "One Ally",
					'adjacentAllyOrSelf': "User or Ally",
					'adjacentFoe': "One Adjacent Opposing Pokemon",
					'allAdjacentFoes': "All Adjacent Opponents",
					'foeSide': "Opposing Side",
					'allySide': "User's Side",
					'allyTeam': "User's Side",
					'allAdjacent': "All Adjacent Pokemon",
					'any': "Any Pokemon",
					'all': "All Pokemon"
				}[move.target] || "Unknown";
			} else if (newTargets[0].searchType === 'item') {
				var item = Tools.getItem(newTargets[0].name);
				details = {};
				if (item.fling) {
					details["Fling Base Power"] = item.fling.basePower;
					if (item.fling.status) details["Fling Effect"] = item.fling.status;
					if (item.fling.volatileStatus) details["Fling Effect"] = item.fling.volatileStatus;
					if (item.isBerry) details["Fling Effect"] = "Activates the Berry's effect on the target.";
					if (item.id === 'whiteherb') details["Fling Effect"] = "Restores the target's negative stat stages to 0.";
					if (item.id === 'mentalherb') details["Fling Effect"] = "Removes the effects of Attract, Disable, Encore, Heal Block, Taunt, and Torment from the target.";
				} else {
					details["Fling"] = "This item cannot be used with Fling.";
				}
				if (item.naturalGift) {
					details["Natural Gift Type"] = item.naturalGift.type;
					details["Natural Gift Base Power"] = item.naturalGift.basePower;
				}
			} else {
				details = {};
			}

			buffer += '|raw|<font size="1">' + Object.keys(details).map(function (detail) {
				return '<font color=#585858>' + detail + (details[detail] !== '' ? ':</font> ' + details[detail] : '</font>');
			}).join("&nbsp;|&ThickSpace;") + '</font>';
		}
		this.sendReply(buffer);
	},

	ds: 'dexsearch',
	dsearch: 'dexsearch',
	dexsearch: function (target, room, user) {
		if (!this.canBroadcast()) return;

		if (!target) return this.parse('/help dexsearch');
		var targets = target.split(',');
		var searches = {};
		var allTiers = {'uber':1, 'ou':1, 'bl':1, 'uu':1, 'bl2':1, 'ru':1, 'bl3':1, 'nu':1, 'bl4':1, 'pu':1, 'nfe':1, 'lc':1, 'cap':1};
		var allColours = {'green':1, 'red':1, 'blue':1, 'white':1, 'brown':1, 'yellow':1, 'purple':1, 'pink':1, 'gray':1, 'black':1};
		var showAll = false;
		var megaSearch = null;
		var recoverySearch = null;
		var output = 10;

		for (var i in targets) {
			var isNotSearch = false;
			target = targets[i].trim().toLowerCase();
			if (target.slice(0, 1) === '!') {
				isNotSearch = true;
				target = target.slice(1);
			}

			var targetAbility = Tools.getAbility(targets[i]);
			if (targetAbility.exists) {
				if (!searches['ability']) searches['ability'] = {};
				if (Object.count(searches['ability'], true) === 1 && !isNotSearch) return this.sendReplyBox("Specify only one ability.");
				if ((searches['ability'][targetAbility.name] && isNotSearch) || (searches['ability'][targetAbility.name] === false && !isNotSearch)) return this.sendReplyBox("A search cannot both exclude and include an ability.");
				searches['ability'][targetAbility.name] = !isNotSearch;
				continue;
			}

			if (target in allTiers) {
				if (!searches['tier']) searches['tier'] = {};
				if ((searches['tier'][target] && isNotSearch) || (searches['tier'][target] === false && !isNotSearch)) return this.sendReplyBox('A search cannot both exclude and include a tier.');
				searches['tier'][target] = !isNotSearch;
				continue;
			}

			if (target in allColours) {
				if (!searches['color']) searches['color'] = {};
				if ((searches['color'][target] && isNotSearch) || (searches['color'][target] === false && !isNotSearch)) return this.sendReplyBox('A search cannot both exclude and include a color.');
				searches['color'][target] = !isNotSearch;
				continue;
			}

			var targetInt = parseInt(target);
			if (0 < targetInt && targetInt < 7) {
				if (!searches['gen']) searches['gen'] = {};
				if ((searches['gen'][target] && isNotSearch) || (searches['gen'][target] === false && !isNotSearch)) return this.sendReplyBox('A search cannot both exclude and include a generation.');
				searches['gen'][target] = !isNotSearch;
				continue;
			}

			if (target === 'all') {
				if (this.broadcasting) {
					return this.sendReplyBox("A search with the parameter 'all' cannot be broadcast.");
				}
				showAll = true;
				continue;
			}

			if (target === 'megas' || target === 'mega') {
				if ((megaSearch && isNotSearch) || (megaSearch === false && !isNotSearch)) return this.sendReplyBox('A search cannot both exclude and include Mega Evolutions.');
				megaSearch = !isNotSearch;
				continue;
			}

			if (target === 'recovery') {
				if ((recoverySearch && isNotSearch) || (recoverySearch === false && !isNotSearch)) return this.sendReplyBox('A search cannot both exclude and recovery moves.');
				if (!searches['recovery']) searches['recovery'] = {};
				recoverySearch = !isNotSearch;
				continue;
			}

			var targetMove = Tools.getMove(target);
			if (targetMove.exists) {
				if (!searches['moves']) searches['moves'] = {};
				if (Object.count(searches['moves'], true) === 4 && !isNotSearch) return this.sendReplyBox("Specify a maximum of 4 moves.");
				if ((searches['moves'][targetMove.name] && isNotSearch) || (searches['moves'][targetMove.name] === false && !isNotSearch)) return this.sendReplyBox("A search cannot both exclude and include a move.");
				searches['moves'][targetMove.name] = !isNotSearch;
				continue;
			}

			if (target.indexOf(' type') > -1) {
				target = target.charAt(0).toUpperCase() + target.slice(1, target.indexOf(' type'));
				if (target in Tools.data.TypeChart) {
					if (!searches['types']) searches['types'] = {};
					if (Object.count(searches['types'], true) === 4 && !isNotSearch) return this.sendReplyBox("Specify a maximum of four types.");
					if ((searches['types'][target] && isNotSearch) || (searches['types'][target] === false && !isNotSearch)) return this.sendReplyBox("A search cannot both exclude and include a type.");
					searches['types'][target] = !isNotSearch;
					continue;
				}
			}
			return this.sendReplyBox("'" + Tools.escapeHTML(target) + "' could not be found in any of the search categories.");
		}

		if (showAll && Object.size(searches) === 0 && megaSearch === null) return this.sendReplyBox("No search parameters other than 'all' were found. Try '/help dexsearch' for more information on this command.");

		var dex = {};
		for (var pokemon in Tools.data.Pokedex) {
			var template = Tools.getTemplate(pokemon);
			var megaSearchResult = (megaSearch === null || (megaSearch === true && template.isMega) || (megaSearch === false && !template.isMega));
			if (template.tier !== 'Unreleased' && template.tier !== 'Illegal' && (template.tier !== 'CAP' || (searches['tier'] && searches['tier']['cap'])) &&
				megaSearchResult) {
				dex[pokemon] = template;
			}
		}

		for (var search in {'moves':1, 'recovery':1, 'types':1, 'ability':1, 'tier':1, 'gen':1, 'color':1}) {
			if (!searches[search]) continue;
			switch (search) {
				case 'types':
					for (var mon in dex) {
						if (Object.count(searches[search], true) === 3) {
							if (!(searches[search][dex[mon].types[0]]) || !(searches[search][dex[mon].types[1]])) delete dex[mon];
						} else {
							if (searches[search][dex[mon].types[0]] === false || searches[search][dex[mon].types[1]] === false || (Object.count(searches[search], true) > 0 &&
								(!(searches[search][dex[mon].types[0]]) && !(searches[search][dex[mon].types[1]])))) delete dex[mon];
						}
					}
					break;

				case 'tier':
					for (var mon in dex) {
						if ('lc' in searches[search]) {
							// some LC legal Pokemon are stored in other tiers (Ferroseed/Murkrow etc)
							// this checks for LC legality using the going criteria, instead of dex[mon].tier
							var isLC = (dex[mon].evos && dex[mon].evos.length > 0) && !dex[mon].prevo && Tools.data.Formats['lc'].banlist.indexOf(dex[mon].species) === -1;
							if ((searches[search]['lc'] && !isLC) || (!searches[search]['lc'] && isLC)) {
								delete dex[mon];
								continue;
							}
						}
						if (searches[search][String(dex[mon][search]).toLowerCase()] === false) {
							delete dex[mon];
						} else if (Object.count(searches[search], true) > 0 && !searches[search][String(dex[mon][search]).toLowerCase()]) delete dex[mon];
					}
					break;

				case 'gen':
				case 'color':
					for (var mon in dex) {
						if (searches[search][String(dex[mon][search]).toLowerCase()] === false) {
							delete dex[mon];
						} else if (Object.count(searches[search], true) > 0 && !searches[search][String(dex[mon][search]).toLowerCase()]) delete dex[mon];
					}
					break;

				case 'ability':
					for (var mon in dex) {
						for (var ability in searches[search]) {
							var needsAbility = searches[search][ability];
							var hasAbility = Object.count(dex[mon].abilities, ability) > 0;
							if (hasAbility !== needsAbility) {
								delete dex[mon];
								break;
							}
						}
					}
					break;

				case 'moves':
					for (var mon in dex) {
						var template = Tools.getTemplate(dex[mon].id);
						if (!template.learnset) template = Tools.getTemplate(template.baseSpecies);
						if (!template.learnset) continue;
						for (var i in searches[search]) {
							var move = Tools.getMove(i);
							if (!move.exists) return this.sendReplyBox("'" + move + "' is not a known move.");
							var prevoTemp = Tools.getTemplate(template.id);
							while (prevoTemp.prevo && prevoTemp.learnset && !(prevoTemp.learnset[move.id])) {
								prevoTemp = Tools.getTemplate(prevoTemp.prevo);
							}
							var canLearn = (prevoTemp.learnset.sketch && !(move.id in {'chatter':1, 'struggle':1, 'magikarpsrevenge':1})) || prevoTemp.learnset[move.id];
							if ((!canLearn && searches[search][i]) || (searches[search][i] === false && canLearn)) delete dex[mon];
						}
					}
					break;

				case 'recovery':
					for (var mon in dex) {
						var template = Tools.getTemplate(dex[mon].id);
						if (!template.learnset) template = Tools.getTemplate(template.baseSpecies);
						if (!template.learnset) continue;
						var recoveryMoves = ["recover", "roost", "moonlight", "morningsun", "synthesis", "milkdrink", "slackoff", "softboiled", "wish", "healorder"];
						var canLearn = false;
						for (var i = 0; i < recoveryMoves.length; i++) {
							var prevoTemp = Tools.getTemplate(template.id);
							while (prevoTemp.prevo && prevoTemp.learnset && !(prevoTemp.learnset[recoveryMoves[i]])) {
								prevoTemp = Tools.getTemplate(prevoTemp.prevo);
							}
							canLearn = (prevoTemp.learnset.sketch) || prevoTemp.learnset[recoveryMoves[i]];
							if (canLearn) break;
						}
						if ((!canLearn && searches[search]) || (searches[search] === false && canLearn)) delete dex[mon];
					}
					break;

				default:
					return this.sendReplyBox("Something broke! PM TalkTakesTime here or on the Smogon forums with the command you tried.");
			}
		}

		var results = Object.keys(dex).map(function (speciesid) {return dex[speciesid].species;});
		results = results.filter(function (species) {
			var template = Tools.getTemplate(species);
			return !(species !== template.baseSpecies && results.indexOf(template.baseSpecies) > -1);
		});
		var resultsStr = "";
		if (results.length > 0) {
			if (showAll || results.length <= output) {
				results.sort();
				resultsStr = results.join(", ");
			} else {
				results.randomize();
				resultsStr = results.slice(0, 10).join(", ") + ", and " + string(results.length - output) + " more. Redo the search with 'all' as a search parameter to show all results.";
			}
		} else {
			resultsStr = "No PokÃ©mon found.";
		}
		return this.sendReplyBox(resultsStr);
	},

	learnset: 'learn',
	learnall: 'learn',
	learn5: 'learn',
	g6learn: 'learn',
	rbylearn: 'learn',
	gsclearn: 'learn',
	advlearn: 'learn',
	dpplearn: 'learn',
	bw2learn: 'learn',
	learn: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help learn');

		if (!this.canBroadcast()) return;

		var lsetData = {set:{}};
		var targets = target.split(',');
		var template = Tools.getTemplate(targets[0]);
		var move = {};
		var problem;
		var format = {rby:'gen1ou', gsc:'gen2ou', adv:'gen3oubeta', dpp:'gen4ou', bw2:'gen5ou'}[cmd.substring(0, 3)];
		var all = (cmd === 'learnall');
		if (cmd === 'learn5') lsetData.set.level = 5;
		if (cmd === 'g6learn') lsetData.format = {noPokebank: true};

		if (!template.exists) {
			return this.sendReply("Pokemon '" + template.id + "' not found.");
		}

		if (targets.length < 2) {
			return this.sendReply("You must specify at least one move.");
		}

		for (var i = 1, len = targets.length; i < len; ++i) {
			move = Tools.getMove(targets[i]);
			if (!move.exists) {
				return this.sendReply("Move '" + move.id + "' not found.");
			}
			problem = TeamValidator.checkLearnsetSync(format, move, template.species, lsetData);
			if (problem) break;
		}
		var buffer = template.name + (problem ? " <span class=\"message-learn-cannotlearn\">can't</span> learn " : " <span class=\"message-learn-canlearn\">can</span> learn ") + (targets.length > 2 ? "these moves" : move.name);
		if (format) buffer += ' on ' + cmd.substring(0, 3).toUpperCase();
		if (!problem) {
			var sourceNames = {E:"egg", S:"event", D:"dream world"};
			if (lsetData.sources || lsetData.sourcesBefore) buffer += " only when obtained from:<ul class=\"message-learn-list\">";
			if (lsetData.sources) {
				var sources = lsetData.sources.sort();
				var prevSource;
				var prevSourceType;
				var prevSourceCount = 0;
				for (var i = 0, len = sources.length; i < len; ++i) {
					var source = sources[i];
					if (source.substr(0, 2) === prevSourceType) {
						if (prevSourceCount < 0) {
							buffer += ": " + source.substr(2);
						} else if (all || prevSourceCount < 3) {
							buffer += ", " + source.substr(2);
						} else if (prevSourceCount === 3) {
							buffer += ", ...";
						}
						++prevSourceCount;
						continue;
					}
					prevSourceType = source.substr(0, 2);
					prevSourceCount = source.substr(2) ? 0 : -1;
					buffer += "<li>gen " + source.substr(0, 1) + " " + sourceNames[source.substr(1, 1)];
					if (prevSourceType === '5E' && template.maleOnlyHidden) buffer += " (cannot have hidden ability)";
					if (source.substr(2)) buffer += ": " + source.substr(2);
				}
			}
			if (lsetData.sourcesBefore) {
				if (!(cmd.substring(0, 3) in {'rby':1, 'gsc':1})) {
					buffer += "<li>any generation before " + (lsetData.sourcesBefore + 1);
				} else if (!lsetData.sources) {
					buffer += "<li>gen " + lsetData.sourcesBefore;
				}
			}
			buffer += "</ul>";
		}
		this.sendReplyBox(buffer);
	},

	weak: 'weakness',
	resist: 'weakness',
	weakness: function (target, room, user) {
		if (!this.canBroadcast()) return;
		var targets = target.split(/[ ,\/]/);

		var pokemon = Tools.getTemplate(target);
		var type1 = Tools.getType(targets[0]);
		var type2 = Tools.getType(targets[1]);
		var type3 = Tools.getType(targets[2]);

		if (pokemon.exists) {
			target = pokemon.species;
		} else if (type1.exists && type2.exists && type3.exists && type1 !== type2 && type2 !== type3) {
			pokemon = {types: [type1.id, type2.id, type3.id]};
			target = type1.id + "/" + type2.id + "/" + type3.id;
		} else if (type1.exists && type2.exists && type1 !== type2) {
			pokemon = {types: [type1.id, type2.id]};
			target = type1.id + "/" + type2.id;
		} else if (type1.exists) {
			pokemon = {types: [type1.id]};
			target = type1.id;
		} else {
			return this.sendReplyBox("" + Tools.escapeHTML(target) + " isn't a recognized type or pokemon.");
		}

		var weaknesses = [];
		var resistances = [];
		var immunities = [];
		Object.keys(Tools.data.TypeChart).forEach(function (type) {
			var notImmune = Tools.getImmunity(type, pokemon);
			if (notImmune) {
				var typeMod = Tools.getEffectiveness(type, pokemon);
				switch (typeMod) {
				case 1:
					weaknesses.push(type);
					break;
				case 2:
					weaknesses.push("<b>" + type + "</b>");
					break;
				case -1:
					resistances.push(type);
					break;
				case -2:
					resistances.push("<b>" + type + "</b>");
					break;
				}
			} else {
				immunities.push(type);
			}
		});

		var buffer = [];
		buffer.push(pokemon.exists ? "" + target + ' (ignoring abilities):' : '' + target + ':');
		buffer.push('<span class=\"message-effect-weak\">Weaknesses</span>: ' + (weaknesses.join(', ') || 'None'));
		buffer.push('<span class=\"message-effect-resist\">Resistances</span>: ' + (resistances.join(', ') || 'None'));
		buffer.push('<span class=\"message-effect-immune\">Immunities</span>: ' + (immunities.join(', ') || 'None'));
		this.sendReplyBox(buffer.join('<br>'));
	},

	eff: 'effectiveness',
	type: 'effectiveness',
	matchup: 'effectiveness',
	effectiveness: function (target, room, user) {
		var targets = target.split(/[,/]/).slice(0, 2);
		if (targets.length !== 2) return this.sendReply("Attacker and defender must be separated with a comma.");

		var searchMethods = {'getType':1, 'getMove':1, 'getTemplate':1};
		var sourceMethods = {'getType':1, 'getMove':1};
		var targetMethods = {'getType':1, 'getTemplate':1};
		var source;
		var defender;
		var foundData;
		var atkName;
		var defName;
		for (var i = 0; i < 2; ++i) {
			var method;
			for (method in searchMethods) {
				foundData = Tools[method](targets[i]);
				if (foundData.exists) break;
			}
			if (!foundData.exists) return this.parse('/help effectiveness');
			if (!source && method in sourceMethods) {
				if (foundData.type) {
					source = foundData;
					atkName = foundData.name;
				} else {
					source = foundData.id;
					atkName = foundData.id;
				}
				searchMethods = targetMethods;
			} else if (!defender && method in targetMethods) {
				if (foundData.types) {
					defender = foundData;
					defName = foundData.species + " (not counting abilities)";
				} else {
					defender = {types: [foundData.id]};
					defName = foundData.id;
				}
				searchMethods = sourceMethods;
			}
		}

		if (!this.canBroadcast()) return;

		var factor = 0;
		if (Tools.getImmunity(source.type || source, defender)) {
			var totalTypeMod = 0;
			if (source.effectType !== 'Move' || source.basePower || source.basePowerCallback) {
				for (var i = 0; i < defender.types.length; i++) {
					var baseMod = Tools.getEffectiveness(source, defender.types[i]);
					var moveMod = source.onEffectiveness && source.onEffectiveness.call(Tools, baseMod, defender.types[i], source);
					totalTypeMod += typeof moveMod === 'number' ? moveMod : baseMod;
				}
			}
			factor = Math.pow(2, totalTypeMod);
		}

		this.sendReplyBox("" + atkName + " is " + factor + "x effective against " + defName + ".");
	},

	uptime: function (target, room, user) {
		if (!this.canBroadcast()) return;
		var uptime = process.uptime();
		var uptimeText;
		if (uptime > 24 * 60 * 60) {
			var uptimeDays = Math.floor(uptime / (24 * 60 * 60));
			uptimeText = uptimeDays + " " + (uptimeDays === 1 ? "day" : "days");
			var uptimeHours = Math.floor(uptime / (60 * 60)) - uptimeDays * 24;
			if (uptimeHours) uptimeText += ", " + uptimeHours + " " + (uptimeHours === 1 ? "hour" : "hours");
		} else {
			uptimeText = uptime.seconds().duration();
		}
		this.sendReplyBox("Uptime: <b>" + uptimeText + "</b>");
	},

	rankguide: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('+ <b>Voice</b> - They can use ! commands like !groups, and talk during moderated chat<br />% <b>Driver</b> - The above, and they can mute. Global % can also lock users and check for alts<br />@ <b>Moderator</b> - The above, and they can ban users<br />&amp; <b>Leader</b> - The above, and they can promote to moderator and force ties<br /># <b>Room Owner</b> - They are leaders of the room and can almost totally control it<br />~ <b>Administrator</b> - They can do anything, like change what this message says<br /><br /><a href="http://hastebin.com/raw/muvivavevo"><button class="astext"><font color="blue"><u>Click Here For The In-depth Rank Guide</u></a></button>');
	},

	git: 'opensource',
	opensource: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox(
			"Pokemon Showdown is open source:<br />" +
			"- Language: JavaScript (Node.js)<br />" +
			"- <a href=\"https://github.com/Zarel/Pokemon-Showdown/commits/master\">What's new?</a><br />" +
			"- <a href=\"https://github.com/Zarel/Pokemon-Showdown\">Server source code</a><br />" +
			"- <a href=\"https://github.com/Zarel/Pokemon-Showdown-Client\">Client source code</a>"
		);
	},

	staff: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox("<a href=\"https://www.smogon.com/sim/staff_list\">Pokemon Showdown Staff List</a>");
	},

	avatars: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('You can <button name="avatars">change your avatar</button> by clicking on it in the <button name="openOptions"><i class="icon-cog"></i> Options</button> menu in the upper right. Custom avatars are only obtainable by staff.');
	},

	bofrocket: function (target, room, user) {
		if (room.id !== 'bof') return this.sendReply("The command '/bofrocket' was unrecognized. To send a message starting with '/bofrocket', type '//bofrocket'.");
		if (!this.can('modchat', null, room)) return;
		target = this.splitTarget(target);
		if (!this.targetUser) return this.sendReply("User not found");
		if (!room.users[this.targetUser.userid]) return this.sendReply("Not in bof");
		this.targetUser.avatar = '#bofrocket';
		room.add("" + user.name + " applied bofrocket to " + this.targetUser.name);
	},

	showtan: function (target, room, user) {
		if (room.id !== 'showderp') return this.sendReply("The command '/showtan' was unrecognized. To send a message starting with '/showtan', type '//showtan'.");
		if (!this.can('modchat', null, room)) return;
		target = this.splitTarget(target);
		if (!this.targetUser) return this.sendReply("User not found");
		if (!room.users[this.targetUser.userid]) return this.sendReply("Not a showderper");
		this.targetUser.avatar = '#showtan';
		room.add("" + user.name + " applied showtan to affected area of " + this.targetUser.name);
	},

	cpgtan: function (target, room, user) {
		if (room.id !== 'cpg') return this.sendReply("The command '/cpgtan' was unrecognized. To send a message starting with '/cpgtan', type '//cpgtan'.");
		if (!this.can('modchat', null, room)) return;
		target = this.splitTarget(target);
		if (!this.targetUser) return this.sendReply("User not found");
		if (!room.users[this.targetUser.userid]) return this.sendReply("Not a cpger");
		this.targetUser.avatar = '#cpgtan';
		room.add("" + user.name + " applied cpgtan to affected area of " + this.targetUser.name);
	},

	introduction: 'intro',
	intro: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox(
			"New to competitive pokemon?<br />" +
			"- <a href=\"https://www.smogon.com/sim/ps_guide\">Beginner's Guide to PokÃƒÆ’Ã‚Â©mon Showdown</a><br />" +
			"- <a href=\"https://www.smogon.com/dp/articles/intro_comp_pokemon\">An introduction to competitive PokÃƒÆ’Ã‚Â©mon</a><br />" +
			"- <a href=\"https://www.smogon.com/bw/articles/bw_tiers\">What do 'OU', 'UU', etc mean?</a><br />" +
			"- <a href=\"https://www.smogon.com/xyhub/tiers\">What are the rules for each format? What is 'Sleep Clause'?</a>"
		);
	},

	mentoring: 'smogintro',
	smogonintro: 'smogintro',
	smogintro: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox(
			"Welcome to Smogon's official simulator! Here are some useful links to <a href=\"https://www.smogon.com/mentorship/\">Smogon\'s Mentorship Program</a> to help you get integrated into the community:<br />" +
			"- <a href=\"https://www.smogon.com/mentorship/primer\">Smogon Primer: A brief introduction to Smogon's subcommunities</a><br />" +
			"- <a href=\"https://www.smogon.com/mentorship/introductions\">Introduce yourself to Smogon!</a><br />" +
			"- <a href=\"https://www.smogon.com/mentorship/profiles\">Profiles of current Smogon Mentors</a><br />" +
			"- <a href=\"http://mibbit.com/#mentor@irc.synirc.net\">#mentor: the Smogon Mentorship IRC channel</a>"
		);
	},

	calculator: 'calc',
	calc: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox(
			"Pokemon Showdown! damage calculator. (Courtesy of Honko)<br />" +
			"- <a href=\"https://pokemonshowdown.com/damagecalc/\">Damage Calculator</a>"
		);
	},

	cap: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox(
			"An introduction to the Create-A-Pokemon project:<br />" +
			"- <a href=\"https://www.smogon.com/cap/\">CAP project website and description</a><br />" +
			"- <a href=\"https://www.smogon.com/forums/showthread.php?t=48782\">What Pokemon have been made?</a><br />" +
			"- <a href=\"https://www.smogon.com/forums/forums/311\">Talk about the metagame here</a><br />" +
			"- <a href=\"https://www.smogon.com/forums/threads/3512318/#post-5594694\">Sample XY CAP teams</a>"
		);
	},

	gennext: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox(
			"NEXT (also called Gen-NEXT) is a mod that makes changes to the game:<br />" +
			"- <a href=\"https://github.com/Zarel/Pokemon-Showdown/blob/master/mods/gennext/README.md\">README: overview of NEXT</a><br />" +
			"Example replays:<br />" +
			"- <a href=\"https://replay.pokemonshowdown.com/gennextou-120689854\">Zergo vs Mr Weegle Snarf</a><br />" +
			"- <a href=\"https://replay.pokemonshowdown.com/gennextou-130756055\">NickMP vs Khalogie</a>"
		);
	},

	om: 'othermetas',
	othermetas: function (target, room, user) {
		if (!this.canBroadcast()) return;
		target = toId(target);
		var buffer = "";
		var matched = false;

		if (target === 'all' && this.broadcasting) {
			return this.sendReplyBox("You cannot broadcast informatiom about all Other Metagames at once.");
		}

		if (!target || target === 'all') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/tiers/om/\">Other Metagames Hub</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3505031/\">Other Metagames Index</a><br />";
		}
		if (target === 'all' || target === 'smogondoublesuu' || target === 'doublesuu') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3516968/\">Doubles UU</a><br />";
		}
		if (target === 'all' || target === 'smogontriples' || target === 'triples') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3511522/\">Smogon Triples</a><br />";
		}
		if (target === 'all' || target === 'omofthemonth' || target === 'omotm' || target === 'month') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3481155/\">Other Metagame of the Month</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3521887/\">Current OMotM: Classic Hackmons</a><br />";
		}
		if (target === 'all' || target === 'seasonal') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a><br />";
		}
		if (target === 'all' || target === 'balancedhackmons' || target === 'bh') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3489849/\">Balanced Hackmons</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3515725/\">Balanced Hackmons Suspect Discussion</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3525676/\">Balanced Hackmons Viability Rankings</a><br />";
		}
		if (target === 'all' || target === '1v1') {
			matched = true;
			if (target !== 'all') buffer += "Bring three PokÃƒÆ’Ã‚Â©mon to Team Preview and choose one to battle.<br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3496773/\">1v1</a><br />";
		}
		if (target === 'all' || target === 'monotype') {
			matched = true;
			if (target !== 'all') buffer += "All PokÃƒÆ’Ã‚Â©mon on a team must share a type.<br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3493087/\">Monotype</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3517737/\">Monotype Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'tiershift' || target === 'ts') {
			matched = true;
			if (target !== 'all') buffer += "PokÃƒÆ’Ã‚Â©mon below OU get all their stats boosted. BL/UU get +5, BL2/RU get +10, and BL3/NU or lower get +15.<br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3508369/\">Tier Shift</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3514386/\">Tier Shift Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'pu') {
			matched = true;
			if (target !== 'all') buffer += "The unofficial tier below NU.<br />";
			buffer += "- <a href=\"http://www.smogon.com/forums/forums/pu.327/\">PU</a><br />";
		}
		if (target === 'all' || target === 'inversebattle' || target === 'inverse') {
			matched = true;
			if (target !== 'all') buffer += "Battle with an inverted type chart.<br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3518146/\">Inverse Battle</a><br />";
		}
		if (target === 'all' || target === 'almostanyability' || target === 'aaa') {
			matched = true;
			if (target !== 'all') buffer += "PokÃƒÆ’Ã‚Â©mon can use any ability, barring the few that are banned.<br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3528058/\">Almost Any Ability</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3517258/\">Almost Any Ability Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'stabmons') {
			matched = true;
			if (target !== 'all') buffer += "PokÃƒÆ’Ã‚Â©mon can use any move of their typing, in addition to the moves they can normally learn.<br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3493081/\">STABmons</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3512215/\">STABmons Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'lcuu') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3523929/\">LC UU</a><br />";
		}
		if (target === 'all' || target === '350cup') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3512945/\">350 Cup</a><br />";
		}
		if (target === 'all' || target === 'averagemons') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3526481/\">Averagemons</a><br />";
		}
		if (target === 'all' || target === 'classichackmons' || target === 'hackmons') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3521887/\">Classic Hackmons</a><br />";
		}
		if (target === 'all' || target === 'hiddentype') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3516349/\">Hidden Type</a><br />";
		}
		if (target === 'all' || target === 'middlecup' || target === 'mc') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3524287/\">Middle Cup</a><br />";
		}
		if (target === 'all' || target === 'skybattle') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3493601/\">Sky Battle</a><br />";
		}
		if (!matched) {
			return this.sendReply("The Other Metas entry '" + target + "' was not found. Try /othermetas or /om for general help.");
		}
		this.sendReplyBox(buffer);
	},

	/*formats: 'formathelp',
	formatshelp: 'formathelp',
	formathelp: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (this.broadcasting && (room.id === 'lobby' || room.battle)) return this.sendReply("This command is too spammy to broadcast in lobby/battles");
		var buf = [];
		var showAll = (target === 'all');
		for (var id in Tools.data.Formats) {
			var format = Tools.data.Formats[id];
			if (!format) continue;
			if (format.effectType !== 'Format') continue;
			if (!format.challengeShow) continue;
			if (!showAll && !format.searchShow) continue;
			buf.push({
				name: format.name,
				gameType: format.gameType || 'singles',
				mod: format.mod,
				searchShow: format.searchShow,
				desc: format.desc || 'No description.'
			});
		}
		this.sendReplyBox(
			"Available Formats: (<strong>Bold</strong> formats are on ladder.)<br />" +
			buf.map(function (data) {
				var str = "";
				// Bold = Ladderable.
				str += (data.searchShow ? "<strong>" + data.name + "</strong>" : data.name) + ": ";
				str += "(" + (!data.mod || data.mod === 'base' ? "" : data.mod + " ") + data.gameType + " format) ";
				str += data.desc;
				return str;
			}).join("<br />")
		);
	},*/

	roomhelp: function (target, room, user) {
		if (room.id === 'lobby' || room.battle) return this.sendReply("This command is too spammy for lobby/battles.");
		if (!this.canBroadcast()) return;
		this.sendReplyBox(
			"Room drivers (%) can use:<br />" +
			"- /warn OR /k <em>username</em>: warn a user and show the Pokemon Showdown rules<br />" +
			"- /mute OR /m <em>username</em>: 7 minute mute<br />" +
			"- /hourmute OR /hm <em>username</em>: 60 minute mute<br />" +
			"- /unmute <em>username</em>: unmute<br />" +
			"- /announce OR /wall <em>message</em>: make an announcement<br />" +
			"- /modlog <em>username</em>: search the moderator log of the room<br />" +
			"- /modnote <em>note</em>: adds a moderator note that can be read through modlog<br />" +
			"<br />" +
			"Room moderators (@) can also use:<br />" +
			"- /roomban OR /rb <em>username</em>: bans user from the room<br />" +
			"- /roomunban <em>username</em>: unbans user from the room<br />" +
			"- /roomvoice <em>username</em>: appoint a room voice<br />" +
			"- /roomdevoice <em>username</em>: remove a room voice<br />" +
			"- /modchat <em>[off/autoconfirmed/+]</em>: set modchat level<br />" +
			"<br />" +
			"Room owners (#) can also use:<br />" +
			"- /roomintro <em>intro</em>: sets the room introduction that will be displayed for all users joining the room<br />" +
			"- /rules <em>rules link</em>: set the room rules link seen when using /<br />" +
			"- /roommod, /roomdriver <em>username</em>: appoint a room moderator/driver<br />" +
			"- /roomdemod, /roomdedriver <em>username</em>: remove a room moderator/driver<br />" +
			"- /modchat <em>[%/@/#]</em>: set modchat level<br />" +
			"- /declare <em>message</em>: make a large blue declaration to the room<br />" +
			"- !htmlbox <em>HTML code</em>: broadcasts a box of HTML code to the room<br />" +
			"- !showimage <em>[url], [width], [height]</em>: shows an image to the room<br />" +
			"<br />" +
			"More detailed help can be found in the <a href=\"https://www.smogon.com/sim/roomauth_guide\">roomauth guide</a><br />" +
			"</div>"
		);
	},

	restarthelp: function (target, room, user) {
		if (room.id === 'lobby' && !this.can('lockdown')) return false;
		if (!this.canBroadcast()) return;
		this.sendReplyBox(
			"The server is restarting. Things to know:<br />" +
			"- We wait a few minutes before restarting so people can finish up their battles<br />" +
			"- The restart itself will take around 0.6 seconds<br />" +
			"- Your ladder ranking and teams will not change<br />" +
			"- We are restarting to update PokÃƒÆ’Ã‚Â©mon Showdown to a newer version"
		);
	},

	rule: 'rules',
	rules: function (target, room, user) {
		if (!target) {
			if (!this.canBroadcast()) return;
			this.sendReplyBox("Please follow the rules:<br />" +
				(room.rulesLink ? "- <a href=\"" + Tools.escapeHTML(room.rulesLink) + "\">" + Tools.escapeHTML(room.title) + " room rules</a><br />" : "") +
				"- <a href=\"https://pokemonshowdown.com/rules\">" + (room.rulesLink ? "Global rules" : "Rules") + "</a>");
			return;
		}
		if (!this.can('roommod', null, room)) return;
		if (target.length > 100) {
			return this.sendReply("Error: Room rules link is too long (must be under 100 characters). You can use a URL shortener to shorten the link.");
		}

		room.rulesLink = target.trim();
		this.sendReply("(The room rules link is now: " + target + ")");

		if (room.chatRoomData) {
			room.chatRoomData.rulesLink = room.rulesLink;
			Rooms.global.writeChatRoomData();
		}
	},

	faq: function (target, room, user) {
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		var buffer = "";
		var matched = false;

		if (target === 'all' && this.broadcasting) {
			return this.sendReplyBox("You cannot broadcast all FAQs at once.");
		}

		if (!target || target === 'all') {
			matched = true;
			buffer += "<a href=\"https://www.smogon.com/sim/faq\">Frequently Asked Questions</a><br />";
		}
		if (target === 'all' || target === 'elo') {
			matched = true;
			buffer += "<a href=\"https://www.smogon.com/sim/faq#elo\">Why did this user gain or lose so many points?</a><br />";
		}
		if (target === 'all' || target === 'doubles' || target === 'triples' || target === 'rotation') {
			matched = true;
			buffer += "<a href=\"https://www.smogon.com/sim/faq#doubles\">Can I play doubles/triples/rotation battles here?</a><br />";
		}
		if (target === 'all' || target === 'restarts') {
			matched = true;
			buffer += "<a href=\"https://www.smogon.com/sim/faq#restarts\">Why is the server restarting?</a><br />";
		}
		if (target === 'all' || target === 'star' || target === 'player') {
			matched = true;
			buffer += '<a href="http://www.smogon.com/sim/faq#star">Why is there this star (&starf;) in front of my username?</a><br />';
		}
		if (target === 'all' || target === 'staff') {
			matched = true;
			buffer += "<a href=\"https://www.smogon.com/sim/staff_faq\">Staff FAQ</a><br />";
		}
		if (target === 'all' || target === 'autoconfirmed' || target === 'ac') {
			matched = true;
			buffer += "A user is autoconfirmed when they have won at least one rated battle and have been registered for a week or longer.<br />";
		}
		if (target === 'all' || target === 'customavatar' || target === 'ca') {
			matched = true;
			buffer += "<a href=\"https://www.smogon.com/sim/faq#customavatar\">How can I get a custom avatar?</a><br />";
		}
		if (target === 'all' || target === 'pm') {
			matched = true;
			buffer += "<a href=\"https://www.smogon.com/sim/faq#pm\">How can I send a user a private message?</a><br />";
		}
		if (target === 'all' || target === 'challenge') {
			matched = true;
			buffer += "<a href=\"https://www.smogon.com/sim/faq#challenge\">How can I battle a specific user?</a><br />";
		}
		if (target === 'all'  || target === 'gxe') {
			matched = true;
			buffer += "<a href=\"https://www.smogon.com/sim/faq#gxe\">What does GXE mean?</a><br />";
		}
		if (!matched) {
			return this.sendReply("The FAQ entry '" + target + "' was not found. Try /faq for general help.");
		}
		this.sendReplyBox(buffer);
	},

	banlists: 'tiers',
	tier: 'tiers',
	tiers: function (target, room, user) {
		if (!this.canBroadcast()) return;
		target = toId(target);
		var buffer = "";
		var matched = false;

		if (target === 'all' && this.broadcasting) {
			return this.sendReplyBox("You cannot broadcast information about all tiers at once.");
		}

		if (!target || target === 'all') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/tiers/\">Smogon Tiers</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/tiering-faq.3498332/\">Tiering FAQ</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/xyhub/tiers\">The banlists for each tier</a><br />";
		}
		if (target === 'all' || target === 'overused' || target === 'ou') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3521201/\">OU Metagame Discussion</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3526596/\">OU Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'ubers' || target === 'uber') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3522911/\">Ubers Metagame Discussion</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3523419/\">Ubers Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'underused' || target === 'uu') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3528903/\">np: UU Stage 2</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/dex/xy/tags/uu/\">UU Banlist</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3523649/\">UU Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'rarelyused' || target === 'ru') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3527140/\">np: RU Stage 6</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3523627/\">RU Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'neverused' || target === 'nu') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3528871/\">np: NU Stage 4</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3523692/\">NU Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'littlecup' || target === 'lc') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3490462/\">LC Banlist</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3496013/\">LC Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'smogondoubles' || target === 'doubles') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3525739/\">np: Doubles Stage 1.5</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3498688/\">Doubles Banlist</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3522814/\">Doubles Viability Rankings</a><br />";
		}
		if (target === 'all' || target === 'anythinggoes' || target === 'ag') {
			matched = true;
			buffer += "- <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes</a><br />";
		}
		if (!matched) {
			return this.sendReply("The Tiers entry '" + target + "' was not found. Try /tiers for general help.");
		}
		this.sendReplyBox(buffer);
	},

	analysis: 'smogdex',
	strategy: 'smogdex',
	smogdex: function (target, room, user) {
		if (!this.canBroadcast()) return;

		var targets = target.split(',');
		if (toId(targets[0]) === 'previews') return this.sendReplyBox("<a href=\"https://www.smogon.com/forums/threads/sixth-generation-pokemon-analyses-index.3494918/\">Generation 6 Analyses Index</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a>");
		var pokemon = Tools.getTemplate(targets[0]);
		var item = Tools.getItem(targets[0]);
		var move = Tools.getMove(targets[0]);
		var ability = Tools.getAbility(targets[0]);
		var atLeastOne = false;
		var generation = (targets[1] || 'xy').trim().toLowerCase();
		var genNumber = 6;
		// var doublesFormats = {'vgc2012':1, 'vgc2013':1, 'vgc2014':1, 'doubles':1};
		var doublesFormats = {};
		var doublesFormat = (!targets[2] && generation in doublesFormats) ? generation : (targets[2] || '').trim().toLowerCase();
		var doublesText = '';
		if (generation === 'xy' || generation === 'xy' || generation === '6' || generation === 'six') {
			generation = 'xy';
		} else if (generation === 'bw' || generation === 'bw2' || generation === '5' || generation === 'five') {
			generation = 'bw';
			genNumber = 5;
		} else if (generation === 'dp' || generation === 'dpp' || generation === '4' || generation === 'four') {
			generation = 'dp';
			genNumber = 4;
		} else if (generation === 'adv' || generation === 'rse' || generation === 'rs' || generation === '3' || generation === 'three') {
			generation = 'rs';
			genNumber = 3;
		} else if (generation === 'gsc' || generation === 'gs' || generation === '2' || generation === 'two') {
			generation = 'gs';
			genNumber = 2;
		} else if (generation === 'rby' || generation === 'rb' || generation === '1' || generation === 'one') {
			generation = 'rb';
			genNumber = 1;
		} else {
			generation = 'xy';
		}
		if (doublesFormat !== '') {
			// Smogon only has doubles formats analysis from gen 5 onwards.
			if (!(generation in {'bw':1, 'xy':1}) || !(doublesFormat in doublesFormats)) {
				doublesFormat = '';
			} else {
				doublesText = {'vgc2012':"VGC 2012", 'vgc2013':"VGC 2013", 'vgc2014':"VGC 2014", 'doubles':"Doubles"}[doublesFormat];
				doublesFormat = '/' + doublesFormat;
			}
		}

		// Pokemon
		if (pokemon.exists) {
			atLeastOne = true;
			if (genNumber < pokemon.gen) {
				return this.sendReplyBox("" + pokemon.name + " did not exist in " + generation.toUpperCase() + "!");
			}
			// if (pokemon.tier === 'CAP') generation = 'cap';
			if (pokemon.tier === 'CAP') return this.sendReply("CAP is not currently supported by Smogon Strategic Pokedex.");

			var illegalStartNums = {'351':1, '421':1, '487':1, '493':1, '555':1, '647':1, '648':1, '649':1, '681':1};
			if (pokemon.isMega || pokemon.num in illegalStartNums) pokemon = Tools.getTemplate(pokemon.baseSpecies);
			var poke = pokemon.name.toLowerCase().replace(/\ /g, '_').replace(/[^a-z0-9\-\_]+/g, '');

			this.sendReplyBox("<a href=\"https://www.smogon.com/dex/" + generation + "/pokemon/" + poke + doublesFormat + "\">" + generation.toUpperCase() + " " + doublesText + " " + pokemon.name + " analysis</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a>");
		}

		// Item
		if (item.exists && genNumber > 1 && item.gen <= genNumber) {
			atLeastOne = true;
			var itemName = item.name.toLowerCase().replace(' ', '_');
			this.sendReplyBox("<a href=\"https://www.smogon.com/dex/" + generation + "/items/" + itemName + "\">" + generation.toUpperCase() + " " + item.name + " item analysis</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a>");
		}

		// Ability
		if (ability.exists && genNumber > 2 && ability.gen <= genNumber) {
			atLeastOne = true;
			var abilityName = ability.name.toLowerCase().replace(' ', '_');
			this.sendReplyBox("<a href=\"https://www.smogon.com/dex/" + generation + "/abilities/" + abilityName + "\">" + generation.toUpperCase() + " " + ability.name + " ability analysis</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a>");
		}

		// Move
		if (move.exists && move.gen <= genNumber) {
			atLeastOne = true;
			var moveName = move.name.toLowerCase().replace(' ', '_');
			this.sendReplyBox("<a href=\"https://www.smogon.com/dex/" + generation + "/moves/" + moveName + "\">" + generation.toUpperCase() + " " + move.name + " move analysis</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a>");
		}

		if (!atLeastOne) {
			return this.sendReplyBox("Pokemon, item, move, or ability not found for generation " + generation.toUpperCase() + ".");
		}
	},

	/*********************************************************
	 * Miscellaneous commands
	 *********************************************************/

	potd: function (target, room, user) {
		if (!this.can('potd')) return false;

		Config.potd = target;
		Simulator.SimulatorProcess.eval('Config.potd = \'' + toId(target) + '\'');
		if (target) {
			if (Rooms.lobby) Rooms.lobby.addRaw("<div class=\"broadcast-blue\"><b>The Pokemon of the Day is now " + target + "!</b><br />This Pokemon will be guaranteed to show up in random battles.</div>");
			this.logModCommand("The Pokemon of the Day was changed to " + target + " by " + user.name + ".");
		} else {
			if (Rooms.lobby) Rooms.lobby.addRaw("<div class=\"broadcast-blue\"><b>The Pokemon of the Day was removed!</b><br />No pokemon will be guaranteed in random battles.</div>");
			this.logModCommand("The Pokemon of the Day was removed by " + user.name + ".");
		}
	},

	spammode: function (target, room, user) {
		if (!this.can('ban')) return false;

		// NOTE: by default, spammode does nothing; it's up to you to set stricter filters
		// in config for chatfilter/hostfilter. Put this above the spammode filters:
		/*
		if (!Config.spammode) return;
		if (Config.spammode < Date.now()) {
			delete Config.spammode;
			return;
		}
		*/

		if (target === 'off' || target === 'false') {
			if (Config.spammode) {
				delete Config.spammode;
				this.privateModCommand("(" + user.name + " turned spammode OFF.)");
			} else {
				this.sendReply("Spammode is already off.");
			}
		} else if (!target || target === 'on' || target === 'true') {
			if (Config.spammode) {
				this.privateModCommand("(" + user.name + " renewed spammode for half an hour.)");
			} else {
				this.privateModCommand("(" + user.name + " turned spammode ON for half an hour.)");
			}
			Config.spammode = Date.now() + 30 * 60 * 1000;
		} else {
			this.sendReply("Unrecognized spammode setting.");
		}
	},

	roll: 'dice',
	dice: function (target, room, user) {
		if (!target) return this.parse('/help dice');
		if (!this.canBroadcast()) return;
		var d = target.indexOf("d");
		if (d >= 0) {
			var num = parseInt(target.substring(0, d));
			var faces;
			if (target.length > d) faces = parseInt(target.substring(d + 1));
			if (isNaN(num)) num = 1;
			if (isNaN(faces)) return this.sendReply("The number of faces must be a valid integer.");
			if (faces < 1 || faces > 1000) return this.sendReply("The number of faces must be between 1 and 1000");
			if (num < 1 || num > 20) return this.sendReply("The number of dice must be between 1 and 20");
			var rolls = [];
			var total = 0;
			for (var i = 0; i < num; ++i) {
				rolls[i] = (Math.floor(faces * Math.random()) + 1);
				total += rolls[i];
			}
			return this.sendReplyBox("Random number " + num + "x(1 - " + faces + "): " + rolls.join(", ") + "<br />Total: " + total);
		}
		if (target && isNaN(target) || target.length > 21) return this.sendReply("The max roll must be a number under 21 digits.");
		var maxRoll = (target) ? target : 6;
		var rand = Math.floor(maxRoll * Math.random()) + 1;
		return this.sendReplyBox("Random number (1 - " + maxRoll + "): " + rand);
	},

	pr: 'pickrandom',
	pick: 'pickrandom',
	pickrandom: function (target, room, user) {
		var options = target.split(',');
		if (options.length < 2) return this.parse('/help pick');
		if (!this.canBroadcast()) return false;
		return this.sendReplyBox('<em>We randomly picked:</em> ' + Tools.escapeHTML(options.sample().trim()));
	},

	register: function () {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('You will be prompted to register upon winning a rated battle. Alternatively, there is a register button in the <button name="openOptions"><i class="icon-cog"></i> Options</button> menu in the upper right.');
	},

	lobbychat: function (target, room, user, connection) {
		if (!Rooms.lobby) return this.popupReply("This server doesn't have a lobby.");
		target = toId(target);
		if (target === 'off') {
			user.leaveRoom(Rooms.lobby, connection.socket);
			connection.send('|users|');
			this.sendReply("You are now blocking lobby chat.");
		} else {
			user.joinRoom(Rooms.lobby, connection);
			this.sendReply("You are now receiving lobby chat.");
		}
	},

	showimage: function (target, room, user) {
		if (!target) return this.parse('/help showimage');
		if (!this.can('declare', null, room)) return false;
		if (!this.canBroadcast()) return;

		var targets = target.split(',');
		if (targets.length !== 3) {
			return this.parse('/help showimage');
		}

		this.sendReply('|raw|<img src="' + Tools.escapeHTML(targets[0]) + '" alt="" width="' + toId(targets[1]) + '" height="' + toId(targets[2]) + '" />');
	},

	htmlbox: function (target, room, user) {
		if (!target) return this.parse('/help htmlbox');
		if (!this.can('declare', null, room)) return;
		if (!this.canHTML(target)) return;
		if (!this.canBroadcast('!htmlbox')) return;

		this.sendReplyBox(target);
	},

	a: function (target, room, user) {
		if (!this.can('rawpacket')) return false;
		// secret sysop command
		room.add(target);
	},
		d: 'poof',
	cpoof: 'poof',
	poof: (function () {
		var messages = [
			"{{user}} killed them. {{user}} killed them all.",
			"snuggled with Serperior and fell asleep, snoring cutely.",
			"'s team got swept by Wobbuffet and raged!",
			"spoke of the Wonder Guard Sableye incident!",
			"made a coding error!",
			"died of low ladder!",
			"was eaten by a Mightyena!",
			"got confused by the Anime tier!",
			"insulted Sable in front of Serp!",
			"got choice locked!",
			"exploded!",
			"got confused and tried to use Flying type against Wind type!",
			"tried to join the Midget Room and was too tall!"
		];

		return function (target, room, user) {
			if (Config.poofOff) return this.sendReply("Poof is currently disabled.");
			if (target && !this.can('broadcast')) return false;
			if (room.id !== 'lobby') return false;
			var message = target || messages[Math.floor(Math.random() * messages.length)];
			if (message.indexOf('{{user}}') < 0)
				message = '{{user}} ' + message;
			message = message.replace(/{{user}}/g, user.name);
			if (!this.canTalk(message)) return false;

			var colour = '#' + [1, 1, 1].map(function () {
				var part = Math.floor(Math.random() * 0xaa);
				return (part < 0x10 ? '0' : '') + part.toString(16);
			}).join('');

			room.addRaw('<center><strong><font color="' + colour + '">~~ ' + Tools.escapeHTML(message) + ' ~~</font></strong></center>');
			user.disconnectAll();
		};
	})(),

	poofoff: 'nopoof',
	nopoof: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = true;
		return this.sendReply("Poof is now disabled.");
	},

	poofon: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = false;
		return this.sendReply("Poof is now enabled.");
	},

	/*********************************************************
	 * Help commands
	 *********************************************************/

	commands: 'help',
	h: 'help',
	'?': 'help',
	help: function (target, room, user) {
		target = target.toLowerCase();
		var matched = false;
		if (target === 'msg' || target === 'pm' || target === 'whisper' || target === 'w') {
			matched = true;
			this.sendReply("/msg OR /whisper OR /w [username], [message] - Send a private message.");
		}
		if (target === 'r' || target === 'reply') {
			matched = true;
			this.sendReply("/reply OR /r [message] - Send a private message to the last person you received a message from, or sent a message to.");
		}
		if (target === 'avatar') {
			matched = true;
			this.sendReply("/avatar [new avatar number] - Change your trainer sprite.");
		}
		if (target === 'whois' || target === 'alts' || target === 'ip' || target === 'rooms') {
			matched = true;
			this.sendReply("/whois - Get details on yourself: alts, group, IP address, and rooms.");
			this.sendReply("/whois [username] - Get details on a username: alts (Requires: % @ & ~), group, IP address (Requires: @ & ~), and rooms.");
		}
		if (target === 'data') {
			matched = true;
			this.sendReply("/data [pokemon/item/move/ability] - Get details on this pokemon/item/move/ability/nature.");
			this.sendReply("!data [pokemon/item/move/ability] - Show everyone these details. Requires: + % @ & ~");
		}
		if (target === 'details' || target === 'dt') {
			matched = true;
			this.sendReply("/details [pokemon] - Get additional details on this pokemon/item/move/ability/nature.");
			this.sendReply("!details [pokemon] - Show everyone these details. Requires: + % @ & ~");
		}
		if (target === 'analysis') {
			matched = true;
			this.sendReply("/analysis [pokemon], [generation] - Links to the Smogon University analysis for this Pokemon in the given generation.");
			this.sendReply("!analysis [pokemon], [generation] - Shows everyone this link. Requires: + % @ & ~");
		}
		if (target === 'groups') {
			matched = true;
			this.sendReply("/groups - Explains what the + % @ & next to people's names mean.");
			this.sendReply("!groups - Show everyone that information. Requires: + % @ & ~");
		}
		if (target === 'opensource') {
			matched = true;
			this.sendReply("/opensource - Links to PS's source code repository.");
			this.sendReply("!opensource - Show everyone that information. Requires: + % @ & ~");
		}
		if (target === 'avatars') {
			matched = true;
			this.sendReply("/avatars - Explains how to change avatars.");
			this.sendReply("!avatars - Show everyone that information. Requires: + % @ & ~");
		}
		if (target === 'intro') {
			matched = true;
			this.sendReply("/intro - Provides an introduction to competitive pokemon.");
			this.sendReply("!intro - Show everyone that information. Requires: + % @ & ~");
		}
		if (target === 'cap') {
			matched = true;
			this.sendReply("/cap - Provides an introduction to the Create-A-Pokemon project.");
			this.sendReply("!cap - Show everyone that information. Requires: + % @ & ~");
		}
		if (target === 'om') {
			matched = true;
			this.sendReply("/om - Provides links to information on the Other Metagames.");
			this.sendReply("!om - Show everyone that information. Requires: + % @ & ~");
		}
		if (target === 'learn' || target === 'learnset' || target === 'learnall') {
			matched = true;
			this.sendReply("/learn [pokemon], [move, move, ...] - Displays how a Pokemon can learn the given moves, if it can at all.");
			this.sendReply("!learn [pokemon], [move, move, ...] - Show everyone that information. Requires: + % @ & ~");
		}
		if (target === 'calc' || target === 'calculator') {
			matched = true;
			this.sendReply("/calc - Provides a link to a damage calculator");
			this.sendReply("!calc - Shows everyone a link to a damage calculator. Requires: + % @ & ~");
		}
		if (target === 'blockchallenges' || target === 'away' || target === 'idle') {
			matched = true;
			this.sendReply("/away - Blocks challenges so no one can challenge you. Deactivate it with /back.");
		}
		if (target === 'allowchallenges' || target === 'back') {
			matched = true;
			this.sendReply("/back - Unlocks challenges so you can be challenged again. Deactivate it with /away.");
		}
		if (target === 'faq') {
			matched = true;
			this.sendReply("/faq [theme] - Provides a link to the FAQ. Add deviation, doubles, randomcap, restart, or staff for a link to these questions. Add all for all of them.");
			this.sendReply("!faq [theme] - Shows everyone a link to the FAQ. Add deviation, doubles, randomcap, restart, or staff for a link to these questions. Add all for all of them. Requires: + % @ & ~");
		}
		if (target === 'effectiveness' || target === 'matchup' || target === 'eff' || target === 'type') {
			matched = true;
			this.sendReply("/effectiveness OR /matchup OR /eff OR /type [attack], [defender] - Provides the effectiveness of a move or type on another type or a PokÃƒÆ’Ã‚Â©mon.");
			this.sendReply("!effectiveness OR !matchup OR !eff OR !type [attack], [defender] - Shows everyone the effectiveness of a move or type on another type or a PokÃƒÆ’Ã‚Â©mon.");
		}
		if (target === 'dexsearch' || target === 'dsearch' || target === 'ds') {
			matched = true;
			this.sendReply("/dexsearch [type], [move], [move], ... - Searches for Pokemon that fulfill the selected criteria.");
			this.sendReply("Search categories are: type, tier, color, moves, ability, gen.");
			this.sendReply("Valid colors are: green, red, blue, white, brown, yellow, purple, pink, gray and black.");
			this.sendReply("Valid tiers are: Uber/OU/BL/UU/BL2/RU/BL3/NU/PU/NFE/LC/CAP.");
			this.sendReply("Types must be followed by ' type', e.g., 'dragon type'.");
			this.sendReply("Parameters can be excluded through the use of '!', e.g., '!water type' excludes all water types.");
			this.sendReply("The parameter 'mega' can be added to search for Mega Evolutions only, and the parameters 'FE' or 'NFE' can be added to search fully or not-fully evolved Pokemon only.");
			this.sendReply("The order of the parameters does not matter.");
		}
		if (target === 'dice' || target === 'roll') {
			matched = true;
			this.sendReply("/dice [optional max number] - Randomly picks a number between 1 and 6, or between 1 and the number you choose.");
			this.sendReply("/dice [number of dice]d[number of sides] - Simulates rolling a number of dice, e.g., /dice 2d4 simulates rolling two 4-sided dice.");
		}
		if (target === 'pick' || target === 'pickrandom') {
			matched = true;
			this.sendReply("/pick [option], [option], ... - Randomly selects an item from a list containing 2 or more elements.");
		}
		if (target === 'invite') {
			matched = true;
			this.sendReply("/invite [username], [roomname] - Invites the player [username] to join the room [roomname].");
		}
		if (target === 'all' || target === 'poll') {
			matched = true;
			this.sendReply("/poll [question], [option], [option], etc. - Creates a poll.");
		}
		if (target === 'all' || target === 'vote') {
			matched = true;
			this.sendReply("/vote [option] - votes for the specified option in the poll.");
		}
		if (target === 'hangman') {
			matched = true;
			this.sendReply("/hangman start, [Word], [Clue] - Start a game of hangman [Word] is limited to 10 characters and [Clue] to 30.");
			this.sendReply("/hangman view - View the current Hangman Game");
			this.sendReply("/g or /gw - Guess a letter or word.");
		}
		// driver commands
		if (target === 'lock' || target === 'l') {
			matched = true;
			this.sendReply("/lock OR /l [username], [reason] - Locks the user from talking in all chats. Requires: % @ & ~");
		}
		if (target === 'unlock') {
			matched = true;
			this.sendReply("/unlock [username] - Unlocks the user. Requires: % @ & ~");
		}
		if (target === 'redirect' || target === 'redir') {
			matched = true;
			this.sendReply("/redirect OR /redir [username], [roomname] - Attempts to redirect the user [username] to the room [roomname]. Requires: % @ & ~");
		}
		if (target === 'modnote') {
			matched = true;
			this.sendReply("/modnote [note] - Adds a moderator note that can be read through modlog. Requires: % @ & ~");
		}
		if (target === 'forcerename' || target === 'fr') {
			matched = true;
			this.sendReply("/forcerename OR /fr [username], [reason] - Forcibly change a user's name and shows them the [reason]. Requires: % @ & ~");
		}
		if (target === 'kickbattle') {
			matched = true;
			this.sendReply("/kickbattle [username], [reason] - Kicks a user from a battle with reason. Requires: % @ & ~");
		}
		if (target === 'warn' || target === 'k') {
			matched = true;
			this.sendReply("/warn OR /k [username], [reason] - Warns a user showing them the Pokemon Showdown Rules and [reason] in an overlay. Requires: % @ & ~");
		}
		if (target === 'modlog') {
			matched = true;
			this.sendReply("/modlog [roomid|all], [n] - Roomid defaults to current room. If n is a number or omitted, display the last n lines of the moderator log. Defaults to 15. If n is not a number, search the moderator log for 'n' on room's log [roomid]. If you set [all] as [roomid], searches for 'n' on all rooms's logs. Requires: % @ & ~");
		}
		if (target === 'mute' || target === 'm') {
			matched = true;
			this.sendReply("/mute OR /m [username], [reason] - Mutes a user with reason for 7 minutes. Requires: % @ & ~");
		}
		if (target === 'hourmute' || target === 'hm') {
			matched = true;
			this.sendReply("/hourmute OR /hm [username], [reason] - Mutes a user with reason for an hour. Requires: % @ & ~");
		}
		if (target === 'unmute' || target === 'um') {
			matched = true;
			this.sendReply("/unmute [username] - Removes mute from user. Requires: % @ & ~");
		}

		// mod commands
		if (target === 'roomban' || target === 'rb') {
			matched = true;
			this.sendReply("/roomban [username] - Bans the user from the room you are in. Requires: @ & ~");
		}
		if (target === 'roomunban') {
			matched = true;
			this.sendReply("/roomunban [username] - Unbans the user from the room you are in. Requires: @ & ~");
		}
		if (target === 'ban' || target === 'b') {
			matched = true;
			this.sendReply("/ban OR /b [username], [reason] - Kick user from all rooms and ban user's IP address with reason. Requires: @ & ~");
		}
		if (target === 'unban') {
			matched = true;
			this.sendReply("/unban [username] - Unban a user. Requires: @ & ~");
		}

		// RO commands
		if (target === 'showimage') {
			matched = true;
			this.sendReply("/showimage [url], [width], [height] - Show an image. Requires: # & ~");
		}
		if (target === 'roompromote') {
			matched = true;
			this.sendReply("/roompromote [username], [group] - Promotes the user to the specified group or next ranked group. Requires: @ # & ~");
		}
		if (target === 'roomdemote') {
			matched = true;
			this.sendReply("/roomdemote [username], [group] - Demotes the user to the specified group or previous ranked group. Requires: @ # & ~");
		}

		// leader commands
		if (target === 'banip') {
			matched = true;
			this.sendReply("/banip [ip] - Kick users on this IP or IP range from all rooms and bans it. Accepts wildcards to ban ranges. Requires: & ~");
		}
		if (target === 'unbanip') {
			matched = true;
			this.sendReply("/unbanip [ip] - Kick users on this IP or IP range from all rooms and bans it. Accepts wildcards to ban ranges. Requires: & ~");
		}
		if (target === 'unbanall') {
			matched = true;
			this.sendReply("/unbanall - Unban all IP addresses. Requires: & ~");
		}
		if (target === 'promote') {
			matched = true;
			this.sendReply("/promote [username], [group] - Promotes the user to the specified group or next ranked group. Requires: & ~");
		}
		if (target === 'demote') {
			matched = true;
			this.sendReply("/demote [username], [group] - Demotes the user to the specified group or previous ranked group. Requires: & ~");
		}
		if (target === 'forcetie') {
			matched = true;
			this.sendReply("/forcetie - Forces the current match to tie. Requires: & ~");
		}
		if (target === 'declare') {
			matched = true;
			this.sendReply("/declare [message] - Anonymously announces a message. Requires: & ~");
		}

		// admin commands
		if (target === 'chatdeclare' || target === 'cdeclare') {
			matched = true;
			this.sendReply("/cdeclare [message] - Anonymously announces a message to all chatrooms on the server. Requires: ~");
		}
		if (target === 'globaldeclare' || target === 'gdeclare') {
			matched = true;
			this.sendReply("/globaldeclare [message] - Anonymously announces a message to every room on the server. Requires: ~");
		}
		if (target === 'htmlbox') {
			matched = true;
			this.sendReply("/htmlbox [message] - Displays a message, parsing HTML code contained. Requires: ~ # with global authority");
		}
		if (target === 'announce' || target === 'wall') {
			matched = true;
			this.sendReply("/announce OR /wall [message] - Makes an announcement. Requires: % @ & ~");
		}
		if (target === 'modchat') {
			matched = true;
			this.sendReply("/modchat [off/autoconfirmed/+/%/@/&/~] - Set the level of moderated chat. Requires: @ for off/autoconfirmed/+ options, & ~ for all the options");
		}
		if (target === 'hotpatch') {
			matched = true;
			this.sendReply("Hot-patching the game engine allows you to update parts of Showdown without interrupting currently-running battles. Requires: ~");
			this.sendReply("Hot-patching has greater memory requirements than restarting.");
			this.sendReply("/hotpatch chat - reload chat-commands.js");
			this.sendReply("/hotpatch battles - spawn new simulator processes");
			this.sendReply("/hotpatch formats - reload the tools.js tree, rebuild and rebroad the formats list, and also spawn new simulator processes");
		}
		if (target === 'lockdown') {
			matched = true;
			this.sendReply("/lockdown - locks down the server, which prevents new battles from starting so that the server can eventually be restarted. Requires: ~");
		}
		if (target === 'kill') {
			matched = true;
			this.sendReply("/kill - kills the server. Can't be done unless the server is in lockdown state. Requires: ~");
		}
		if (target === 'loadbanlist') {
			matched = true;
			this.sendReply("/loadbanlist - Loads the bans located at ipbans.txt. The command is executed automatically at startup. Requires: ~");
		}
		if (target === 'makechatroom') {
			matched = true;
			this.sendReply("/makechatroom [roomname] - Creates a new room named [roomname]. Requires: ~");
		}
		if (target === 'deregisterchatroom') {
			matched = true;
			this.sendReply("/deregisterchatroom [roomname] - Deletes room [roomname] after the next server restart. Requires: ~");
		}
		if (target === 'roomowner') {
			matched = true;
			this.sendReply("/roomowner [username] - Appoints [username] as a room owner. Removes official status. Requires: ~");
		}
		if (target === 'roomdeowner') {
			matched = true;
			this.sendReply("/roomdeowner [username] - Removes [username]'s status as a room owner. Requires: ~");
		}
		if (target === 'privateroom' || target === 'hiddenroom') {
			matched = true;
			this.sendReply("/privateroom [on/off] - Makes or unmakes a room private. Requires: ~");
			this.sendReply("/hiddenroom [on/off] - Makes or unmakes a room hidden. Hidden rooms will maintain global ranks of users. Requires: \u2605 ~");
		}
		if (target === 'sudo') {
			matched = true;
			this.sendReply("/sudo [User], [Command] -  Used to make users perform Commands. - Most Mod Commands and a few commands are not allowed. (Requires ~)");
		}
		if (target === 'pmall') {
			matched = true;
			this.sendReply("/pmall [Message] - Used to send a Server message to the entire Server (Requires ~)");
		}
		if (target === 'rmall') {
			matched = true;
			this.sendReply("/pmall [Message] - Used to send a Room Message to All the users in the current room. (Requires & or ~)");
		}
		if (target === 'roomlist') {
			matched = true;
			this.sendReply("/roomlist - Shows a list of all the current rooms on the server. (Requires Global @ % & or ~");
		}
		if (target === 'clearall') {
			matched = true;
			this.sendReply("/clearall - Used to clear an entire chatrooms Log. Do not abuse. (Requires ~");
		}
		// overall
		if (target === 'help' || target === 'h' || target === '?' || target === 'commands') {
			matched = true;
			this.sendReply("/help OR /h OR /? - Gives you help.");
		}
		if (!target) {
			this.sendReply("COMMANDS: /nick, /avatar, /rating, /whois, /msg, /reply, /ignore, /away, /back, /timestamps, /highlight");
			this.sendReply("INFORMATIONAL COMMANDS: /data, /dexsearch, /groups, /opensource, /avatars, /faq, /rules, /intro, /tiers, /othermetas, /learn, /analysis, /calc (replace / with ! to broadcast. Broadcasting requires: + % @ & ~)");
			if (user.group !== Config.groupsranking[0]) {
				this.sendReply("DRIVER COMMANDS: /warn, /mute, /unmute, /alts, /forcerename, /modlog, /lock, /unlock, /announce, /redirect");
				this.sendReply("MODERATOR COMMANDS: /ban, /unban, /ip");
				this.sendReply("LEADER COMMANDS: /declare, /forcetie, /forcewin, /promote, /demote, /banip, /unbanall");
			}
			this.sendReply("For an overview of room commands, use /roomhelp");
			this.sendReply("For details of a specific command, use something like: /help data");
		} else if (!matched) {
			this.sendReply("Help for the command '" + target + "' was not found. Try /help for general help");
		}
	},
	
		/*********************************************************
	 * Kakuja commands
	 *********************************************************/
	memes: 'meme',
	meme: function(target, room, user) {
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		var matched = false;
		if (target === ''){
			matched = true;
			this.sendReplyBox('<center><b><font color="purple"><a href="http://pastebin.com/VT7Nc06s">List of memes!</a><br>Is there a meme missing that you want added? Message a & or ~ and we will consider adding it!</font></b></center>');
                }
                
		if (target === 'salt'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/Y5bbFq1.jpg" />');
		}
		
		if (target === 'anorexic'){
			matched = true;
			this.sendReplyBox('<img src="http://www.humorsharing.com/media/images/1402/i_anorexic_funny_meme_52f6564e73b39.jpg" width="300" height="285" />');
		}
		
		if (target === 'bitches'){
			matched = true;
			this.sendReplyBox('<img src="http://www.killthehydra.com/wp-content/uploads/patrick-stewart-star-trek-meme1.jpg" width="400" height="280" />');
		}
		
		if (target === 'booty'){
			matched = true;
			this.sendReplyBox('<img src="http://www.quickmeme.com/img/70/702b57e6590f78366b7ada8e4910f43971be735bbed075e5fec653482f572820.jpg" width="420" height="280" />');
		}
		
		if (target === 'kakuja'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/6DC0uxD.png" />');
		}
		
		if (target === 'disgusting'){
			matched = true;
			this.sendReplyBox('<img src=http://i.imgur.com/f5l52n8.jpg" width="400" height="275" />');
		}
		
		if (target === 'arsenal'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/BsdMZRr.png" />');
		}
		
		if (target === 'i like trains'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/5GV6Z3k.gif" />');
		}
		
		if (target === 'smashing'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/H9JJP25.jpg" />');
		}
		
		if (target === 'that escalated quickly'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/27OWcbj.jpg" />');
		}
		
		if (target === 'lady gogo'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/YT444tK.png" />');
		}
		if (target === 'spider'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/UEQGyCi.jpg" />');
		}
		
		if (target === 'mlg'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/STG6Ugz.jpg" />');
		}
		
		if (target === 'dj not nice'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/fjl9XW7.png" />');
		}
		
		if (target === 'deez nuts'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/nYD6ctb.gif" />');
		}
		
		if (target === 'fucked'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/trZWW6P.png" />');
		}
		
		if (target === 'uwot'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/cumZfCh.png" />');
		}
		
		if (target === 'fedora'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/FbbdUT9.jpg" />');
		}
		
		if (target === 'bongos'){
			matched = true;
			this.sendReplyBox('<img src="http://26.media.tumblr.com/tumblr_lzyy696EpI1r34jyyo2_250.gif" />');
		}
		
		if (target === 'dont blink'){
			matched = true;
			this.sendReplyBox('<img src="http://www.scaredstiffreviews.com/wp-content/uploads/2014/11/Dont-Blink2.gif" />');
		}
		
		if (target === 'umad'){
			matched = true;
			this.sendReplyBox('<img src="http://dailysnark.com/wp-content/uploads/2013/11/umad.gif" />');
		}
		
		if (target === 'if you know what i mean'){
			matched = true;
			this.sendReplyBox('<img src="http://fcdn.mtbr.com/attachments/california-norcal/805709d1370480032-should-strava-abandon-kom-dh-2790387-if-you-know-what-i-mean.png" />');
		}
		
		if (target === 'doge'){
			matched = true;
			this.sendReplyBox('<img src="http://0.media.dorkly.cvcdn.com/79/63/33f2d1f368e229c7e09baa64804307b4-a-wild-doge-appeared.jpg" height="242" width="300" />');
		}
		
		if (target === 'orgasm'){
			matched = true;
			this.sendReplyBox('<img src="http://puu.sh/hHidM/db81baee7d.png" />');
		}
		
		if (target === 'macklemore'){
			matched = true;
			this.sendReplyBox('<img src="http://40.media.tumblr.com/43baf9472512df7d44f8f938a0e997be/tumblr_nad882rLHK1qewacoo1_500.jpg" width="300 height="343" />');
		}
		
		if (target === 'troll'){
			matched = true;
			this.sendReplyBox('<img src="http://static3.wikia.nocookie.net/__cb20131014231760/legomessageboards/images/c/c2/Troll-face.png" height="200" width="200" />');
		}
		
		if (target === 'fail'){
			matched = true;
			this.sendReplyBox('<img src="http://diginomica.com/wp-content/uploads/2013/11/+big-fail2.jpg" height="180" width="320" />');
		}
		
		if (target === 'hawkward'){
			matched = true;
			this.sendReplyBox('<img src="https://i.imgflip.com/e6cip.jpg" height="350" width="330" />');
		}
		
		if (target === 'cool story bro'){
			matched = true;
			this.sendReplyBox('<img src="http://www.troll.me/images/creepy-willy-wonka/cool-story-bro-lets-hear-it-one-more-time.jpg" height="275" width="275" />');
		}
		
		if (target === 'udense'){
			matched = true;
			this.sendReplyBox('<img src="http://i2.kym-cdn.com/photos/images/newsfeed/000/461/903/3a9.png" height="250" width="340" />');
		}
		
		if (target === 'you dont say'){
			matched = true;
			this.sendReplyBox('<img src="http://www.wired.com/images_blogs/gamelife/2014/01/youdontsay.jpg" height="209" width="250" />');
		}
		
		if (target === 'ninjask\'d'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/ST7DNnh.png" />');
		}
		
		if (target === 'fuck this'){
			matched = true;
			this.sendReplyBox('<img src="http://i3.kym-cdn.com/photos/images/original/000/571/700/c3a.gif" height="150" width="300" />');
		}
		
		if (target === 'slowbro'){
			matched = true;
			this.sendReplyBox('<img src="http://static.fjcdn.com/pictures/U_698d9e_2568950.jpg" height="216" width="199" />');
		}
		
		if (target === 'rekt'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/47JMugo.jpg" />');
		}
		
		if (target === 'badass'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/Ai78NEt.png" />');
		}
		
		if (target === 'fabulous'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/HsY0KpR.gif" />');
		}
		
		if (target === 'wrong neighborhood'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/aiv8eyj.gif" />');
		}
		
		if (target === 'i regret nothing'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/1brNf9v.gif" />');
		}
		
		if (target === 'twss'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/cRoo7mt.jpg" />');
		}
		
		if (target === 'hm01'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/zl7CBuw.jpg" />');
		}
		
		if (target === 'bitch please'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/8hwtxWt.gif" />');
		}
		
		if (target === 'control your orgasms'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/QNO3TcF.gif" />');
		}
		
		if (target === 'haters gonna hate'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/FigQw0C.gif" />');
		}
		
		if (target === 'your mom'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/gBsEdHr.jpg" />');
		}
		
		if (target === 'shrekt'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/vXffwmY.jpg" />');
		}
		
		if (target === 'snickers'){
			matched = true;
			this.sendReplyBox('<img src="http://static.fjcdn.com/pictures/Grab+a+snickers+not+mine_b3375c_4726614.png" />');
		}
		
		if (target === 'baka'){
			matched = true;
			this.sendReplyBox('<img src="http://cdn.sakuramagazine.com/wp-content/uploads/2013/12/Baka-manga-34558590-640-512.jpg" width="320" height="256" />');
		}
		
		if (target === 'tits or gtfo'){
			matched = true;
			this.sendReplyBox('<img src="http://static.fjcdn.com/pictures/Tits_858516_1361125.jpg" width="250" height="329" />');
		}
		
		if (target === 'swiggity'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/9yZA32s.gif" />');
		}
		
		if (target === 'dat ass'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/owuyFAB.png" />');
		}
		
		if (target === 'in a row'){
			matched = true;
			this.sendReplyBox('<img src="http://i.imgur.com/W5K7Ey1.png" />');
		}
		
                if (target === 'i made this for you'){
                        matched = true;
                        this.sendReplyBox('<img src="http://i.imgur.com/EoITea4.gifg" />');
                }
                
                if (target === 'the fuck did you just say to me'){
                        matched = true;
                        this.sendReplyBox('<img src="http://i.imgur.com/1lOmwGW.jpg" />');
                }
                
                if (target === 'u fukn wot'){
                        matched = true;
                        this.sendReplyBox('<img src="http://i.imgur.com/L332nfL.jpg" />');
                }
                
                if (target === 'get rekt'){
                        matched = true;
                        this.sendReplyBox('<img src="http://i.imgur.com/XU7JlpQ.png" />');
                }
                
                if (target === 'ba ton pass'){
                        matched = true;
                        this.sendReplyBox('<img src="http://i.imgur.com/T0rHSiB.jpg" width="400" height="300" />');
                }
                if (target === ''){
			}
		else if (!matched) {

			this.sendReply(''+target+' is not available or non existent.');
		}
	},
	
	/*********************************************************
	 * inb5 serp breaks the server with these
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
	
	
	
	  masspm: 'pmall',
    pmall: function (target, room, user) {
        if (!this.can('pmall')) return;
        if (!target) return this.parse('/help pmall');

        var pmName = '~The Admins [Server PM]';

        for (var i in Users.users) {
            var message = '|pm|' + pmName + '|' + Users.users[i].getIdentity() + '|' + target;
            Users.users[i].send(message);
        }
    },

    rmall: function (target, room, user) {
        if(!this.can('declare')) return;
        if (!target) return this.parse('/help rmall');

        var pmName = '~The Admins [Room PM]';

        for (var i in room.users) {
            var message = '|pm|' + pmName + '|' + room.users[i].getIdentity() + '|' + target;
            room.users[i].send(message);
        }
    },

    roomlist: function (target, room, user) {
        if(!this.can('roomlist')) return;

        var rooms = Object.keys(Rooms.rooms),
            len = rooms.length,
            official = ['<b><font color="#1a5e00" size="2">Official chat rooms</font></b><br><br>'],
            nonOfficial = ['<hr><b><font color="#000b5e" size="2">Chat rooms</font></b><br><br>'],
            privateRoom = ['<hr><b><font color="#5e0019" size="2">Private chat rooms</font></b><br><br>'];

        while (len--) {
            var _room = Rooms.rooms[rooms[(rooms.length - len) - 1]];
            if (_room.type === 'chat') {
                if (_room.isOfficial) {
                    official.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
                    continue;
                }
                if (_room.isPrivate) {
                    privateRoom.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
                    continue;
                }
                nonOfficial.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
            }
        }

        this.sendReplyBox(official.join(' ') + nonOfficial.join(' ') + privateRoom.join(' '));
    },
	 
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
	
		kakujarules: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<font size="4" color="#FF24E5"><b>Kakuja Rules</b></font><br><font size="2" color="#3DA5FF">1.) Staff members are not to warn, mute, or lock any other staff without an admin\'s permission (unless of course they break a global rule)<br>2.) Anyone who mentions nudes will receive an instant lock. If they mention it again, they will be banned, no questions asked.<br>3.) All warnings, mutes, and locks should be delivered maturely and for warranted reasons, not personal reasons.<br>4.) Kakuja has made some changes to typings, type effectiveness, moves, movesets, abilities, and stats. If you have any questions about the changes, please feel free to click on the Kakuja Pokemon button in the roomintro or message an admin.<br>8.) There is a fine line between constructive criticism and disrespect.<br>5.) Staff, please remember that locks are a final measure for discipline, and to deliver warns and mutes first, lock only if the behaviour continues.<br>6.) Be nice.<br>7.) We do not talk about the Wonder Guard Sableye incident. ');
	},
		alice: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('I don\'t think you quite understand the severeity of the situation we\'ve gotten ourselves into, do you? You can\'t even seem to grasp the mess things are in, how deep in this shit we are. We shouldn\'t have followed that rabbit down into Wonderland Alice. Everythings all fucked up. Theres a war going on, And you\'re the cause of it. One day you\'ll realise this, when you see just how much death and destruction you\'ve caused.. The queen of hearts has sent her soldiers out, they\'re on the hunt, nowhere is safe, first they took the chesire cat, wiped his smile right off his face. Then the caterpillar, poor fucker was stoned, never even stood a chance, and Now you and I alice. The mad hatter, We\'re Next.. But until then I think you should know thats it\'s all your fault.. all your fault that we\'re sitting here with Deez Nuts.');
	},
		suicune: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<table><td bgcolor="#303030" width="900"><br><table><td><span class="col numcol">Ubers&nbsp;</span></td><td> <span class="col iconcol"><img src="http://i.imgur.com/1cLvq4P.png" width="85" height="85" align="bottom"></span></td><td><font size="3">&nbsp;&nbsp;Charlotte&nbsp;&nbsp;&nbsp;&nbsp;</font></td><td><img src="http://play.pokemonshowdown.com/sprites/types/Water.png" width="32" height="14"><img src="http://play.pokemonshowdown.com/sprites/types/Dark.png" width="32" height="14">&nbsp;&nbsp;&nbsp;</td><td><font size="2" width="100%">Serene Grace &nbsp;&nbsp;<i> Eternal Beauty</i></td></table><table><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;<font size="1">HP</font><br><font size="1">&nbsp;100</font></td><td>&nbsp;<font size="1">Atk</font><br><font size="1">&nbsp;&nbsp;75</font></td><td>&nbsp;<font size="1">Def</font><br><font size="1">&nbsp;110</font></td><td>&nbsp;<font size="1">SpA</font><br><font size="1">&nbsp;&nbsp;100</font></td><td>&nbsp;<font size="1">SpD</font><br><font size="1">&nbsp;&nbsp;110</font></td><td>&nbsp;<font size="1">Spe</font><br><font size="1">&nbsp;&nbsp;90</font></td><td>&nbsp;&nbsp;<font size="1">BST</font><br><font size="1">&nbsp;&nbsp;&nbsp;585</font></td></table><table><td><font size="1" color="grey">Dex#:</font> <font size="1"> 245 | <font size="1" color="grey">Height:</font> <font size="1">1.57 m | <font size="1" color="grey">Weight:</font> <font size="1">58 kg <i>(80 BP)</font> | <font size="1" color="grey">Dex Colour:</font> <font size="1"> Blue | <font size="1" color="grey">Egg Group(s):</font> <font size="1">Pure, Perfection | <font size="1" color="grey">Does Not Evolve</td></table></table>');
	},
		serperior: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<table><td bgcolor="#303030" width="900"><br><table><td><span class="col numcol">Ubers&nbsp;</span></td><td> <span class="col iconcol"><img src="http://73.10.53.242:8000/avatars/p3kenM2.png" width="84" height="76" align="bottom"></span></td><td><font size="3">&nbsp;&nbsp;Kevin&nbsp;&nbsp;&nbsp;&nbsp;</font></td><td><img src="http://play.pokemonshowdown.com/sprites/types/Grass.png" width="32" height="14">&nbsp;&nbsp;&nbsp;</td><td><font size="2" width="100%">Analytic &nbsp;&nbsp;<i> Defiant</i></td></table><table><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;<font size="1">HP</font><br><font size="1">&nbsp;&nbsp;75</font></td><td>&nbsp;<font size="1">Atk</font><br><font size="1">&nbsp;&nbsp;75</font></td><td>&nbsp;<font size="1">Def</font><br><font size="1">&nbsp;&nbsp;95</font></td><td>&nbsp;<font size="1">SpA</font><br><font size="1">&nbsp;&nbsp;100</font></td><td>&nbsp;<font size="1">SpD</font><br><font size="1">&nbsp;&nbsp;&nbsp;95</font></td><td>&nbsp;<font size="1">Spe</font><br><font size="1">&nbsp;113</font></td><td>&nbsp;&nbsp;<font size="1">BST</font><br><font size="1">&nbsp;&nbsp;553</font></td></table><table><td><font size="1" color="grey">Dex#:</font> <font size="1"> 497 | <font size="1" color="grey">Height:</font> <font size="1">2.01 m | <font size="1" color="grey">Weight:</font> <font size="1">69 kg <i>(80 BP)</font> | <font size="1" color="grey">Dex Colour:</font> <font size="1"> Green | <font size="1" color="grey">Egg Group(s):</font> <font size="1">Snake, Sociopath | <font size="1" color="grey">Does Not Evolve</td></table></table>');
	},
		vaporeon: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<table><td bgcolor="#303030" width="900"><br><table><td><span class="col numcol">Ubers&nbsp;</span></td><td> <span class="col iconcol"><img src="http://73.10.53.242:8000/avatars/Hayley.png" width="80" height="80" align="bottom"></span></td><td><font size="3">&nbsp;&nbsp;Hayley&nbsp;&nbsp;&nbsp;&nbsp;</font></td><td><img src="http://play.pokemonshowdown.com/sprites/types/Water.png" width="32" height="14">&nbsp;&nbsp;&nbsp;</td><td><font size="2" width="100%">Friend Guard &nbsp;&nbsp;<i> Pixilate</i></td></table><table><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;<font size="1">HP</font><br><font size="1">&nbsp;&nbsp;135</font></td><td>&nbsp;<font size="1">Atk</font><br><font size="1">&nbsp;&nbsp;80</font></td><td>&nbsp;<font size="1">Def</font><br><font size="1">&nbsp;&nbsp;60</font></td><td>&nbsp;<font size="1">SpA</font><br><font size="1">&nbsp;&nbsp;110</font></td><td>&nbsp;<font size="1">SpD</font><br><font size="1">&nbsp;&nbsp;&nbsp;95</font></td><td>&nbsp;<font size="1">Spe</font><br><font size="1">&nbsp;80</font></td><td>&nbsp;&nbsp;<font size="1">BST</font><br><font size="1">&nbsp;&nbsp;565</font></td></table><table><td><font size="1" color="grey">Dex#:</font> <font size="1"> 134 | <font size="1" color="grey">Height:</font> <font size="1">1.6 m | <font size="1" color="grey">Weight:</font> <font size="1">58 kg <i>(60 BP)</font> | <font size="1" color="grey">Dex Colour:</font> <font size="1"> Blue | <font size="1" color="grey">Egg Group(s):</font> <font size="1">Natural, Beauty | <font size="1" color="grey">Does Not Evolve</td></table></table>');
	},
		floatzel: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<table><td bgcolor="#303030" width="900"><br><table><td><span class="col numcol">Ubers&nbsp;</span></td><td> <span class="col iconcol"><img src="http://73.10.53.242:8000/avatars/float.png" width="95" height="80" align="bottom"></span></td><td><font size="3">&nbsp;&nbsp;Float&nbsp;&nbsp;&nbsp;&nbsp;</font></td><td><img src="http://play.pokemonshowdown.com/sprites/types/Water.png" width="32" height="14"><img src="http://play.pokemonshowdown.com/sprites/types/Fighting.png" width="32" height="14">&nbsp;&nbsp;&nbsp;</td><td><font size="2" width="100%">Pixilate &nbsp;&nbsp;<i> Swift Swim</i></td></table><table><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;<font size="1">HP</font><br><font size="1">&nbsp;&nbsp;85</font></td><td>&nbsp;<font size="1">Atk</font><br><font size="1">&nbsp;&nbsp;105</font></td><td>&nbsp;<font size="1">Def</font><br><font size="1">&nbsp;&nbsp;70</font></td><td>&nbsp;<font size="1">SpA</font><br><font size="1">&nbsp;&nbsp;85</font></td><td>&nbsp;<font size="1">SpD</font><br><font size="1">&nbsp;&nbsp;&nbsp;70</font></td><td>&nbsp;<font size="1">Spe</font><br><font size="1">&nbsp;110</font></td><td>&nbsp;&nbsp;<font size="1">BST</font><br><font size="1">&nbsp;&nbsp;530</font></td></table><table><td><font size="1" color="grey">Dex#:</font> <font size="1"> 419 | <font size="1" color="grey">Height:</font> <font size="1">1.7 m | <font size="1" color="grey">Weight:</font> <font size="1">55 kg <i>(80 BP)</font> | <font size="1" color="grey">Dex Colour:</font> <font size="1"> Brown | <font size="1" color="grey">Egg Group(s):</font> <font size="1">Logic, Digital | <font size="1" color="grey">Does Not Evolve</td></table></table>');
	},
		sableye: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<table><td bgcolor="#303030" width="900"><br><table><td><span class="col numcol">Ubers&nbsp;</span></td><td> <span class="col iconcol"><img src="http://i.imgur.com/a0lcSHo.png" width="80" height="80" align="bottom"></span></td><td><font size="3">&nbsp;&nbsp;Travis&nbsp;&nbsp;&nbsp;&nbsp;</font></td><td><img src="http://play.pokemonshowdown.com/sprites/types/Dark.png" width="32" height="14"><img src="http://play.pokemonshowdown.com/sprites/types/Ghost.png" width="32" height="14">&nbsp;&nbsp;&nbsp;</td><td><font size="2" width="100%">Dark Aura&nbsp;&nbsp;<i> Defiant</i></td></table><table><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;<font size="1">HP</font><br><font size="1">&nbsp;&nbsp;50</font></td><td>&nbsp;<font size="1">Atk</font><br><font size="1">&nbsp;&nbsp;75</font></td><td>&nbsp;<font size="1">Def</font><br><font size="1">&nbsp;&nbsp;75</font></td><td>&nbsp;<font size="1">SpA</font><br><font size="1">&nbsp;&nbsp;5m</font></td><td>&nbsp;<font size="1">SpD</font><br><font size="1">&nbsp;&nbsp;&nbsp;65</font></td><td>&nbsp;<font size="1">Spe</font><br><font size="1">&nbsp;50</font></td><td>&nbsp;&nbsp;<font size="1">BST</font><br><font size="1">&nbsp;&nbsp;5,380,000</font></td></table><table><td><font size="1" color="grey">Dex#:</font> <font size="1"> 658 | <font size="1" color="grey">Height:</font> <font size="1">1.6 m | <font size="1" color="grey">Weight:</font> <font size="1">66 kg <i>(80 BP)</font> | <font size="1" color="grey">Dex Colour:</font> <font size="1"> Purple | <font size="1" color="grey">Egg Group(s):</font> <font size="1">Protective, Caring| <font size="1" color="grey">Does Not Evolve</td></table></table>');
	},
		mewtwo: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<table><td bgcolor="#303030" width="900"><br><table><td><span class="col numcol">Ubers&nbsp;</span></td><td> <span class="col iconcol"><img src="http://i.imgur.com/SVVNMqi.png" width="100" height="70" align="bottom"></span></td><td><font size="3">&nbsp;&nbsp;Aurora&nbsp;&nbsp;&nbsp;&nbsp;</font></td><td><img src="http://play.pokemonshowdown.com/sprites/types/Psychic.png" width="32" height="14"><img src="http://play.pokemonshowdown.com/sprites/types/Dark.png" width="32" height="14">&nbsp;&nbsp;&nbsp;</td><td><font size="2" width="100%">Intimidate &nbsp;&nbsp;<i> Cute Charm</i></td></table><table><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;<font size="1">HP</font><br><font size="1">&nbsp;&nbsp;106</font></td><td>&nbsp;<font size="1">Atk</font><br><font size="1">&nbsp;&nbsp;110</font></td><td>&nbsp;<font size="1">Def</font><br><font size="1">&nbsp;&nbsp;90</font></td><td>&nbsp;<font size="1">SpA</font><br><font size="1">&nbsp;&nbsp;154</font></td><td>&nbsp;<font size="1">SpD</font><br><font size="1">&nbsp;&nbsp;&nbsp;90</font></td><td>&nbsp;<font size="1">Spe</font><br><font size="1">&nbsp;130</font></td><td>&nbsp;&nbsp;<font size="1">BST</font><br><font size="1">&nbsp;&nbsp;680</font></td></table><table><td><font size="1" color="grey">Dex#:</font> <font size="1"> 150 | <font size="1" color="grey">Height:</font> <font size="1">1.57 m | <font size="1" color="grey">Weight:</font> <font size="1">58 kg <i>(80 BP)</font> | <font size="1" color="grey">Dex Colour:</font> <font size="1"> Purple | <font size="1" color="grey">Egg Group(s):</font> <font size="1">Pure, Perfection | <font size="1" color="grey">Does Not Evolve</td></table></td></table></table>');
	},
		beedrill: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<table><td><span class="col numcol">Ubers&nbsp;</span></td><td> <span class="col iconcol"><img src="http://73.10.53.242:8000/avatars/Ad.png" width="87" height="78" align="bottom"></span></td><td><font size="3">&nbsp;&nbsp;Adam&nbsp;&nbsp;&nbsp;&nbsp;</font></td><td><img src="http://play.pokemonshowdown.com/sprites/types/Bug.png" width="32" height="14"><img src="http://play.pokemonshowdown.com/sprites/types/Poison.png" width="32" height="14">&nbsp;&nbsp;&nbsp;</td><td><font size="2" width="100%">Pressure &nbsp;&nbsp;<i> Cloud Nine</i></td></table><table><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;<font size="1">HP</font><br><font size="1">&nbsp;&nbsp;65</font></td><td>&nbsp;<font size="1">Atk</font><br><font size="1">&nbsp;&nbsp;195</font></td><td>&nbsp;<font size="1">Def</font><br><font size="1">&nbsp;&nbsp;40</font></td><td>&nbsp;<font size="1">SpA</font><br><font size="1">&nbsp;&nbsp;15</font></td><td>&nbsp;<font size="1">SpD</font><br><font size="1">&nbsp;&nbsp;&nbsp;80</font></td><td>&nbsp;<font size="1">Spe</font><br><font size="1">&nbsp;145</font></td><td>&nbsp;&nbsp;<font size="1">BST</font><br><font size="1">&nbsp;&nbsp;540</font></td></table><table><td><font size="1" color="grey">Dex#:</font> <font size="1"> 15 | <font size="1" color="grey">Height:</font> <font size="1">1.8 m | <font size="1" color="grey">Weight:</font> <font size="1">65 kg <i>(80 BP)</font> | <font size="1" color="grey">Dex Colour:</font> <font size="1"> Yellow | <font size="1" color="grey">Egg Group(s):</font> <font size="1">Model, Cutie | <font size="1" color="grey">Does Not Evolve</td></table></td></table>');
	},
	victini: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<table><td><span class="col numcol">Ubers&nbsp;</span></td><td> <span class="col iconcol"><img src="http://73.10.53.242:8000/avatars/victilite.png" width="80" height="90" align="bottom"></span></td><td><font size="3">&nbsp;&nbsp;Mark&nbsp;&nbsp;&nbsp;&nbsp;</font></td><td><img src="http://play.pokemonshowdown.com/sprites/types/Psychic.png" width="32" height="14"><img src="http://play.pokemonshowdown.com/sprites/types/Fire.png" width="32" height="14">&nbsp;&nbsp;&nbsp;</td><td><font size="2" width="100%">Flare Boost &nbsp;&nbsp;<i> Sniper</i></td></table><table><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;<font size="1">HP</font><br><font size="1">&nbsp;&nbsp;100</font></td><td>&nbsp;<font size="1">Atk</font><br><font size="1">&nbsp;&nbsp;100</font></td><td>&nbsp;<font size="1">Def</font><br><font size="1">&nbsp;&nbsp;100</font></td><td>&nbsp;<font size="1">SpA</font><br><font size="1">&nbsp;&nbsp;100</font></td><td>&nbsp;<font size="1">SpD</font><br><font size="1">&nbsp;&nbsp;&nbsp;100</font></td><td>&nbsp;<font size="1">Spe</font><br><font size="1">&nbsp;100</font></td><td>&nbsp;&nbsp;<font size="1">BST</font><br><font size="1">&nbsp;&nbsp;600</font></td></table><table><td><font size="1" color="grey">Dex#:</font> <font size="1"> 262 | <font size="1" color="grey">Height:</font> <font size="1">1.4 m | <font size="1" color="grey">Weight:</font> <font size="1">36 kg <i>(40 BP)</font> | <font size="1" color="grey">Dex Colour:</font> <font size="1"> Yellow | <font size="1" color="grey">Egg Group(s):</font> <font size="1">Messy, Naive | <font size="1" color="grey">Does Not Evolve</td></table>');
	},
	sylveon: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<table><td><span class="col numcol">Ubers&nbsp;</span></td><td> <span class="col iconcol"><img src="http://73.10.53.242:8000/avatars/Anna.png" width="80" height="80" align="bottom"></span></td><td><font size="3">&nbsp;&nbsp;Annabelle&nbsp;&nbsp;&nbsp;&nbsp;</font></td><td><img src="http://play.pokemonshowdown.com/sprites/types/Fairy.png" width="32" height="14">&nbsp;&nbsp;&nbsp;</td><td><font size="2" width="100%">Pixilate &nbsp;&nbsp;<i> Prankster</i></td></table><table><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;<font size="1">HP</font><br><font size="1">&nbsp;&nbsp;95</font></td><td>&nbsp;<font size="1">Atk</font><br><font size="1">&nbsp;&nbsp;65</font></td><td>&nbsp;<font size="1">Def</font><br><font size="1">&nbsp;&nbsp;65</font></td><td>&nbsp;<font size="1">SpA</font><br><font size="1">&nbsp;&nbsp;140</font></td><td>&nbsp;<font size="1">SpD</font><br><font size="1">&nbsp;&nbsp;&nbsp;130</font></td><td>&nbsp;<font size="1">Spe</font><br><font size="1">&nbsp;60</font></td><td>&nbsp;&nbsp;<font size="1">BST</font><br><font size="1">&nbsp;&nbsp;555</font></td></table><table><td><font size="1" color="grey">Dex#:</font> <font size="1"> 150 | <font size="1" color="grey">Height:</font> <font size="1">1.6 m | <font size="1" color="grey">Weight:</font> <font size="1">44 kg <i>(60 BP)</font> | <font size="1" color="grey">Dex Colour:</font> <font size="1"> Pink | <font size="1" color="grey">Egg Group(s):</font> <font size="1">Young, Mischevious | <font size="1" color="grey">Does Not Evolve</td></table>');
	},
	mightyena: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<table><td><span class="col numcol">Ubers&nbsp;</span></td><td> <span class="col iconcol"><img src="http://73.10.53.242:8000/avatars/Mighty.png" width="80" height="90" align="bottom"></span></td><td><font size="3">&nbsp;&nbsp;James&nbsp;&nbsp;&nbsp;&nbsp;</font></td><td><img src="http://play.pokemonshowdown.com/sprites/types/Dark.png" width="32" height="14">&nbsp;&nbsp;&nbsp;</td><td><font size="2" width="100%">Prankster &nbsp;&nbsp;<i> Friend Guard</i></td></table><table><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;<font size="1">HP</font><br><font size="1">&nbsp;&nbsp;70</font></td><td>&nbsp;<font size="1">Atk</font><br><font size="1">&nbsp;&nbsp;130</font></td><td>&nbsp;<font size="1">Def</font><br><font size="1">&nbsp;&nbsp;70</font></td><td>&nbsp;<font size="1">SpA</font><br><font size="1">&nbsp;&nbsp;60</font></td><td>&nbsp;<font size="1">SpD</font><br><font size="1">&nbsp;&nbsp;&nbsp;60</font></td><td>&nbsp;<font size="1">Spe</font><br><font size="1">&nbsp;70</font></td><td>&nbsp;&nbsp;<font size="1">BST</font><br><font size="1">&nbsp;&nbsp;480</font></td></table><table><td><font size="1" color="grey">Dex#:</font> <font size="1"> 262 | <font size="1" color="grey">Height:</font> <font size="1">1.8 m | <font size="1" color="grey">Weight:</font> <font size="1">68 kg <i>(80 BP)</font> | <font size="1" color="grey">Dex Colour:</font> <font size="1"> Black | <font size="1" color="grey">Egg Group(s):</font> <font size="1">Sneaky, Intelligent | <font size="1" color="grey">Does Not Evolve</td></table>');
	},
	viewemotes: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<center><font size="4" color="#FF24E5"><b>Kakuja Emotes</b></font></center><br><center><font size="2"><i>If you have a suggestion PM an Admin(~) or Leader(&) with the name and image you want, and they will add it ASAP. (Size Limit of : 40x40)</font></center><button class="astext"><img src="http://i.imgur.com/6Evl1pL.jpg" width="30" height="25"><br>badaSS</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/irQ3x6G.png" width="30" height="30"><br>cHild</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/RhMeAme.gif" width="30" height="30"><br>feelspink</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png" width="20" height="30"><br>Kreygasm</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://a.deviantart.net/avatars/d/o/dogeoffical.gif" width="30" height="30"><br>Doge</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="https://fungustime.pw/tastyplug/emotes/gifs/34.gif" width="36" height="35"><br>KappaSpin</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://www.freesmileys.org/emoticons/emoticon-pokemon-015.gif" width="32" height="32"><br>ZZzz</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/kixjIOR.gif" width="32" height="23"><br>O_O</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/uOZkuAU.gif" width="23" height="34"><br>baLLs</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://puu.sh/hDSDm/9e75df80e5.gif" width="72" height="56"><br>LooL</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/DHWjlPA.png" width="29" height="26"><br>D:</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://www.freesmileys.org/emoticons/emoticon-pokemon-001.gif" width="45" height="45"><br>juhBlaze</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://chatslang.com/images/shortcuts/twitch/admins/dansgame.png" width="27" height="37"><br>DansGame</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://www.freesmileys.org/emoticons/emoticon-pokemon-002.gif" width="39" height="43"><br>Weed</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://www.ps4news.de/forum/public/style_emoticons/default/trollface%20.gif" width="40" height="33"><br>troLL</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://puu.sh/hJQFn/675369762a.jpg" width="35" height="48"><br>Reagan</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://fc02.deviantart.net/fs71/f/2012/039/b/6/meowth_wink_avatar_by_milfeyu-d4p2vi8.png" width="49" height="35"><br>;)</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/MiwopCh.png" width="25" height="25"><br>^_^</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/Qmv32c7.png" width="25" height="25"><br>challengeaccepted</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/kd7oeiX.png" width="25" height="25"><br>fuckyeah</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/FChx5bz.png" width="25" height="25"><br>gj</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/uRJ4yNR.png" width="28" height="25"><br>justin</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/V3exz0t.png" width="27" height="29"><br>gusta</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/cee078K.png" width="35" height="35"><br>miley</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/7s6zezZ.png" width="30" height="30"><br>nicki</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/4Y4oQI2.png" width="25" height="25"><br>notbad</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/foDFdu5.png" width="30" height="31"><br>stopit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/NPwDs9k.png" width="20" height="20"><br>pokerface</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://fc06.deviantart.net/fs71/f/2014/328/5/8/foxy_emoticon_icon_gif___five_nights_at_freddy_s_by_geeksomniac-d7vr08y.gif" width="30" height="30"><br>foxy</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://fc06.deviantart.net/fs70/f/2014/329/5/7/five_nights_at_freddy_s_2___sexy_chica___icon_gif_by_geeksomniac-d87lray.gif" width="30" height="30"><br>chica</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://fc07.deviantart.net/fs71/f/2014/300/4/0/freddy_emoticon_icon_gif___five_nights_at_freddy_s_by_geeksomniac-d7vwxmk.gif" width="30" height="30"><br>freddy fazbear</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://fc07.deviantart.net/fs71/f/2015/052/b/9/fnaf_3_springtrap_by_xgoldrobo-d8ixjvx.gif" width="30" height="30"><br>springtrap</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://fc01.deviantart.net/fs70/f/2014/327/9/f/bonnie_emoticon_icon_gif___five_nights_at_freddy_s_by_geeksomniac-d7wh4hg.gif" width="30" height="30"><br>bonnie</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://puu.sh/hlRLD/50835e4551.png" width="30" height="30"><br>mtn dew</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://puu.sh/hlRLO/09f5f7eb5b.png" width="30" height="30"><br>doritos</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://orig05.deviantart.net/3838/f/2015/108/b/1/output_d2yeww_by_nightfuryfire2-d8q6ed0.gif" width="30" height="30"><br>WoW</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="https://s3.amazonaws.com/mlg_chat_production/emoticons/mumbleturn.png" width="30" height="30"><br>turnon</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="https://s3.amazonaws.com/mlg_chat_production/emoticons/ricegumlowt.png" width="30" height="30"><br>lowtier</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://wordpress.tools.majorleaguegaming.com/wp-content/uploads/2014/09/rekt.png" width="30" height="30"><br>rekt</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://wordpress.tools.majorleaguegaming.com/wp-content/uploads/2014/09/letsgo.png" width="30" height="30"><br>leggo</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://fc07.deviantart.net/fs71/f/2014/341/5/0/_lennyface__by_romenx-d890etz.gif" width="30" height="30"><br>lennyface</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/kwR8Re9.png" width="30" height="30"><br>wtfman</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="astext"><img src="http://i.imgur.com/ampqCZi.gif" width="30" height="30"><br>fukya</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	},
	kevin: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<center><img src="http://puu.sh/hEZ0K/0bd7e38ecb.png" width="396" height="356"><br><font size="5">"Call Me Christian Gray"</font></center>');
			
	},
	
	frt: 'forcerenameto',
	forcerenameto: function(target, room, user) {
		if (!target) return this.parse('/help forcerenameto');
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}
		if (!target) {
			return this.sendReply('No new name was specified.');
		}
		if (!this.can('forcerenameto', targetUser)) return false;

		if (targetUser.userid === toUserid(this.targetUser)) {
			var entry = ''+targetUser.name+' was forcibly renamed to '+target+' by '+user.name+'.';
			this.logModCommand(entry);
			Rooms.lobby.sendAuth(entry);
			if (room.id !== 'lobby') {
				room.add(entry);
			} else {
				room.logEntry(entry);
			}
			targetUser.forceRename(target, undefined, true);
		} else {
			this.sendReply("User "+targetUser.name+" is no longer using that name.");
		}
	},

        away: function (target, room, user) {
		user.away = !user.away;
		user.updateIdentity();
		this.sendReply("You are " + (user.away ? "now" : "no longer") + " away.");
	},
	eating: 'away',
       anime: 'away',
       shower: 'away',
       gaming: 'away',
       sleep: 'away',
       work: 'away',
       smashing: 'away',
       working: 'away',
       sleeping: 'away',
       skype: 'away',
       busy: 'away',
       fapping: 'away',
       afk: 'away',
       coding: 'away',
       sexting: 'away',
       peeing: 'away',
       bot: 'away',
       salty: 'away',
       away: function(target, room, user, connection, cmd) {
            // unicode away message idea by Siiilver
            var t = 'â’¶â“¦â“â“¨';
            var t2 = 'Away';
            switch (cmd) {
           case 'busy':
t = 'â’·â“¤â“¢â“¨';
t2 = 'Busy';
break;
case 'sleeping':
t = 'â“ˆâ“›â“”â“”â“Ÿâ“˜â“â“–';
t2 = 'Sleeping';
break;
case 'peeing':
t = 'â“Ÿâ“”â“”â“˜â“â“–';
t2 = 'Relieveing themselves';
break;
case 'bot':
t = 'â’·â“žâ“£';
t2 = 'Serps Bot';
break;
case 'sleep':
t = 'â“ˆâ“›â“”â“”â“Ÿâ“˜â“â“–';
t2 = 'Sleeping';
break;
case 'smashing':
t = 'â“ˆâ“œâ“â“¢â“—â“˜â“â“–';
t2 = 'Smashing';
break;
case 'gaming':
t = 'â’¼â“â“œâ“˜â“â“–';
t2 = 'Gaming';
break;
case 'working':
t = 'â“Œâ“žâ“¡â“šâ“˜â“â“–';
t2 = 'Working';
break;
case 'skype':
t = 'â“ˆâ“šâ“¨â“Ÿâ“”';
t2 = 'on Skype';
break;
case 'work':
t = 'â“Œâ“žâ“¡â“šâ“˜â“â“–';
t2 = 'Working';
break;
case 'eating':
t = 'â’ºâ“â“£â“˜â“â“–';
t2 = 'Eating delicious foods.';
break;
case 'fapping':
t = 'â’»â“â“Ÿâ“Ÿâ“˜â“â“–';
t2 = 'Fapping';
break;
case 'sexting':
t = 'â“ˆâ“”â“§â“£â“˜â“â“–';
t2 = 'getting laid in rp';
break;
case 'coding':
t = 'â’¸â“žâ““â“˜â“â“–';
t2 = 'stressing over code';
break;
case 'anime':
t = 'â’¶â“â“˜â“œâ“”';
t2 = 'Watching Anime';
break;
case 'shower':
t = 'â“ˆâ“—â“žâ“¦â“”â“¡';
t2 = 'In the shower';
break;
default:
t = 'â’¶â“¦â“â“¨'
t2 = 'Away';
break;
}
 
if (user.name.length > 18) return this.sendReply('Your username exceeds the length limit.');
 
if (!user.isAway) {
user.originalName = user.name;
var awayName = user.name + ' - '+t;
//delete the user object with the new name in case it exists - if it does it can cause issues with forceRename
delete Users.get(awayName);
user.forceRename(awayName, undefined, true);
 
if (user.isStaff) this.add('|raw|-- <b><font color="#088cc7">' + user.originalName +'</font color></b> is now '+t2.toLowerCase()+'. '+ (target ? " (" + escapeHTML(target) + ")" : ""));
 
user.isAway = true;
}
else {
return this.sendReply('You are already set as a form of away, type /back if you are now back.');
}
 
user.updateIdentity();
},
 
back: function(target, room, user, connection) {
 
if (user.isAway) {
if (user.name === user.originalName) {
user.isAway = false;
return this.sendReply('Your name has been left unaltered and no longer marked as away.');
}
 
var newName = user.originalName;
 
//delete the user object with the new name in case it exists - if it does it can cause issues with forceRename
delete Users.get(newName);
 
user.forceRename(newName, undefined, true);
 
//user will be authenticated
user.authenticated = true;
 
if (user.isStaff) this.add('|raw|-- <b><font color="#088cc7">' + newName + '</font color></b> is no longer away.');
 
user.originalName = '';
user.isAway = false;
}
else {
return this.sendReply('You are not set as away.');
}
 
user.updateIdentity();
	},
};
