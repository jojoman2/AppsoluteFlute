/**
 * Created by Fredrik on 2015-04-10.
 */
var newsFeedApp = angular.module('newsFeed', ['ngRoute','mobile-angular-ui','ngResource']);

newsFeedApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'partials/list-view.html',
                controller: 'ListCtrl'
            }).
            when('/news-item/:itemId', {
                templateUrl: 'partials/detail-view.html'
            }).

            otherwise({
                redirectTo: '/home'
            });
    }
]);

google.load("feeds", "1");

