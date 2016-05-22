angular.module('dottApp.controllers').controller('RemoveUserController',function($scope, $state, $stateParams, $timeout, UserService){

    $scope.user = {}; //Error con las fechas
    $scope.err = 2; //1 --> error, 0 --> sin errores

    $scope.deleteUser = function() {
        UserService.remove($stateParams.id).then(function () {
            $scope.msg = "Usuario borrado con éxito. En breve se le redirigira a la pagina anterior";
            $scope.err = 0;
            $timeout(callAtTimeout, 3000);
        }).catch(function(){
        	$scope.msg = "Se ha producido un error al borrar el usuario.";
        	$scope.err = 1;
            $timeout(callAtTimeout, 3000);
        });
    };

    function callAtTimeout() {
        $state.go('manage-users');
    }

	$scope.getUser = function(){
		UserService.getByID($stateParams.id).then(function(user) {
			$scope.user = user;
		});
	};

    console.log($stateParams.id);
    $scope.getUser();
});
