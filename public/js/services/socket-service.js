angular.module('dottApp.services').factory('socket', function() {
    var socket = io.connect('http://localhost:3000');
    return socket;
});
