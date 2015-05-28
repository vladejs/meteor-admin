Meteor.publish("category_list", function() {
	return Category.find({}, {});
});

Meteor.publish("all_categories", function() {
	return Category.find({}, {});
});

Meteor.publish("category_details", function(categoryId) {
	return Category.find({_id:categoryId}, {});
});

Meteor.publish("category_edit", function(categoryId) {
	return Category.find({_id:categoryId}, {});
});

