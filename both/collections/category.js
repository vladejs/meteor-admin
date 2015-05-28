this.Category = new Mongo.Collection("category");

this.Category.userCanInsert = function(userId, doc) {
	return true;
}

this.Category.userCanUpdate = function(userId, doc) {
	return true;
}

this.Category.userCanRemove = function(userId, doc) {
	return true;
}
