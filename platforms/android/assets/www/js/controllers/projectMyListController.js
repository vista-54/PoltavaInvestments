/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('projectMyListController', projectMyListController);
function projectMyListController($scope, $rootScope, $http) {
    $http.get($rootScope.mainUrl + 'project/view-my-project?default_page_size=10&order_attr=id&sort=asc&page=1&access-token=' + $rootScope.userData.auth_key)
            .success(function (result) {
                console.log(result);
            })
            .error(function (error) {
                console.log(error);
            });
}