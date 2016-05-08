angular.module('dottApp.controllers').controller('MapController',function($scope) {
    $scope.lat = "39.9863563";
    $scope.lng = "-0.051324600000043574";

    $scope.map = {
		center: {
			latitude: 39.9863563,
			longitude: -0.051324600000043574
		},
		zoom: 12,
		options : {
			scrollwheel: true
		}
	};

	$scope.marker = {
		id: 0,
		coords: {
			latitude: 39.9863563,
			longitude: -0.051324600000043574
		},
		options: {
			draggable: true
		}
	};

    $scope.searchbox = {
        template:'searchbox.tpl.html',
        options: {
            autocomplete: true
        },
        events: {
            place_changed: function (searchBox) {
                var place = searchBox.getPlace();

                $scope.lat = place.geometry.location.lat();
                $scope.lng = place.geometry.location.lng();

                $scope.map.center = {
                    latitude: $scope.lat,
                    longitude: $scope.lng,
                };

                $scope.marker.coords = {
                    latitude: $scope.lat,
                    longitude: $scope.lng,
                };


            }
        }
    };

});
