/**
 * Created by georgeyu on 10/18/15.
 */
var app = angular.module('controllers', []);

app.controller("LoginController", ['$scope', function($scope) {
    var fireBase = new Firebase('https://uni-app.firebaseio.com');
    var peopleFirebase = new Firebase('https://uni-app.firebaseio.com/people');
    var originalPostFirebase = new Firebase('https://uni-app.firebaseio.com/messages/group/originalPost');
    var replyPostFirebase = new Firebase('https://uni-app.firebaseio.com/messages/group/replyPost');
    var personalMessageFirebase = new Firebase('https://uni-app.firebaseio.com/messages/personal');

    // raktos35@gmail.com
    $scope.email = "";
    $scope.password = "";
    $scope.name = "";
    $scope.major = "";
    $scope.school = "";
    $scope.year = "";
    $scope.login = false;

    // perform a get request to authenticate the user
    // will make a get request to using the userEmail and the password
    // gathers all the user information
    $scope.login = function() {
        fireBase.authWithPassword({
            email : $scope.email,
            password : $scope.password
        }, authHandler);
    };

    $scope.postMessage = function() {
        // var messageFirebase
    };

    $scope.register = function() {
        fireBase.createUser({
            email : $scope.email,
            password : $scope.password
        }, function(error, userData) {
            if(error) {
                alert("user creation failed " + error);
            } else {
                populateNewUser(userData);
            }
        })
    };

    function populateNewUser(userData) {
        peopleFirebase.child(userData.uid).child('firstName').set($scope.firstName);
        peopleFirebase.child(userData.uid).child('lastName').set($scope.lastName);
        peopleFirebase.child(userData.uid).child('school').set($scope.school);
        peopleFirebase.child(userData.uid).child('year').set($scope.year);
        $scope.login()
    }



    // needs to load up the news feed data
    // load up a new page with the news feed information
    // group list data
    function authHandler(error, authData) {
        if (error) {
            alert("Login failed!");
            console.log("Login failed", error);
        } else {
            $scope.login = true;
            console.log("Login successful");
            console.log(authData);
            var id = authData.uid;

            // gather Firebase information from user info
            // load up news feed information with major, name, university

            peopleFirebase.child('/' + id).on('value', function(snapshot) {
                console.log(snapshot.val());
                var userInformation = snapshot.val();
                $scope.name = userInformation.name;
                $scope.major = userInformation.major;
                $scope.school = userInformation.uni;
            }, function(error) {
                console.log("Error reading data");
            });
        }
    }


}]);