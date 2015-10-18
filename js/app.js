/**
 * Created by Raktos on 10/17/2015.
 */
var app = angular.module('uniApp', []);




app.controller("MainCtrl", function($scope) {

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

    function addMessage(target, body, uid) {
        fireBase.child(target + '/messages').push({uid : uid, body : body});
    }

    function createMessageGroup(participants) {
        //work in progress...
    }
    
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
            $scope.uid = authData.uid;
            // gather Firebase information from user info 
            // load up news feed information with major, name, university
            
            peopleFirebase.child($scope.uid).on('value', function(snapshot) {
                console.log(snapshot.val());
                var userInformation = snapshot.val();
                $scope.name = userInformation.name;
                $scope.major = userInformation.major;
                $scope.school = userInformation.school;
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





























