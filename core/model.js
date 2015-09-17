var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: { type: Date, expires: "20m", default: Date.now }
});

var commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  upvotes: {
    type: [String],
    required: true
  },
  downvotes: {
    type: [String],
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

var postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  upvotes: {
    type: [String],
    required: true
  },
  downvotes: {
    type: [String],
    required: true
  },
  token: {
    type: String,
    required: true
  },
  comments: {
    type: [commentSchema],
    required: false
  }
});

module.exports = {
  User: mongoose.model("user", userSchema),
  Post: mongoose.model("post", postSchema),
  Commment: mongoose.model("commment", commentSchema)
};
