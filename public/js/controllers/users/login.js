/**
 * http://usejsdoc.org/
 */


angular.module('dottApp.controllers').controller('LoginUserController', function($scope, $http, User){
	$scope.username;
	$scope.pwd;
	$scope.list=[];
	$scope.aux;	
	
	$http.get("http://localhost:3000/api/users").then(function(response){
		$scope.list = response.data.records;
	});
	
	$scope.login = function(){
		$scope.aux=false;
		angular.forEach($scope.list, function(value, key){
			if(value.username==$scope.username && value.pdw==$scope.pwd){
				console.log(true)
				$scope.aux = true;
			}
		});
	};
	
	$scope.login();
});
