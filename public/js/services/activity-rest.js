angular.module('dottApp.services').factory('ActivityService', function($http, $q, $location){

  var base_url = $location.absUrl().split("#")[0];

  function getAll(){
    var request = $http.get(base_url + 'api/activities');
    return( request.then( handleSuccess, handleError ) );
  }

  function getByID(id){
    var request = $http.get(base_url + 'api/activities/'+id);
    return( request.then( handleSuccess, handleError ) );
  }

  function add(activity){
    var request = $http.post(base_url + 'api/activities', activity);
    return( request.then( handleSuccess, handleError ) );
  }

  function update(activity){
    var request = $http.put(base_url + 'api/activities/'+activity._id, activity);
    return( request.then( handleSuccess, handleError ) );
  }

  function remove(id){
    var request = $http.delete(base_url + 'api/activities/'+id);
    return( request.then( handleSuccess, handleError ) );
  }

  function participate(activity){//TODO
	var request = $http.put(base_url + 'api/activities/'+activity._id+'/participate', activity);
	return( request.then( handleSuccess, handleError ) ); 
  }
  
  function stopParticipate(activity){
	console.log("Segunda llamada", activity);
	var request = $http.put(base_url + 'api/activities/'+activity._id+'/stopParticipate', activity);
	console.log("Luego?");
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
    getAll    		: getAll,
    getByID   		: getByID,
    add       		: add,
    update    		: update,
    remove    		: remove,
    participate		: participate,
    stopParticipate	:stopParticipate,
  });
});
