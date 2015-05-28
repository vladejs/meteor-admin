var pageSession = new ReactiveDict();

Template.AdminBookInsert.rendered = function() {
	
};

Template.AdminBookInsert.events({
	
});

Template.AdminBookInsert.helpers({
	
});

Template.AdminBookInsertInsertForm.rendered = function() {
	

	pageSession.set("adminBookInsertInsertFormInfoMessage", "");
	pageSession.set("adminBookInsertInsertFormErrorMessage", "");

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

Template.AdminBookInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminBookInsertInsertFormInfoMessage", "");
		pageSession.set("adminBookInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var adminBookInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminBookInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminBookInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.book.details", {bookId: newId});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminBookInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Book.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.AdminBookInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminBookInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminBookInsertInsertFormErrorMessage");
	}
	
});
