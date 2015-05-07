exports.BattleScripts = {
	init: function () {
		var tankStats = {hp:90, atk:30, def:120, spa:130, spd:120, spe:50};
		var healerStats = {hp:50, atk:10, def:95, spa:80, spd:95, spe:10};
		var supportStats = {hp:75, atk:50, def:90, spa:50, spd:90, spe:100};
		var dpsStats = {hp:65, atk:130, def:85, spa:130, spd:85, spe:150};
		// Modify tanks
		this.modData('Pokedex', 'manectric').baseStats = tankStats;
		this.modData('Pokedex', 'chesnaught').baseStats = tankStats;
		this.modData('Pokedex', 'hydreigon').baseStats = tankStats;
		this.modData('Pokedex', 'lopunny').baseStats = tankStats;
		this.modData('Pokedex', 'snorlax').baseStats = tankStats;
		this.modData('Pokedex', 'suicune').baseStats = tankStats;
		this.modData('Pokedex', 'giratina').baseStats = tankStats;
		this.modData('Pokedex', 'landorus').baseStats = tankStats;
		this.modData('Pokedex', 'noctowl').baseStats = tankStats;
		// Modify healers
		this.modData('Pokedex', 'aegislash').baseStats = healerStats;
		this.modData('Pokedex', 'lucario').baseStats = healerStats;
		this.modData('Pokedex', 'glaceon').baseStats = healerStats;
		this.modData('Pokedex', 'shaymin').baseStats = healerStats;
		this.modData('Pokedex', 'mewtwo').baseStats = healerStats;
		this.modData('Pokedex', 'mightyena').baseStats = healerStats;
		this.modData('Pokedex', 'aerodactyl').baseStats = healerStats;
		// Modify supporters
		this.modData('Pokedex', 'cinccino').baseStats = supportStats;
		this.modData('Pokedex', 'espurr').baseStats = supportStats;
		this.modData('Pokedex', 'chandelure').baseStats = supportStats;
		this.modData('Pokedex', 'gallade').baseStats = supportStats;
		this.modData('Pokedex', 'jynx').baseStats = supportStats;
		this.modData('Pokedex', 'furret').baseStats = supportStats;
		this.modData('Pokedex', 'spinda').baseStats = supportStats;
		this.modData('Pokedex', 'reuniclus').baseStats = supportStats;
		// Modify DPSs
		this.modData('Pokedex', 'bisharp').baseStats = dpsStats;
		this.modData('Pokedex', 'absol').baseStats = dpsStats;
		this.modData('Pokedex', 'luxray').baseStats = dpsStats;
		this.modData('Pokedex', 'zoroark').baseStats = dpsStats;
		this.modData('Pokedex', 'latios').baseStats = dpsStats;
		this.modData('Pokedex', 'greninja').baseStats = dpsStats;
		this.modData('Pokedex', 'blaziken').baseStats = dpsStats;
		this.modData('Pokedex', 'weavile').baseStats = dpsStats;
		this.modData('Pokedex', 'cobalion').baseStats = dpsStats;
		this.modData('Pokedex', 'froslass').baseStats = dpsStats;
		this.modData('Pokedex', 'beartic').baseStats = dpsStats;
		this.modData('Pokedex', 'ninetales').baseStats = dpsStats;
		this.modData('Pokedex', 'arceus').baseStats = dpsStats;
		this.modData('Pokedex', 'groudon').baseStats = dpsStats;
	},
	randomSeasonalMay2015Team: function (side) {
		var team = [];
		var healers, tanks, supports, dps = [];
		// Teams on this seasonal have: A tank. A healer. A dps. A support. An off-tank. Another dps.
		// We have a pool of them, depending on the team, and give them.
		// If the other team has been chosen, we get its opposing force.
		if (this.seasonal && this.seasonal.side) {
			side = (this.seasonal.side === 'heroes' ? 'evil' : 'heroes');
		} else {
			// First team being generated, pick a side at random.
			side = (Math.random() > 0.5 ? 'heroes' : 'evil');
			this.seasonal = {'side': side};
		}

		if (side === 'heroes') {
			healers = ['Soul Evans', 'Amon', 'Hatsune Miku', 'Armin'].randomize();
			tanks = ['Moro', 'Eren', 'Ryuk', 'Akeno', 'Totoro'].randomize();
			supports = ['Suzuya', 'L', 'Yuno', 'Issei', 'Misa', 'Sasha Blouse'].randomize();
			dps = ['Kaneki', 'Touka', 'Ayato', 'Rias', 'Light Yagami', 'Levi', 'Mikasa', 'San', 'Ashitaka'].randomize();
		} else {
			healers = ['Frieza', 'Raynare', 'Wrath'].randomize();
			tanks = ['Rize', 'Giratina', 'Giovanni', 'Eto'].randomize();
			supports = ['Mado', 'Cell'].randomize();
			dps = ['Lady Eboshi', 'Jason', 'Annie', 'Kira', 'Titan'].randomize();
		}
		var pool = [healers[0], tanks[0], dps[0], supports[0], dps[1], supports[1]];
		var sets = {
			'Soul Evans': {species: 'Aegislash', gender: 'M', role: 'healer', evs: {spa:200, def:252, spd:56}},
			'Amon': {species: 'Lucario', gender: 'M', role: 'healer', evs: {spa:200, def:200, spd:56, spe:52}},
			'Hatsune Miku': {species: 'Glaceon', gender: 'F', role: 'healer', evs: {spa:4, def:248, spd:248, spe: 8}},
			'Armin': {species: 'Shaymin', gender: 'M', role: 'healer', evs: {spa:184, def:56, spd:252, spe:16}},
			'Moro': {species: 'Manectric', gender: 'F', role: 'tank', evs: {hp:252, def:248, spd:4, spe:4}},
			'Eren': {species: 'Chesnaught', gender: 'M', role: 'tank', evs: {spa:4, def:232, spd:4, spe:20}},
			'Ryuk': {species: 'Hydreigon', gender: 'M', role: 'tank', evs: {hp:236, def:128, spd:128, spe:16}},
			'Akeno': {species: 'Lopunny', gender: 'F', role: 'tank', evs: {hp:200, def:154, spd:130, spe:24}},
			'Totoro': {species: 'Snorlax', gender: 'M', role: 'tank', evs: {hp:100, def:204, spd:204}},
			'Suzuya': {species: 'Cinccino', gender: 'M', role: 'support', evs: {hp:252, def:248, spd:4, spe:4}},
			'L': {species: 'Espurr', gender: 'M', role: 'support', evs: {hp:252, def:152, spd:4, spe:100}},
			'Yuno': {species: 'Chandelure', gender: 'F', role: 'support', evs: {hp:4, def:252, spd:252}},
			'Issei': {species: 'Gallade', gender: 'M', role: 'support', evs: {hp:252, def:248, spd:4, spe:4}},
			'Misa': {species: 'Jynx', gender: 'F', role: 'support', evs: {hp:4, def:152, spd:252, spe:100}},
			'Sasha Blouse': {species: 'Furret', gender: 'F', role: 'support', evs: {hp:252, def:208, spd:4, spe:44}},
			'Kaneki': {species: 'Bisharp', gender: 'M', role: 'dps', evs: {spa:104, atk:252, spe:152}},
			'Touka': {species: 'Absol', gender: 'F', role: 'dps', evs: {spa:252, atk:252, spe:4}},
			'Ayato': {species: 'Luxray', gender: 'M', role: 'dps', evs: {spa:252, atk:236, spe:20}},
			'Rias': {species: 'Zoroark', gender: 'F', role: 'dps', evs: {spa:180, atk:224, spe:104}},
			'Light Yagami': {species: 'Latios', gender: 'M', role: 'dps', evs: {spa:128, atk:132, spe:248}},
			'Levi': {species: 'Greninja', gender: 'M', role: 'dps', evs: {spa:252, atk:176, spe:80}},
			'Mikasa': {species: 'Blaziken', gender: 'F', role: 'dps', evs: {spa:248, atk:252, spe:8}},
			'San': {species: 'Weavile', gender: 'F', role: 'dps', evs: {spa:4, atk:252, spe:252}},
			'Ashitaka': {species: 'Cobalion', gender: 'M', role: 'dps', shiny: true, evs: {spa:184, atk:184, spe:140}},
			'Frieza': {species: 'Mewtwo', gender: 'N', role: 'healer', evs: {spa:56, def:200, spd:200, spe:52}},
			'Raynare': {species: 'Mightyena', gender: 'F', role: 'healer', evs: {spa:252, def:128, spd:120, spe:8}},
			'Wrath': {species: 'Aerodactyl', gender: 'M', role: 'healer', evs: {spa:4, def:236, spd:252, spe:16}},
			'Rize': {species: 'Suicune', gender: 'F', role: 'tank', evs: {hp:252, def:248, spd:4, spe:4}},
			'Giratina': {species: 'Giratina', gender: 'N', role: 'tank', evs: {hp:236, def:4, spd:252, spe:16}},
			'Giovanni': {species: 'Landorus', gender: 'M', role: 'tank', evs: {hp:232, def:128, spd:128, spe:20}},
			'Eto': {species: 'Noctowl', gender: 'F', role: 'tank', evs: {hp:100, def:200, spd:184, spe:24}},
			'Mado': {species: 'Spinda', gender: 'M', role: 'support', evs: {hp:252, def:100, spd:56, spe:96}},
			'Cell': {species: 'Reuniclus', gender: 'M', role: 'support', evs: {hp:252, def:56, spd:176, spe:20}},
			'Lady Eboshi': {species: 'Froslass', gender: 'F', role: 'dps', evs: {spa:252, atk:8, spe:248}},
			'Jason': {species: 'Beartic', gender: 'M', role: 'dps', evs: {spa:252, atk:156, spe:100}},
			'Annie': {species: 'Ninetales', gender: 'F', role: 'dps', evs: {spa:252, atk:208, spe:48}},
			'Kira': {species: 'Arceus', gender: 'M', role: 'dps', evs: {spa:252, atk:252, spe:4}},
			'Titan': {species: 'Groudon', gender: 'N', role: 'dps', evs: {spa:248, atk:252, spe:8}}
		};
		var movesets = {
			'healer': [
				['softboiled', 'icebeam', 'reflect', 'holdhands'],
				['softboiled', 'icebeam', 'luckychant', 'holdhands'],
				['softboiled', 'icebeam', 'reflect', 'aromaticmist']
			],
			'tank': [
				['followme', 'meditate', 'helpinghand', 'seismictoss'],
				['followme', 'endure', 'withdraw', 'seismictoss'],
				['followme', 'meditate', 'endure', 'seismictoss'],
				['meditate', 'helpinghand', 'protect', 'seismictoss']
			],
			'support': [
				['recover', 'acupressure', 'healbell', 'withdraw'],
				['spite', 'fakeout', 'protect', 'withdraw'],
				['recover', 'acupressure', 'spite', 'healbell'],
				['recover', 'acupressure', 'healbell', 'fakeout'],
				['acupressure', 'spite', 'healbell', 'protect']
			],
			'dps': [
				['fireblast', 'flamethrower', 'aircutter', 'freezeshock'],
				['freezeshock', 'icebeam', 'aircutter', 'muddywater'],
				['thunderbolt', 'thunder', 'aircutter', 'freezeshock'],
				['toxic', 'leechseed', 'muddywater', 'aircutter'],
				['furyswipes', 'scratch', 'slash', 'smog']
			]
		};
		for (var i = 0; i < 6; i++) {
			var set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			set.moves = movesets[set.role][this.random(movesets[set.role].length)];
			team.push(set);
		}

		return team;
	},
	pokemon: {
		runImmunity: function (type, message) {
			return true;
		}
	},
	getDamage: function (pokemon, target, move, suppressMessages) {
		if (typeof move === 'string') move = this.getMove(move);

		if (typeof move === 'number') move = {
			basePower: move,
			type: '???',
			category: 'Physical',
			flags: {}
		};

		if (move.damageCallback) {
			return move.damageCallback.call(this, pokemon, target);
		}
		if (move.damage === 'level') {
			return pokemon.level;
		}
		if (move.damage) {
			return move.damage;
		}

		if (!move) move = {};
		if (!move.type) move.type = '???';
		var type = move.type;
		var category = this.getCategory(move);
		var defensiveCategory = move.defensiveCategory || category;

		var basePower = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this, pokemon, target, move);
		}
		if (!basePower) {
			if (basePower === 0) return; // returning undefined means not dealing damage
			return basePower;
		}
		basePower = this.clampIntRange(basePower, 1);
		basePower = this.runEvent('BasePower', pokemon, target, move, basePower, true);

		if (!basePower) return 0;
		basePower = this.clampIntRange(basePower, 1);

		var level = pokemon.level;
		var attacker = pokemon;
		var defender = target;
		var attackStat = category === 'Physical' ? 'atk' : 'spa';
		var defenseStat = defensiveCategory === 'Physical' ? 'def' : 'spd';
		var statTable = {atk:'Atk', def:'Def', spa:'SpA', spd:'SpD', spe:'Spe'};
		var attack;
		var defense;
		var atkBoosts = move.useTargetOffensive ? defender.boosts[attackStat] : attacker.boosts[attackStat];
		var defBoosts = move.useSourceDefensive ? attacker.boosts[defenseStat] : defender.boosts[defenseStat];
		var ignoreNegativeOffensive = !!move.ignoreNegativeOffensive;
		var ignorePositiveDefensive = !!move.ignorePositiveDefensive;

		if (move.useTargetOffensive) attack = defender.calculateStat(attackStat, atkBoosts);
		else attack = attacker.calculateStat(attackStat, atkBoosts);

		if (move.useSourceDefensive) defense = attacker.calculateStat(defenseStat, defBoosts);
		else defense = defender.calculateStat(defenseStat, defBoosts);

		// Apply Stat Modifiers
		attack = this.runEvent('Modify' + statTable[attackStat], attacker, defender, move, attack);
		defense = this.runEvent('Modify' + statTable[defenseStat], defender, attacker, move, defense);

		// In this mod, basePower is the %HP of the caster that is used on the damage calcualtion.
		//var baseDamage = Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * basePower * attack / defense) / 50) + 2;
		var baseDamage = Math.floor(pokemon.maxhp * basePower / 100);

		// Now this is varied by stats slightly.
		baseDamage += Math.floor(baseDamage * (attack - defense) / 100);

		// Randomizer. Doesn't change much.
		baseDamage = Math.floor(baseDamage * (90 + this.random(11)) / 100);

		if (pokemon.volatiles['chilled']) {
			baseDamage = Math.floor(baseDamage * 0.9);
		}

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		// Minimum is 1
		if (basePower && !Math.floor(baseDamage)) {
			return 1;
		}

		return Math.floor(baseDamage);
	}
};
