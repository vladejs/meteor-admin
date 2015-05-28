Meteor.publish("ads_list", function() {
	return Ad.publishJoinedCursors(Ad.find({}, {}));
});

Meteor.publish("all_ads", function() {
	return Ad.publishJoinedCursors(Ad.find({}, {}));
});

