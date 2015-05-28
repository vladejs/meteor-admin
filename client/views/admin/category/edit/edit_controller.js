this.AdminCategoryEditController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminCategoryEdit': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("category_edit", this.params.categoryId)
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
			category_edit: Category.findOne({_id:this.params.categoryId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});