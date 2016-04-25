angular.module('dottApp.controllers').controller('ViewActivityController',function($scope, $stateParams, ActivityService){
    //$scope.activity = {};

    /*$scope.getActivity = function() {
        ActivityService.getByID("571a969d4c5af2d771f1ada8").then(function (activity) {
            $scope.activity = activity;
            console.log(activity.name);
        });
    };

    $scope.getActivity();
    */
    $scope.activity = ActivityService.getByID($stateParams.id);
});
