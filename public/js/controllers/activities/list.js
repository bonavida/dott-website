angular.module('dottApp.controllers').controller('ListActivityController', function($scope, $stateParams, ActivityService){
  $scope.activities = [];

  $scope.query = "";


  $scope.search = function (row) {//Busqueda con filtros se ha de añadir una caso por cada columna disponible para ordenar
    return (
        /* (
           $scope.nodeFilters[row.type]
         ) &&*/
       (
         angular.lowercase(row.name).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
         angular.lowercase(row.description).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
         angular.lowercase(row.location.name).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
         angular.lowercase(row.creator.name).indexOf(angular.lowercase($scope.query) || '') !== -1
       )
     );
   };

  ActivityService.getAll().then(function(data){
      $scope.activities = data;
  });




});
