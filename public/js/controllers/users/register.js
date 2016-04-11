angular.module('dottApp.controllers').controller('UserRegisterController', function($scope, $state, $timeout, AuthService) {
    $scope.user = {};
    $scope.msg = "";
    $scope.status = 2;

    $scope.submitForm = function(isValid) {
        if (isValid) {
            console.log($scope.user);
            AuthService.register($scope.user).then(function(msg){
                $scope.msg = msg;
                $scope.status = 1;
                $timeout(callAtTimeout, 3000);
      		}).catch(function(msg){
                $scope.msg = msg;
                $scope.status = 0;
      			console.log("ERROR!");
      		});
        }
    };

    function callAtTimeout() {
        $state.go('activities');
        console.log("REDIRIGIR!");
    }

});
