angular.module('dottApp.controllers').controller('ViewActivityController',function($scope, $state, $stateParams, $timeout, ActivityService, AuthService){
    $scope.activity = {};
    $scope.lat = undefined;
    $scope.lng = undefined;
    $scope.searchModel = {
        searchTerm: undefined
    };
    $scope.user = {};
    $scope.err = 2; //0 --> No hay errores, 1 --> Hay errores, 2 --> Todavia no se ha llamado a la funcion
	$scope.msg = "";

    $scope.getActivity = function() {
        ActivityService.getByID($stateParams.id).then(function (activity) {
            $scope.activity = activity;
            $scope.loadLocation();
        });
    };

    $scope.loadLocation = function() {
        $scope.lat = $scope.activity.location.coords.lat;
        $scope.lng = $scope.activity.location.coords.lng;
        $scope.searchModel = {
            searchTerm: $scope.activity.location.name
        };

        $scope.map = {
            center: {
                latitude: $scope.lat,
                longitude: $scope.lng
            },
            zoom: 15,
            options : {
                scrollwheel: true
            }
        };

        $scope.marker = {
            id: 0,
            coords: {
                latitude: $scope.lat,
                longitude: $scope.lng
            },
            options: {
                draggable: false
            }
        };
    };

    $scope.getUser = function(){
		AuthService.getUser().then(function(user) {
			$scope.user = user;
		});
	};

    $scope.deleteActivity = function() {
        ActivityService.remove($stateParams.id).then(function () {
            $scope.msg = "Actividad borrada con éxito.";
            $scope.err = 0;
            $timeout(callAtTimeout, 3000);
        }).catch(function(){
        	$scope.msg = "Se ha producido un error al borrar la actividad.";
        	$scope.err = 1;
        });
    };

    function callAtTimeout() {
        $state.go('activities');
    }

    $scope.getActivity();
    $scope.getUser();

    //$scope.activity = ActivityService.getByID({id: $stateParams.id});
});
