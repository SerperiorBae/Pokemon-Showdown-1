exports.BattleStatuses = {
	brn: {
		inherit: true,
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp * 0.0615);
		}
	},
	par: {
		inherit: true,
		onBeforeMove: function () {}
	},
	psn: {
		inherit: true,
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp * 0.125);
		}
	},
	chilled: {
		duration: 3,
		onStart: function (target, source, sourceEffect) {
			this.add('-start', target, 'Encased in Ice');
			this.add('-message', target.name + ' has been Encased in Ice!');
		},
		onEnd: function (target) {
			this.add('-end', target, 'Encased In Ice');
		},
		onModifySpe: function (speMod, pokemon) {
			return this.chain(speMod, 0.1);
		}
	},
	bleeding: {
		duration: 5,
		onStart: function (target) {
			this.add('-start', target, 'bleeding');
			this.add('-message', target.name + ' is bleeding out!');
		},
		onEnd: function (target) {
			this.add('-end', target, 'bleeding');
		},
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp * 0.0615);
		}
	},
	kuso: {
		duration: 4,
		onStart: function (target) {
			this.add('-start', target, 'Kuso');
			this.add('-message', target.name + ' Has pointed at its enemies!');
		},
		onEnd: function (target) {
			this.add('-end', target, 'Kuso');
		},
		onFoeRedirectTarget: function (target, source, source2, move) {
			if (this.validTarget(this.effectData.target, source, move.target)) {
				return this.effectData.target;
			}
		}
	},
	wingsoffreedom: {
		duration: 4,
		onStart: function (target) {
			this.add('-start', target, 'wingsoffreedom');
			this.add('-message', target.name + ' Has redirected Incoming Damage To Themselves.');
		},
		onEnd: function (target) {
			this.add('-end', target, 'wingsoffreedom');
		},
		onAnyDamage: function (damage, target, source, effect) {
			for (var i = 0; i < target.side.active.length; i++) {
				if (target !== target.side.active[i] && target.side.active[i].volatiles['wingsoffreedom']) {
					this.add('-message', target.side.active[i].name + "'s Sacrifice took " + target.name + "'s damage!");
					this.directDamage(damage, target.side.active[i], source, {id: 'wingsoffreedom'});
					return 0;
				}
			}
			return;
		}
	},
	deathnote: {
		duration: 4,
		onStart: function (target) {
			this.add('-start', target, 'deathnote');
		},
		onEnd: function (target) {
			this.add('-end', target, 'deathnote');
		},
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp * 0.1);
			this.add('-message', pokemon.name + ' Decayed a bit more!');
		}
	},
	dragonbooster: {
		duration: 5,
		onStart: function (side) {
			this.add('-sidestart', side, 'Wild Growth');
		},
		onResidualOrder: 21,
		onResidual: function (side) {
			for (var i = 0; i < side.active.length; i++) {
				var pokemon = side.active[i];
				if (pokemon.hp < pokemon.maxhp) {
					this.heal(pokemon.maxhp * 0.125, pokemon, pokemon);
					this.add('-message', 'The Dragon Booster recovered some of ' + pokemon.name + "'s HP!");
				}
			}
		},
		onEnd: function (side) {
			this.add('-sideend', side, 'Dragon Booster');
		}
	},
	gurido: {
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'Gurido');
			this.add('-message', pokemon.name + ' has been shielded!');
		},
		onDamage: function (damage, target, source, effect) {
			var h = Math.ceil(damage / 4);
			this.heal(h, target, target);
			this.add('-message', target.name + "'s Gurido healed it for " + h + "!");
			target.removeVolatile('Gurido');
		},
		onEnd: function (pokemon) {
			this.add('-end', pokemon, 'Gurido');
		}
	},
	healingmachine: {
		duration: 3,
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'healingmachine');
			this.add('-message', pokemon.name + ' is Healing!');
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			this.heal(pokemon.maxhp * 0.18);
			this.add('-message', pokemon.name + ' healed due to the Healing Machine!');
		},
		onEnd: function (pokemon) {
			this.add('-end', pokemon, 'Healing Machine');
		}
	},
	shield: {
		duration: 3,
		onSetStatus: function (status, target, source, effect) {
			if (source && target !== source && effect && (!effect.infiltrates || target.side === source.side)) {
				return false;
			}
		},
		onTryConfusion: function (target, source, effect) {
			if (source && target !== source && effect && (!effect.infiltrates || target.side === source.side)) {
				return false;
			}
		},
		onStart: function (side) {
			this.add('-sidestart', side, 'Shield');
		},
		onResidualOrder: 21,
		onResidualSubOrder: 2,
		onEnd: function (side) {
			this.add('-sideend', side, 'Shield');
		},
		onDamagePriority: -10,
		onDamage: function (damage, target, source, effect) {
			return Math.ceil(damage * 0.95);
		}
	},
	lumberry: {
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'Lum Berry');
		},
		onDamagePriority: -10,
		onDamage: function (damage, target, source, effect) {
			var d = Math.ceil(damage * 0.0615);
			this.heal(d, target, target);
			this.add('-message', target.name + "'s Lum Berry healed it for " + d + "!");
			target.removeVolatile('Lum Berry');
		},
		onEnd: function (pokemon) {
			this.add('-end', pokemon, 'Lum Berry');
		}
	},
	barkskin: {
		duration: 2,
		onStart: function (target) {
			this.add('-start', target, 'move: Barkskin');
		},
		onEnd: function (target) {
			this.add('-end', target, 'move: Barkskin');
		},
		onDamage: function (damage, target, source, effect) {
			this.add('-message', target.name + "'s Barkskin reduced the damage!");
			return Math.ceil(damage * 0.75);
		}
	},
	laststand: {
		duration: 1,
		onStart: function (target) {
			this.add('-singleturn', target, 'move: Last Stand');
		},
		onDamage: function (damage, target, source, effect) {
			var originalDamage = damage;
			damage = Math.ceil(damage / 2);
			if (damage >= target.hp) damage = target.hp - 1;
			this.add('-message', target.name + "'s Last Stand made it take " + (originalDamage - damage) + " damage less!");
			return damage;
		}
	},
	kakuja: {
		duration: 4,
		onStart: function (target) {
			this.add('-start', target, 'move: Kakuja');
		},
		onEnd: function (target) {
			this.add('-end', target, 'move: Kakuja');
		},
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp * 0.06);
			this.add('-message', pokemon.name + ' took Kakuja damage!');
		}
	}
};
