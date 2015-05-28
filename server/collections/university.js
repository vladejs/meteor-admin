University.allow({
	insert: function (userId, doc) {
		return University.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return University.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return University.userCanRemove(userId, doc);
	}
});

University.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

University.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

University.before.remove(function(userId, doc) {
	
});

University.after.insert(function(userId, doc) {
	
});

University.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

University.after.remove(function(userId, doc) {
	
});
