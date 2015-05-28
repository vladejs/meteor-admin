var pageSession = new ReactiveDict();

Template.AdminCategoryDetails.rendered = function() {
	
};

Template.AdminCategoryDetails.events({
	
});

Template.AdminCategoryDetails.helpers({
	
});

Template.AdminCategoryDetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminCategoryDetailsDetailsFormInfoMessage", "");
	pageSession.set("adminCategoryDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();			
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[autofocus]").focus();
};

Template.AdminCategoryDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminCategoryDetailsDetailsFormInfoMessage", "");
		pageSession.set("adminCategoryDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var adminCategoryDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminCategoryDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminCategoryDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminCategoryDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.category", {});
	}

	
});

Template.AdminCategoryDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminCategoryDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminCategoryDetailsDetailsFormErrorMessage");
	}
	
});
