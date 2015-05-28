this.AdminAdInsertController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminAdInsert': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("ad_book"),
			Meteor.subscribe("all_ads")
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
			ad_book: Book.find({}, {}),
			all_ads: Ad.findOne({}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});