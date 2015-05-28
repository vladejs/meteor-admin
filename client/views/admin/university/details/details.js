var pageSession = new ReactiveDict();

Template.AdminUniversityDetails.rendered = function() {
	
};

Template.AdminUniversityDetails.events({
	
});

Template.AdminUniversityDetails.helpers({
	
});

Template.AdminUniversityDetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminUniversityDetailsDetailsFormInfoMessage", "");
	pageSession.set("adminUniversityDetailsDetailsFormErrorMessage", "");

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

Template.AdminUniversityDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminUniversityDetailsDetailsFormInfoMessage", "");
		pageSession.set("adminUniversityDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var adminUniversityDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminUniversityDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminUniversityDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminUniversityDetailsDetailsFormErrorMessage", message);
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

		Router.go("admin.university", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.university", {});
	}

	
});

Template.AdminUniversityDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminUniversityDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminUniversityDetailsDetailsFormErrorMessage");
	}
	
});
