angular.module('RachelsService.services', [])
    .service('UserService', ['$http', '$location', function ($http, $location) {
        var user;

        this.isLoggedIn = function () {
            if (!user) {
                return false;
            } else {
                return true;
            }
        }
        this.requireLogin = function (checkAdmin) {
            if (!this.isLoggedIn()) {
                var current = $location.path();
                $location.path('/login').search('p', current);
            } else if (checkAdmin && !this.isAdmin()) {
                $location.path('/');
            }
        }
        this.isAdmin = function (role) {
            if (!user) {
                return false;
            } else {
                return user.role === "admin";
            }
        }

        this.login = function (email, password) {
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/api/users/login',
                data: { email, password }
            }).then(function (success) {
                user = success.data;
                return success.data;
            })
        };
        this.logout = function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/users/logout'
            }).then(function (success) {
                user = undefined;
            });
        }
        this.me = function () {
            if (user) { return Promise.resolve(user); }
            else {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:3000/api/users/me'
                }).then(function (success) {
                    user = success.data;
                    return success.data;
                });
            }
        }
    }])

    .service('SEOService', ['$rootScope', 
    function($rootScope) {
        this.setSEO = function(data) {
            $rootScope.seo = {};
            for (var p in data) {
                $rootScope.seo[p] = data[p];
            }
        }
    }]);