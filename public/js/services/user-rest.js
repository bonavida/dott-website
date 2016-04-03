/**
 * http://usejsdoc.org/
 */
//TODO cambiarlo a user en vez de activity
angular.module('dottApp.services').factory('User',function($resource,$location){
    return $resource($location.absUrl().split("#")[0] + 'api/user/:id',{id:'@_id'},{
        update: {
          method: 'PUT'
        }
    });
});
