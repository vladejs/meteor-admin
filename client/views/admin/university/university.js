var pageSession = new ReactiveDict();

Template.AdminUniversity.rendered = function() {
	
};

Template.AdminUniversity.events({
	
});

Template.AdminUniversity.helpers({
	
});

var AdminUniversityViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminUniversityViewSearchString");
	var sortBy = pageSession.get("AdminUniversityViewSortBy");
	var sortAscending = pageSession.get("AdminUniversityViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "city"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var AdminUniversityViewExport = function(cursor, fileType) {
	var data = AdminUniversityViewItems(cursor);
	var exportFields = ["name", "city"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminUniversityView.rendered = function() {
	pageSession.set("AdminUniversityViewStyle", "table");
	
};

Template.AdminUniversityView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("AdminUniversityViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("AdminUniversityViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("AdminUniversityViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.university.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminUniversityViewExport(this.university_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminUniversityViewExport(this.university_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminUniversityViewExport(this.university_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminUniversityViewExport(this.university_list, "json");
	}

	
});

Template.AdminUniversityView.helpers({

	"insertButtonClass": function() {
		return University.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.university_list || this.university_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.university_list && this.university_list.count() > 0;
	},
	"isNotFound": function() {
		return this.university_list && pageSession.get("AdminUniversityViewSearchString") && AdminUniversityViewItems(this.university_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminUniversityViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminUniversityViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminUniversityViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminUniversityViewStyle") == "gallery";
	}

	
});


Template.AdminUniversityViewTable.rendered = function() {
	
};

Template.AdminUniversityViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminUniversityViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminUniversityViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminUniversityViewSortAscending") || false;
			pageSession.set("AdminUniversityViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminUniversityViewSortAscending", true);
		}
	}
});

Template.AdminUniversityViewTable.helpers({
	"tableItems": function() {
		return AdminUniversityViewItems(this.university_list);
	}
});


Template.AdminUniversityViewTableItems.rendered = function() {
	
};

Template.AdminUniversityViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.university.details", {universityId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		University.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						University.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.university.edit", {universityId: this._id});
		return false;
	}
});

Template.AdminUniversityViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return University.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return University.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
