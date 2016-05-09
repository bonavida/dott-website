angular.module('dottApp.controllers').controller('ProfileUserController', function($scope, $state, AuthService, $uibModal){
  $scope.user = {};
  $scope.err = 2; //0-->se borra, 1-->No se borra
  $scope.msg;
  //$scope.user.name = "Usuario loggeado";

  $scope.getUser = function(){
    AuthService.getUser().then(function(user){
      $scope.user = user;
    });
  };

  $scope.getUser();
  
  $scope.deleteUsr = function(){
    AuthService.deleteUsr().then(function(){
	  $scope.err = 0;
	  $scope.msg = "El usuario se ha dado de baja.";
    }).catch(function(){
	  $scope.err = 1;
	  $scope.msg = "No se ha podido dar de baja al usuario.";
    });
    $scope.logout();
  }
//});

//POPUP
  $scope.open = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'confirmation.html',
      controller: 'popupController',
    });
    modalInstance.result.then(function () {
      $scope.deleteUsr();
    }, function () {	//CANCEL
    });
  };
  
});

//Controller de la POPUP
angular.module('dottApp.controllers').controller('popupController', function ($scope, $uibModalInstance) {
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});