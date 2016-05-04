angular.module('dottApp.controllers').controller('MapController',function($scope) {
    $scope.lat;
    $scope.lng;
    $scope.status;
    var map, marker;

    $scope.init = function() {
        $scope.lat = 39.9863563;
        $scope.lng = -0.051324600000043574;
        $scope.status = 0;

        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: {
                lat: $scope.lat,
                lng: $scope.lng
            },
            zoom : 15
        });

        marker = new google.maps.Marker({
            position: {
                lat: $scope.lat,
                lng: $scope.lng
            },
            map: map,
            draggable: true
        });
    };

    var searchBox = new google.maps.places.SearchBox(document.getElementById('mapsearch'));

    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        var bounds = new google.maps.LatLngBounds();

        console.log("(" + places[0].geometry.location.lat()+ ", " + places[0].geometry.location.lng() + ")");
        latLng(places);

        bounds.extend(places[0].geometry.location);
        marker.setPosition(places[0].geometry.location);

        map.fitBounds(bounds);
        map.setZoom(15);
    });

    function latLng(places) {
        $scope.lat = places[0].geometry.location.lat();
        $scope.lng = places[0].geometry.location.lng();
        $scope.status = 1;
    }

    $scope.init();

});
