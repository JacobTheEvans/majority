var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var uuid = require("uuid");
var User = require("./core/model.js").User;
var Post = require("./core/model.js").Post;
var Commment = require("./core/model.js").Commment;

mongoose.connect("mongodb://localhost/majority");

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("front"));

app.post("/login",function(req,res) {
  if(!req.body.username) {
    res.send("Username required in JSON");
  }
  User.find({username: req.body.username}, function(err, data) {
    if(err) {
      res.status(400).send(err);
    }
    if(data.length != 0) {
      res.status(200).send("Username Taken");
    } else {
      var newToken = "Token: " +  uuid.v4();
      var userData = {username: req.body.username, token: newToken};
      var newUser = new User(userData);
      newUser.save(function(err, data) {
        if(err) {
          res.status(400).send(err);
        }
        res.status(200).send(newToken);
      });
    }
  });
});

app.post("/post", function(req,res) {
  if(!req.body.usertoken) {
    res.status(400).send("UserToken required in JSON");
  }
  if(!req.body.title) {
    res.status(400).send("Title required in JSON");
  }
  if(!req.body.link) {
    res.status(400).send("Link required in JSON");
  }
  if(!req.body.description) {
    res.status(400).send("Description required in JSON");
  }
  User.findOne({token: req.body.usertoken}, function(err,data) {
    if(err) {
      res.status(400).send(err);
    }
    if(data) {
      var username = data.username;
      var newToken = "Token: " + uuid.v1();
      var newData = {
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
        author: username,
        upvotes: 0,
        downvotes: 0,
        token: newToken,
      };
      var newPost = new Post(newData);
      newPost.save(function(err,data) {
        if(err) {
          console.log(err);
          res.status(500).send(err);
        }
        if(data){
          res.status(newToken);
        }
      });
    } else {
      res.status(400).send("Usertoken not found or expired");
    }
  });
});

app.put("/vote/:_type", function(req,res) {
  var pass = true;
  if(!req.body.usertoken) {
    pass = false;
    res.status(400).send("Usertoken must be in JSON");
  }
  if(!req.body.posttoken) {
    pass = false;
    res.status(400).send("PostToken must be in JSON");
  }
  if(req.params._type != "up" && req.params._type != "down") {
    pass = false;
    res.status(400).send("URL value must be 'up' or 'down'");
  }
  if(pass) {
    User.findOne({token: req.body.usertoken}, function(err,user) {
      if(err) {
        res.status(500).send(err);
      }
      if(user) {
        Post.findOne({token: req.body.posttoken}, function(err,data) {
          if(err) {
            res.status(500).send(err);
          }
          if(data) {
            if(req.params._type == "up" && data.upvotes.indexOf(user.username) == -1) {
              console.log(user);
              data.upvotes.push(user.username);
              data.save();
              res.status(200).send(data.upvotes.length);
            } else if(req.params._type == "down" && data.downvotes.indexOf(user.username) == -1) {
              data.downvotes.push(user.username);
              data.save();
              res.status(200).send(data.downvotes.length);
            } else {
              res.status(200).send("User has already voted");
            }
          } else {
            res.status(400).send("PostToken not found or is expired");
          }
        });
      } else {
        res.status(400).send("Usertoken not found or expired");
      }
    });
  }
});

app.get("/posts", function(req,res) {
  Post.find({}, function(err,data) {
    if(err) {
      res.status(500).send(err);
    }
     if(data.length) {
      var formattedData = [];
      for(var i = 0; i < data.length; i++) {
        var newData = {
          title: data[i].title,
          link: data[i].link,
          description: data[i].description,
          author: data[i].author,
          upvotes: data[i].upvotes.length,
          downvotes: data[i].downvotes.length,
          totalvotes: data[i].upvotes.length - data[i].downvotes.length,
          comments: data[i].comments,
          token: data[i].token
        };
        formattedData.push(newData);
      }
      res.status(200).send(formattedData);
    }
  });
});

app.get("/posts/:token", function(req,res) {
  Post.findOne({token: req.params.token}, function(err,data) {
    if(err) {
      res.status(500).send(err);
    }
     if(data) {
       var formattedData = {
         title: data[i].title,
         link: data[i].link,
         description: data[i].description,
         author: data[i].author,
         upvotes: data[i].upvotes.length,
         downvotes: data[i].downvotes.length,
         totalvotes: data[i].upvotes.length - data[i].downvotes.length,
         comments: data[i].comments,
         token: data[i].token
       };
      res.status(200).send(formattedData);
    }
  });
});

app.listen(8080);