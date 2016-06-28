'use strict';
const http = require('http');

exports.commands = {
	// Animal command by Sapience
	animal: 'animals',
	animals: function (target, room, user) {
		if (!target) return this.parse('/help animals');
		let tarId = toId(target);
		let validTargets = ['cat', 'otter', 'dog', 'bunny', 'pokemon', 'kitten', 'puppy'];
		if (!validTargets.includes(tarId)) return this.parse('/help animals');
		let self = this;
		let reqOpt = {
			hostname: 'api.giphy.com', // Do not change this
			path: '/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + tarId,
			method: 'GET',
		};
		let req = http.request(reqOpt, function (res) {
			res.on('data', function (chunk) {
				try {
					let data = JSON.parse(chunk);
					let output = '<center><img src="' + data.data["image_url"] + '" width="75%"></center>';
					if (!self.runBroadcast()) return;
					if (data.data["image_url"] === undefined) {
						self.errorReply("ERROR CODE 404: No images found!");
						return room.update();
					} else {
						self.sendReplyBox(output);
						return room.update();
					}
				} catch (e) {
					self.errorReply("ERROR CODE 503: Giphy is unavaliable right now. Try again later."); //Anti Spam Filter
					return room.update();
				}
			});
		});
		req.end();
	},
	animalshelp: ['|html|Animals Plugin designed by Sapience<br>' +
		'<ul><li>/animals kitten - <i>Displays a cute kitten.</em></li>' +
		'<li>/animals cat - <em>Displays a cute cat.</li>' +
		'<li>/animals puppy - <em>Displays a cute puppy.</li>' +
		'<li>/animals otter - <em>Displays a cute otter.</li>' +
		'<li>/animals bunny - <em>Displays a cute bunny.</li>' +
		'<li>/animals pokemon - <em>Displays a cute pokemon.</li></ul>'
	],

};
