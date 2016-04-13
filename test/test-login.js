/**
 * http://usejsdoc.org/
 */

var assert = require('chai').assert;
var http = require('http');
var rest = require('restler');

describe('API tests', function(){
	var user = {
		username: "irene",
		password: "hola,hola",
	};
	var base = "http://127.0.0.1:3000/";
	
	it('Primer test login', function(done){
		rest.post(base+"api/login", {data: user}).on("complete", function(data){
			assert(data.success);
			assert(data.token);
			done();
		});
	});
	
	
});