console.log("activity-test");
var assert = require('chai').assert;
var http = require('http');
var rest = require('restler');

describe('Activity add API REST tests', function() {
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

    var base = "http://127.0.0.1:3000/";

    it('Anadir actividad', function(done) {
        rest.post(base+"api/activities", {data: activity}).on("complete", function(data) {
            assert(data.success);
            done();
        });
    });
/*
    it('Registrarse con un nombre de usuario ya existente', function(done) {
        rest.post(base+"api/register", {data: user}).on("complete", function(data) {
            assert(!data.success);
            done();
        });
    });

    it('Registrarse con un e-mail ya existente', function(done) {
        rest.post(base+"api/register", {data: user}).on("complete", function(data) {
            assert(!data.success);
            done();
        });
    });

*/
});
