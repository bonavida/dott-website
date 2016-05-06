angular.module('dottApp.controllers').controller('MapController',function($scope) {
    // $scope.lat = 0;
    // $scope.lng = 0;
    //
    // $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
    //     center: {
    //         lat: 39.9863563,
    //         lng: -0.051324600000043574
    //     },
    //     zoom : 15
    // });
    //
    // $scope.marker = new google.maps.Marker({
    //     position: {
    //         lat: 39.9863563,
    //         lng: -0.051324600000043574
    //     },
    //     map: $scope.map,
    //     draggable: true
    // });
    //
    // var searchBox = new google.maps.places.SearchBox(document.getElementById('mapsearch'));
    //
    // google.maps.event.addListener(searchBox, 'places_changed', function() {
    //     var places = searchBox.getPlaces();
    //     var bounds = new google.maps.LatLngBounds();
    //     var place;
    //
    //     for (var i = 0; place=places[i]; i++) {
    //         bounds.extend(place.geometry.location);
    //         $scope.marker.setPosition(place.geometry.location);
    //         console.log("(" + place.geometry.location.lat()+ ", " + place.geometry.location.lng() + ")");
    //         $scope.lat = place.geometry.location.lat();
    //         $scope.lng = place.geometry.location.lng();
    //     }
    //
    //     $scope.map.fitBounds(bounds);
    //     $scope.map.setZoom(15);
    });



});
