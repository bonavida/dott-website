angular.module('dottApp.controllers').controller('UserRegisterController', function($scope, $state, $timeout, AuthService, Upload) {
    $scope.user = {};
    $scope.user.birthday = new Date();
    $scope.msg = "";
    $scope.status = 2;
    $scope.user.image = "images/profile.png";

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

    $scope.file="";
    $scope.submitImage = function(){ //function to call on form submit
        if ($scope.regForm.file.$valid && $scope.file) { //check if from is valid
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
                $scope.user.image = resp.data.url;
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
});
