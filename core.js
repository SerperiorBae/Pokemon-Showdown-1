/**
 * Core
 * Created by CreaturePhil - https://github.com/CreaturePhil
 *
 * This is where essential core infrastructure of
 * Pokemon Showdown extensions for private servers.
 * Core contains standard streams, profile infrastructure,
 * elo rating calculations, and polls infrastructure.
 *
 * @license MIT license
 */

var fs = require("fs");
var path = require("path");

});

var core = exports.core = {

	stdin: function (file, name) {
		var data = fs.readFileSync('config/' + file + '.csv', 'utf8').split('\n');

		var len = data.length;
		while (len--) {
			if (!data[len]) continue;
			var parts = data[len].split(',');
			if (parts[0].toLowerCase() === name) {
				return parts[1];
			}
		}
		return 0;
	},

	stdout: function (file, name, info, callback) {
		var data = fs.readFileSync('config/' + file + '.csv', 'utf8').split('\n');
		var match = false;

		var len = data.length;
		while (len--) {
			if (!data[len]) continue;
			var parts = data[len].split(',');
			if (parts[0] === name) {
				data = data[len];
				match = true;
				break;
			}
		}

		if (match === true) {
			var re = new RegExp(data, 'g');
			fs.readFile('config/' + file + '.csv', 'utf8', function (err, data) {
				if (err) return console.log(err);

				var result = data.replace(re, name + ',' + info);
				fs.writeFile('config/' + file + '.csv', result, 'utf8', function (err) {
					if (err) return console.log(err);
					typeof callback === 'function' && callback();
				});
			});
		} else {
			var log = fs.createWriteStream('config/' + file + '.csv', {
				'flags': 'a'
			});
			log.write('\n' + name + ',' + info);
			typeof callback === 'function' && callback();
		}
	},

	poll: function () {
		var poll = {};
		var components = {

			reset: function (roomId) {
				poll[roomId] = {
					question: undefined,
					optionList: [],
					options: {},
					display: '',
					topOption: ''
				};
			},

			splint: function (target) {
				var parts = target.split(',');
				var len = parts.length;
				while (len--) {
					parts[len] = parts[len].trim();
				}
				return parts;
			}

		};

		for (var i in components) {
			if (components.hasOwnProperty(i)) {
				poll[i] = components[i];
			}
		}

		for (var id in Rooms.rooms) {
			if (Rooms.rooms[id].type === 'chat' && !poll[id]) {
				poll[id] = {};
				poll.reset(id);
			}
		}

		return poll;
	},

	hashColor: function (name) {
		function MD5 (nick) {
			nick = nick.replace(/\r\n/g, '\n');
			var hash = nick.split('');
			var nickLen = nick.length;
			for (var c = 0; c < nickLen; c++) {
				var u = nick.charCodeAt(c);
				if (u < 128) {
					hash[i] = String.fromCharCode(u);
				} else {
					if (u > 127 && u < 2048) {
						hash[i] += String.fromCharCode(u >> 6 | 192) + String.fromCharCode(u & 63 | 128);
					} else {
						hash[i] += String.fromCharCode(u >> 12 | 224) + String.fromCharCode(u & 63 | 128);
					}
				}
			}

			for (var field = 16, bit = 0, char = 0; char < nickLen;) {
				bit = char % 4 * 8;
				hash[~~(char / 4)] |= nick.charCodeAt(char) << bit;
				char++;
			}
			hash[~~(char / 4)] |= 128 << char % 4 * 8;
			hash[field - 2] = nickLen << 3;
			hash[field - 1] = nickLen >>> 29;

			function toSignedInt(e, t) {
				var n, r, i, s, o;
				i = e & 2147483648;
				s = t & 2147483648;
				n = e & 1073741824;
				r = t & 1073741824;
				o = (e & 1073741823) + (t & 1073741823);
				if (n & r) return o ^ 2147483648 ^ i ^ s;
				if (n | r) {
					if (o & 1073741824) return o ^ 3221225472 ^ i ^ s;
					return o ^ 1073741824 ^ i ^ s;
				}
				return o ^ i ^ s;
			}
			function n(e, n, r, i, s, o, u) {
				e = toSignedInt(e, toSignedInt(toSignedInt(n & r | ~n & i, s), u));
				return toSignedInt(e << o | e >>> 32 - o, n);
			}
			function r(e, n, r, i, s, o, u) {
				e = toSignedInt(e, toSignedInt(toSignedInt(n & i | r & ~i, s), u));
				return toSignedInt(e << o | e >>> 32 - o, n);
			}
			function i(e, n, r, i, s, o, u) {
				e = toSignedInt(e, toSignedInt(toSignedInt(n ^ r ^ i, s), u));
				return toSignedInt(e << o | e >>> 32 - o, n);
			}
			function s(e, n, r, i, s, o, u) {
				e = toSignedInt(e, toSignedInt(toSignedInt(r ^ (n | ~i), s), u));
				return toSignedInt(e << o | e >>> 32 - o, n);
			}
			function toHashString(hex) {
				var hashString = '';
				for (var i = 0; i < 4; i++) {
					var n = hex >>> i * 8 & 255;
					n = "0" + n.toString(16);
					hashString += n.substr(n.length - 2, 2);
				}
				return hashString;
			}

			var h = 1732584193; // 67452301
			var p = 4023233417; // EFCDAB89
			var d = 2562383102; // 98BADCFE
			var v = 271733878; // 10325476
			for (var byte = 0; byte < hash.length; byte += 16) {
				a = h;
				f = p;
				l = d;
				c = v;
				h = n(h, p, d, v, hash[byte], 7, 3614090360);
				v = n(v, h, p, d, hash[byte + 1], 12, 3905402710);
				d = n(d, v, h, p, hash[byte + 2], 17, 606105819);
				p = n(p, d, v, h, hash[byte + 3], 22, 3250441966);
				h = n(h, p, d, v, hash[byte + 4], 7, 4118548399);
				v = n(v, h, p, d, hash[byte + 5], 12, 1200080426);
				d = n(d, v, h, p, hash[byte + 6], 17, 2821735955);
				p = n(p, d, v, h, hash[byte + 7], 22, 4249261313);
				h = n(h, p, d, v, hash[byte + 8], 7, 1770035416);
				v = n(v, h, p, d, hash[byte + 9], 12, 2336552879);
				d = n(d, v, h, p, hash[byte + 10], 17, 4294925233);
				p = n(p, d, v, h, hash[byte + 11], 22, 2304563134);
				h = n(h, p, d, v, hash[byte + 12], 7, 1804603682);
				v = n(v, h, p, d, hash[byte + 13], 12, 4254626195);
				d = n(d, v, h, p, hash[byte + 14], 17, 2792965006);
				p = n(p, d, v, h, hash[byte + 15], 22, 1236535329);
				h = r(h, p, d, v, hash[byte + 1], 5, 4129170786);
				v = r(v, h, p, d, hash[byte + 6], 9, 3225465664);
				d = r(d, v, h, p, hash[byte + 11], 14, 643717713);
				p = r(p, d, v, h, hash[byte], 20, 3921069994);
				h = r(h, p, d, v, hash[byte + 5], 5, 3593408605);
				v = r(v, h, p, d, hash[byte + 10], 9, 38016083);
				d = r(d, v, h, p, hash[byte + 15], 14, 3634488961);
				p = r(p, d, v, h, hash[byte + 4], 20, 3889429448);
				h = r(h, p, d, v, hash[byte + 9], 5, 568446438);
				v = r(v, h, p, d, hash[byte + 14], 9, 3275163606);
				d = r(d, v, h, p, hash[byte + 3], 14, 4107603335);
				p = r(p, d, v, h, hash[byte + 8], 20, 1163531501);
				h = r(h, p, d, v, hash[byte + 13], 5, 2850285829);
				v = r(v, h, p, d, hash[byte + 2], 9, 4243563512);
				d = r(d, v, h, p, hash[byte + 7], 14, 1735328473);
				p = r(p, d, v, h, hash[byte + 12], 20, 2368359562);
				h = i(h, p, d, v, hash[byte + 5], 4, 4294588738);
				v = i(v, h, p, d, hash[byte + 8], 11, 2272392833);
				d = i(d, v, h, p, hash[byte + 11], 16, 1839030562);
				p = i(p, d, v, h, hash[byte + 14], 23, 4259657740);
				h = i(h, p, d, v, hash[byte + 1], 4, 2763975236);
				v = i(v, h, p, d, hash[byte + 4], 11, 1272893353);
				d = i(d, v, h, p, hash[byte + 7], 16, 4139469664);
				p = i(p, d, v, h, hash[byte + 10], 23, 3200236656);
				h = i(h, p, d, v, hash[byte + 13], 4, 681279174);
				v = i(v, h, p, d, hash[byte], 11, 3936430074);
				d = i(d, v, h, p, hash[byte + 3], 16, 3572445317);
				p = i(p, d, v, h, hash[byte + 6], 23, 76029189);
				h = i(h, p, d, v, hash[byte + 9], 4, 3654602809);
				v = i(v, h, p, d, hash[byte + 12], 11, 3873151461);
				d = i(d, v, h, p, hash[byte + 15], 16, 530742520);
				p = i(p, d, v, h, hash[byte + 2], 23, 3299628645);
				h = s(h, p, d, v, hash[byte], 6, 4096336452);
				v = s(v, h, p, d, hash[byte + 7], 10, 1126891415);
				d = s(d, v, h, p, hash[byte + 14], 15, 2878612391);
				p = s(p, d, v, h, hash[byte + 5], 21, 4237533241);
				h = s(h, p, d, v, hash[byte + 12], 6, 1700485571);
				v = s(v, h, p, d, hash[byte + 3], 10, 2399980690);
				d = s(d, v, h, p, hash[byte + 10], 15, 4293915773);
				p = s(p, d, v, h, hash[byte + 1], 21, 2240044497);
				h = s(h, p, d, v, hash[byte + 8], 6, 1873313359);
				v = s(v, h, p, d, hash[byte + 15], 10, 4264355552);
				d = s(d, v, h, p, hash[byte + 6], 15, 2734768916);
				p = s(p, d, v, h, hash[byte + 13], 21, 1309151649);
				h = s(h, p, d, v, hash[byte + 4], 6, 4149444226);
				v = s(v, h, p, d, hash[byte + 11], 10, 3174756917);
				d = s(d, v, h, p, hash[byte + 2], 15, 718787259);
				p = s(p, d, v, h, hash[byte + 9], 21, 3951481745);
				h = toSignedInt(h, a);
				p = toSignedInt(p, f);
				d = toSignedInt(d, l);
				v = toSignedInt(v, c);
			}
			return (toHashString(h) + toHashString(p) + toHashString(d) + toHashString(v)).toLowerCase();
		}
		function hslToRgb(e, t, n) {
			var r, i, s, o, u, a;
			if (!Number.isFinite(e)) e = 0;
			if (!Number.isFinite(t)) t = 0;
			if (!Number.isFinite(n)) n = 0;
			e /= 60;
			if (e < 0) e = 6 + e % 6;
			e %= 6;
			t = Math.max(0, Math.min(1, t / 100));
			n = Math.max(0, Math.min(1, n / 100));
			u = (1 - Math.abs(2 * n - 1)) * t;
			a = u * (1 - Math.abs(e % 2 - 1));
			switch (~~e) {
			case 0:
				r = u;
				i = a;
				s = 0;
				break;
			case 1:
				r = a;
				i = u;
				s = 0;
				break;
			case 2:
				r = 0;
				i = u;
				s = a;
				break;
			case 3:
				r = 0;
				i = a;
				s = u;
				break;
			case 4:
				r = a;
				i = 0;
				s = u;
				break;
			case 5:
				r = u;
				i = 0;
				s = a;
				break;
			}
			o = n - u / 2;
			r = Math.round((r + o) * 255);
			i = Math.round((i + o) * 255);
			s = Math.round((s + o) * 255);
			return {r:r, g:i, b:s};
		}
		function rgbToHex(e, t, n) {
			return toHex(e) + toHex(t) + toHex(n);
		}
		function toHex(e) {
			if (e === null) return "00";
			e = parseInt(e);
			if (e === 0 || isNaN(e)) return "00";
			e = Math.round(Math.min(Math.max(0, e), 255));
			return "0123456789ABCDEF".charAt(~~(e / 16)) + "0123456789ABCDEF".charAt(e % 16);
		}
		var colorCache = {};
		var hashColor = function (e) {
			if (colorCache[e]) return colorCache[e];
			var t = MD5(e);
			var n = parseInt(t.substr(4, 4), 16) % 360;
			var r = parseInt(t.substr(0, 4), 16) % 50 + 50;
			var i = parseInt(t.substr(8, 4), 16) % 20 + 25;
			var s = hslToRgb(n, r, i);
			colorCache[e] = "#" + rgbToHex(s.r, s.g, s.b);
			return colorCache[e];
		};
		return hashColor(name);
	},

};
