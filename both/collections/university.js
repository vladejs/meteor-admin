this.University = new Mongo.Collection("university");

this.University.userCanInsert = function(userId, doc) {
	return true;
}

this.University.userCanUpdate = function(userId, doc) {
	return true;
}

this.University.userCanRemove = function(userId, doc) {
	return true;
}
