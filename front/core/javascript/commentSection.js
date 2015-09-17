"use strict";
var app = angular.module("mainApp.commentSection",["ngRoute","ngCookies"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/post/:token", {
    templateUrl: "core/templates/comment.tpl.html",
    controller: "commentController"
  });
}]);

app.controller("commentController", ["$scope", "$routeParams", "getPosts", "postComment", "$cookies", function($scope, $routeParams, getPosts, postComment, $cookies){
  $scope.token = $routeParams.token;
  $scope.setData = function(response) {
    $scope.post = response.data;
    console.log(response.data);
  };
  $scope.logError = function(response) {
    console.log(response.body);
  };
  $scope.postComment = function() {
    if($cookies.get("UserToken")) {
      postComment.postComment($cookies.get("UserToken"),$scope.token,$scope.commentText);
    } else {
      alert("Must be logged in to comment");
    }
  };
  getPosts.getSpecficPost($scope.token,$scope.setData,$scope.logError);
}]);
