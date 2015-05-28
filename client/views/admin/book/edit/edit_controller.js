this.AdminBookEditController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminBookEdit': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("books_edit", this.params.bookId)
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
			books_edit: Book.findOne({_id:this.params.bookId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});