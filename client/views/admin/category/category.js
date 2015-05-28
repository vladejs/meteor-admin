var pageSession = new ReactiveDict();

Template.AdminCategory.rendered = function() {
	
};

Template.AdminCategory.events({
	
});

Template.AdminCategory.helpers({
	
});

var AdminCategoryViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminCategoryViewSearchString");
	var sortBy = pageSession.get("AdminCategoryViewSortBy");
	var sortAscending = pageSession.get("AdminCategoryViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name"];
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

var AdminCategoryViewExport = function(cursor, fileType) {
	var data = AdminCategoryViewItems(cursor);
	var exportFields = ["name"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminCategoryView.rendered = function() {
	pageSession.set("AdminCategoryViewStyle", "table");
	
};

Template.AdminCategoryView.events({
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
				pageSession.set("AdminCategoryViewSearchString", searchString);
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
					pageSession.set("AdminCategoryViewSearchString", searchString);
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
					pageSession.set("AdminCategoryViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.category.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminCategoryViewExport(this.category_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminCategoryViewExport(this.category_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminCategoryViewExport(this.category_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminCategoryViewExport(this.category_list, "json");
	}

	
});

Template.AdminCategoryView.helpers({

	"insertButtonClass": function() {
		return Category.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.category_list || this.category_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.category_list && this.category_list.count() > 0;
	},
	"isNotFound": function() {
		return this.category_list && pageSession.get("AdminCategoryViewSearchString") && AdminCategoryViewItems(this.category_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminCategoryViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminCategoryViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminCategoryViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminCategoryViewStyle") == "gallery";
	}

	
});


Template.AdminCategoryViewTable.rendered = function() {
	
};

Template.AdminCategoryViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminCategoryViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminCategoryViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminCategoryViewSortAscending") || false;
			pageSession.set("AdminCategoryViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminCategoryViewSortAscending", true);
		}
	}
});

Template.AdminCategoryViewTable.helpers({
	"tableItems": function() {
		return AdminCategoryViewItems(this.category_list);
	}
});


Template.AdminCategoryViewTableItems.rendered = function() {
	
};

Template.AdminCategoryViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.category.details", {categoryId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Category.update({ _id: this._id }, { $set: values });

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
						Category.remove({ _id: me._id });
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
		Router.go("admin.category.edit", {categoryId: this._id});
		return false;
	}
});

Template.AdminCategoryViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Category.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Category.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
