angular.module('dottApp.controllers').controller('ProfileUserController', function($scope, $state, AuthService){
  $scope.user = {};
  //$scope.user.name = "Usuario loggeado";

  $scope.getUser = function(){
    AuthService.getUser().then(function(user){
      $scope.user = user;
    });
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('activities');
  };

  $scope.getUser();
});
