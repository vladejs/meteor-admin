var pageSession = new ReactiveDict();

Template.AdminUniversityEdit.rendered = function() {
	
};

Template.AdminUniversityEdit.events({
	
});

Template.AdminUniversityEdit.helpers({
	
});

Template.AdminUniversityEditEditForm.rendered = function() {
	

	pageSession.set("adminUniversityEditEditFormInfoMessage", "");
	pageSession.set("adminUniversityEditEditFormErrorMessage", "");

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

Template.AdminUniversityEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminUniversityEditEditFormInfoMessage", "");
		pageSession.set("adminUniversityEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var adminUniversityEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminUniversityEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminUniversityEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.university", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminUniversityEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				University.update({ _id: t.data.university_edit._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.university", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.AdminUniversityEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminUniversityEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminUniversityEditEditFormErrorMessage");
	}
	
});
