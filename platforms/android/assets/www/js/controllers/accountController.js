/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller('accountController', accountController);
function accountController($scope, $rootScope, $http) {
    $scope.toggleRight = $rootScope.toggleRight;
    $scope.comparison = function (f_d) {
        if (f_d === null) {
            return true;
        }
        var currDate = new Date().getTime() / 1000;
        if (parseInt(f_d) > currDate) {
            return true;
        }
        else {
            return false;
        }

    };
    $scope.contertToDate = function (date) {
        var d = new Date(date * 1000);
        var curr_date = d.getDate() / 10 >= 1 ? d.getDate() : '0' + d.getDate();
        var curr_month = (d.getMonth() + 1) / 10 >= 1 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
        var curr_year = d.getFullYear();
        var hour = d.getHours() / 10 >= 1 ? d.getHours() : '0' + d.getHours();
        var min = d.getMinutes() / 10 >= 1 ? d.getMinutes() : '0' + d.getMinutes();
        return curr_date + '/' + curr_month + '/' + curr_year + ' ' + hour + ':' + min;
    };
    $scope.projects = [];
    $scope.data = {
        size: 10,
        order_attr: 'id_project',
        sort: 'asc',
        page: 1
    };
    $scope.getList = function () {
        $('.loading').show();
        $http.get($rootScope.mainUrl + 'project/view-my-investment?default_page_size=' + $scope.data.size + '&order_attr=' + $scope.data.order_attr + '&sort=' + $scope.data.sort + '&page=' + $scope.data.page + '&access-token=' + $rootScope.userData.auth_key)
                .success(function (result) {
                    $('.loading').hide();
                    console.log(result);
                    $scope.projects = $scope.projects.concat(result.my_projects.result);
                    $scope.balance = result.my_balance;
                    $rootScope.headers.balance = result.my_balance.balance;
                    $rootScope.headers.deducted = result.my_balance.deducted;


                    $scope.data.page++;
                    if ($scope.data.page <= result.my_projects.pages) {
                        $scope.LoadMoreProjects = true;
                    }
                    else {
                        $scope.LoadMoreProjects = false;
                    }

                })
                .error(function (error) {
                    console.log(error);
                });
    };
    $scope.sell = function (account, id) {
        if (typeof account === 'undefined') {
            alert("Поле кількості заповнено не коректно");
            return false;
        }
        var data = {
            quantity_share: account.my_quantity,
            id_project: id,
            type: 6
        };
        $http.put($rootScope.mainUrl + 'project/buy-part-project?&access-token=' + $rootScope.userData.auth_key, data)
                .success(function (result) {
                    if (typeof result.error === 'undefined') {
                        console.log(result);
                        $scope.data.page = 1;
                        $scope.projects = [];
                        $scope.getList();
                        alert('Акції успішно продано');
//                        $scope.transaction();

                    }
                    else {
                        alert('Не можна продати більше акцій ніж у вас є');
                    }
                })
                .error(function (error) {
                    console.log(error);
                });
    };
    $scope.buy = function (account, id) {
        if (typeof account === 'undefined') {
            alert("Поле кількості заповнено не коректно");
            return false;
        }
        var data = {
            quantity_share: account.my_quantity,
            id_project: id,
            type: 5
        };
        $http.put($rootScope.mainUrl + 'project/buy-part-project?&access-token=' + $rootScope.userData.auth_key, data)
                .success(function (result) {
                    if (typeof result.error === 'undefined') {
                        console.log(result);
                        $scope.data.page = 1;
                        $scope.projects = [];
                        $scope.getList();
//                        $scope.transaction();
                    }
                    else {
                        alert('Не можна придбати більше акцій, ніж є в наявності');
                    }


                })
                .error(function (error) {
                    alert('Не можна придбати більше акцій, ніж є в наявності');
                });
    };
    $scope.getList();
    $scope.LoadMore = true;
    $scope.transct = {
        default_page_size: 10,
        order_attr: 'date',
        sort: 'DESC',
        page: 1
    };
    $scope.tranzactions = [];
//                .concat(data.project)
    $scope.transaction = function (loadMore) {
        $('.loading').show();
        $http.get($rootScope.mainUrl + 'transaction/view-by-user?default_page_size=' + $scope.transct.default_page_size + '&order_attr=' + $scope.transct.order_attr + '&sort=' + $scope.transct.sort + '&page=' + $scope.transct.page + '&access-token=' + $rootScope.userData.auth_key)
                .success(function (result) {
                    $('.loading').hide();
                    $scope.pages = result.pages;
                    if (loadMore) {
                        $scope.transct.page++;
                    }
                    else {
                        $scope.tranzactions = [];
                        $scope.transct.page = 1;
                    }
                    $scope.tranzactions = $scope.tranzactions.concat(result.transaction);
                    console.log(result);

                    if ($scope.transct.page <= $scope.pages) {
                        $scope.LoadMore = true;
                    }
                    else {
                        $scope.LoadMore = false;
                    }
                })
                .error(function (error) {
                    console.log(error);
                });
    };
//    $scope.transaction();
    $scope.OpenInfo = $rootScope.OpenInfo;
}

