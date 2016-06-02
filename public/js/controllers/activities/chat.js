angular.module('dottApp.controllers').controller('ChatController',function($scope, socket, AuthService) {

    var chat = document.getElementById('chat-wrapper');
    $scope.messages = [];
    $scope.message = {};
    $scope.user = {};

    $scope.getUsername = function() {
        AuthService.getUser().then(function(user) {
          $scope.message.user = user.username;
        });
    };

    $scope.sendMessage = function() {
        socket.emit('send message', $scope.message);
        $scope.message.text = "";
    };

    socket.on('get message', function(data) {
        $scope.messages.push(data);
        $scope.$digest();
        chat.scrollTop = chat.scrollHeight;
    });

    $scope.getUsername();

});
