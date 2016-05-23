/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngStorage', 'ngTouch']);
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/index', {
                    templateUrl: 'views/index.html',
                    controller: 'appController'
                })
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'appController'
                })
                .when('/login', {
                    templateUrl: 'views/user/login.html',
                    controller: 'userLoginController'
                })
                .when('/registration', {
                    templateUrl: 'views/user/registration.html',
                    controller: 'userRegistrationController'
                })
                .when('/userEdit', {
                    templateUrl: 'views/user/edit.html',
                    controller: 'userEditController'
                })
                .when('/projectList', {
                    templateUrl: 'views/project/list.html',
                    controller: 'projectListController'
                })
                .when('/projectMyList', {
                    templateUrl: 'views/project/mylist.html',
                    controller: 'projectMyListController'
                })
                .when('/project/:projectId', {
                    templateUrl: 'views/project/view.html',
                    controller: 'projectViewController'
                })
                .when('/account', {
                    templateUrl: 'views/user/account.html',
                    controller: 'accountController'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);
app.controller('appController', appController);


function appController($rootScope, $scope, $http, $timeout, $mdSidenav, $log, $mdDialog) {
    $scope.toggleRight = $rootScope.toggleRight;
    $scope.test = function () {
        console.log('test');
    }
    $rootScope.Login = function () {
        window.location = '#/login';
        $rootScope.close();
    };
    $rootScope.Registration = function () {
        window.location = '#/registration';
        $rootScope.close();
    };
    $rootScope.close = function () {
        $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
    };
    $rootScope.close();
    $rootScope.openProjectList = function () {
        window.location = '#/projectList';
        $rootScope.close();
    };
    $rootScope.openAccount = function () {
        window.location = '#/account';
        $rootScope.close();
    };

    $rootScope.getProjectList = function () {
        window.location = '#/';
        $rootScope.close();
    };
    $rootScope.openNotInvestorModal = function (project_name, count, id, $event) {
        var parentEl = angular.element(document.body);

        $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            templateUrl: 'views/help/feedbackModal.html',
            locals: {
                items: $scope.items
            },
            controller: appController
        });

    };
    $scope.closeDialog = function () {
        $mdDialog.hide();
    };
    $scope.sendFeedBack = function (form, user) {

        $http.post($rootScope.mainUrl + 'site/feed-back?access-token=' + $rootScope.userData.auth_key, user)
                .success(function (result) {
                    $scope.closeDialog();
                    alert(result.success);
                    console.log(result);
                })
                .error(function (error) {
                    console.log(error);
                });

    };
    $scope.openProjectList = $rootScope.openProjectList;
    $scope.openAccount = $rootScope.openAccount;

    /*Global functions START*/
//    $rootScope.mainUrl = 'http://invest.skrygroup.com/backend/api/web/v1/';
    $rootScope.mainUrl = 'http://poltavainvestment.com/api/web/v1/';
    /*Convert timestamp to Date custom format*/
    $rootScope.contertToDate = function (date, param) {
        //param -> time = date&time
        //null -> date without time 
        var d = new Date(date * 1000);
        var curr_date = d.getDate() / 10 >= 1 ? d.getDate() : '0' + d.getDate();
        var curr_month = (d.getMonth() + 1) / 10 > 1 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
        var curr_year = d.getFullYear();
        var hour = d.getHours() / 10 >= 1 ? d.getHours() : '0' + d.getHours();
        var min = d.getMinutes() / 10 >= 1 ? d.getMinutes() : '0' + d.getMinutes();
        if (param === 'time') {
            return curr_date + '/' + curr_month + '/' + curr_year + ' ' + hour + ':' + min;
        }
        else {
            return curr_date + '/' + curr_month + '/' + curr_year;
        }

    };
    /*timestamp to count days*/
    $rootScope.date = function (closing_date) {
        closing_date = parseInt(closing_date);
        return Math.round((new Date(closing_date * 1000) - new Date()) / 86400000);
    };
    $rootScope.Math = window.Math;
    /*Global functions END*/
    $scope.Math = $rootScope.Math;
    $scope.isLogged = $rootScope.isLogged;


//    $rootScope.mainUrl = 'http://192.168.0.12/api/web/v1/';

    //получаем рекомендованый проект.
    $http.get($rootScope.mainUrl + 'project/view-main-recommend-project').success(function (result) {
        if (typeof result === 'object') {
            $scope.isRecommended = true;
        }
        else {
            $scope.isRecommended = false;
        }
        $scope.projectRec = result;
        $scope.projectRec.percent = Math.ceil($scope.projectRec.investments * 100 / $scope.projectRec.cost_total);
        $scope.line = {'background': '-webkit-linear-gradient(right, rgb( 163, 234, 108) ' + (100 - $scope.projectRec.percent) + '%, rgb(167, 204, 174);' + (100 - $scope.projectRec.percent) + '%)'};
        console.log(result);
        $scope.date = $rootScope.date;
        $scope.contertToDate = $rootScope.contertToDate;
    }).error(function (error) {
        console.log(error);
    });
//    $scope.OpenInfo = function (id) {
//        window.location = '#/project/' + id;
//    };

    $rootScope.OpenInfo = function (id) {
        window.location = '#/project/' + id;
    };
    /*Menu START*/
    $scope.Login = $rootScope.Login;
    $scope.Registration = $rootScope.Registration;
    $scope.getProjectList = $rootScope.getProjectList;

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                    args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    $scope.buildDelayedToggler = function (navID) {
        return debounce(function () {
            $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
        }, 200);
    };

    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
        };
    }
    $scope.toggleLeft = $scope.buildDelayedToggler('left');
    $rootScope.toggleRight = buildToggler('right');
    $scope.toggleRight = $rootScope.toggleRight;
    $rootScope.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };
    $scope.isOpenRight = $rootScope.isOpenRight;
    /*Menu END*/
    /*Project list START*/
    $scope.toggleRight = $rootScope.toggleRight;
    $scope.isOpenRight = $rootScope.isOpenRight;
    $scope.getLine = function (percent) {
        return    $scope.line = {'background': '-webkit-linear-gradient(right, rgb( 163, 234, 108) ' + (100 - percent) + '%, rgb(167, 204, 174)' + (100 - percent) + '%)'};

    };
    $scope.Math = $rootScope.Math;
    $scope.date = $rootScope.date;
    $scope.contertToDate = $rootScope.contertToDate;


    $scope.projects = [];
    $scope.data = {
        default_page_size: 10,
        order_attr: 'id',
        sort: 'asc',
        page: 1
    };
    console.log('projectListController');
    $scope.getList = function (data) {
        $http.get($rootScope.mainUrl + 'project/view-all-project?default_page_size=' + data.default_page_size + '&order_attr=' + data.order_attr + '&sort=' + data.sort + '&page=' + data.page).success(function (result) {
            $scope.projects = $scope.projects.concat(result.project);
            $scope.pages = result.pages;
            console.log(result);
        }).error(function (error) {
            console.log(error);
        });
    };

    $scope.buyPart = function () {
        var data = {
            id_project: 12,
            quantity_share: 2,
            type: 6
        };
        $http.put($rootScope.mainUrl + 'project/buy-part-project?access-token=' + $rootScope.userData.auth_key, data).success(function (result) {
            console.log(result);
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.OpenInfo = $rootScope.OpenInfo;
    $scope.getList($scope.data);

    /*Project List END*/
    $rootScope.logout = function () {
        window.location = '#/';
        window.location.reload();

    };
    $rootScope.onSwipeRight = function (ev) {
        console.log('Swiped Right!');
    };
    $rootScope.someFunction = function (e) {
        if (typeof pageX !== 'undefined') {
            if (pageX < e.changedTouches[0].clientX) {
                console.log('swipe Right');
                 $rootScope.close();
                 
            }
        }

        pageX = e.changedTouches[0].clientX;
//        console.log(e);
    };
}


app.directive("scroll", function ($window, $parse) {
    return function (scope, element, attrs) {
        console.log(attrs);
//        console.log();
//        var fntct = $parse(attrs.fnct);
        angular.element($window).bind("scroll", function () {
            scope.currScroll = this.pageYOffset;
            var heightPage = angular.element(document.querySelector('ul'))[0].offsetHeight;
            //            var table=angular.element(document.querySelector('scroll'))[0].offsetHeight;
            scope.$watch('currScroll', function () {
                if ((scope.currScroll > (heightPage - (heightPage * 0.2) * scope.data.page)) && (scope.data.page < scope.pages)) {
                    scope.data.page++;
                    console.log(scope.data.page);
                    scope.getList(scope.data);
//                    fntct(scope.data);
                }
            });
            console.log(scope.currScroll);
            scope.$apply();
        });
    };
})


//app.directive("scrollTable", function ($window, $parse) {
//    return function (scope, element, attrs) {
//        console.log(attrs);
////        console.log();
////        var fntct = $parse(attrs.fnct);
//        angular.element($window).bind("scroll", function () {
//            scope.curScroll = this.pageYOffset;
//            var heightPage = angular.element(document.querySelector('table'))[0].offsetHeight;
////            var table=angular.element(document.querySelector('scroll'))[0].offsetHeight;
//            scope.$watch('curScroll', function () {
//                if ((scope.curScroll > (heightPage - (heightPage * 0.2) * scope.data.page)) && (scope.data.page < scope.pages)) {
//                    scope.data.page++;
//                    console.log(scope.data.page);
//                    scope.transaction(scope.data);
////                    fntct(scope.data);
//                }
//            });
//            console.log(scope.curScroll);
//            scope.$apply();
//        });
//    };
//});      