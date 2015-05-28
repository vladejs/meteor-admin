var pageSession = new ReactiveDict();

Template.AdminAdInsert.rendered = function() {
	
};

Template.AdminAdInsert.events({
	
});

Template.AdminAdInsert.helpers({
	
});

Template.AdminAdInsertInsertForm.rendered = function() {
	

	pageSession.set("adminAdInsertInsertFormInfoMessage", "");
	pageSession.set("adminAdInsertInsertFormErrorMessage", "");

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

Template.AdminAdInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminAdInsertInsertFormInfoMessage", "");
		pageSession.set("adminAdInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var adminAdInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminAdInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminAdInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.ad", {adId: newId});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminAdInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Ad.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.ad", {});
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

Template.AdminAdInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminAdInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminAdInsertInsertFormErrorMessage");
	}
	
});
