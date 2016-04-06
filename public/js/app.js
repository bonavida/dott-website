angular.module('dottApp',['ui.router',
                          'ui.bootstrap',
                          'ngResource',
                          'ngRoute',
                          'dottApp.controllers',
                          'dottApp.services',
                          'dottApp.constants']);//Dependencies

angular.module('dottApp.controllers', ['ui.bootstrap']);
angular.module('dottApp.services', []);
angular.module('dottApp.constants', []);
