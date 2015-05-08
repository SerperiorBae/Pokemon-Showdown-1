exports.BattleMovedex = {
	// Drink Coffee
	recover: {
		num: -1,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "recover",
		name: "Recover",
		pp: 16,
		priority: 0,
		flags: {heal: 1},
		onTry: function (attacker) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Milk Drink', attacker);
		},
		onHitSide: function (side, source) {
			this.add('-message', source.name + " distributes hot cups of coffee to heal its team!");
			var targets = [];
			for (var p in side.active) {
				targets.push(side.active[p]);
			}
			if (!targets.length) return false;
			for (var i = 0; i < targets.length; i++) {
				this.heal(Math.ceil(source.maxhp * 0.2), targets[i], source);
			}
		},
		secondary: false,
		target: "allySide",
		type: "Normal"
	},
	// Devour
	softboiled: {
		num: -2,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "softboiled",
		name: "SoftBoiled",
		pp: 16,
		priority: 0,
		flags: {heal: 1},
		onTry: function (attacker) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Crunch', attacker);
		},
		onHitSide: function (side, source) {
			this.add('-message', source.name + "regains energy from eating human flesh and heals its team!");
			var targets = [];
			for (var p in side.active) {
				targets.push(side.active[p]);
			}
			if (!targets.length) return false;
			for (var i = 0; i < targets.length; i++) {
				this.heal(Math.ceil(source.maxhp * 0.33), targets[i], source);
			}
		},
		secondary: false,
		target: "allySide",
		type: "Normal"
	},
	// Dragon Booster
	reflect: {
		num: -3,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "reflect",
		name: "Reflect",
		pp: 16,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'dragonbooster',
		secondary: false,
		target: "allySide",
		type: "Grass"
	},
	// Gurido
	acupressure: {
		num: -4,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "acupressure",
		name: "Acupressure",
		pp: 16,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'gurido',
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', defender, 'Synthesis', defender);
		},
		secondary: false,
		target: "adjacentAllyOrSelf",
		type: "Fairy"
	},
	// Healing Machine
	holdhands: {
		num: -5,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "holdhands",
		name: "HoldHands",
		pp: 16,
		priority: 0,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1},
		volatileStatus: 'healing machine',
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', defender, 'Bulk Up', defender);
		},
		secondary: false,
		target: "adjacentAlly",
		type: "Grass"
	},
	// Shield
	luckychant: {
		num: -6,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "luckychant",
		name: "LuckyChant",
		pp: 25,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'shield',
		onTry: function (attacker) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Misty Terrain', attacker);
		},
		secondary: false,
		target: "allySide",
		type: "Normal"
	},
	// KUSO
	followme: {
		num: -7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "followme",
		name: "FollowMe",
		pp: 20,
		priority: 3,
		flags: {},
		volatileStatus: 'kuso',
		onTry: function (attacker) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Follow Me', attacker);
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	// Wings of Freedom
	meditate: {
		num: -7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "meditate",
		name: "Meditate",
		pp: 20,
		priority: 3,
		flags: {},
		volatileStatus: 'wings of freedom',
		onTry: function (attacker) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Bulk Up', attacker);
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	// Bad Idea
	helpinghand: {
		num: -8,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "helpinghand",
		name: "HelpingHand",
		pp: 15,
		priority: 1,
		flags: {},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Ally Switch', defender);
		},
		onTryHit: function (target, source) {
			if (source.side.active.length === 1) return false;
			if (target.side !== source.side) return false;
		},
		onHit: function (target, source) {
			if (!target) return false;
			var newPosition = target.position;
			if (!source.side.active[newPosition]) return false;
			if (source.side.active[newPosition].fainted) return false;
			this.swapPosition(source, newPosition, '[from] move: Bad Idea');
		},
		secondary: false,
		target: "adjacentAlly",
		type: "Psychic"
	},
	// Dying Breath
	spite: {
		num: -9,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "spite",
		name: "Spite",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit: function (target, source) {
			if (target.deductPP(target.lastMove, 8)) {
				this.add("-activate", target, 'move: Dying Breath', target.lastMove, 8);
				source.addVolatile('disable');
				return;
			}
			return false;
		},
		secondary: false,
		target: "normal",
		type: "Ghost"
	},
	// Perfect Form
	aromaticmist: {
		num: -10,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "aromaticmist",
		name: "AromaticMist",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Heal Pulse', defender);
		},
		onHit: function (target, source) {
			this.heal(Math.ceil(target.maxhp * 0.6));
		},
		secondary: false,
		target: "adjacentAlly",
		type: "Grass"
	},
	// Lum Berry
	healbell: {
		num: -11,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "healbell",
		name: "HealBell",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1},
		onTry: function (attacker) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Heal Bell', attacker);
		},
		onHit: function (target, source) {
			this.heal(Math.ceil(target.maxhp * 0.125));
			target.addVolatile('Lum Berry');
		},
		secondary: false,
		target: "allyTeam",
		type: "Grass"
	},
	// First Move
	fakeout: {
		num: -12,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "fakeout",
		name: "Fake Out",
		pp: 10,
		priority: 10,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreImmunity: true,
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', defender, 'Recover', defender);
		},
		onHit: function (target, source) {
			source.addVolatile('disable');
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch'
		},
		target: "normal",
		type: "Psychic"
	},
	// Last Stand
	endure: {
		num: -13,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "endure",
		name: "Endure",
		pp: 10,
		priority: 4,
		flags: {},
		volatileStatus: 'last stand',
		onTryHit: function (pokemon) {
			return this.willAct();
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('disable');
		},
		secondary: false,
		target: "self",
		type: "Fighting"
	},
	// Barkskin
	withdraw: {
		num: -14,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "withdraw",
		name: "Withdraw",
		pp: 10,
		priority: 4,
		flags: {},
		volatileStatus: 'barkskin',
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Bulk Up', attacker);
		},
		secondary: false,
		target: "self",
		type: "Grass"
	},
	// Punishment
	seismictoss: {
		num: -15,
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon) {
			return pokemon.hp / 3;
		},
		category: "Physical",
		id: "seismictoss",
		isViable: true,
		name: "Punishment",
		pp: 20,
		priority: -1,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		ignoreImmunity: true,
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Seismic Toss', defender);
		},
		secondary: false,
		target: "normal",
		type: "Fighting"
	},
	// Gremory Crest
	flamethrower: {
		num: -16,
		accuracy: 100,
		basePower: 30,
		basePowerCallback: function (pokemon, target) {
			if (target.status === 'brn') return 40;
			return 30;
		},
		category: "Special",
		id: "flamethrower",
		name: "Flamethrower",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Eruption', defender);
		},
		secondary: false,
		target: "any",
		type: "Fire"
	},
	// Kagune
	fireblast: {
		num: -17,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		id: "fireblast",
		name: "Fire Blast",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Overheat', defender);
		},
		secondary: {chance: 100, status: 'brn'},
		target: "any",
		type: "Fire"
	},
	// Kakuja
	thunderbolt: {
		num: -18,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		id: "thunderbolt",
		name: "Thunderbolt",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Moonblast', defender);
		},
		secondary: {chance: 100, volatileStatus: 'kakuja'},
		target: "any",
		type: "Grass"
	},
	// Grappling Hook
	thunder: {
		num: -19,
		accuracy: 100,
		basePower: 30,
		basePowerCallback: function (pokemon, target) {
			if (target.volatiles['kakuja']) return 40;
			return 30;
		},
		category: "Special",
		id: "thunder",
		name: "Thunder",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Secret Power', defender);
		},
		target: "any",
		type: "Grass"
	},
	// Death Note
	toxic: {
		num: -20,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "toxic",
		name: "Toxic",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'Death Note',
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Spore', defender);
		},
		target: "any",
		type: "Dark"
	},
	// Flesh Eat
	leechseed: {
		num: -21,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "leechseed",
		name: "Leech Seed",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'Flesh Eat',
		effect: {
			duration: 4,
			onStart: function (target) {
				this.add('-start', target, 'move: Flesh Eat');
			},
			onEnd: function (target) {
				this.add('-end', target, 'move: Flesh Eat');
			},
			onResidualOrder: 8,
			onResidual: function (pokemon) {
				var target = this.effectData.source.side.active[pokemon.volatiles['leechseed'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				var damage = this.damage(pokemon.maxhp * 0.08, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			}
		},
		target: "any",
		type: "Dark"
	},
	// Quinque
	icebeam: {
		num: -22,
		accuracy: 100,
		basePower: 30,
		basePowerCallback: function (pokemon, target) {
			if (target.volatiles['Encased in Ice']) return 40;
			return 30;
		},
		category: "Special",
		id: "icebeam",
		name: "Ice Beam",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Icicle Crash', defender);
		},
		secondary: false,
		target: "normal",
		type: "Ice"
	},
	// Absolute Death
	freezeshock: {
		num: -23,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		id: "freezeshock",
		name: "Freeze Shock",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Ice Beam', defender);
		},
		secondary: {chance: 100, volatileStatus: 'chilled'},
		target: "normal",
		type: "Ice"
	},
	// Annihilation
	aircutter: {
		num: -24,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		id: "aircutter",
		isViable: true,
		name: "Air Cutter",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		type: "Flying"
	},
	// Storm
	muddywater: {
		num: -25,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		id: "muddywater",
		isViable: true,
		name: "Muddy Water",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Surf', defender);
		},
		target: "allAdjacentFoes",
		type: "Electric"
	},
	// Fury
	furyswipes: {
		num: -26,
		accuracy: 100,
		basePower: 15,
		basePowerCallback: function (pokemon, target) {
			if (pokemon.volatiles['furycharge']) return 100;
			return 15;
		},
		category: "Physical",
		id: "furyswipes",
		isViable: true,
		name: "Fury Swipes",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: true,
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Head Smash', defender);
		},
		onHit: function (target, source) {
			source.addVolatile('disable');
			source.addVolatile('furycharge');
		},
		target: "normal",
		type: "Fighting"
	},
	// Garrote
	scratch: {
		num: -27,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		id: "scratch",
		name: "Scratch",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Slash', defender);
		},
		secondary: {chance: 100, volatileStatus: 'bleeding'},
		target: "normal",
		type: "Dark"
	},
	// Mutilate
	slash: {
		num: -28,
		accuracy: 100,
		basePower: 35,
		basePowerCallback: function (pokemon, target) {
			var bP = 35;
			if (target.volatiles['bleed']) bP += 10;
			if (target.status === 'psn') bP += 10;
			return bP;
		},
		category: "Physical",
		id: "slash",
		name: "Slash",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry: function (attacker, defender) {
			this.attrLastMove('[still]');
			this.add('-anim', attacker, 'Return', defender);
		},
		secondary: false,
		target: "normal",
		type: "Dark"
	},
	// Poison Gas
	smog: {
		num: 30,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "smog",
		name: "Smog",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'psn',
		secondary: false,
		target: "normal",
		type: "Poison"
	}
};
