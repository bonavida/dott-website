angular.module('dottApp.controllers').controller('UserRegisterController', function($scope) {
    $scope.user = {};

    $scope.submitForm = function(isValid) {
        if (isValid) {
            console.log($scope.user);
        }
    };
});
