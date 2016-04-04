angular.module('dottApp.controllers').controller('ListUserController', function($scope, $http){
  $scope.users = [];

  $http.get("http://localhost:3000/api/users").then(function(response){
  //		$scope.list = response.data.records; //IMPORTANTE!NO ELIMINAR!
    $scope.users = response.data;
  });
});
