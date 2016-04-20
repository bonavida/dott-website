describe('UserRegisterController', function() {
    var $scope;
    var controller;

    beforeEach(function() {

        module('dottApp.controllers');

        inject(function(_$rootScope_, $controller) {
            $scope = _$rootScope_.$new();
            controller = $controller('UserRegisterController', {
                '$scope' : $scope
            });
        });
    });

    it('sets status to 1 if the username does not exist', function() {
        $scope.user = { "username" : "noexiste", "email" : "no@existe.com" };
        $scope.submitForm(true);
        expect($scope.status).toEqual(1);
    });

});
