angular.module('dottApp.controllers').controller('ListActivityController', function($scope, ActivityService){
  $scope.activities = [];

  ActivityService.getAll().then(function(data){
      $scope.activities = data;
  });
});
