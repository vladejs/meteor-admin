Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var publicRoutes = ["home_public", "login", "register", "forgot_password", "reset_password"];
var privateRoutes = ["home_private", "admin", "admin.users", "admin.users.details", "admin.users.insert", "admin.users.edit", "admin.university", "admin.university.insert", "admin.university.details", "admin.university.edit", "admin.category", "admin.category.insert", "admin.category.details", "admin.category.edit", "admin.book", "admin.book.insert", "admin.book.details", "admin.book.edit", "admin.ad", "admin.ad.insert", "user_settings", "user_settings.profile", "user_settings.change_pass", "logout"];
var zonelessRoutes = [];

var roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "admin.university",	roles: ["admin"] },
	{ route: "admin.university.insert",	roles: ["admin"] },
	{ route: "admin.university.details",	roles: ["admin"] },
	{ route: "admin.university.edit",	roles: ["admin"] },
	{ route: "admin.category",	roles: ["admin"] },
	{ route: "admin.category.insert",	roles: ["admin"] },
	{ route: "admin.category.details",	roles: ["admin"] },
	{ route: "admin.category.edit",	roles: ["admin"] },
	{ route: "admin.book",	roles: ["admin"] },
	{ route: "admin.book.insert",	roles: ["admin"] },
	{ route: "admin.book.details",	roles: ["admin"] },
	{ route: "admin.book.edit",	roles: ["admin"] },
	{ route: "admin.ad",	roles: ["admin"] },
	{ route: "admin.ad.insert",	roles: ["admin"] }
];

this.firstGrantedRoute = function() {
	var grantedRoute = "";
	_.every(privateRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});

	if(grantedRoute == "") {
		if(routeGranted("home_private")) {
			return "home_private";				
		} else {
			return "home_public";
		}
	}

	return grantedRoute;
}

// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app don't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};

Router.ensureLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(!Meteor.userId()) {
		// user is not logged in - redirect to public home
		this.redirect("home_public");
	} else {
		// user is logged in - check role
		if(!routeGranted(this.route.getName())) {
			// user is not in allowedRoles - redirect to private home
			var redirectRoute = firstGrantedRoute();
			this.redirect(redirectRoute);
		} else {
			this.next();
		}
	}
};

Router.ensureNotLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(Meteor.userId()) {
		var redirectRoute = firstGrantedRoute();
		this.redirect(redirectRoute);
	}
	else {
		this.next();
	}
};

Meteor.subscribe("current_user_data");

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});

Router.map(function () {
	
	this.route("home_public", {path: "/", controller: "HomePublicController"});
	this.route("login", {path: "/login", controller: "LoginController"});
	this.route("register", {path: "/register", controller: "RegisterController"});
	this.route("forgot_password", {path: "/forgot_password", controller: "ForgotPasswordController"});
	this.route("reset_password", {path: "/reset_password/:resetPasswordToken", controller: "ResetPasswordController"});
	this.route("home_private", {path: "/home_private", controller: "HomePrivateController"});
	this.route("admin", {path: "/admin", controller: "AdminController"});
	this.route("admin.users", {path: "/admin/users", controller: "AdminUsersController"});
	this.route("admin.users.details", {path: "/admin/users/details/:userId", controller: "AdminUsersDetailsController"});
	this.route("admin.users.insert", {path: "/admin/users/insert", controller: "AdminUsersInsertController"});
	this.route("admin.users.edit", {path: "/admin/users/edit/:userId", controller: "AdminUsersEditController"});
	this.route("admin.university", {path: "/admin/university", controller: "AdminUniversityController"});
	this.route("admin.university.insert", {path: "/admin/university/insert", controller: "AdminUniversityInsertController"});
	this.route("admin.university.details", {path: "/admin/university/details/:universityId", controller: "AdminUniversityDetailsController"});
	this.route("admin.university.edit", {path: "/admin/university/edit/:universityId", controller: "AdminUniversityEditController"});
	this.route("admin.category", {path: "/admin/category", controller: "AdminCategoryController"});
	this.route("admin.category.insert", {path: "/admin/category/insert", controller: "AdminCategoryInsertController"});
	this.route("admin.category.details", {path: "/admin/category/details/:categoryId", controller: "AdminCategoryDetailsController"});
	this.route("admin.category.edit", {path: "/admin/category/edit/:categoryId", controller: "AdminCategoryEditController"});
	this.route("admin.book", {path: "/admin/book", controller: "AdminBookController"});
	this.route("admin.book.insert", {path: "/admin/book/insert", controller: "AdminBookInsertController"});
	this.route("admin.book.details", {path: "/admin/book/details/:bookId", controller: "AdminBookDetailsController"});
	this.route("admin.book.edit", {path: "/admin/book/edit/:bookId", controller: "AdminBookEditController"});
	this.route("admin.ad", {path: "/admin/ad", controller: "AdminAdController"});
	this.route("admin.ad.insert", {path: "/admin/ad/insert", controller: "AdminAdInsertController"});
	this.route("user_settings", {path: "/user_settings", controller: "UserSettingsController"});
	this.route("user_settings.profile", {path: "/user_settings/profile", controller: "UserSettingsProfileController"});
	this.route("user_settings.change_pass", {path: "/user_settings/change_pass", controller: "UserSettingsChangePassController"});
	this.route("logout", {path: "/logout", controller: "LogoutController"});
});
