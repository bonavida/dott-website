angular.module('dottApp.controllers').controller('ListActivityController', function($scope, $stateParams, ActivityService){
  $scope.activities = [];

    $scope.deleteMovie = function(activity) { // Delete a movie. Issues a DELETE to /api/movies/:id
        activity.$delete(function() {
            $window.location.href = ''; //redirect to home
        });
    };

  ActivityService.getAll().then(function(data){
      $scope.activities = data;
  });

});
