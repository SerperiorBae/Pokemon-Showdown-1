var fs = require('fs');

exports.commands = {
	stafflist: 'authlist',
	authlist: function(target, room, user, connection) {
		fs.readFile('config/usergroups.csv', 'utf8', function(err, data) {
			var staff = {
				"admins": [],
				"leaders": [],
				"mods": [],
				"drivers": [],
				"voices": []
			};
			var row = (''+data).split('\n');
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var rank = row[i].split(',')[1].replace("\r",'');
				var person = row[i].split(',')[0];
				switch (rank) {
					case '~':
						staff['admins'].push(person);
					break;
					case '&':
						staff['leaders'].push(person);
					break;
					case '@':
						staff['mods'].push(person);
					break;
					case '%':
						staff['drivers'].push(person);
					break;
					case '+':
						staff['voices'].push(person);
					break;
					default:
					continue;
				}
			}
			connection.popup(
				'Kakuja Staff List \n\n(~) **Administrator(s)**:\n'+ staff['admins'].join(', ') +
				'\n(&) **Leader(s)**:\n' + staff['leaders'].join(', ') +
				'\n(@) **Moderator(s)**:\n' + staff['mods'].join(', ') +
				'\n(%) **Driver(s)**:\n' + staff['drivers'].join(', ') +
				'\n(+) **Voice(s)**:\n' + staff['voices'].join(', ')
			);
		})
	}
};
