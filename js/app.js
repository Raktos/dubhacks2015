/**
 * Created by Raktos on 10/17/2015.
 */
var app = angular.module('uniApp', []);

app.controller("MainCtrl", function($scope) {
    var peopleFirebase = new Firebase('https://uni-app.firebaseio.com/people');
    var originalPostFirebase = new Firebase('https://uni-app.firebaseio.com/messages/group/originalPost');
    var replyPostFirebase = new Firebase('https://uni-app.firebaseio.com/messages/group/replyPost');
    var personalMessageFirebase = new Firebase('https://uni-app.firebaseio.com/messages/personal');
    $scope.email;
    $scope.password;



    // perform a get request to authenticate the user
    $scope.login = function() {

    };

    $scope.postMessage = function() {
        var messageFirebase
    };
});