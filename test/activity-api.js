var assert = require('chai').assert;
var http = require('http');
var rest = require('restler');

describe('Activity REST API tests', function() {
    var activity = {
        name: "Escalada",
        description: "Una actividad test",
        image: "images/default.jpg",
        location: {
            name: "",
            coords: {
                lat: "",
                lng: ""
            }
        },
        creator: {
            userID: "",
            name: "",
            image: ""
        },
        executionDate: new Date(),
        creationDate: new Date(),
        minParticipants: 1,
        maxParticipants: 2,
        categories: [],
        participants: []
    };

    var user = {
        username : "johndoe",
        password : "12345678",
        name : "John Doe",
        email : "john@doe.com",
        birthday : "1970-01-01T00:00:00.000Z",
        image : "images/profile.png"
    };

    var secondUser = {
        username : "arthur",
        password : "12345678",
        name : "Arthur Newman",
        email : "arthur@arthur.com",
        birthday : "1970-01-01T00:00:00.000Z",
        image : "images/profile.png"
    };

    var base = "http://127.0.0.1:3000/";
    var createdId = "";
    var existingActivities = "";
    rest.get(base+"api/activities").on("complete", function (allActivities) {
        existingActivities = allActivities.length;
    });

    it('Add new activity', function(done) {
        rest.post(base+"api/activities", {data: activity}).on("complete", function(response) {
            assert(response.name == "Escalada");
            createdId = response._id;
            done();
        });
    });

    it('Get activity data', function(done){
        rest.get(base+"api/activities/" + createdId).on("complete", function(result){
            assert(result.name == "Escalada");
            done();
        });
    });

    it('Update activity data', function(done){
        activity.name = "Barranquismo"
        rest.put(base+"api/activities/" + createdId, {data: activity}).on("complete", function(result){
            assert(result.name == "Barranquismo");
            done();
        });
    });

    it('Get all activities', function(done){
        rest.get(base+"api/activities" ).on("complete", function(result){
            assert(result.length == existingActivities + 1);
            done();
        });
    });

    it('Delete activity', function(done){
        rest.del(base+"api/activities/" + createdId).on("complete", function(result, response) {
            assert(response.statusCode == 200);
            done();
        });
    });
});