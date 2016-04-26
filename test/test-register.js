
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:300");

describe('Resgitration API REST tests', function() {
	var user = {
		username : "johndoe",
		password : "12345678",
		email : "john@doe.com",
		birthday : "1920-01-01T00:00:00.000Z",
		location : "Nowhere",
		image : "images/profile.png"
	};

	it('should return valid user registration', function(done){
        server
        .post("/api/register")
        .send(user)
        .expect(200)
        .end(function(err,res) {
            res.body.success.should.equal(true);
            done();
        });
	});

	it('Registrarse con un nombre de usuario ya existente', function(done){
		user.email = "john@john.com";
		user.username = "johndoe";
		rest.post(base+"api/register", {data: user}).on("complete", function(data){
			assert(!data.success);
			done();
		});
	});

	it('Registrarse con un e-mail ya existente', function(done){
		user.username = "john";
		user.password = "john@doe.com";
		rest.post(base+"api/register", {data: user}).on("complete", function(data){
			assert(!data.success);
			done();
		});
	});

});
