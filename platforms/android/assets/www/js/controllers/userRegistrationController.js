/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('userRegistrationController', userRegistrationController);
function userRegistrationController($scope, $http, $rootScope, $filter) {
    $scope.choosePhoto = function () {
        $('#file').click();
    };
    $scope.registration = {};
    $scope.registration.gender = 7;
    $(window, document, undefined).ready(function () {

        $('input').blur(function () {
            var $this = $(this);
            if ($this.val())
                $this.addClass('used');
            else
                $this.removeClass('used');
        });

        var $ripples = $('.ripples');

        $ripples.on('click.Ripples', function (e) {

            var $this = $(this);
            var $offset = $this.parent().offset();
            var $circle = $this.find('.ripplesCircle');

            var x = e.pageX - $offset.left;
            var y = e.pageY - $offset.top;

            $circle.css({
                top: y + 'px',
                left: x + 'px'
            });

            $this.addClass('is-active');

        });

        $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function (e) {
            $(this).removeClass('is-active');
        });

    });
    $scope.registrationFnc = function (form, reg) {
        if (form.$valid) {
            reg.birthday = new Date(reg.birthday).getTime() / 1000;
            if (isNaN(reg.birthday)) {
                delete(reg.birthday);
            }
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
                        if (typeof result.error === 'undefined') {
                            console.log(result);
                            var loginData = {
                                login: reg['email'],
                                password: reg['password']
                            };
                            var form = {
                                $valid: true
                            };
                            $rootScope.login(form, loginData);
                            window.location = '#/';
                        }
                        else {
                            $scope.errorMsg = ($filter('translate')('Вказана адреса Ел. пошти вже зареєстрована'));
                            
                        }
                    }).error(function (error) {
                console.log(error);
            });
            console.log(reg);
        }

//        console.log(model);
    };
    console.log('regCtrl');
}