angular.module('dottApp.services',[]).factory('Activity',function($resource,$location){
    return $resource($location.absUrl().split("#")[0] + 'api/activities/:id',{id:'@_id'},{
        update: {
          method: 'PUT'
        }
    });
});
