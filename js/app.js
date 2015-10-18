/**
 * Created by Raktos on 10/17/2015.
 */

var app = angular.module('uniApp', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl:'./templates/newsfeedPage.html',
                controller:"NewsfeedController"
            })
            .when('/', {
            templateUrl: './templates/loginPage.html',
            controller: "LoginController"
    });
}]);

app.service('userInformation', function() {
   var userId = '';
   var setUserId = function(id) {
       userId = id;
   };
   var getUserId = function() {
       return userId;
   };

   return {
     setUserId : setUserId,
     getUserId : getUserId
   };
});



app.controller("LoginController", ['$scope', '$location', '$timeout', function ($scope, $location, $timeout,userInformation) {
    var fireBase = new Firebase('https://uni-app.firebaseio.com');
    var peopleFirebase = new Firebase('https://uni-app.firebaseio.com/people');
    var schoolsFirebase = new Firebase('https://uni-app.firebaseio.com/schools');

    // raktos35@gmail.com
    $scope.email = "";
    $scope.password = "";
    $scope.name = "";
    $scope.major = "";
    $scope.school = "";
    $scope.year = "";
    $scope.login = false;
    $scope.major = "";
    $scope.uid = null;

    // perform a get request to authenticate the user
    // will make a get request to using the userEmail and the password
    // gathers all the user information
    $scope.login = function () {
        fireBase.authWithPassword({
            email: $scope.email,
            password: $scope.password
        }, authHandler);
    };

    $scope.register = function () {
        fireBase.createUser({
            email: $scope.email,
            password: $scope.password
        }, function (error, userData) {
            if (error) {
                alert("user creation failed " + error);
            } else {
                populateNewUser(userData);
                addUserToSchool($scope.school, $scope.year, userData.uid);
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

    $scope.addMajor = function(school, major, year, uid) {
        peopleFirebase.child(uid).child('majors').push(major);
        schoolsFirebase.child(school).child('majors').child(major).child('students').push(uid);
        schoolsFirebase.child(school).child('majors').child(major).child(year).child('students').push(uid);
    };

    function addUserToSchool(school, year, uid) {
        schoolsFirebase.child(school).child('students').push(uid);
        $scope.addMajor(school, 'general', year, uid);
    }

    // needs to load up the news feed data
    // load up a new page with the news feed information
    // group list data
    function authHandler(error, authData) {
        if (error) {
            alert("Login failed!");
            console.log("Login failed", error);
        } else {
            // $scope.login = true;
            $timeout(function() {
                $scope.currentPath = $location.path();
            }, 0);
            $location.path('/home');
            console.log("Login successful");
            console.log(authData);

            var id = authData.uid;
            userInformation.setUserId(id);
            
            /*
            // gather Firebase information from user info
            // load up news feed information with major, name, university

            peopleFirebase.child('/' + id).on('value', function (snapshot) {

            $scope.uid = authData.uid;
            // gather Firebase information from user info 
            // load up news feed information with major, name, university
            
            peopleFirebase.child($scope.uid).on('value', function(snapshot) {

                console.log(snapshot.val());
                var userInformation = snapshot.val();
                $scope.name = userInformation.name;
                $scope.major = userInformation.major;

                $scope.school = userInformation.uni;
            }, function (error) {

                $scope.school = userInformation.school;
            }, function(error) {

                console.log("Error reading data");
            });*/
        }
    }
}]);


app.controller("NewsfeedController", function($scope, userInformation) {
    console.log(userInformation.getUserId());
    $scope.uid = userInformation.getUserId();
    $scope.group = 'schools/University of Washington';
    $scope.messages = [];

    var fireBase = new Firebase('https://uni-app.firebaseio.com');
    var peopleFirebase = new Firebase('https://uni-app.firebaseio.com/people');
    var schoolsFirebase = new Firebase('https://uni-app.firebaseio.com/schools');

    //initial get messages for group
    fireBase.child($scope.group + '/messages').on('value', function(snapshot) {
        for (var message in snapshot.val()) {
            $scope.messages.push(snapshot.val()[message]);
        }
        $scope.$apply()
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    //asych update messages


    $scope.postMessage = function () {
        addMessage($scope.group, $scope.messageBody, $scope.uid)
    };

    function addMessage(target, body, uid) {
        fireBase.child(target + '/messages').push({uid : uid, body : body});
    }

    function createMessageGroup(participants) {
        //work in progress...
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





























