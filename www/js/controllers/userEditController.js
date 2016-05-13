/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('userEditController', userEditController);

function userEditController($scope, $rootScope, $http) {
    $http.get($rootScope.mainUrl + 'user/view?access-token=' + $rootScope.userData.auth_key)
            .success(function (result) {
                console.log(result);
                $rootScope.userData = result;
                $scope.edit = result;
                $scope.edit.gender = $scope.edit.gender + '';
                $scope.edit.birthday = new Date(result.birthday * 1000);
//        $scope.$apply();
            })
            .error(function (error) {
                console.log(error);
            });

    console.log('userEditController');

    $scope.send = function (form, edit) {
        edit.birthday = new Date(edit.birthday).getTime() / 1000;
        var config = {
            transformRequest: angular.identity,
            headers: {
//                'Authorization': 'Bearer ' + $rootScope.userData.auth_key,
                'Content-Type': undefined
            }
        };


        var fd = new FormData();
        var file = document.getElementById('file');
//            fd=reg;
        fd.append('imageFile', file.files[0]);
        for (var i in edit) {
            var obj = edit[i];
            fd.append(i, obj);
        }
//        console.log(fd);

        $http.post($rootScope.mainUrl + 'user/update?access-token=' + $rootScope.userData.auth_key, fd, config)
                .success(function (result) {
                    console.log(result);
                    window.location = '#/';
                })
                .error(function (error) {
                    console.log(error);
                });

    };
}