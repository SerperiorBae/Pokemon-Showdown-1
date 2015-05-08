// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// XY Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Battle",
		section: "ORAS Singles",

		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Unrated Random Battle",
		section: "ORAS Singles",

		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "OU",
		section: "ORAS Singles",

		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite']
	},
	{
		name: "OU (suspect test)",
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite']
	},
	{
		name: "Ubers",
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard Ubers', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Ban Mod'],
		banlist: []
	},
	{
		name: "UU",
		section: "ORAS Singles",

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Alakazite', 'Altarianite', 'Diancite', 'Heracronite', 'Galladite', 'Gardevoirite', 'Lopunnite', 'Medichamite',
			'Metagrossite', 'Pinsirite', 'Drizzle', 'Drought', 'Shadow Tag'
		]
	},
	{
		name: "RU",
		section: "ORAS Singles",

		ruleset: ['UU'],
		banlist: ['UU', 'BL2', 'Galladite', 'Houndoominite', 'Pidgeotite']
	},
	{
		name: "NU",
		section: "ORAS Singles",

		searchShow: false,
		ruleset: ['RU'],
		banlist: ['RU', 'BL3', 'Glalitite']
	},
	{
		name: "NU (suspect test)",
		section: "ORAS Singles",

		challengeShow: false,
		ruleset: ['RU'],
		banlist: ['RU', 'BL3', 'Glalitite']
	},
	{
		name: "LC",
		section: "ORAS Singles",

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger']
	},
	{
		name: "Anything Goes",
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal']
	},
	/*{
		name: "CAP Plasmanta Playtest",
		section: "ORAS Singles",

		ruleset: ['CAP Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Soul Dew',
			'Tomohawk', 'Necturna', 'Mollux', 'Aurumoth', 'Malaconda', 'Cawmodore', 'Volkraken', 'Syclant', 'Revenankh', 'Pyroak', 'Fidgit', 'Stratagem', 'Arghonaut', 'Kitsunoh', 'Cyclohm', 'Colossoil', 'Krilowatt', 'Voodoom'
		]
	},*/
	{
		name: "Battle Spot Singles",
		section: "ORAS Singles",

		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview GBU'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 3) return ['You must bring at least three Pokémon.'];
		},
		onBegin: function () {
			this.debug('cutting down to 3');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Custom Game",
		section: "ORAS Singles",

		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// XY Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Doubles Battle",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Smogon Doubles",
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Xerneas', 'Yveltal', 'Zekrom', 'Salamencite', 'Soul Dew', 'Dark Void'
		]
	},
	{
		name: "Smogon Doubles Ubers",
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void']
	},
	{
		name: "Smogon Doubles UU",
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Smogon Doubles'],
		banlist: ['Aegislash', 'Amoonguss', 'Azumarill', 'Bisharp', 'Breloom', 'Chandelure', 'Charizard', 'Conkeldurr',
		'Cresselia', 'Deoxys-Attack', 'Diancie', 'Dragonite', 'Excadrill', 'Ferrothorn', 'Garchomp', 'Gardevoir',
		'Gengar', 'Greninja', 'Gyarados', 'Heatran', 'Hitmontop', 'Hydreigon', 'Kangaskhan', 'Keldeo',
		'Kyurem-Black', 'Landorus-Therian', 'Latios', 'Ludicolo', 'Mamoswine', 'Mawile', 'Meowstic', 'Metagross',
		'Politoed', 'Porygon2', 'Rotom-Wash', 'Sableye', 'Salamence', 'Scizor', 'Scrafty', 'Shaymin-Sky',
		'Slowbro', 'Suicune', 'Swampert', 'Sylveon', 'Talonflame', 'Terrakion', 'Thundurus', 'Togekiss',
		'Tyranitar', 'Venusaur', 'Volcarona', 'Whimsicott', 'Zapdos'
		]
	},
	{
		name: "Battle Spot Doubles (VGC 2015)",
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		banlist: ['Tornadus + Defiant', 'Thundurus + Defiant', 'Landorus + Sheer Force'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 4) return ['You must bring at least four Pokémon.'];
		},
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Battle Spot Special 8",
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 4) return ['You must bring at least four Pokémon.'];
			for (var i = 0; i < team.length; i++) {
				var item = this.getItem(team[i].item);
				if (item.id && !item.isBerry) return ['All items other than berries are banned.'];
			}
		},
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Generation Showdown",
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Species Clause', 'Item Clause', 'Team Preview VGC', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased', 'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Phione',
			'Manaphy', 'Darkrai', 'Shaymin', 'Shaymin-Sky', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie',
			'Soul Dew'
		],
		validateTeam: function (team, format) {
			if (team.length < 4) return ['You must bring at least four Pokémon.'];
			var legends = {'Mewtwo':1, 'Lugia':1, 'Ho-Oh':1, 'Kyogre':1, 'Groudon':1, 'Rayquaza':1, 'Dialga':1, 'Palkia':1, 'Giratina':1, 'Reshiram':1, 'Zekrom':1, 'Kyurem':1, 'Xerneas':1, 'Yveltal':1, 'Zygarde':1};
			var n = 0;
			for (var i = 0; i < team.length; i++) {
				var template = this.getTemplate(team[i].species).baseSpecies;
				if (template in legends) n++;
				if (n > 2) return ["You can only use up to two legendary Pokémon."];
			}
		},
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Doubles Challenge Cup",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Doubles Custom Game",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// XY Triples
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Triples Battle",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Smogon Triples",
		section: "ORAS Triples",

		gameType: 'triples',
		ruleset: ['Pokemon', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Xerneas', 'Yveltal', 'Zekrom',
			'Soul Dew', 'Dark Void', 'Perish Song'
		]
	},
	{
		name: "Battle Spot Triples",
		section: "ORAS Triples",

		gameType: 'triples',
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 6) return ['You must have six Pokémon.'];
		}
	},
	{
		name: "Triples Challenge Cup",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Triples Custom Game",
		section: "ORAS Triples",

		gameType: 'triples',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		name: "Classic Hackmons",
		section: "OM of the Month",
		column: 2,

		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		validateSet: function (set) {
			var template = this.getTemplate(set.species);
			var item = this.getItem(set.item);
			var problems = [];

			if (set.species === set.name) delete set.name;
			if (template.isNonstandard) {
				problems.push(set.species + ' is not a real Pokemon.');
			}
			if (item.isNonstandard) {
				problems.push(item.name + ' is not a real item.');
			}
			var ability = {};
			if (set.ability) ability = this.getAbility(set.ability);
			if (ability.isNonstandard) {
				problems.push(ability.name + ' is not a real ability.');
			}
			if (set.moves) {
				for (var i = 0; i < set.moves.length; i++) {
					var move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' is not a real move.');
					}
				}
				if (set.moves.length > 4) {
					problems.push((set.name || set.species) + ' has more than four moves.');
				}
			}
			if (set.level && set.level > 100) {
				problems.push((set.name || set.species) + ' is higher than level 100.');
			}
			return problems;
		}
	},
	{
		// Derp.
		name: "[Seasonal] Anime Wars",
		section: 'OM of the Month',

		team: 'randomSeasonalMay2015',
		mod: 'seasonal',
		gameType: 'triples',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('raw|<b><font color="red">IMPORTANT!</font></b> All moves on this seasonal are custom. Use the command /seasonaldata or /sdata to know what they do.');
			this.add('raw|More information can be found <a href="http://www.smogon.com/forums/threads/3491902/page-12#post-6202283">here</a>');
		},
		onModifyMove: function (move) {
			// Shows legit name after use...
			var legitNames = {
				recover: "Coffee Drink", softboiled: "Devour", reflect: "Dragon Booster", acupressure: "Gurido",
				holdhands: "Healing Machine", luckychant: "Shield", followme: "Kuso", meditate: "Wings Of Freedom",
				helpinghand: "A Bad Idea", spite: "Dying Breath", aromaticmist: "Perfect Form.", healbell: "Lum Berry",
				fakeout: "First Move", endure: "Last Stand", withdraw: "Barkskin", seismictoss: "Punishment",
				flamethrower: "Gremory Crest", fireblast: "Kagune", thunderbolt: "Kakuja", thunder: "Grappling Hook",
				toxic: "Death Note", leechseed: "Flesh Eat", icebeam: "Quinque", freezeshock: "Absolute Death",
				aircutter: "Annihilation", muddywater: "Storm", furyswipes: "Fury", scratch: "Garrote", slash: "Mutilate",
				smog: "Poison Gas", protect: "Evasion"
			};
			if (move.id in legitNames) {
				move.name = legitNames[move.id];
			}
		},
		onFaint: function (pokemon) {
			var message = {
				'Soul Evans': 'What is this place? Where am I? Wherever it is, it\'s completely dark. I can\'t even see my own body. It hurts... Which way is up? Which way is down? Where am I supposed to go? Someone help me.',
				'Amon': 'I’ll show them. I will be the one to correct this wrong world.',
				'Hatsune Miku': "The more tears you shed.. The more beautiful your heart will become.",
				'Armin': 'The strong feed upon weak. It\'s such an obligingly simple rule. Except in this world, my friends tried to be strong.', 
				'Moro': 'The Forest Spirit gives life and takes life away. Life and death are his alone. Or have you boars forgotten that?', 
				'Eren': 'I\'ll kill them all! I\'ll wipe every one of them... off the face of this earth!',
				'Ryuk': "For me, apples are like cigarettes and liquor for humans. If I\'m deprived, I go into withdrawals. My body gets all twisted, I do handstands, IT\'S NOT PRETTY!",
				'Akeno': 'Ara Ara Ufufufu. *Jiggles Boobs*',
				'Totoro': 'I will keep partying until the end.',
				'Suzuya': 'They can go die for all I care.',
				'L': 'Justice will prevail.', 
				'Yuno': 'Don\'t worry. I will protect you.', 
				'Issei': 'I’m going to continue fighting until I blow away girls clothes just by looking at them!',
				'Misa': "What A Beautiful way to kill someone.",
				'Sasha Blouse': '*Holds Potato* POTATO!',
				'Kaneki': 'Never Kick me when I\'m down. Because when I get up. You\'re Fucked.',
				'Touka': 'Everything is ‘terrible?’ Don’t make me laugh. So what about me…for me, it’s been terrible since I was born.',
				'Ayato': 'The world runs on power. Everything is determined by the superior power. You are weak. That is why you lose.',
				'Rias': 'There’s one last thing you should never forget, Ise. Even a [Pawn] can take down the [King].',
				'Light Yagami': 'Our battle will be concluded, and I will begin my reign from the summit of victory!',
				'Levi': 'I could not use the force...',
				'Mikasa': 'Once I\'m dead, I won\'t even be able to remember you. So I\'ll win, no matter what. I\'ll live, no matter what!',
				'San': 'you mean so much to me, but I can\'t forgive the humans for what they\'ve done.',
				'Ashitaka': 'If it would lift the curse, I\'d let it tear you apart. But even that wouldn\'t end the killing now, would it? ',
				'Freiza': 'Why... you worm! YOU DARE TO MOCK ME? ',
				'Raynare': 'Issei-kun! Please save me! This Devil is trying to kill me!',
				'Wrath': 'Why must everyone make such a fuss over the death of a single soldier? The moment a soldier dons his uniform, he accepts the reality that he might be buried in it.',
				'Rize': 'Whose fault is it that things ended up like this? Coincidence? An accident? Fate? There\'s no such thing as fate.',
				'Giratina': 'Giygogagohgwooh',
				'Giovanni': "I see that you raise Pokémon with utmost care. A child like you would never understand what I hope to achieve. I shall step aside this time! I hope we meet again...",
				'Eto': 'We just have to make Kaneki again, Right?',
				'Mado': "When you\'re in front of the enemy, even if your hands are trembling - fight.",
				'Cell': "You wretched child...how dare you...HOW DARE YOU?!",
				'Lady Eboshi': 'Now watch closely, everyone. I\'m going to show you how to kill a god. A god of life and death. The trick is not to fear him.',
				'Jason': 'Do what one likes...that is the right of the strong.',
				'Ani': '*beeps*',
				'Titan': '*peeks over the city walls*',
				'Kira': '...'
			}[pokemon.name];
			this.add('-message', pokemon.name + ': ' + message);
		}
	},
	{
		name: "CAP",
		section: "Other Metagames",
		column: 2,

		ruleset: ['OU'],
		banlist: ['Allow CAP']
	},
	{
		name: "Challenge Cup",
		section: "Other Metagames",

		team: 'randomCC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Challenge Cup 1-vs-1",
		section: "Other Metagames",

		team: 'randomCC',
		ruleset: ['Pokemon', 'Team Preview 1v1', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.debug('Cutting down to 1');
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Balanced Hackmons",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Ability Clause', '-ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Wonder Guard']
	},
	{
		name: "1v1",
		section: 'Other Metagames',

		ruleset: ['Pokemon', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview 1v1'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky',
			'Xerneas', 'Yveltal', 'Zekrom', 'Focus Sash', 'Kangaskhanite', 'Soul Dew'
		],
		validateTeam: function (team, format) {
			if (team.length > 3) return ['You may only bring up to three Pokémon.'];
		},
		onBegin: function () {
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Monotype",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Shaymin-Sky', 'Slowbronite', 'Soul Dew'
		]
	},
	{
		name: "Tier Shift",
		section: "Other Metagames",

		mod: 'tiershift',
		ruleset: ['OU']
	},
	{
		name: "PU",
		section: "Other Metagames",

		ruleset: ['NU'],
		banlist: ['NU', 'BL4', 'Altarianite', 'Beedrillite', 'Lopunnite']
	},
	{
		name: "Inverse Battle",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Snorlax',
			'Xerneas', 'Yveltal', 'Zekrom', 'Gengarite', 'Kangaskhanite', 'Salamencite', 'Soul Dew'
		],
		onModifyPokemon: function (pokemon) {
			pokemon.negateImmunity['Type'] = true;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		}
	},
	{
		name: "Almost Any Ability",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities', 'Arceus', 'Archeops', 'Bisharp', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mamoswine', 'Mewtwo', 'Palkia',
			'Rayquaza', 'Regigigas', 'Reshiram', 'Shedinja + Sturdy', 'Slaking', 'Smeargle + Prankster', 'Terrakion', 'Weavile', 'Xerneas', 'Yveltal',
			'Zekrom', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew', 'Chatter'
		],
		validateSet: function (set) {
			var bannedAbilities = {'Aerilate': 1, 'Arena Trap': 1, 'Contrary': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Imposter': 1, 'Parental Bond': 1, 'Protean': 1, 'Pure Power': 1, 'Shadow Tag': 1, 'Simple':1, 'Speed Boost': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				var template = this.getTemplate(set.species || set.name);
				var legalAbility = false;
				for (var i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pokémon that do not naturally have it.'];
			}
		}
	},
	{
		name: "STABmons",
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore STAB Moves', 'Arceus', 'Blaziken', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Porygon-Z', 'Rayquaza', 'Reshiram', 'Shaymin-Sky',
			'Sylveon', 'Xerneas', 'Yveltal', 'Zekrom', 'Altarianite', 'Gengarite', 'Kangaskhanite', "King's Rock", 'Lopunnite', 'Lucarionite',
			'Mawilite', 'Metagrossite', 'Razor Fang', 'Salamencite', 'Slowbronite', 'Soul Dew'
		]
	},
	{
		name: "LC UU",
		section: "Other Metagames",

		maxLevel: 5,
		ruleset: ['LC'],
		banlist: ['Abra', 'Aipom', 'Archen', 'Bunnelby', 'Carvanha', 'Chinchou', 'Corphish', 'Cottonee', 'Croagunk', 'Diglett',
			'Drilbur', 'Dwebble', 'Elekid', 'Ferroseed', 'Fletchling', 'Foongus', 'Gastly', 'Larvesta', 'Magnemite', 'Mienfoo',
			'Munchlax', 'Onix', 'Pancham', 'Pawniard', 'Ponyta', 'Porygon', 'Pumpkaboo-Super', 'Scraggy', 'Slowpoke', 'Snivy',
			'Snubbull', 'Spritzee', 'Staryu', 'Surskit', 'Timburr', 'Tirtouga', 'Vullaby', 'Vulpix', 'Zigzagoon', 'Shell Smash'
		]
	},
	{
		name: "350 Cup",
		section: "Other Metagames",

		mod: '350cup',
		searchShow: false,
		ruleset: ['Ubers', 'Evasion Moves Clause'],
		banlist: ['Abra', 'Cranidos', 'Darumaka', 'Gastly', 'Pawniard', 'Smeargle', 'Spritzee', 'DeepSeaScale', 'DeepSeaTooth', 'Light Ball', 'Thick Club'],
		validateSet: function (set) {
			var template = Tools.getTemplate(set.species);
			var item = this.getItem(set.item);
			if (item.name === 'Eviolite' && Object.values(template.baseStats).sum() <= 350) {
				return ['Eviolite is banned on Pokémon with 350 or lower BST.'];
			}
		}
	},
	{
		name: "Averagemons",
		section: "Other Metagames",

		mod: 'averagemons',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Evasion Abilities Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Gothita', 'Gothorita', 'Gothitelle', 'Sableye', 'Shedinja', 'Smeargle',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Gengarite', 'Kangaskhanite', 'Light Ball', 'Mawilite', 'Medichamite', 'Soul Dew', 'Thick Club',
			'Huge Power', 'Pure Power'
		]
	},
	{
		name: "Hidden Type",
		section: "Other Metagames",

		searchShow: false,
		mod: 'hiddentype',
		ruleset: ['OU']
	},
	{
		name: "Middle Cup",
		section: "Other Metagames",

		searchShow: false,
		maxLevel: 50,
		defaultLevel: 50,
		validateSet: function (set) {
			var template = this.getTemplate(set.species || set.name);
			if (!template.evos || template.evos.length === 0 || !template.prevo) {
				return [set.species + " is not the middle Pokémon in an evolution chain."];
			}
		},
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Chansey', 'Frogadier', 'Eviolite']
	},
	{
		name: "Sky Battle",
		section: "Other Metagames",

		searchShow: false,
		validateSet: function (set) {
			var template = this.getTemplate(set.species || set.name);
			if (template.types.indexOf('Flying') === -1 && set.ability !== 'Levitate') {
				return [set.species + " is not a Flying type and does not have the ability Levitate."];
			}
		},
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Uber', 'Archen', 'Chatot', 'Delibird', 'Dodrio', 'Doduo', 'Ducklett', "Farfetch'd", 'Fletchling', 'Gastly',
			'Gengar', 'Hawlucha', 'Hoothoot', 'Murkrow', 'Natu', 'Pidgey', 'Pidove', 'Rufflet', 'Shaymin-Sky', 'Spearow',
			'Starly', 'Taillow', 'Vullaby', 'Iron Ball', 'Pinsirite', 'Soul Dew',
			'Body Slam', 'Bulldoze', 'Dig', 'Dive', 'Earth Power', 'Earthquake', 'Electric Terrain', 'Fire Pledge', 'Fissure', 'Flying Press',
			'Frenzy Plant', 'Geomancy', 'Grass Knot', 'Grass Pledge', 'Grassy Terrain', 'Gravity', 'Heat Crash', 'Heavy Slam', 'Ingrain', "Land's Wrath",
			'Magnitude', 'Mat Block', 'Misty Terrain', 'Mud Sport', 'Muddy Water', 'Rototiller', 'Seismic Toss', 'Slam', 'Smack Down', 'Spikes',
			'Stomp', 'Substitute', 'Surf', 'Toxic Spikes', 'Water Pledge', 'Water Sport'
		]
	},
	{
		name: "Gen-NEXT OU",
		section: "Other Metagames",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber']
	},
	{
		name: "Hackmons Challenge Cup",
		section: "Other Metagames",

		team: 'randomHackmonsCC',
		searchShow: false,
		ruleset: ['HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Weather Wars",
		section: "Other Metagames",

		mod: 'weatherwars',
		ruleset: ['OU'],
		banlist: ['Drizzle ++ Swift Swim']
	},
	{
		name: "Immunemons",
		section: "Other Metagames",

		mod: 'immune',
		ruleset: ['OU']
	},
	
	// Kakuja Tiers
	///////////////////////////////////////////////////////////////////
	
	{
		name: "Kakuja Ubers",
		section: "Kakuja Tiers",
		mod: 'kakujatiers',

		ruleset: ['Pokemon', 'Standard Ubers', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Ban Mod'],
		banlist: ['Blue Orb', 'Red Orb']
	},
	{
		name: "Kakuja OU",
		section: "Kakuja Tiers",
		mod: 'kakujatiers',

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Mewtwonite X',  'Mewtwonite Y', 'Salamencite', 'Darkrai + Dark Void', 'Blaziken + Baton Pass', 'Darkrai + Hypnosis', 'Blaziken + Speed Boost', 'Sylveon + Geomancy']
	},
	{
		name: "Kakuja MU",
		section: "Kakuja Tiers",
		mod: 'kakujatiers',

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['OU', 'Charizardite X', 'Galladite', 'Latiosite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Sablenite', 'Slowbronite']
	},
	{
		name: "Kakuja UU",
		section: "Kakuja Tiers",
		mod: 'kakujatiers',

		ruleset: ['OU'],
		banlist: ['UU', 'BL', 'Drizzle', 'Drought', 'Shadow Tag', 'Alakazite', 'Altarianite', 'Charizardite Y', 'Diancite', 'Garchompite', 'Gardevoirite', 'Gyaradosite', 'Heracronite', 'Latiasite', 'Lopunnite', 'Medichamite', 'Pinsirite', 'Scizorite', 'Tyranitarite', 'Venusaurite']
	},
	{
		name: "Kakuja RU",
		section: "Kakuja Tiers",
		mod: 'kakujatiers',

		ruleset: ['UU'],
		banlist: ['UU', 'Absolite', 'Aerodactylite', 'Aggronite', 'Ampharosite', 'Beedrillite', 'Blastoisinite', 'Houndoominite', 'Manectite', 'Pidgeotite', 'Sceptilite', 'Sharpedonite', 'Swampertite']
	},
	{
		name: "Kakuja BU",
		section: "Kakuja Tiers",
		mod: 'kakujatiers',

		ruleset: ['RU'],
		banlist: ['RU', 'Abomasite', 'Banettite', 'Glalitite', 'Steelixite']
	},	
	{
		name: "Kakuja NU",
		section: "Kakuja Tiers",
		mod: 'kakujatiers',

		ruleset: ['RU'],
		banlist: ['UU', 'BL3', 'Audinite', 'Cameruptite']
	},	
	
	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] OU",
		section: "BW2 Singles",
		column: 3,

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Soul Dew']
	},
	{
		name: "[Gen 5] Ubers",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
		banlist: []
	},
	{
		name: "[Gen 5] UU",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning']
	},
	{
		name: "[Gen 5] RU",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning']
	},
	{
		name: "[Gen 5] NU",
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist']
	},
	{
		name: "[Gen 5] LC",
		section: "BW2 Singles",

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Scyther', 'Sneasel', 'Tangela']
	},
	{
		name: "[Gen 5] GBU Singles",
		section: "BW2 Singles",

		mod: 'gen5',
		validateSet: function (set) {
			if (!set.level || set.level >= 50) set.forcedLevel = 50;
			return [];
		},
		onBegin: function () {
			this.debug('cutting down to 3');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview GBU'],
		banlist: ['Sky Drop', 'Dark Void']
	},
	{
		name: "[Gen 5] Custom Game",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// BW2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] Smogon Doubles",
		section: 'BW2 Doubles',
		column: 3,

		mod: 'gen5',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void', 'Soul Dew', 'Sky Drop',
			'Mewtwo',
			'Lugia',
			'Ho-Oh',
			'Kyogre',
			'Groudon',
			'Rayquaza',
			'Dialga',
			'Palkia',
			'Giratina', 'Giratina-Origin',
			'Arceus',
			'Reshiram',
			'Zekrom',
			'Kyurem-White'
		]
	},
	{
		name: "[Gen 5] GBU Doubles",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		banlist: ['Sky Drop', 'Dark Void']
	},
	{
		name: "[Gen 5] Doubles Custom Game",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 4] OU",
		section: "Past Generations",
		column: 3,

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 4] Ubers",
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus']
	},
	{
		name: "[Gen 4] UU",
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL']
	},
	{
		name: "[Gen 4] LC",
		section: "Past Generations",

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['Berry Juice', 'DeepSeaTooth', 'Dragon Rage', 'Sonic Boom', 'Meditite', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma']
	},
	{
		name: "[Gen 4] Custom Game",
		section: "Past Generations",

		mod: 'gen4',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod']
	},
	{
		name: "[Gen 3] OU (beta)",
		section: "Past Generations",

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain']
	},
	{
		name: "[Gen 3] Ubers (beta)",
		section: "Past Generations",

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers']
	},
	{
		name: "[Gen 3] Custom Game",
		section: "Past Generations",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 2] OU",
		section: "Past Generations",

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 2] Custom Game",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 1] OU",
		section: "Past Generations",

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 1] OU (tradeback)",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'
		]
	},
	{
		name: "[Gen 1] Random Battle",
		section: "Past Generations",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 1] Stadium",
		section: "Past Generations",

		mod: 'stadium',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'
		]
	},
	{
		name: "[Gen 1] Custom Game",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
			name: "[Seasonal] Kakuja Staff Season",
		section: "OM of the Month",

		team: 'randomSeasonalStaff',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			// This seasonal gets a bit from Super Smash Bros., that's where the initial message comes from.
			this.add('message', "GET READY FOR THE NEXT BATTLE!");
			// This link leads to a post where all signature moves can be found so the user can use this resource while battling.
			this.add("raw|Seasonal help for moves can be found <a href='https://www.smogon.com/forums/threads/3491902/page-6#post-6093168'>here</a>");
			// Prepare special lead roles for Charlotte, Hope, Kev
			if (toId(this.p1.pokemon[0].name) === 'kevin') {
				this.add('c|&Serperior|Okay Fuckers, Get Ready for the most Broken Lead Pokemon.');
				this.p1.pokemon[0].isLead = true;
			}
			if (toId(this.p2.pokemon[0].name) === 'kevin') {
				this.add('c|&Serperior|Okay Fuckers, Get Ready for the most Broken Lead Pokemon.');
				this.p2.pokemon[0].isLead = true;
			}
			 if (toId(this.p1.pokemon[0].name) === 'charlotte') {
				this.add('c|~Sablette|CALL ME DJ NOT NICE.');
				this.p1.pokemon[0].isLead = true;
			}
			if (toId(this.p2.pokemon[0].name) === 'charlotte') {
				this.add('c|~Sablette|CALL ME DJ NOT NICE.');
				this.p2.pokemon[0].isLead = true;
			}

			// This variable saves the status of a spammy conversation to be played, so it's only played once.
			this.convoPlayed = false;

			// This code here is used for the renaming of moves showing properly on client.
			var globalRenamedMoves = {
				'defog': "Defrog"
			};
			var customRenamedMoves = {
				"cathy": {
					'kingsshield': "Heavy Dosage of Fun",
					'calmmind': "Surplus of Humour",
					'shadowsneak': "Patent Hilarity",
					'shadowball': "Ion Ray of Fun",
					'shadowclaw': "Sword of Fun",
					'flashcannon': "Fun Cannon",
					'dragontail': "/kick",
					'hyperbeam': "/ban"
				}
			};
			var allPokemon = this.p1.pokemon.concat(this.p2.pokemon);

			for (var i = 0, len = allPokemon.length; i < len; i++) {
				var pokemon = allPokemon[i];
				var last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
				for (var j = 0; j < pokemon.moveset.length; j++) {
					var moveData = pokemon.moveset[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveset[j].move = globalRenamedMoves[moveData.id];
					}

					var customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveset[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},
		// Here we add some flavour or design immunities.
		onImmunity: function (type, pokemon) {
			// Serperior, Char, Travis and Aurora are naturally immune to Attract.
			if ((type === 'attract' || type === 'taunt') && toId(pokemon.name) === 'kevin') {
				this.add('-immune', pokemon, '[from] Irrelevant');
				return false;
			}
			if ((type === 'attract' || type === 'taunt') && toId(pokemon.name) === 'charlotte') {
				this.add('-immune', pokemon, '[from] Irrelevant');
				return false;
			}

   			if ((type === 'attract' || type === 'taunt') && toId(pokemon.name) === 'aurora') {
				this.add('-immune', pokemon, '[from] Irrelevant');
				return false;
			}

			if ((type === 'attract' || type === 'taunt') && toId(pokemon.name) === 'travis') {
				this.add('-immune', pokemon, '[from] Irrelevant');
				return false;
			}
		
		
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function (pokemon) {
			var name = toId(pokemon.name);

			if (pokemon.template.isMega) {
				if (name === 'travis' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('prankster'); // Announced ability.
				}
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			var name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// No OP pls. Balance stuff, changing them upon switch in. Wonder Guard gets curse to minimise their turns out.
			if (pokemon.getAbility().id === 'wonderguard') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}
			// Weak Pokémon get a boost so they can fight amongst the other monsters.
			// Innovamania is just useless, so the boosts are a prank.
			
			if (name === 'charlotte' && !pokemon.illusion) {
				this.boost({spa:2, spe:1, def:-1}, pokemon, pokemon, 'innate ability');
			}
					if (name === 'kevin' && !pokemon.illusion) {
				this.boost({def:1, spd:1, spe:2}, pokemon, pokemon, 'innate ability');
			}
			
			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.
			var oldAbility = pokemon.ability;
			if (pokemon.template.isMega) {
							if (name === 'travis' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('prankster'); // Announced ability.
				}
						} else {
				pokemon.canMegaEvo = this.canMegaEvo(pokemon); // Bypass one mega limit.
			}

			// Add here special typings, done for flavour mainly.
			if (name === 'charlotte' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Dark');
				pokemon.typesData = [
					{type: 'Dark', suppressed: false,  isAdded: false},
					{type: 'Water', suppressed: false,  isAdded: false}
				];
			}
			if (name === 'kevin') {
									this.add('-start', pokemon, 'typechange', 'Fire/Grass');
					pokemon.typesData = [
						{type: 'Fire', suppressed: false,  isAdded: false},
						{type: 'Grass', suppressed: false,  isAdded: false}
					];
				}
			
			// Edgy switch-in sentences go here.
			// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
			var sentences = [];
			var sentence = '';

			// Admins.
			if (name === 'charlotte') {
				this.add("c|~Sablette|I EAT NO FOOD BUT RICE");
			}
			if (name === 'aurora') {
				this.add("c|~Bisharpette|What's wrong with giving everything Bullet Punch? Bunch of Fairies!");
			}

			// Leaders.
			if (name === 'kevin') {
				this.add('c|&Serperior|Lol. I\'m Not Broken Honestly. Lmao.');
			}
			if (name === 'travis') {
				this.add('c|&Shoda Imamoru|I\'m gonna be an issue for you~');
			}
			
			// Mods.
			if (name === 'hayley') {
				this.add('c|@hayleysworld|Oh. This isn\'t a Fall Out Boy Concert. And You're not Patrick Stump :^(');
			}
			if (name === 'haunter') {
				this.add('c|@haunter|Du Mea Lux');
			}
			if (name === 'brokenhope') {
				this.add('c|@BrokenHope|I am in no mood. For **BULLSHIT.** Today.');
			}
			// Drivers.
			if (name === 'phil') {
				this.add('c|%Philmeister|Default Say Phrase');
			}
			if (name === 'josh') {
				this.add('c|%Sempiternus|Default Say Phrase');
			}
			if (name === 'hunt') {
				this.add('c|%TheHuntHasBegun|Default Say Phrase');
			}
			// Voices.
			if (name === 'float') {
				this.add('c|+MasterFloat|DEEZ NUTS. HAHA GOTTEM!');
			}
			if (name === 'cal') {
				this.add('c|+Growlly|*Wuf Wuf*');
			}
			if (name === 'fawnie') {
				this.add('c|+Fawnie|Fuck This Server *Still comes back*');
			}
		},
		// Here we deal with some special mechanics due to custom sets and moves.
		onBeforeMove: function (pokemon, target, move) {
			var name = toId(pokemon.name);
			

			if (pokemon.volatiles['needles']) {
				var dice = this.random(3);
				pokemon.removeVolatile('needles');
				if (dice === 2) {
					this.boost({atk:1, spe:1, def:-1}, pokemon, pokemon, 'used needles');
				} else if (dice === 1) {
					this.boost({def:1, spd:1, spe:-1}, pokemon, pokemon, 'used needles');
				} else {
					this.boost({atk:1, def:1, spe:-1}, pokemon, pokemon, 'used needles');
				}
			}

			if (move.id === 'judgment' && name === 'shrang' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Fairy');
				pokemon.typesData = [
					{type: 'Dragon', suppressed: false,  isAdded: false},
					{type: 'Fairy', suppressed: false,  isAdded: false}
				];
			}
		},
		// Add here salty tears, that is, custom faint phrases.
		// Admins.
			if (name === 'charlotte') {
				this.add("c|~Sablette|ANCIENT KOREAN RECIPE I GET FROM JESUS CHRIST");
			}
			if (name === 'aurora') {
				this.add("c|~Bisharpette|Lol Riparoni");
			}

			// Leaders.
			if (name === 'kevin') {
				this.add('c|&Serperior|I made myself so OP. HOW DID I DIE. WTF. YOU CHEATED LMAO.');
			}
			if (name === 'travis') {
				this.add('c|&Shoda Imamoru|Hahahahahahaha kys.');
			}
			
			// Mods.
			if (name === 'hayley') {
				this.add('c|@hayleysworld|v.v');
			}
			if (name === 'haunter') {
				this.add('c|@haunter|Ban IMO');
			}
			if (name === 'brokenhope') {
				this.add('c|@BrokenHope|UGH. Fuck This.');
			}
			// Drivers.
			if (name === 'phil') {
				this.add('c|%Philmeister|Default Say Phrase');
			}
			if (name === 'josh') {
				this.add('c|%Sempiternus|Default Say Phrase');
			}
			if (name === 'hunt') {
				this.add('c|%TheHuntHasBegun|Default Say Phrase');
			}
			// Voices.
			if (name === 'float') {
				this.add('c|+MasterFloat|shitzel my nizzel');
			}
			if (name === 'cal') {
				this.add('c|+Growlly|*Wuf Wuf*');
			}
			if (name === 'fawnie') {
				this.add('c|+Fawnie|Fuck This Server');
			}
		},
		// Special switch-out events for some mons.
	// This is where the signature moves are actually done.
		onModifyMove: function (move, pokemon) {
			// This is to make signature moves work when transformed.
			if (move.id === 'transform') {
				move.onHit = function (target, pokemon) {
					if (!pokemon.transformInto(target, pokemon)) return false;
					pokemon.originalName = pokemon.name;
					pokemon.name = target.name;
				};
			}

		// Admin signature moves.
			if (move.id === 'stickyweb' && name === 'charlotte') {
				move.name = 'Fap';
				move.basePower = 0;
				move.category = 'Special';
				move.status = 'par';
				move.flags = {};
				move.type = 'Electric';
				move.onTryHitSide = function (side, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Thunder Wave", side.active[0]);
				};
			}
			
			if (move.id === 'nightdaze' && name === 'aurora') {
				if (move.id === 'nightdaze') {
					move.name = 'CODING ERROR';
					move.basePower = 120;
					move.accuracy = 85;
					move.self = {boosts: {spa:+2}};
					move.onTryHit = function (target, source, pokemon) {
						this.add('c|~Bisharpette|SHIT. FUCK MY TITS.');
						this.attrLastMove('[still]');
						this.add('-anim', source, "Night Daze", target);
						pokemon.addVolatile('confusion');
				};	
			}	
			
			// Leader signature moves.
			if (move.id === 'geomancy' && name === 'kevin') {
				move.name = 'Lol Broken';
				move.flags = {};
				move.onTry = function () {};
				move.boosts = {atk:1, spa:1, accuracy:1};
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Geomancy", pokemon);
				};
			}
			
		}
];
