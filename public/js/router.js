angular.module('dottApp').config(function($stateProvider,$routeProvider, $urlRouterProvider){

    $stateProvider
      .state('activities',{
        url:'/activities',
        templateUrl:'partials/activities/list.html',
          controller:'ListActivityController'
      }).state('adminActivities',{
        url:'/manage-activities',
        templateUrl:'partials/activities/adminList.html',
        controller:'ManageActivitiesController'
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
    }).state('activities-remove',{
        url:'/activities/:id/remove',
        templateUrl:'partials/activities/remove.html',
        controller:'RemoveActivityController'
    }).state('map',{
        url:'/map',
        templateUrl:'partials/activities/map.html',
        controller:'MapController'
    }).state('user-login',{
    	url:'/login',
    	templateUrl:'partials/users/login.html',
    	controller:'LoginUserController'
    }).state('user-register',{
      url:'/register',
      templateUrl:'partials/users/register.html',
      controller:'UserRegisterController'
    }).state('user-remove',{
      url:'/users',
      templateUrl:'partials/users/remove.html',
      controller:'RemoveUserController'
    }).state('user-list',{
      url:'/users',
      templateUrl:'partials/users/list.html',
      controller:'ListUserController'
    }).state('manage-users',{
      url:'/users',
      templateUrl:'partials/users/adminList.html',
      controller:'ManageUsersController'
    }).state('public-profile',{
      url:'/users/:id/profile',
      templateUrl:'partials/users/public-profile.html',
      controller:'PublicProfileUserController'
    }).state('user-profile',{
      url:'/profile',
      templateUrl:'partials/users/profile.html',
      controller:'ProfileUserController'
    }).state('user-edit',{
    	url:'/profile/update',
    	templateUrl:'partials/users/edit.html',
    	controller:'EditUserController'
    }).state('user-edit-pwd',{
    	url:'/profile/update/pwd',
    	templateUrl:'partials/users/edit-pwd.html',
    	controller:'EditPwdUserController'
    }).state('user-delete',{
    	url:'/profile/delete',
    	templateUrl:'partials/users/delete.html',
    	controller:'DeleteUserController'
    }).state('category-add',{
    	url:'/categories/new',
    	templateUrl:'partials/categories/add.html',
    	controller:'AddCategoryController'
    }).state('category-edit',{
    	url:'/categories/:id/edit',
    	templateUrl:'partials/categories/edit.html',
    	controller:'EditCategoryController'
    }).state('categories',{
    	url:'/categories',
    	templateUrl:'partials/categories/list.html',
    	controller:'ListCategoryController'
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
