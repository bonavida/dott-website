/**
 * http://usejsdoc.org/
 */


angular.module('dottApp.controllers').controller('LoginUserController', function($scope, $http, User){
//  console.log("login");
	$scope.username;
	$scope.pwd;
//	$scope.loginUser = function(){
//		console.log("USUARIO!!!", $scope.username, $scope.pwd);
//	};
	$http.get("http://localhost:3000/api/users").then(function(response){
//		$scope.username=;
//		$scope.pwd;
		lista=[{username:"a", pdw:"1"}, {username:"b", pdw:"2"}, {username:"c", pdw:"3"}];
		console.log(lista)
		$scope.a = expect(lista).toEqual({usename:$scope.username, pwd.$scope.pwd})
		console.log("si?",a)
	});
});
