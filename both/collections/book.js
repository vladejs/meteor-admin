this.Book = new Mongo.Collection("book");

this.Book.userCanInsert = function(userId, doc) {
	return true;
}

this.Book.userCanUpdate = function(userId, doc) {
	return true;
}

this.Book.userCanRemove = function(userId, doc) {
	return true;
}
