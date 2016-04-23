angular.module('dottApp.controllers').controller('EditActivityController',function($scope, $stateParams, ActivityService){
  $scope.updateActivity = function() { //Update the edited movie. Issues a PUT to /api/movies/:id
    ActivityService.updateActivity(function() {
      $state.go('activities');
    });
  };

  $scope.loadActivity = function() {
    $scope.activity = ActivityService.getByID({ id: $stateParams.id });
  };

  $scope.loadActivity();
});
