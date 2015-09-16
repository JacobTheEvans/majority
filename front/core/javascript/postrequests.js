var app = angular.module("mainApp.posts");

app.service("getPosts",["$http", function($http) {
  this.getData = function(onSuc,onFail) {
    $http.get("http://localhost:8080/posts").then(onSuc,onFail);
  };
  this.getSpecficPost = function(token,onSuc,onFail) {
    $http.get("http://localhost:8080/posts/" + token).then(onSuc,onFail);
  };
}]);

app.service("vote", ["$http", function($http) {
  this.voteUp = function(usertoken,posttoken,onSuc,onFail) {
    var data = {
      usertoken: usertoken,
      posttoken: posttoken
    };
    $http.put("http://localhost:8080/vote/up",data).then(onSuc,onFail);
  };
  this.voteDown = function(usertoken,postToken,onSuc,onFail) {
    var data = {
      usertoken: usertoken,
      posttoken: postToken
    };
    $http.put("http://localhost:8080/vote/down",data).then(onSuc,onFail);
  }
}]);