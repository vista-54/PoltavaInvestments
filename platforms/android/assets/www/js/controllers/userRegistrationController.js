/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('userRegistrationController', userRegistrationController);
function userRegistrationController($scope, $http, $rootScope) {

    $scope.registrationFnc = function (form, reg) {
        if (form.$valid) {
            reg.birthday = new Date(reg.birthday).getTime() / 1000;
            var config = {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            };


            var fd = new FormData();
            var file = document.getElementById('file');
//            fd=reg;
            fd.append('imageFile', file.files[0]);
            for (var i in reg) {
                var obj = reg[i];
                fd.append(i, obj);
            }
//            fd.append(reg);

            $http.post($rootScope.mainUrl + 'site/signup', fd, config)
                    .success(function (result) {
                        console.log(result);
                        window.location = '#/';
                    }).error(function (error) {
                console.log(error);
            });

            console.log(reg);
        }

//        console.log(model);
    };
    console.log('regCtrl');
}