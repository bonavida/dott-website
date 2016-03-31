angular.module('dottApp').config(function($stateProvider,$routeProvider, $urlRouterProvider){

    $stateProvider
      .state('activities',{
        url:'/activities',
        templateUrl:'partials/activities/list.html',
        controller:'ListActivityController'
    }).state('activities-view',{
       url:'/activities/:id/view',
       templateUrl:'partials/activities/view.html',
       controller:'ViewActivityController'
    }).state('activities-new',{
        url:'/activities/new',
        templateUrl:'partials/activities/add.html',
        controller:'CreateActivityController'
    }).state('activities-edit',{
        url:'/activities/:id/edit',
        templateUrl:'partials/activities/edit.html',
        controller:'EditActivityController'
    }).state('user-login',{
    	url:'/login',
    	templateUrl:'partials/users/login.html',
    	controller:'LoginUserController'
    });
    $urlRouterProvider.otherwise("/activities");
}).run(function($state){
   $state.go('activities');
});
