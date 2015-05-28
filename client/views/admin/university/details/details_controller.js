this.AdminUniversityDetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminUniversityDetails': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("university_details", this.params.universityId)
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
			university_details: University.findOne({_id:this.params.universityId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});