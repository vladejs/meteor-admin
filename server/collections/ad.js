Ad.allow({
	insert: function (userId, doc) {
		return Ad.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Ad.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Ad.userCanRemove(userId, doc);
	}
});

Ad.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Ad.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Ad.before.remove(function(userId, doc) {
	
});

Ad.after.insert(function(userId, doc) {
	
});

Ad.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Ad.after.remove(function(userId, doc) {
	
});
