angular.module('dottApp.controllers').controller('PublicProfileUserController',function($scope, $stateParams, UserService){
    $scope.user = {};

    $scope.getUser = function() {
        UserService.getByID($stateParams.id).then(function (user) {
            $scope.user = user;
            console.log(user.name);
        });
    };

    $scope.getUser();
});
