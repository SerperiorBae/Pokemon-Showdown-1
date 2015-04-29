exports.commands = {
	temote: 'temotes',
	toggleemotes: 'temotes',
	temotes: function(target, room, user) {
		if (!user.can('pban')) return;
		if (!target) return this.sendReply('Valid targets are: "on", "off" and "status".');
		if (toId(target) === 'off' || toId(target) === 'disable') {
			Core.settings.emoteStatus = false;
			room.add(Tools.escapeHTML(user.name) + ' has disabled chat emotes.');
			this.logModCommand(Tools.escapeHTML(user.name) + ' has disabled chat emotes.');
		}
		if (toId(target) === 'on' || toId(target) === 'enable') {
			Core.settings.emoteStatus = true;
			room.add(Tools.escapeHTML(user.name) + ' has enabled chat emotes.');
			this.logModCommand(Tools.escapeHTML(user.name) + ' has enabled chat emotes.');
		}
		if (toId(target) === 'status') {
			var currentEmoteStatus = '';
			if (!Core.settings.emoteStatus) {
				currentEmoteStatus = 'disabled.';
			} else {
				currentEmoteStatus = 'enabled.';
			}
			return this.sendReply('Chat emotes are currently ' + currentEmoteStatus);
		}
	},

	emotes: 'emoticon',
	emoticons: 'emoticon',
	emoticon: function(target, room, user) {
		if (!this.canBroadcast()) return;
		if (!Core.settings.emoteStatus) {
			return this.sendReplyBox("<b><font color=red>Sorry, chat emotes have been disabled. :(</b></font>");
		} else {
			var name = Object.keys(Core.emoticons),
                	emoticons = [];
            		var len = name.length;
            		while (len--) {
        			emoticons.push((Core.processEmoticons(name[(name.length - 1) - len]) + '&nbsp;' + name[(name.length - 1) - len]));
            		}
            		this.sendReplyBox('<b><u>List of emoticons:</b></u> <br/><br/>' + emoticons.join(' ').toString());
        	}
    	}
};
