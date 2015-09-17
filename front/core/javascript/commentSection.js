"use strict";
var app = angular.module("mainApp.commentSection",["ngRoute","ngCookies"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/post/:_id", {
    templateUrl: "core/templates/comment.tpl.html",
    controller: "commentController"
  });
}]);

app.controller("commentController", ["$scope", "$routeParams", "getPosts", "postComment", "$cookies", function($scope, $routeParams, getPosts, postComment, $cookies){
  $scope._id = $routeParams._id;
  $scope.setData = function(response) {
    $scope.post = response.data;
    console.log(response.data);
  };
  $scope.logError = function(response) {
    console.log(response.data);
  };
  $scope.postComment = function() {
    if($cookies.get("UserToken")) {
      postComment.postComment($cookies.get("UserToken"),$scope._id,$scope.commentText);
    } else {
      alert("Must be logged in to comment");
    }
  };
  getPosts.getSpecficPost($scope._id,$scope.setData,$scope.logError);
}]);
