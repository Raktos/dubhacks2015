/**
 * Created by Raktos on 10/17/2015.
 */
var app = angular.module('uniApp', []);

app.controller("MainCtrl", function($scope) {
    $scope.firebase = new Firebase('https://uni-app.firebaseio.com/');
    $scope.email;
    $scope.password;



    // perform a get request to authenticate the user
    $scope.login = function() {

    };
});