angular.module('RachelsBlog.controllers', [])

    .controller('ListController', ['$scope', '$http', 'PostFactory', '$location', function($scope, $http, PostFactory, $location) {

        $scope.blogposts = PostFactory.query();

        $scope.goToSinglePost = function(id) {
            $location.path('/' + id);
        }

        $scope.goToCompose = function() {
            $location.path('/compose');
        }
    }])

    .controller('ComposeController', ['$scope', '$http', 'UserFactory', 'CategoryFactory', 'PostFactory', '$location', function($scope, $http, UserFactory, CategoryFactory, PostFactory, $location) {

        $scope.users = UserFactory.query();

        $scope.categories = CategoryFactory.query();

        $scope.savePost = function () {
            var newPost = new PostFactory({
                title: $scope.title,
                content: $scope.content,
                userid: Number($('#user-selector').val()),
                categoryid: Number($('#cat-selector').val())
                
            });
            console.log(newPost);
            newPost.$save(function (success) {
                $location.path('/');
            });
        }
    }])

    .controller('SingleController', ['$scope', '$http', 'UserFactory', 'CategoryFactory', 'PostFactory', '$location', '$routeParams', function($scope, $http, UserFactory, CategoryFactory, PostFactory, $location, $routeParams) {
        var id = $routeParams.id;
        PostFactory.get({id: $routeParams.id}, function(success) {
            $scope.singleblog = success;
        }, function(err) {
            console.log(err);
        });

        $scope.goToEdit = function() {
            $location.path('/' + id + '/update');
        }                

        $scope.deletePost = function() {
            $scope.singleblog.$delete(function() {
                $location.path('/');
            })
        }

        $scope.goBack = function() {
            $location.path('/');
        }
    }])

    .controller('UpdateController', ['$scope', '$http', 'UserFactory', 'CategoryFactory', 'PostFactory', '$location', '$routeParams', function($scope, $http, UserFactory, CategoryFactory, PostFactory, $location, $routeParams) {
        
        var id = $routeParams.id;

        
        $scope.users = UserFactory.query();

        $scope.categories = CategoryFactory.query();
        
        PostFactory.get({id: $routeParams.id}, function(success) {
            $scope.singleblog = success;
            console.log(success);
           $scope.categoryname = success.categoryname;
           console.log($scope.categoryname);
           $scope.selCat = success.categoryid;
           console.log(success.categoryid);
                })

        $scope.updatePost = function(id) {
            $scope.singleblog.categoryid = $scope.selCat;
            $scope.singleblog.$update(function(success) {
                // $scope.categoryid;
                $location.path('/' + id);
            })
        }
    }])
    .controller('UserController', ['$scope', 'UserFactory', 'UserService', function($scope, UserFactory, UserService) {
        UserService.requireLogin();
        $scope.users = User.query();
    }])

    .controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {
        UserService.me().then(function(success) {
            console.log(success);
            // redirect();
        })
        function redirect() {
            var dest = $location.search().p;
            if(!dest) { dest = '/'; } 
            $location.path(dest).search('p', null);
        }

        $scope.login = function() {
            UserService.login($scope.email, $scope.password)
            .then(function() {
                redirect();
            }), function(err) {
                console.log(err);
            }
        }
    }]);
