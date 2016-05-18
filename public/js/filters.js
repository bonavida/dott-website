angular.module('dottApp.filters')

.filter('breakFilter', function () {
    return function (text) {
        return text ? text.replace(/\n/g, '<br />') : '';
    };
})
.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});
