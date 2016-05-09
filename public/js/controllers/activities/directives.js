app.directive('activityList', function() {
  return {
    restrict: 'E',
    require: '^ngCity',
    scope: {
      ngCity: '@'
    },
    template: '<div class="sparkline"><h4>Weather for </h4></div>',
    controller: ['$scope', '$http', function($scope, $http) {
      $scope.getTemp = function(city) {}
    }],
    link: function(scope, iElement, iAttrs, ctrl) {
      scope.getTemp(iAttrs.ngCity);
    }
  }
});
