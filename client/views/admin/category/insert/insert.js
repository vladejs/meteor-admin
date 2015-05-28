var pageSession = new ReactiveDict();

Template.AdminCategoryInsert.rendered = function() {
	
};

Template.AdminCategoryInsert.events({
	
});

Template.AdminCategoryInsert.helpers({
	
});

Template.AdminCategoryInsertInsertForm.rendered = function() {
	

	pageSession.set("adminCategoryInsertInsertFormInfoMessage", "");
	pageSession.set("adminCategoryInsertInsertFormErrorMessage", "");

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

Template.AdminCategoryInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminCategoryInsertInsertFormInfoMessage", "");
		pageSession.set("adminCategoryInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var adminCategoryInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminCategoryInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminCategoryInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.category.details", {categoryId: newId});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminCategoryInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Category.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.category", {});
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

Template.AdminCategoryInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminCategoryInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminCategoryInsertInsertFormErrorMessage");
	}
	
});
