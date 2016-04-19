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
        controller:'AddActivityController'
    }).state('activities-edit',{
        url:'/activities/:id/edit',
        templateUrl:'partials/activities/edit.html',
        controller:'EditActivityController'
    }).state('user-login',{
    	url:'/login',
    	templateUrl:'partials/users/login.html',
    	controller:'LoginUserController'
    }).state('user-register',{
      url:'/register',
      templateUrl:'partials/users/register.html',
      controller:'UserRegisterController'
    }).state('user-list',{
      url:'/users',
      templateUrl:'partials/users/list.html',
      controller:'ListUserController'
    }).state('user-profile',{
      url:'/profile',
      templateUrl:'partials/users/profile.html',
      controller:'ProfileUserController'
    }).state('user-profile',{
    	url:'/edit',
    	templateUrl:'partials/users/edit.html',
    	controller:'EditUserController'
    });
    $urlRouterProvider.otherwise("/activities");
}).run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'user-login' && next.name !== 'user-register') {
        event.preventDefault();
        $state.go('user-login');
      }
    }else{
      if (next.name === 'user-login' || next.name === 'user-register') {
        event.preventDefault();
        $state.go('user-profile');
      }
    }
  });
  $state.go('activities');
});
