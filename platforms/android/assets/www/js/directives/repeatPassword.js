/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.directive("repeatPassword", function () {
    return {
        restrict: 'A',
        require: "ngModel",
        scope: {
            originalPassword: '=originalPassword'
        },
        link: function (scope, element, attrs, ngModel) {
            ngModel.$validators.repeat = function (modelValue) {
                return modelValue == scope.originalPassword;
            };
            scope.$watch("originalPassword", function () {
                ngModel.$validate();
            });
        }
    };
});