angular.module('dottApp.controllers').controller('ManageActivitiesController', function($scope, $stateParams, ActivityService){
    $scope.activities = [];
    ActivityService.getAll().then(function(data){
      $scope.activities = data;
    });
});
