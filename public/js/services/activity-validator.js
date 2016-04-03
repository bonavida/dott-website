angular.module('dottApp.services').factory('ActivityValidator',function(){

return ({
  isValid: isValid,
});

  function isValid( activity ){
    if(activity.name){//TODO
      return true;
    }else{
      return false;
    }
  }

});
