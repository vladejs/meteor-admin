Book.allow({
	insert: function (userId, doc) {
		return Book.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Book.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Book.userCanRemove(userId, doc);
	}
});

Book.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Book.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Book.before.remove(function(userId, doc) {
	
});

Book.after.insert(function(userId, doc) {
	
});

Book.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Book.after.remove(function(userId, doc) {
	
});
