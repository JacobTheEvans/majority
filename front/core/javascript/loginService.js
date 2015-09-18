"use strict";
var app = angular.module("mainApp");

app.service("login",["$http", function($http) {
  this.requestLogin = function(username,isSuc,isFail) {
    var item = {
      username: username,
    };
    $http.post("http://localhost:8080/login",item).then(isSuc,isFail);
  };
  this.requestLogout = function(usertoken,isSuc,isFail) {
    var item = {
      usertoken: usertoken
    };
    $http.post("http://localhost:8080/logout",item).then(isSuc,isFail);
  };
}]);

app.service("logout",["$http", function($http) {

}]);
