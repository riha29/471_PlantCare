const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
});

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    photo: { type: String },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of user IDs who liked the post
    comments: [commentSchema], // List of comments
    
    // New fields for share functionality
    originalPostId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Post" 
    },
    isShared: { 
      type: Boolean, 
      default: false 
    },
    sharedFrom: { 
      type: String 
    },
    shareCount: { 
      type: Number, 
      default: 0 
    },
    originalCreatedAt: { 
      type: Date 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);