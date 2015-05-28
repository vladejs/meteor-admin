Template.HomePrivate.rendered = function() {
	
};

Template.HomePrivate.events({
	
});

Template.HomePrivate.helpers({
	"ads" : function () {
        return Ad.find();
    }
});
