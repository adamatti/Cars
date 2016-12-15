angular.module('app', ['ngResource','ngRoute','ngSanitize'])
.config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when('/home',  { templateUrl: 'templates/home.html', controller: 'mainCtrl'})
        .otherwise({redirectTo: '/home'});
}])
.factory('Rows', ['$resource',function($resource){
    return $resource("/rows");
}])

.controller('mainCtrl', function($scope,Rows,$routeParams){
    $scope.rows = Rows.query($routeParams);
    $scope.search = {}
    $scope.columns = ["ano","valor","portas","marca","modelo","versao","combustivel",,"estado","cidade","cor","source"]

    $scope.predicate=''; //Sort field
    $scope.reverse=false;

    $scope.doSort = function (col){
        $scope.reverse = !$scope.reverse;
        $scope.predicate = col;
    }
})
;
