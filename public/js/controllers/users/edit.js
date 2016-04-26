angular.module('dottApp.controllers').controller('EditUserController', function($scope, $state, $timeout, AuthService){
	$scope.user = {}; //Error con las fechas
	$scope.err = 2; //1 --> error, 0 --> sin errores

	$scope.getUser = function(){
		AuthService.getUser().then(function(user) {
			$scope.user = user;
		});
	};

	$scope.save = function() {
		AuthService.edit($scope.user).then(function() {
			$scope.err = 0;
            $timeout(callAtTimeout, 3000);
		}).catch(function() {
			$scope.err = 1;
		});
	};

	function callAtTimeout() {
        $state.go('user-profile');
    }

    $scope.file="";
    $scope.submit = function(){ //function to call on form submit
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

	$scope.getUser();
});
