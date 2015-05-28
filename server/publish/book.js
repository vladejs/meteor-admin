Meteor.publish("books_list", function() {
	return Book.find({}, {});
});

Meteor.publish("all_books", function() {
	return Book.find({}, {});
});

Meteor.publish("book_details", function(bookId) {
	return Book.find({_id:bookId}, {});
});

Meteor.publish("books_edit", function(bookId) {
	return Book.find({_id:bookId}, {});
});

Meteor.publish("ad_book", function() {
	return Book.find({}, {});
});

