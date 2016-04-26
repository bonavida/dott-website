angular.module('dottApp.controllers').controller('EditPwdUserController', function($scope, $state, $timeout, User, AuthService){
	$scope.err = 2; //0 --> No hay errores, 1 --> Hay errores, 2 --> Todavia no se ha llamado a la funcion
	$scope.msg;

	$scope.getUser = function(){
		AuthService.getUser().then(function(user){
			$scope.user = user;
			console.log("HOLA!!", $scope.user);
		});
	};

	$scope.save = function() {
		console.log("oldPWD: ", $scope.oldPassword, ", newPWD: ", $scope.newPassword);
		if (!$scope.user.newPassword == $scope.confPassword) {
			$scope.err = 1;
			$scope.msg = "La confirmación de la contraseña tiene que ser la misma que la nueva contraseña";
		} else {
			AuthService.editPwd($scope.user).then(function() {
				$scope.err = 0;
				$scope.msg = "Se ha guardado la contraseña correctamente";
				$timeout(callAtTimeout, 3000);
			}).catch(function() {
				$scope.err = 1;
				$scope.msg = "La contraseña antigua no coincide.";
			});
			console.log($scope.state);
		}
	};

	function callAtTimeout() {
		$state.go('user-edit');
	}

	$scope.getUser();
});
