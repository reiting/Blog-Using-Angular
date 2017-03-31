angular.module('RachelsFactory.factories', [])
    .factory('UserFactory', ['$resource', function($resource) {
        return $resource('http://localhost:3000/api/users/:id', { id: '@id'}, {
            
        })
    }])
    .factory('CategoryFactory', ['$resource', function($resource) {
        return $resource('http://localhost:3000/api/categories/:id', { id: '@id'}, {
        })
    }])
    .factory('PostFactory', ['$resource', function($resource) {
        return $resource('http://localhost:3000/api/posts/:id', { id: '@id'}, {
            'get': { method: "GET" },
            'update': { method: "PUT"},
            'post': { method: "POST" },
        })
    }])
