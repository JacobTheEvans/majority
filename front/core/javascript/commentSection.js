"use strict";
var app = angular.module("mainApp.commentSection",["ngRoute","ngCookies","getPosts"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/post/:token", {
    templateUrl: "core/templates/comment.tpl.html",
    controller: "commentController"
  });
}]);


app.controller("commentController", ["$scope", "$routeParams", "getPosts", function($scope, $routeParams, getPosts){
  $scope.token = $routeParams.token;
  $scope.setData = function(response) {
    $scope.post = response.body;
  };
  $scope.logError = function(response) {
    console.log(response.body);
  };
  getPosts.getSpecficPost($scope.token,$scope.setData,$scope.logError);
}]);
