angular.module('dottApp.controllers').controller('AddActivityController', function($scope, Upload, ActivityService, ActivityValidator){
  $scope.activity = {
    name: "",
    description: "",
    //image:   "",//TODO
    location: "",
    creator: {},
    executionDate:   new Date(),
    creationDate:  new Date(),
    minParticipants: 1,
    maxParticipants: 2,
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

  $scope.file="";
  $scope.submit = function(){ //function to call on form submit
      //if ($scope.upload_form.file.$valid && $scope.file) { //check if from is valid
          $scope.upload($scope.file); //call upload function
      //}
  };

  $scope.upload = function (file) {

      console.log("1",file);
      console.log("2",$scope.file);
      Upload.upload({
          url: 'http://localhost:3000/api/uploads', //webAPI exposed to upload the file
          data:{file:file} //pass file as data, should be user ng-model
      }).then(function (resp) { //upload function returns a promise
          if(resp.data.error_code === 0){ //validate success
              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
          } else {
              console.log('an error occured');
          }
      }, function (resp) { //catch error
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          console.log(evt);
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
      });
  };




});
