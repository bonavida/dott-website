var assert = require('chai').assert;
var http = require('http');
var rest = require('restler');

describe('Category REST API tests', function() {
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
    var existingCategories = "";
    rest.get(base+"api/categories").on("complete", function (allCategories) {
        existingCategories = allCategories.length;
    });

    var testCategory = {
        name : "testcategory",
        image : ""
    }

    it('Add new category', function(done) {
        rest.post(base+"api/categories", {data: testCategory}).on("complete", function(response) {
            assert(response.name == "testcategory");
            createdId = response._id;
            done();
        });
    });

    it('Get category data', function(done){
        rest.get(base+"api/categories/" + createdId).on("complete", function(result){
            assert(result.name == "testcategory");
            done();
        });
    });

    it('Update category data', function(done){
        testCategory.name = "natacion"
        rest.put(base+"api/categories/" + createdId, {data: testCategory}).on("complete", function(result){
            assert(result.name == "natacion");
            done();
        });
    });
        
    it('Get all categories', function(done){
        rest.get(base+"api/categories" ).on("complete", function(result){
            assert(result.length == existingCategories + 1);
            done();
        });
    });

    it('Delete category', function(done){
        rest.del(base+"api/categories/" + createdId).on("complete", function(result, response) {
            assert(response.statusCode == 200);
            done();
        });
    });
});
