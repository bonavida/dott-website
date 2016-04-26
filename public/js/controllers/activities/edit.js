angular.module('dottApp.controllers').controller('EditActivityController',function($scope, $stateParams, ActivityService){
  $scope.updateActivity = function() {
    ActivityService.update(activity);
      $state.go('activities');
  };

  $scope.loadActivity = function() {
    $scope.activity = ActivityService.getByID($stateParams.id);
      console.log($stateParams.id)
  };

  $scope.loadActivity();
});
