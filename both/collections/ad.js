this.Ad = new Mongo.Collection("ad");

this.Ad.userCanInsert = function(userId, doc) {
	return true;
}

this.Ad.userCanUpdate = function(userId, doc) {
	return true;
}

this.Ad.userCanRemove = function(userId, doc) {
	return true;
}
