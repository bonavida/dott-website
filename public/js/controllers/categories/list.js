angular.module('dottApp.controllers').controller('ListCategoryController', function($scope, $state, CategoryService){
  $scope.categories = [];
  CategoryService.getAll().then(function(data){
    $scope.categories = data;
  });

});
