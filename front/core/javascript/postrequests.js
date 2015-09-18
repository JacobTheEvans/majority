var app = angular.module("mainApp.posts");

app.service("getPosts",["$http", function($http) {
  this.getData = function(onSuc,onFail) {
    $http.get("http://localhost:8080/posts").then(onSuc,onFail);
  };
  this.getSpecficPost = function(token,onSuc,onFail) {
    $http.get("http://localhost:8080/posts/" + token).then(onSuc,onFail);
  };
}]);

app.service("postComment",["$http", function($http) {
  this.postComment = function(usertoken,_id,text,onSuc,onFail) {
    var data = {
      usertoken: usertoken,
      text: text
    };
    $http.post("http://localhost:8080/postcomment/" + _id ,data).then(onSuc,onFail);
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
  this.voteDown = function(usertoken,posttoken,onSuc,onFail) {
    var data = {
      usertoken: usertoken,
      posttoken: posttoken
    };
    $http.put("http://localhost:8080/vote/down",data).then(onSuc,onFail);
  };
  this.voteUpComment = function(usertoken,posttoken,onSuc,onFail) {
    var data = {
      usertoken: usertoken,
      posttoken: posttoken
    };
    $http.put("http://localhost:8080/votecomment/up",data).then(onSuc,onFail);
  };
  this.voteDownComment = function(usertoken,posttoken,onSuc,onFail) {
    var data = {
      usertoken: usertoken,
      posttoken: posttoken
    };
    $http.put("http://localhost:8080/votecomment/down",data).then(onSuc,onFail);
  };
}]);
