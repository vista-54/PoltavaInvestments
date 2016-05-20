/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('projectViewController', projectViewController);

function projectViewController($scope, $routeParams, $http, $rootScope, $mdDialog) {
//    $scope.isLogged = $rootScope.isLogged;
    /*ROOT START*/
    $scope.Math = $rootScope.Math;
    $scope.date = $rootScope.date;
    $scope.contertToDate = $rootScope.contertToDate;
    /*ROOT END*/

    $scope.isLogged = $rootScope.isLogged;
    $scope.id = $routeParams.projectId;
    console.log($scope.id);
    $scope.loadComments = function () {
        $http.get($rootScope.mainUrl + 'comment/view-comment-for-project?id_project=' + $scope.id + '&default_page_size=10&order_attr=date&sort=desc&page=1')
                .success(function (result) {
                    $scope.comments = result.comment;
                    $scope.page = result.page;

//                    for(var i in $scope.comments){
//                        var obj=$scope.comments[i];
////                        var obj.
//                    }
                    console.log(result);
                })
                .error(function (error) {
                    console.log(error);
                });
    };
    $scope.sendComment = function (text, id) {
        var data = {
            id_project: id,
            comment: text
        };
        $http.post($rootScope.mainUrl + 'comment/create?access-token=' + $rootScope.userData.auth_key, data)
                .success(function (result) {
                    console.log(result);
                    $scope.comment = '';
                    $scope.loadComments();
                })
                .error(function (error) {

                });
    };
    $scope.view = function (id) {
        $http.get($rootScope.mainUrl + 'project/view-one-project?id_project=' + id).success(function (result) {
            console.log(result);
            $scope.project = result;
            var red = Math.ceil($scope.project.investments * 100 / $scope.project.cost_total);
            $scope.line = {'background': '-webkit-linear-gradient(right, rgb( 218, 206, 206) ' + (100 - red) + '%, rgb(167, 204, 174)' + (100 - red) + '%)'};
//            $scope.project.release_date = new Date(result.release_date).getHours();
            $scope.Math = $rootScope.Math;
            $scope.date = $rootScope.date;
            $scope.contertToDate = $rootScope.contertToDate;
            $rootScope.headers.balance = result.my_balance.balance;
            $rootScope.headers.deducted = result.my_balance.deducted;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
                $scope.$apply();

        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.view($scope.id);


    $scope.openModal = function (project_name, count, id, $event) {
        var parentEl = angular.element(document.body);

        $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            template:
                    '<md-dialog style="width:100%;padding: 0 23px;" aria-label="List dialog">' +
                    '<div class=modalBuyHeader>' + project_name + '</div>' +
                    '  <md-dialog-content class=modalWindowBuy>' +
                    'Скільки акцій бажаєте придбати?(доступно' + count + ')' +
                    ' <br><input type="number" ng-init="c=0" min=0 max="' + count + '"ng-model="c" >' +
                    '  </md-dialog-content>' +
                    '  <md-dialog-actions>' +
                    '    <md-button ng-click="buyPart(c,' + id + ')" class="md-primary" style="color: rgb(69, 202, 97);">' +
                    '     Придбати' +
                    '    </md-button>' +
                    '  <md-dialog-actions>' +
                    '    <md-button ng-click="closeDialog()" style="color: rgb(146, 140, 140);" class="md-primary">' +
                    '     Закрити' +
                    '    </md-button>' +
                    '  </md-dialog-actions>' +
                    '</md-dialog>',
            locals: {
                items: $scope.items
            },
            controller: projectViewController
        });

    };


//    function DialogController($scope, $mdDialog, items) {
//    $scope.items = items;
    $scope.closeDialog = function () {
        $mdDialog.hide();
    };
    $scope.buyPart = function (count, id) {
//        console.log('c' + count + ' ' + id);
        var data = {
            quantity_share: count,
            id_project: id,
            type: 5
        };
        $http.put($rootScope.mainUrl + 'project/buy-part-project?access-token=' + $rootScope.userData.auth_key, data)
                .success(function (result) {
                    if (typeof result.error === 'undefined') {
                        alert(data.quantity_share + ' акцій успішно придбано');
                        $scope.view(id);
                        $scope.closeDialog();
                    }
                    else {
                        alert(result.error);
                    }
                    if (result === "NOT_INVESTOR") {
                        $rootScope.openNotInvestorModal();
                    }
                })
                .error(function (error) {
                    console.log(error);
                });
    };
//    }



}
;