angular.module('dottApp.controllers').controller('ChatController',function($scope, socket, AuthService) {

    var textarea = document.getElementById('chat');

    $scope.messages = [];
    $scope.chat = "";
    $scope.user = {};

    $scope.getUser = function() {
        AuthService.getUser().then(function(user) {
          $scope.user = user;
        });
    };

    $scope.sendMessage = function() {
        socket.emit('send message', $scope.user.username + ": " + $scope.message.text);
        $scope.message.text = "";
    };

    socket.on('get message', function(data) {
        $scope.messages.push(data);
        $scope.chat = $scope.messages.join('\n');
        $scope.$digest();
        textarea.scrollTop = textarea.scrollHeight;
    });

    $scope.getUser();

});
