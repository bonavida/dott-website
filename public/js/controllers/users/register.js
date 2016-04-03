angular.module('dottApp.controllers').controller('UserRegisterController', function($scope) {
  $scope.submitForm = function(isValid) {
      if (isValid) {
          alert('Our form is amazing!');
      }
    };
});
