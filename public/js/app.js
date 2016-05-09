angular.module('dottApp',['ui.router',
                          'ui.bootstrap',
                          'ngFileUpload',
                          'ngResource',
                          'ngRoute',
                          'dottApp.controllers',
                          'dottApp.services',
                          'dottApp.constants',
                          'dottApp.filters',
                          'dottApp.directives',
                          'ngSanitize',
                          'angularUtils.directives.dirPagination',
                          'uiGmapgoogle-maps']);//Dependencies

angular.module('dottApp.controllers', ['ui.bootstrap']);
angular.module('dottApp.services', []);
angular.module('dottApp.constants', []);
angular.module('dottApp.filters', []);
angular.module('dottApp.directives', []);
