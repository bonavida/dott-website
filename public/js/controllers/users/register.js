angular.module('dottApp.controllers').controller('UserRegisterController', function($scope, $state, AuthService) {
    $scope.user = {};

    $scope.submitForm = function(isValid) {
        if (isValid) {
            console.log($scope.user);
            AuthService.register($scope.user).then(function(){
      				$state.go('activities');
      				console.log("REDIRIGIR!");
      			}).catch(function(){
      				console.log("ERROR!");
      			});
        }
    };
});
