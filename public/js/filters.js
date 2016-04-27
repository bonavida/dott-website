angular.module('dottApp.filters')

.filter('breakFilter', function () {
    return function (text) {
        return text ? text.replace(/\n/g, '<br />') : '';
    };
});
