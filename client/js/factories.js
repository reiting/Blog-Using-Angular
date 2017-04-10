angular.module('RachelsFactory.factories', [])
    .factory('UserFactory', ['$resource', function($resource) {
        return $resource('http://localhost:3000/api/users/:id', {id: '@id'}, {
            'update': { method: 'PUT'},
        })
    }])
    .factory('CategoryFactory', ['$resource', function($resource) {
        return $resource('http://localhost:3000/api/categories/:id', {
        })
    }])
    .factory('PostFactory', ['$resource', function($resource) {
        return $resource('http://localhost:3000/api/posts/:id', { id: '@id'}, {
            'update': { method: "PUT"},
            'post': { method: "POST" },
        })
    }])
