var pageSession = new ReactiveDict();

Template.AdminAd.rendered = function() {
	
};

Template.AdminAd.events({
	
});

Template.AdminAd.helpers({
	
});

var AdminAdViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminAdViewSearchString");
	var sortBy = pageSession.get("AdminAdViewSortBy");
	var sortAscending = pageSession.get("AdminAdViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["bookId", "price"];
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

var AdminAdViewExport = function(cursor, fileType) {
	var data = AdminAdViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminAdView.rendered = function() {
	pageSession.set("AdminAdViewStyle", "table");
	
};

Template.AdminAdView.events({
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
				pageSession.set("AdminAdViewSearchString", searchString);
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
					pageSession.set("AdminAdViewSearchString", searchString);
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
					pageSession.set("AdminAdViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.ad.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminAdViewExport(this.ads_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminAdViewExport(this.ads_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminAdViewExport(this.ads_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminAdViewExport(this.ads_list, "json");
	}

	
});

Template.AdminAdView.helpers({

	"insertButtonClass": function() {
		return Ad.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.ads_list || this.ads_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.ads_list && this.ads_list.count() > 0;
	},
	"isNotFound": function() {
		return this.ads_list && pageSession.get("AdminAdViewSearchString") && AdminAdViewItems(this.ads_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminAdViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminAdViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminAdViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminAdViewStyle") == "gallery";
	}

	
});


Template.AdminAdViewTable.rendered = function() {
	
};

Template.AdminAdViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminAdViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminAdViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminAdViewSortAscending") || false;
			pageSession.set("AdminAdViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminAdViewSortAscending", true);
		}
	}
});

Template.AdminAdViewTable.helpers({
	"tableItems": function() {
		return AdminAdViewItems(this.ads_list);
	}
});


Template.AdminAdViewTableItems.rendered = function() {

};

Template.AdminAdViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Ad.update({ _id: this._id }, { $set: values });

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
						Ad.remove({ _id: me._id });
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
		/**/
		return false;
	}
});

Template.AdminAdViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Ad.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},
   	"deleteButtonClass": function() {
		return Ad.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
