angular.module('dottApp.controllers').controller('EditActivityController',function($scope, $state, $stateParams, $timeout, ActivityService, Upload) {
    $scope.activity = {};
    $scope.map = {};
    $scope.marker = {};
    $scope.lat = undefined;
    $scope.lng = undefined;
    $scope.searchModel = {
        searchTerm: undefined
    };
    $scope.err = 2; //1 --> error, 0 --> sin errores

    $scope.updateActivity = function() {
        /** Save location info */
        $scope.activity.location.name = $scope.searchModel.searchTerm;
        $scope.activity.location.coords = {
            lat: $scope.lat,
            lng: $scope.lng
        };
        ActivityService.update($scope.activity).then(function() {
			$scope.err = 0;
            $timeout(callAtTimeout, 3000);
		}).catch(function() {
			$scope.err = 1;
		});
    };

    function callAtTimeout() {
        $state.go('activities-view', {id : $scope.activity._id});
    }

    $scope.getActivity = function() {
        ActivityService.getByID($stateParams.id).then(function (activity) {
            $scope.activity = activity;
            $scope.loadLocation();
        });
    };

    $scope.loadLocation = function() {
        $scope.lat = $scope.activity.location.coords.lat;
        $scope.lng = $scope.activity.location.coords.lng;
        $scope.searchModel = {
            searchTerm: $scope.activity.location.name
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

                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({ 'latLng': place.geometry.location }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            $scope.searchModel.searchTerm = results[1].formatted_address; // details address
                            $scope.$apply();
                        }
                    }
                });

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

    $scope.file="";
    $scope.submit = function(){ //function to call on form submit
      if ($scope.actForm.file.$valid && $scope.file) { //check if from is valid
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

    $scope.getActivity();
});
