'use strict';

const http = require('http');
const AnimalsHelp = '|raw|<div class="infobox"><strong>Animals Plugin by <font color="' + Gold.hashColor(color) + '">DarkNightSkies</font> & <font color="' + Gold.hashColor('kyvn') + '">Kyv.n(♥)</font><strong><br><ul><li>/animals cat - Displays a cat</li><li>/animals kitten - Displays a kitten</li><li>/animals dog - Displays a doge</li><li>/animals puppy - Displays a puppy</li><li>/animals bunny - Displays a bunny</li><li>/animals otter - Displays an otter</li><li>/animals pokemon - Displays a pokemon</li></ul></div>';

exports.commands = {

    animals: 'testimals', //
    testimals: function(target, room, user) {
        let tarId = toId(target);
        let validTargets = {
            'cat': 'cat',
            'otter': 'otter',
            'dog': 'dog',
            'bunny': 'bunny',
            'pokemon': 'pokemon',
            'kitten': 'kitten',
            'puppy': 'puppy'
        };
        let validTarget = validTargets[tarId];
        
        if (room.id === 'lobby' && validTarget) return this.errorReply("This command cannot be broadcasted in the Lobby.");
		if (!target) return this.sendReply(AnimalsHelp);
        if (!validTarget) return this.sendReply(AnimalsHelp);
         let self = this;
        let reqOpt = {
            hostname: 'api.giphy.com',
            path: '/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + tarId,
            method: 'GET',
        };
        let req = http.request(reqOpt, function(res) {
            res.on('data', function(chunk) {
                try {
                    let data = JSON.parse(chunk);
                    let output = '<center><img src="' + data.data["image_url"] + '" width="400"></center>';
                    if (!self.runBroadcast()) return;
                    if (data.data["image_url"] === undefined) {
                        self.errorReply("404 Error: No Images found!");
                        return room.update();
                    } else {
                        self.sendReplyBox(output);
                        return room.update();
                    }
                } catch (e) {
                    self.errorReply("Sorry Giphy is under a lot of stress right now!");
                    return room.update();
                }
            });
        });
        req.end();
    },
};
