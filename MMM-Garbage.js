/* global Module */

/* Magic Mirror
 * Module: Garbage
 *
 * By Tim Herbst http://timherbst.de
 * MIT Licensed.
 */

Module.register("MMM-Garbage",{

	// Default module config.
	defaults: {
		text: "Lade...",
		updateInterval: 30000,
		fadeSpeed: 4000
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;
		self.sendSocketNotification("GET_GARBAGE");
		
		// Schedule update timer.
		
		setInterval(function() {
			self.sendSocketNotification("GET_GARBAGE");
		}, this.config.updateInterval);
	},

	// Define required scripts.
	getStyles: function() {
		return ["garbage.css", "font-awesome.css"];
	},

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.id='garbage';
		
		if(this.loaded)
			this.addGarbage(wrapper);		
		else {
			wrapper.innerHTML = this.config.text;
		}
		return wrapper;
	},

	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "GARBAGE") {
			
			this.garbage = payload;
			this.loaded = true;
			
		}

		this.updateDom(this.config.animationSpeed);
	},

	addGarbage: function (wrapper) {
		
    		var today = moment(new Date());
	    	var tomorrow = moment(new Date()).add(1, 'days');
		var twodays = moment(new Date()).add(2, 'days');
		var text = '';
		this.garbage.forEach(function(tonne) {
			tonne.leerungen.forEach(function(leerung_date) {
				leerung = moment(leerung_date);
				if (today.isSame(leerung, 'day'))
			    		text += '<span class="garbageSpan ' + tonne.messageClass + '"><div>' + tonne.name + ' wird heute geleert</div></span>';
				if (tomorrow.isSame(leerung, 'day'))
			    		text += '<span class="garbageSpan ' + tonne.messageClass + '"><div>' + tonne.name + ' wird morgen geleert</div></span>';
				if (twodays.isSame(leerung, 'day'))
			    		text += '<span class="garbageSpan ' + tonne.messageClass + '"><div>' + tonne.name + ' wird übermorgen geleert</div></span>';
				
			});
			wrapper.innerHTML = '';
		});
		wrapper.innerHTML += text;
	}
});
