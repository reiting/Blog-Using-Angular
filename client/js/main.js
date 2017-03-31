angular.module('RachelsBlog', ['ngRoute', 'ngResource', 'RachelsBlog.controllers', 'RachelsFactory.factories', 'RachelsService.services'])
    .config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/list.html',
            controller: 'ListController'
        })
        .when('/compose', {
            templateUrl: 'views/compose.html',
            controller: 'ComposeController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UserController'
        })
        .when('/:id/update', {
            templateUrl: 'views/update.html',
            controller: 'UpdateController'
        })
        .when('/:id', {
            templateUrl: 'views/single.html',
            controller: 'SingleController'
        })
        .otherwise({
            redirectTo: '/',
        })

    }])