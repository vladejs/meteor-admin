var pageSession = new ReactiveDict();

Template.AdminBook.rendered = function() {
	
};

Template.AdminBook.events({
	
});

Template.AdminBook.helpers({
	
});

var AdminBookViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminBookViewSearchString");
	var sortBy = pageSession.get("AdminBookViewSortBy");
	var sortAscending = pageSession.get("AdminBookViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "author", "isbn"];
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

var AdminBookViewExport = function(cursor, fileType) {
	var data = AdminBookViewItems(cursor);
	var exportFields = ["title", "author", "isbn"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminBookView.rendered = function() {
	pageSession.set("AdminBookViewStyle", "table");
	
};

Template.AdminBookView.events({
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
				pageSession.set("AdminBookViewSearchString", searchString);
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
					pageSession.set("AdminBookViewSearchString", searchString);
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
					pageSession.set("AdminBookViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.book.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminBookViewExport(this.books_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminBookViewExport(this.books_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminBookViewExport(this.books_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminBookViewExport(this.books_list, "json");
	}

	
});

Template.AdminBookView.helpers({

	"insertButtonClass": function() {
		return Book.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.books_list || this.books_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.books_list && this.books_list.count() > 0;
	},
	"isNotFound": function() {
		return this.books_list && pageSession.get("AdminBookViewSearchString") && AdminBookViewItems(this.books_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminBookViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminBookViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminBookViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminBookViewStyle") == "gallery";
	}

	
});


Template.AdminBookViewTable.rendered = function() {
	
};

Template.AdminBookViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminBookViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminBookViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminBookViewSortAscending") || false;
			pageSession.set("AdminBookViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminBookViewSortAscending", true);
		}
	}
});

Template.AdminBookViewTable.helpers({
	"tableItems": function() {
		return AdminBookViewItems(this.books_list);
	}
});


Template.AdminBookViewTableItems.rendered = function() {
	
};

Template.AdminBookViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.book.details", {bookId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Book.update({ _id: this._id }, { $set: values });

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
						Book.remove({ _id: me._id });
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
		Router.go("admin.book.edit", {bookId: this._id});
		return false;
	}
});

Template.AdminBookViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Book.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Book.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
