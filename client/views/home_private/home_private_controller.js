this.HomePrivateController = RouteController.extend({
	template: "HomePrivate",
	

	yieldTemplates: {
        "AdminAd" : {to : "AdminSubcontent"}
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
            Meteor.subscribe("ads_list")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
            ads_list : Ad.find({"createdBy": Meteor.userId()})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});