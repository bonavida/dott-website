angular.module('dottApp.controllers').controller('ViewActivityController',function($scope, $stateParams, ActivityService, AuthService){
    $scope.activity = {};
    $scope.user = {};
    $scope.err = 2; //0 --> No hay errores, 1 --> Hay errores, 2 --> Todavia no se ha llamado a la funcion
	$scope.msg = "";

    $scope.getActivity = function() {
        ActivityService.getByID($stateParams.id).then(function (activity) {
            $scope.activity = activity;
            console.log(activity.name);
        });
    };
    
    $scope.getUser = function(){
		AuthService.getUser().then(function(user) {
			$scope.user = user;
		});
	};
    
    $scope.deleteActivity = function() {
        ActivityService.remove($stateParams.id).then(function () {
            $scope.msg = "Actividad borrada con exito";
            $scope.err = 0;
        }).catch(function(){
        	$scope.msg = "Se ha producido un error borrando la actividad";
        	$scope.err = 1;
        });
    };
    
    $scope.getActivity();
    $scope.getUser();

    //$scope.activity = ActivityService.getByID({id: $stateParams.id});
});
