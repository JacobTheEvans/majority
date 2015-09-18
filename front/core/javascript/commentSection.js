"use strict";
var app = angular.module("mainApp.commentSection",["ngRoute","ngCookies"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/post/:_id", {
    templateUrl: "core/templates/comment.tpl.html",
    controller: "commentController"
  });
}]);

app.controller("commentController", ["$scope", "$routeParams", "getPosts", "postComment", "$cookies", "vote", function($scope, $routeParams, getPosts, postComment, $cookies, vote){
  $scope._id = $routeParams._id;
  $scope.setData = function(response) {
    var formattedData = response.data;
    for(var i = 0; i < formattedData.comments.length; i++) {
      formattedData.comments[i].totalvotes = formattedData.comments[i].upvotes.length - formattedData.comments[i].downvotes.length;
    }
    $scope.post = formattedData;
  };
  $scope.logError = function(response) {
    console.log(response.data);
  };
  $scope.refresh = function() {
    getPosts.getSpecficPost($scope._id,$scope.setData,$scope.logError);
  };
  $scope.postComment = function() {
    if($cookies.get("UserToken")) {
      postComment.postComment($cookies.get("UserToken"),$scope._id,$scope.commentText,$scope.refresh,$scope.logError);
    } else {
      alert("Must be logged in to comment");
    }
  };
  $scope.upvote = function(posttoken) {
    if($cookies.get("UserToken")) {
      vote.voteUpComment($cookies.get("UserToken"),posttoken,$scope.refresh,$scope.logError);
    } else {
      alert("Must be logged in to vote");
    }
  };
  $scope.downvote = function(posttoken) {
    if($cookies.get("UserToken")) {
      vote.voteDownComment($cookies.get("UserToken"),posttoken,$scope.refresh,$scope.logError);
    } else {
      alert("Must be logged in to vote");
    }
  };
  getPosts.getSpecficPost($scope._id,$scope.setData,$scope.logError);
}]);
