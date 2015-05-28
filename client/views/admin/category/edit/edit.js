var pageSession = new ReactiveDict();

Template.AdminCategoryEdit.rendered = function() {
	
};

Template.AdminCategoryEdit.events({
	
});

Template.AdminCategoryEdit.helpers({
	
});

Template.AdminCategoryEditEditForm.rendered = function() {
	

	pageSession.set("adminCategoryEditEditFormInfoMessage", "");
	pageSession.set("adminCategoryEditEditFormErrorMessage", "");

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

Template.AdminCategoryEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminCategoryEditEditFormInfoMessage", "");
		pageSession.set("adminCategoryEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var adminCategoryEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminCategoryEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminCategoryEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.category", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminCategoryEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Category.update({ _id: t.data.category_edit._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.AdminCategoryEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminCategoryEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminCategoryEditEditFormErrorMessage");
	}
	
});
