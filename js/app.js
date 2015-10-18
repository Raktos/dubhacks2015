/**
 * Created by Raktos on 10/17/2015.
 */
var app = angular.module('uniApp', []);




app.controller("MainCtrl", function($scope) {

    var fireBase = new Firebase('https://uni-app.firebaseio.com');
    var peopleFirebase = new Firebase('https://uni-app.firebaseio.com/people');
    var originalPostFirebase = new Firebase('https://uni-app.firebaseio.com/messages/group/originalPost');
    var replyPostFirebase = new Firebase('https://uni-app.firebaseio.com/messages/group/replyPost');
    var personalMessageFirebase = new Firebase('https://uni-app.firebaseio.com/messages/personal');

    // raktos35@gmail.com
    $scope.userEmail = "";
    $scope.password = "";
    $scope.name = "";
    $scope.major = "";
    $scope.school = "";
    $scope.login = false;

    // perform a get request to authenticate the user
    // will make a get request to using the userEmail and the password
    // gathers all the user information 
    $scope.login = function() {
        fireBase.authWithPassword({
            email : $scope.userEmail,
            password : $scope.password
        }, authHandler);
    };

    $scope.postMessage = function() {
        // var messageFirebase
    };



    
    // needs to load up the news feed data
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


});


/*
People list:
major
name
university 
graduation year
list of classes 
classes
*/





























