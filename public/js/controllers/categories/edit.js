angular.module('dottApp.controllers').controller('EditCategoryController', function($scope, $state, $stateParams, CategoryService){
  $scope.category = {
    name:   "",
    image:  "images/default.jpg",
  };

  $scope.get = function(){
    CategoryService.getByID($stateParams.id).then(function(data){
      $scope.category = data;
    });
  };

  $scope.save = function(){
    CategoryService.add( $scope.category).then(function(data){
      $scope.message="Categoría creada con éxito";
        $state.go("categories");
    });
  };


  $scope.file="";
  $scope.submit = function(){ //function to call on form submit
      if ($scope.catForm.file.$valid && $scope.file) { //check if from is valid
          $scope.upload($scope.file); //call upload function
      }
  };

  $scope.upload = function (file) {
      Upload.upload({
          url: 'http://localhost:3000/api/uploads', //webAPI exposed to upload the file
          data:{file:file} //pass file as data, should be user ng-model
      }).then(function (resp) { //upload function returns a promise
        console.log("....",resp);
          if(resp.data.success){ //validate success
              console.log('Success');
              $scope.category.image = resp.data.url;
          } else {
              console.log('Error');
          }
      }, function (resp) { //catch error
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          console.log(evt);
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.progress = progressPercentage + '% subido';
      });
  };

  $scope.get();
});
