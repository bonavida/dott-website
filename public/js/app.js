angular.module('dottApp',['ui.router',
                          'ui.bootstrap',
                          'ngResource',
                          'ngRoute',
                          'dottApp.factories',
                          'dottApp.filters',
                          'dottApp.directives',
                          'dottApp.controllers',
                          'dottApp.services']);//Dependencies

angular.module('dottApp').config(function($stateProvider,$routeProvider, $urlRouterProvider){

    $stateProviders
      .state('activities',{
        url:'/activities',
        templateUrl:'partials/activities/list.html',
        controller:'ListActivityController'
    }).state('activities/view',{
       url:'/activities/:id/view',
       templateUrl:'partials/activities/view.html',
       controller:'ViewActivityController'
    }).state('activities/new',{
        url:'/activities/new',
        templateUrl:'partials/activities/add.html',
        controller:'CreateActivityController'
    }).state('activities/edit',{
        url:'/activities/:id/edit',
        templateUrl:'partials/activities/edit.html',
        controller:'EditActivityController'
    });
    $urlRouterProvider.otherwise("/activities");
}).run(function($state){
   $state.go('activities');
});
