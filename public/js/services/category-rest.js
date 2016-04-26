angular.module('dottApp.services').factory('CategoryService', function($http, $q, $location){

  var base_url = $location.absUrl().split("#")[0];

  function getAll(){
    var request = $http.get(base_url + 'api/categories');
    return( request.then( handleSuccess, handleError ) );
  }

  function getByID(id){
    var request = $http.get(base_url + 'api/categories/'+id);
    return( request.then( handleSuccess, handleError ) );
  }

  function add(category){
    var request = $http.post(base_url + 'api/categories', category);
    return( request.then( handleSuccess, handleError ) );
  }

  function update(category){
    var request = $http.put(base_url + 'api/categories/'+category._id, category);
    return( request.then( handleSuccess, handleError ) );
  }

  function remove(){
    var request = $http.delete(base_url + 'api/categories/'+id);
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
    getAll    : getAll,
    getByID   : getByID,
    add       : add,
    update    : update,
    remove    : remove
  });
});
