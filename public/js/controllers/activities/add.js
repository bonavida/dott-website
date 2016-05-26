angular.module('dottApp.controllers').controller('AddActivityController', function($scope, $state, $uibModal, Upload, ActivityService, CategoryService, ActivityValidator, UserService, AuthService){
	$scope.activity = {
    name: "",
    description: "",
    image:   "images/default.jpg",
    location: {
      name: "",
      coords: {
          lat: "",
          lng: ""
      }
    },
    creator: {
      userID: "",
      name: "",
      image: ""
    },
    executionDate:   new Date(),
    creationDate:  new Date(),
    minParticipants: 1,
    maxParticipants: 2,
    categories: [],
    participants: [],
  };

  $scope.availableCategories = [];
  $scope.message="";
  $scope.user = {};

  //Tabs
  $scope.index=0;
  $scope.next = function() {
	  console.log($scope.actFormTab0);
	  return $scope.index+=1;
  };
  $scope.prev = function() {
	  return $scope.index-=1;
  };


  $scope.getUser = function() {
    AuthService.getUser().then(function(user) {
	  $scope.user = user;
    });
  };

	$scope.selectCategories = function(){
	  var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'addCategoryToActivityContent.html',
      controller: 'AddCategoryToActivityController',
      resolve: {
        categories: function () {
          return $scope.activity.categories;
        },
				availableCategories: function () {
          return $scope.availableCategories;
        }
      }
    });

    modalInstance.result.then(function (selectedCategories) {
      $scope.activity.categories = selectedCategories;
    });

	};


	$scope.loadCategories = function(){
		CategoryService.getAll().then(function(data) {
			$scope.availableCategories = data;
		});
	};

  $scope.save = function(){
    if (ActivityValidator.isValid( $scope.activity )) {
      /** Save activity creator info */
  	  $scope.activity.creator.userID = $scope.user._id;
  	  $scope.activity.creator.name = $scope.user.username;
  	  $scope.activity.creator.image = $scope.user.image;
      /** Save location info */
      $scope.activity.location.name = $scope.searchModel.searchTerm;
      $scope.activity.location.coords = {
        latitude: $scope.lat,
        longitude: $scope.lng
      };

      ActivityService.add($scope.activity).then(function(data) {
        $scope.message = "Actividad creada con éxito";
          $state.go("activities");
      });
    } else {
      $scope.message = "Datos inválidos";
    }
  };


  $scope.file="";
  $scope.submit = function(){ //function to call on form submit
      if ($scope.actFormTab1.file.$valid && $scope.file) { //check if from is valid
          $scope.upload($scope.file); //call upload function
      }
  };

  $scope.upload = function (file) {
      Upload.upload({
          url: 'http://localhost:3000/api/uploads', //webAPI exposed to upload the file
          data:{file:file} //pass file as data, should be user ng-model
      }).then(function (resp) { //upload function returns a promise
        console.log("....",resp);
          if(resp.data.success){ //validate success
              console.log('Success');
              $scope.activity.image = resp.data.url;
          } else {
              console.log('Error');
          }
      }, function (resp) { //catch error
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          console.log(evt);
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.progress = progressPercentage + '% subido';
      });
  };
  $scope.getUser();
	$scope.loadCategories();

  /** Google Maps */

  $scope.lat = 39.9863563;
  $scope.lng = -0.051324600000043574;
  $scope.searchModel = {
    searchTerm: ""
  };

  $scope.map = {
    center: {
      latitude: $scope.lat,
      longitude: $scope.lng
    },
    zoom: 15,
    options : {
      scrollwheel: true
    }
  };

  $scope.marker = {
    id: 0,
    coords: {
      latitude: $scope.lat,
      longitude: $scope.lng
    },
    options: {
      draggable: true
    },
    events: {
      dragend: function(marker, eventName, orignalEventArgs) {
        $scope.lat = marker.getPosition().lat();
        $scope.lng = marker.getPosition().lng();

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              $scope.searchModel.searchTerm = results[1].formatted_address; // details address
              $scope.$apply();
            }
          }
        });
      }
    }
  };

  $scope.searchbox = {
    template: 'searchbox.tpl.html',
    options: {
      autocomplete: true
    },
    events: {
      place_changed: function (searchBox) {
        var place = searchBox.getPlace();

        $scope.lat = place.geometry.location.lat();
        $scope.lng = place.geometry.location.lng();
        $scope.searchModel.searchTerm = place.name;

        $scope.map.center = {
          latitude: $scope.lat,
          longitude: $scope.lng,
        };

        $scope.map.zoom = 15;

        $scope.marker.coords = {
          latitude: $scope.lat,
          longitude: $scope.lng,
        };
      }
    },
    parentdiv: 'searchBoxParent'
  };

}).controller('AddCategoryToActivityController', function($scope, $uibModalInstance, categories, availableCategories){
	$scope.selectedCategories = categories;
	$scope.availableCategories = availableCategories;


	$scope.addCategory = function(category){
		for(var i = 0; i<$scope.availableCategories.length; i++){
			var value = $scope.availableCategories[i];
			if(value._id == category._id){
				$scope.availableCategories.splice(i, i+1);
				$scope.selectedCategories.push(category);
				break;
			}
		}
	};

	$scope.removeCategory = function(category){
		for(var i = 0; i<$scope.selectedCategories.length; i++){
			var value = $scope.selectedCategories[i];
			if(value._id == category._id){
				$scope.selectedCategories.splice(i, i+1);
				$scope.availableCategories.push(category);
				break;
			}
		}
	};

  $scope.ok = function () {
    $uibModalInstance.close($scope.selectedCategories);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
