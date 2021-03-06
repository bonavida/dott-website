angular.module('dottApp.controllers').controller('ViewActivityController',function($scope, $state, $stateParams, $timeout, ActivityService, AuthService, $location, $anchorScroll, socket){
    $scope.activity = {};
    // Google Maps
    $scope.lat = undefined;
    $scope.lng = undefined;
    $scope.searchModel = {
        searchTerm: undefined
    };
    //Delete activity
    $scope.user = {};
    $scope.err = 2; //0 --> No hay errores, 1 --> Hay errores, 2 --> Todavia no se ha llamado a la funcion
	$scope.msg = "";

	//Participate
	$scope.participant={};
	$scope.errPart = 2;//0 --> No hay errores, 1 --> Hay errores, 2 --> Todavia no se ha llamado a la funcion
	$scope.msgPart = "";

    // Chat
    var chat = document.getElementById('chat-wrapper');
    $scope.messages = [];
    $scope.message = {};

    $scope.getActivity = function() {
        ActivityService.getByID($stateParams.id).then(function (activity) {
            $scope.activity = activity;
            $scope.loadLocation();
        });
    };

	//Comprobar si el usuario está participando
    $scope.areYouParticipant = function(){
    	if($scope.activity.participants !== undefined){
	    	for(var i=0; i<$scope.activity.participants.length; i++){
          //console.log($scope.activity.participants[i]);
	    		if($scope.activity.participants[i].userID == $scope.user._id){
	    			return true;
	    		}
	    	}
    	}
    	return false;
    };

    $scope.stopParticipate = function(){
    	for(var i=0; i<$scope.activity.participants.length; i++){
    		if($scope.activity.participants[i].userID == $scope.user._id){
    			console.log("Primera llamada");
    			//Eliminar un elemento de un array
    			for(var j=i; j<$scope.activity.participants.length-1; j++){
    				$scope.activity.participants[j] = $scope.activity.participants[j+1];
    			}
    			$scope.activity.participants.length = $scope.activity.participants.length-1;
    			console.log($scope.activity);
    			ActivityService.stopParticipate($scope.activity);
    		}
    	}
    };

    $scope.participate = function() { //TODO
    	$scope.participant.userID = $scope.user._id;
        $scope.participant.name = $scope.user.name;
        $scope.participant.image = $scope.user.image;

        //Comprobar que quedan plazas suficientes
        if($scope.activity.participants.length < $scope.activity.maxParticipants){
        	$scope.activity.participants.push($scope.participant);
            ActivityService.participate($scope.activity);
            $scope.errPart=0;
			$scope.msgPart = "¡Participando! Estate alerta de todos los cambios que se puedan producir.";
            $location.hash('msg');
            $anchorScroll();
            $timeout(callAtTimeout, 3000);
        }else{
        	$scope.errPart=1;
			$scope.msgPart = "Lo sentimos mucho pero esta actividad ya está completa.";
            $timeout(callAtTimeout, 3000);
        }
    };

    $scope.loadLocation = function() {
        //$scope.lat = $scope.activity.location.coords.latitude;
        //$scope.lng = $scope.activity.location.coords.longitude;
        $scope.searchModel = {
            searchTerm: $scope.activity.location.name
        };
        console.log($scope.activity.location);
        $scope.map = {
            center: $scope.activity.location.coords,
            zoom: 15,
            options : {
                scrollwheel: true
            }
        };

        $scope.marker = {
            id: 0,
            coords: $scope.activity.location.coords,
            options: {
                draggable: false
            }
        };
    };

    $scope.getUser = function(){
		AuthService.getUser().then(function(user) {
			$scope.user = user;
            $scope.message.user = user.username;
		});
	};

    $scope.deleteActivity = function() {
        ActivityService.remove($stateParams.id).then(function () {
            $scope.msg = "Actividad borrada con éxito.";
            $scope.err = 0;
            $timeout(callAtDeleting, 3000);
        }).catch(function(){
        	$scope.msg = "Se ha producido un error al borrar la actividad.";
        	$scope.err = 1;
        });
    };

    function callAtTimeout() {
        $scope.errPart = 2;
    }

    function callAtDeleting() {
        $state.go('activities');
    }

    $scope.sendMessage = function() {
        //console.log($scope.activity._id);
        socket.emit('send message', { message: $scope.message, activity_id: $scope.activity._id });
        console.log($scope.message);
        $scope.message.text = "";
    };

    socket.on('get message', function(data) {
        if (data.activity_id === $scope.activity._id) {
            $scope.messages.push(data.message);
            $scope.$digest();
            chat.scrollTop = chat.scrollHeight;
        }
    });

    $scope.getActivity();
    $scope.getUser();

});
