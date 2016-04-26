var assert = require('chai').assert;
var http = require('http');
var rest = require('restler');

describe('User registration API REST tests', function() {
	var user = {
		username : "johndoe",
		password : "12345678",
        name : "John Doe",
		email : "john@doe.com",
		birthday : "1970-01-01T00:00:00.000Z",
		location : "Nowhere",
		image : "images/profile.png"
	};

	var base = "http://127.0.0.1:3000/";

	it('Registrarse correctamente', function(done) {
		rest.post(base+"api/register", {data: user}).on("complete", function(data) {
			assert(data.success);
			done();
		});
	});

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
});
