/**
 * http://usejsdoc.org/
 */

var assert = require('chai').assert;
var http = require('http');
var rest = require('restler');

suite('API tests', function(){
	var user = {
		username: "Irene",
		pwd: "hola,hola",
	};
	var base = "http://localhost:3000/";
	
	test('Primer test', function(done){
		rest.post(base+"api/login", {data: user}).on("success", function(data){
			assert(data.success);
			assert(data.token);
			done();
		});
	});
});