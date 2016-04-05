/**
 * http://usejsdoc.org/
 */

angular.module('dottApp.controllers').controller('LoginUserController', function($scope, $http, $window, User, AuthService){
	$scope.username;
	$scope.pwd;
	$scope.list=[];
	$scope.aux;	//0-->NoLogin 1-->SiLogin 2-->CamposVacios
//	$scope.alet;
	
	$http.get("http://localhost:3000/api/users").then(function(response){
//		$scope.list = response.data.records; //IMPORTANTE!NO ELIMINAR!
		$scope.list = [{username:"a", pdw:"1"}, {username:"b", pdw:"2"}, {username:"c", pdw:"3"}];	//TODO QUITAR
	});
	
	
	$scope.login = function(){
//		$scope.aux=0;
////		$scope.alet=""
//		angular.forEach($scope.list, function(value, key){
//			if(value.username==$scope.username && value.pdw==$scope.pwd){
//				console.log(true)
//				$scope.aux = 1;
//				$window.location.href="http://localhost:3000/#/activities";
//			}
//		});
//		
//		//No se han rellenado todavia lo campos, no quiero que se muestre ningun ERR
//		if(angular.isUndefined($scope.username) || angular.isUndefined($scope.pwd)){
//			console.log("undefined");
//			$scope.aux = 2;
//		}
		
		AuthService.login($scope.username, $scope.pwd).then(function(){
			//se logea
			
		}).catch(function(){
			//no se logea
		});
		
	};
	
});