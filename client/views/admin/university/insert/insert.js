var pageSession = new ReactiveDict();

Template.AdminUniversityInsert.rendered = function() {
	
};

Template.AdminUniversityInsert.events({
	
});

Template.AdminUniversityInsert.helpers({
	
});

Template.AdminUniversityInsertInsertForm.rendered = function() {
	

	pageSession.set("adminUniversityInsertInsertFormInfoMessage", "");
	pageSession.set("adminUniversityInsertInsertFormErrorMessage", "");

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

Template.AdminUniversityInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminUniversityInsertInsertFormInfoMessage", "");
		pageSession.set("adminUniversityInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var adminUniversityInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminUniversityInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminUniversityInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.university", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminUniversityInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = University.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.AdminUniversityInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminUniversityInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminUniversityInsertInsertFormErrorMessage");
	}
	
});
