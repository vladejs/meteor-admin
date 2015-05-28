this.AdminBookDetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminBookDetails': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("book_details", this.params.bookId)
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
			book_details: Book.findOne({_id:this.params.bookId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});