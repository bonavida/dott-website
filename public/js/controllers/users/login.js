angular.module('dottApp.controllers').controller('LoginUserController', function($scope, $state, AuthService){
	$scope.username;
	$scope.pwd;
	$scope.list=[];
	$scope.status=2;	//0-->NoLogin 1-->SiLogin 2-->CamposVacios

	$scope.login = function(){
		console.log($scope.username, $scope.pwd);
		if($scope.username && $scope.pwd){
			AuthService.login({"username":$scope.username, "password":$scope.pwd}).then(function(){
				$state.go('activities');
				$scope.status = 1;
				console.log("REDIRIGIR!");
			}).catch(function(){
				$scope.status = 0;
				console.log("ERROR!");
			});
		}else{
			$scope.status=2;
			console.log("VAMOS!!");
		}

		console.log($scope.status);
	};

});
