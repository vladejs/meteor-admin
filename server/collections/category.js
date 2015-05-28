Category.allow({
	insert: function (userId, doc) {
		return Category.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Category.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Category.userCanRemove(userId, doc);
	}
});

Category.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Category.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Category.before.remove(function(userId, doc) {
	
});

Category.after.insert(function(userId, doc) {
	
});

Category.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Category.after.remove(function(userId, doc) {
	
});
