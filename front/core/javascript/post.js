"use strict";
var app = angular.module("mainApp");

app.service("postLink",["$http", function($http) {
  this.requestPost= function(data,isSuc,isFail) {
    var item = {
      usertoken: data.usertoken,
      title: data.title,
      link: data.url,
      description: data.description
    };
    $http.post("http://localhost:8080/post",item).then(isSuc,isFail);
  };
}]);
