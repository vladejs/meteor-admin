this.AdminUsersController = RouteController.extend({
	template: "Admin",


	yieldTemplates: {
		'AdminUsers': { to: 'AdminSubcontent'}

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
			Meteor.subscribe("admin_users"),
			Meteor.subscribe("university_list")
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
			admin_users: Users.find({}, {
                "transform" : function(doc){ var u = University.find({_id:doc.profile.universityId}); if(u) doc.profile.university = {name:u.name, city:u.city}; return doc; }
            })
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});