angular.module('dottApp',['ui.router',
                          'ui.bootstrap',
                          'ngFileUpload',
                          'ngResource',
                          'ngRoute',
                          'dottApp.controllers',
                          'dottApp.services',
                          'dottApp.constants',
                          'dottApp.filters',
                          'ngSanitize',
                          'uiGmapgoogle-maps']);//Dependencies

angular.module('dottApp.controllers', ['ui.bootstrap']);
angular.module('dottApp.services', []);
angular.module('dottApp.constants', []);
angular.module('dottApp.filters', []);
