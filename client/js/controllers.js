angular.module('RachelsBlog.controllers', [])

    .controller('ListController', ['$scope', '$http', 'PostFactory', '$location', 'SEOService',
        function ($scope, $http, PostFactory, $location, SEOService) {
            $scope.blogposts = PostFactory.query();
            $scope.goToSinglePost = function (id) {
                $location.path('/' + id);
            }
            $scope.goToCompose = function () {
                $location.path('/compose');
            }
            $scope.goToLogin = function () {
                $location.path('/login');
            }

            $scope.donate = function() {
                $location.path('/donations');
            }

            SEOService.setSEO({
                title: 'Main Page',
                image: 'http://' + $location.host(),
                url: $location.url(),
                description: 'A list of all my posts'
            });

        }])

    .controller('CategoryController', ['$scope', '$http', 'CategoryFactory', 'SEOService',
        function ($scope, $http, CategoryFactory, SEOService) {

            $scope.categories = CategoryFactory.query();
        }])

    .controller('ComposeController', ['$scope', '$http', 'UserFactory', 'CategoryFactory', 'PostFactory', '$location', 'SEOService',
        function ($scope, $http, UserFactory, CategoryFactory, PostFactory, $location, SEOService) {

            $scope.users = UserFactory.query();

            $scope.categories = CategoryFactory.query();

            $scope.savePost = function () {
                var newPost = new PostFactory({
                    title: $scope.title,
                    content: $scope.content,
                    // userid: $scope.userid,
                    categoryid: $scope.catID,
                    userid: Number($('#user-selector').val()),
                    // categoryid: Number($('#cat-selector').val())

                });
                newPost.$save(function (success) {
                    $location.path('/');
                });
            }

            SEOService.setSEO({
                title: 'Compose a Post',
                image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
                url: $location.url(),
                description: 'Compose page'
            });

        }])

    .controller('SingleController', ['$scope', '$http', 'UserFactory', 'CategoryFactory', 'PostFactory', '$location', '$routeParams', 'SEOService',
        function ($scope, $http, UserFactory, CategoryFactory, PostFactory, $location, $routeParams, SEOService) {
            var id = $routeParams.id;
            PostFactory.get({ id: $routeParams.id }, function (success) {
                $scope.singleblog = success;
            }, function (err) {
                console.log(err);
            });

            $scope.goToEdit = function () {
                $location.path('/' + id + '/update');
            }

            $scope.deletePost = function () {
                $scope.singleblog.$delete(function () {
                    $location.path('/');
                })
            }

            $scope.goBack = function () {
                $location.path('/');
            }

            SEOService.setSEO({
                title: 'Single Post Page',
                image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
                url: $location.url(),
                description: 'A description of this page'
            });

        }])

    .controller('UpdateController', ['$scope', '$http', 'UserFactory', 'CategoryFactory', 'PostFactory', '$location', '$routeParams', 'SEOService',
        function ($scope, $http, UserFactory, CategoryFactory, PostFactory, $location, $routeParams, SEOService) {

            $scope.users = UserFactory.query();

            $scope.categories = CategoryFactory.query();

            PostFactory.get({ id: $routeParams.id }, function (success) {
                $scope.singleblog = success;
                $scope.selCat = success.categoryid;
            })

            $scope.updatePost = function () {
                $scope.singleblog.categoryid = $scope.selCat;
                $scope.singleblog.$update(function (success) {
                    $location.path('/' + $routeParams.id);
                })
            }

            SEOService.setSEO({
                title: 'Update Page',
                image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
                url: $location.url(),
                description: 'You can update a post here'
            });

        }])
    .controller('UserController', ['$scope', 'UserFactory', 'UserService', '$location', 'SEOService',
        function ($scope, UserFactory, UserService, $location, SEOService) {
            UserService.requireLogin(true);
            $scope.users = UserFactory.query();

            $scope.goToSingleUser = function (id) {
                $location.path('/users/' + id);
            }

            $scope.createUser = function () {
                var newUser = new UserFactory({
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    email: $scope.email,
                    role: $scope.role,
                    password: $scope.password

                });
                newUser.$save(function (success) {
                    // $location.path('/login');
                    $scope.users = UserFactory.query();
                });
            }

            $scope.logout = function () {
                UserService.logout().then(function () {
                    $location.path('/');
                }), function (err) {
                    console.log(err);
                }
            }

            SEOService.setSEO({
                title: 'User Management Page',
                image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
                url: $location.url(),
                description: 'Manage users here'
            });

        }])

    .controller('SingleUserController', ['$scope', 'UserFactory', 'UserService', '$routeParams', '$location', 'SEOService',
        function ($scope, UserFactory, UserService, $routeParams, $location, SEOService) {
            var id = $routeParams.id;

            UserFactory.get({ id: $routeParams.id }, function (success) {
                UserService.isAdmin($scope.role);
                $scope.singleuser = success;
                console.log($scope.singleuser);
            }, function (err) {
                console.log(err);
            });

            $scope.deleteUser = function (id) {
                UserService.isAdmin($scope.role);
                $scope.singleuser.$delete(function () {
                    $location.path('/');
                })
            }
            $scope.goToUpdateUser = function () {
                $location.path('/users/' + id + '/update')
            }

            SEOService.setSEO({
                title: 'Single User',
                image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
                url: $location.url(),
                description: 'Manage your single user here'
            });

        }])
    .controller('UpdateUserController', ['$scope', 'UserFactory', 'UserService', '$routeParams', '$location', 'SEOService',
        function ($scope, UserFactory, UserService, $routeParams, $location, SEOService) {
            UserService.isAdmin($scope.role);
            UserFactory.get({ id: $routeParams.id }, function (success) {
                $scope.singleuser = success;
                console.log($scope.singleuser);
            })

            $scope.updateUser = function () {
                $scope.singleuser.$update(function (success) {
                    $location.path('/users');
                })
            }

            SEOService.setSEO({
                title: 'Update User',
                image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
                url: $location.url(),
                description: 'Update your user here'
            });

        }])

    .controller('DonationController', ['$scope', '$http', function ($scope, $http) {
        $scope.processPayment = function() {
            Stripe.card.createToken({
                number: $scope.cardNumber,
                cvc: $scope.cvc,
                exp_month: $scope.expMonth,
                exp_year: $scope.expYear
            }, function(status, response) {
                if(response.error) {
                    console.log(response.error);
                    alert("There was a problem");
                } else {
                    var token = response.id;
                    $http({
                        method: 'POST',
                        url: 'http://localhost:3000/api/donations',
                        data: {
                            token: token,
                            amount: 600
                        }
                    }).then(function() {
                        alert('Payment Successful');
                    }, function() {
                        alert('Payment Not Successful');
                    })
                }
            })
        }
    }])
    .controller('LoginController', ['$scope', '$location', 'UserService', 'SEOService',
        function ($scope, $location, UserService, SEOService) {
            UserService.me().then(function (success) {
                redirect();
            })
            function redirect() {
                var dest = $location.search().p;
                if (!dest) { dest = '/users'; }
                $location.path(dest).search('p', null);
            }
            $scope.login = function () {
                UserService.login($scope.email, $scope.password)
                    .then(function () {
                        redirect();
                    }), function (err) {
                        console.log(err);
                    }
            }

            SEOService.setSEO({
                title: 'Login',
                image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
                url: $location.url(),
                description: 'Login'
            });



        }]);
