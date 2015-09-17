"use strict";
var app = angular.module("mainApp.posts",["ngRoute","ngCookies"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/home", {
    templateUrl: "core/templates/home.tpl.html",
    controller: "postController"
  });
}]);

app.controller("postController", ["$scope", "getPosts", "vote", "$cookies", function($scope,getPosts,vote,$cookies) {
  $scope.setData = function(response) {
    console.log(response.data);
    $scope.posts = response.data;
  }
  $scope.logError = function(response) {
    console.log(response.data);
  }
  $scope.refresh = function(response) {
    getPosts.getData($scope.setData,$scope.logError);
  };
  $scope.upvote = function(posttoken) {
    if($cookies.get("UserToken")) {
      vote.voteUp($cookies.get("UserToken"),posttoken,$scope.refresh,$scope.logError);
    } else {
      alert("Must be logged in to vote");
    }
  };
  $scope.downvote = function(posttoken) {
    if($cookies.get("UserToken")) {
      vote.voteDown($cookies.get("UserToken"),posttoken,$scope.refresh,$scope.logError);
    } else {
      alert("Must be logged in to vote");
    }
  };
  getPosts.getData($scope.setData,$scope.logError);
}])
