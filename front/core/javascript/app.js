"use strict";
var app = angular.module("mainApp",["ngRoute","ngCookies","mainApp.posts","mainApp.commentSection"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/", {
    redirectTo: "/home"
  })
  .otherwise({
    redirectTo: "/home"
  });
}]);

app.controller("loginController",["$scope", "login", "logout", "$cookies", function($scope,login,logout,$cookies) {
  if($cookies.get("UserToken")) {
    $scope.isLoggedIn = true;
  } else {
    $scope.isLoggedIn = false;
  }
  $scope.loginData = {};
  $scope.setUserToken = function(response) {
    if(response.data == "Username Taken") {
      alert("Username Taken");
    } else {
      var minutes = 20;
      var date = new Date();
      var expires = new Date(date.getTime() + minutes*60000);
      $cookies.put("UserToken",response.data,{expires:expires});
      $scope.isLoggedIn = true;
    }
  };
  $scope.requestFail = function(response) {
    console.log(response.data)
  };
  $scope.login = function() {
    login.requestLogin($scope.loginData.username,$scope.setUserToken,$scope.requestFail);
    $scope.loginData = {};
  };
  $scope.logout = function() {
    login.requestLogout($cookies.get("UserToken"),$scope.requestFail,$scope.requestFail);
    $scope.isLoggedIn = false;
    $cookies.remove("UserToken");
  };
}]);

app.controller("submitController", ["$scope","postLink","$cookies", "$window", function($scope,postLink,$cookies,$window) {
  $scope.newPost = {};
  $scope.sucPost = function(response) {
    $scope.newPost = {};
    $window.location.href = "/#/post/" + response.data;
  };
  $scope.requestFail = function(response) {
    alert("Post Failed");
    console.log(response.data);
  };
  $scope.postLink = function() {
    var data = {
      usertoken: $cookies.get("UserToken"),
      title: $scope.newPost.title,
      url: $scope.newPost.url,
      description: $scope.newPost.description
    };
    postLink.requestPost(data,$scope.sucPost,$scope.requestFail);
  };
}]);
