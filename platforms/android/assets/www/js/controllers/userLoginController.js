/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('userLoginController', userLoginController);

function userLoginController($scope, $rootScope, $http) {
        /**/
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
    $scope.login = function (form, user) {
        if (form.$valid) {
            console.log(user);
            var data = {
//                email: user.login,
                email: 'vista545457@gmail.com',
//                password: user.password
                password: '111111'
            };
            $http.post($rootScope.mainUrl + 'site/login', data, {'Content-Type': 'application/json;charset=UTF-8'})
                    .success(function (result) {
                        $rootScope.userData = result;
                        $rootScope.isLogged = true;
                        var red = (result.deducted * 100) / (parseFloat(result.balance) + parseFloat(result.deducted));
                        $scope.line = {'background': '-webkit-linear-gradient(right, rgb( 218, 206, 206) ' + red + '%, rgb(167, 204, 174)' + red + '%)'};
                        //Blobal data in a header app

                        $rootScope.headers = {
                            balance: result.balance,
                            deducted: result.deducted,
                            line: $scope.line
                        };
                        window.localStorage['isLogged'] = true;
                        window.location = '#/';
                        console.log($rootScope.userData);
                    })
                    .error(function (error) {
                        console.log(error);
                    });
        }
    };
}