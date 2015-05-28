var pageSession = new ReactiveDict();

Template.AdminBookDetails.rendered = function() {
	
};

Template.AdminBookDetails.events({
	
});

Template.AdminBookDetails.helpers({
	
});

Template.AdminBookDetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminBookDetailsDetailsFormInfoMessage", "");
	pageSession.set("adminBookDetailsDetailsFormErrorMessage", "");

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

Template.AdminBookDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminBookDetailsDetailsFormInfoMessage", "");
		pageSession.set("adminBookDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var adminBookDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminBookDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminBookDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminBookDetailsDetailsFormErrorMessage", message);
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

		Router.go("admin.book", {});
	}

	
});

Template.AdminBookDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminBookDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminBookDetailsDetailsFormErrorMessage");
	}
	
});
