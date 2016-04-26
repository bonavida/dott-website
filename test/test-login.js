var assert = require('chai').assert;
var http = require('http');
var rest = require('restler');

describe('User login API tests', function(){
	var user = {
		username: "irene",
		password: "hola,hola",
	};
	var base = "http://127.0.0.1:3000/";

	it('Iniciar sesión', function(done){
		rest.post(base+"api/login", {data: user}).on("complete", function(data){
			assert(data.success);
			assert(data.token);
			done();
		});
	});

	it('Iniciar sesión con un usuario no existente', function(done){
		user.username = "username";
		rest.post(base+"api/login", {data: user}).on("complete", function(data){
			assert(!data.success);
			done();
		});
	});

	it('Iniciar sesión sin contraseña', function(done){
		user.password = "";
		rest.post(base+"api/login", {data: user}).on("complete", function(data){
			assert(!data.success);
			done();
		});
	});

});
