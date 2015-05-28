this.AdminCategoryController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminCategory': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("category_list")
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
			category_list: Category.find({}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});