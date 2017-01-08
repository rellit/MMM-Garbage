/* Magic Mirror
 * Node Helper: Garbage
 *
 * By Tim Herbst http://timherbst.de
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var fs = require("fs");

module.exports = NodeHelper.create({
	// Override start method.
	start: function() {
		var self = this;

		console.log("Starting node helper for: " + this.name);

	},

	// Override socketNotificationReceived method.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "GET_GARBAGE") {
			var json = fs.readFileSync(require("path").resolve(__dirname, 'garbage.json'), 'UTF-8');
			this.sendSocketNotification("GARBAGE", JSON.parse(json));
		}
	},

});
