angular.module('dottApp.controllers').controller('RemoveActivityController',function($scope, $state, $stateParams, $timeout, ActivityService){
    $scope.activity = {};
    $scope.err = 2; //0 --> No hay errores, 1 --> Hay errores, 2 --> Todavia no se ha llamado a la funcion
    $scope.msg = "";

    $scope.getActivity = function() {
        ActivityService.getByID($stateParams.id).then(function (activity) {
            $scope.activity = activity;
        });
    };

    $scope.deleteActivity = function() {
        ActivityService.remove($stateParams.id).then(function () {
            $scope.msg = "Actividad borrada con éxito. En breve se le redirigira a la pagina anterior";
            $scope.err = 0;
            $timeout(callAtTimeout, 3000);
        }).catch(function(){
        	$scope.msg = "Se ha producido un error al borrar la actividad.";
        	$scope.err = 1;
        });
    };

    function callAtTimeout() {
        $state.go('adminActivities');
    }

    $scope.getActivity();

});
