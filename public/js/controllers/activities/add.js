angular.module('dottApp.controllers').controller('AddActivityController', function($scope, ActivityService, ActivityValidator){
  $scope.activity = {
    name: "",
    description: "",
    //image:   "",//TODO
    location: "",
    creator: {},
    executionDate:   new Date(),
    creationDate:  new Date(),
    minParticipants: 1,
    maxParticipants: 1,
    //categories: [{name:""}]
  };
  $scope.message="";

  $scope.save = function(){
    if(ActivityValidator.isValid(  $scope.activity )){
      ActivityService.add( $scope.activity).then(function(data){
        $scope.message="Actividad creada con éxito";
      });
    }else{
      $scope.message="Datos inválidos";
    }
  };



});
