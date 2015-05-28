Meteor.publish("university_list", function() {
	return University.find({}, {});
});

Meteor.publish("university_insert", function() {
	return University.find({_id:null}, {});
});

Meteor.publish("university_details", function(universityId) {
	return University.find({_id:universityId}, {});
});

Meteor.publish("university_edit", function(universityId) {
	return University.find({_id:universityId}, {});
});

Meteor.publish("university", function() {
	return University.find({}, {});
});

