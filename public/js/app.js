angular.module('dottApp',['ui.router',
                          'ui.bootstrap',
                          'ngResource',
                          'ngRoute',
                          'dottApp.controllers',
                          'dottApp.services']);//Dependencies

angular.module('dottApp.controllers', ['ui.bootstrap']);
angular.module('dottApp.services', []);
