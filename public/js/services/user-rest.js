angular.module('dottApp.services').factory('UserService',function($http, $q, $location) {

    var base_url = $location.absUrl().split("#")[0];

    function getByID(id) {
        var request = $http.get(base_url + 'api/users/'+ id);
        return( request.then( handleSuccess, handleError ) );
    }

    //PRIVATE METHODS
    function handleError( response ) {
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
        ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        return( $q.reject( response.data.message ) );
    }
    
    function handleSuccess( response ) {
        return( response.data );
    }

    return ({
        getByID   : getByID
    });

});
