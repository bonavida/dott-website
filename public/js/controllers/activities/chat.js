angular.module('dottApp.controllers').controller('ChatController',function($scope, socket) {

    $scope.messages = [];
    $scope.message = {};

    $scope.showMessages = function() {
        var text ='';
        $scope.messages.forEach(function(message) {
            text += message + "\n";
        });
       return text;
    };

    $scope.sendMessage = function() {
        socket.emit('send message', $scope.message.text);
    };

    socket.on('get message', function(data) {
        $scope.messages.push(data);
        $scope.message.text = "";
        $scope.$digest();
    });

    var textarea = document.getElementById('chat');
    setInterval(function() {
        textarea.scrollTop = textarea.scrollHeight;
    }, 1000);

});
