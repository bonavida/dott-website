angular.module('dottApp.controllers').controller('ViewActivityController',function($scope, $stateParams, ActivityService){
    $scope.activity = {};

    $scope.getActivity = function() {
        ActivityService.getByID($stateParams.id).then(function (activity) {
            $scope.activity = activity;
            console.log(activity.name);
        });
    };

    $scope.getActivity();

    //$scope.activity = ActivityService.getByID({id: $stateParams.id});
});
