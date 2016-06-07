var assert = require('chai').assert;
var http = require('http');
var rest = require('restler');

describe('User REST API tests', function(){
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

	var userSameUsername = {
		username : "johndoe",
		password : "12345678",
		name : "John Doe",
		email : "user@user.com",
		birthday : "1970-01-01T00:00:00.000Z",
		image : "images/profile.png"
	};

	var userSameEmail = {
		username : "sameemail",
		password : "12345678",
		name : "John Doe",
		email : "john@doe.com",
		birthday : "1970-01-01T00:00:00.000Z",
		image : "images/profile.png"
	};

	var nousername = {
		username : "nousername",
		password : "12345678",
		name : "John Doe",
		email : "john@doe.com",
		birthday : "1970-01-01T00:00:00.000Z",
		image : "images/profile.png"
	};

	var nopassword = {
		username : "nopassword",
		password : "",
		name : "John Doe",
		email : "john@doe.com",
		birthday : "1970-01-01T00:00:00.000Z",
		image : "images/profile.png"
	};

	var base = "http://127.0.0.1:3000/";
	var createdId = "";
    var existingUsers = "";

    // Get the current number of users (db is shared with application)
    rest.get(base+"api/users").on("complete", function (allUsers) {
        existingUsers = allUsers.length;
    });

    var token = "";

	it('Correct input registration', function(done) {
		rest.post(base+"api/register", {data: user}).on("complete", function(result) {
			assert(result.success);
			createdId = result.id;
			done();
		});
	});

	it('Fail to register with existing username', function(done) {
		rest.post(base+"api/register", {data: userSameUsername}).on("complete", function(result) {
			assert(!result.success);
			done();
		});
	});

	it('Fail to register with existing email', function(done) {
		rest.post(base+"api/register", {data: userSameEmail}).on("complete", function(result) {
			assert(!result.success);
			done();
		});
	});
	
	it('Login', function(done){
		rest.post(base+"api/login", {data: user}).on("complete", function(result){
			assert(result.success);
			assert(result.token);
            token = result.token;
			done();
		});
	});

	it('Fail to to login with non existing username', function(done){
		rest.post(base+"api/login", {data: nousername}).on("complete", function(result){
			assert(!result.success);
			done();
		});
	});

	it('Fail to login without password', function(done){
		rest.post(base+"api/login", {data: nopassword}).on("complete", function(result){
			assert(!result.success);
			done();
		});
	});

    it('Get user profile using token exchange', function(done){
        var header = {
            'Authorization': token
        };
		rest.get(base+"api/profile" , {headers: header}).on("complete", function(result){
			assert(result.success);
            done();
        });
    });

    it('Get all users', function(done){
        rest.get(base+"api/users" ).on("complete", function(result){
            assert(result.length == existingUsers + 1);
            done();
        });
	});

    it('Get user data', function(done){
        rest.get(base+"api/users/" + createdId).on("complete", function(result){
            assert(result.username == "johndoe");
            done();
        });
	});

    it('Update user name', function(done){
        user.name = "newname"
        rest.put(base+"api/users/" + createdId, {data: user}).on("complete", function(result){
            assert(result.name == "newname");
            done();
        });
    });

	it('Delete user', function(done){
		rest.del(base+"api/users/" + createdId).on("complete", function(result, response) {
            assert(response.statusCode == 200);
            done();
        });
	});
});