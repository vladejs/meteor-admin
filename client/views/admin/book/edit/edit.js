var pageSession = new ReactiveDict();

Template.AdminBookEdit.rendered = function() {
	
};

Template.AdminBookEdit.events({
	
});

Template.AdminBookEdit.helpers({
	
});

Template.AdminBookEditEditForm.rendered = function() {
	

	pageSession.set("adminBookEditEditFormInfoMessage", "");
	pageSession.set("adminBookEditEditFormErrorMessage", "");

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

Template.AdminBookEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminBookEditEditFormInfoMessage", "");
		pageSession.set("adminBookEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var adminBookEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminBookEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminBookEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.book", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminBookEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Book.update({ _id: t.data.books_edit._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.book", {});
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

Template.AdminBookEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminBookEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminBookEditEditFormErrorMessage");
	}
	
});
