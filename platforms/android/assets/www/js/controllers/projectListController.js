/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller('projectListController', projectListController);
function projectListController($http, $scope, $rootScope)
{
    $scope.toggleRight = $rootScope.toggleRight;
    $scope.isOpenRight = $rootScope.isOpenRight;
    $scope.getLine = function (percent) {
        return    $scope.line = {'background': '-webkit-linear-gradient(right, rgb( 163, 234, 108) ' + (100 - percent) + '%, rgb(47, 224, 44)' + (100 - percent) + '%)'};

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
}


