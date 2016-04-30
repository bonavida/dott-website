angular.module('dottApp.controllers').controller('ViewActivityController',function($scope, $state, $stateParams, ActivityService){
	$scope.err = 2; //0 --> No hay errores, 1 --> Hay errores, 2 --> Todavia no se ha llamado a la funcion
	$scope.msg = "";

    $scope.deleteActivity = function() {
        ActivityService.remove($stateParams.id).then(function () {
            $scope.msg = "Actividad borrada con exito";
            $scope.err = 0;
        }).catch(function(){
        	$scope.msg = "Se ha producido un error borrando la actividad";
        	$scope.err = 1;
        });
    };
});