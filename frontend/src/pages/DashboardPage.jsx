import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from 'react-router-dom'; 

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ text: "", photo: "" });
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState({}); // To track comments for each post

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts");
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.text) {
      setError("Text is required to create a post");
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/posts",
        newPost,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts([response.data, ...posts]); // Add the new post to the list
      setNewPost({ text: "", photo: "" });
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      setError("Failed to create post");
    }
  };
  
  const handleLikePost = async (postId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? response.data : post))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to like/unlike post");
    }
  };

  const handleAddComment = async (postId) => {
    const comment = commentText[postId]; // Get the comment text for the post
    if (!comment) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `/posts/${postId}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? response.data : post))
      );
      setCommentText((prev) => ({ ...prev, [postId]: "" })); // Clear the comment input for this post
    } catch (err) {
      console.error(err);
      setError("Failed to add comment");
    }
  };

  const handleSharePost = async (postId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `/posts/${postId}/share`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Post shared successfully!");
    } catch (err) {
      console.error("Error sharing post:", err);
      setError("Failed to share post");
    }
  };
  

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <nav className="bg-green-900 -m-8 pt-8 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Plant Care</Link>
          </h1>
          <div className="flex space-x-4">
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/research-work" className="hover:underline">Research</Link>
            <Link to="/video-tutorials" className="hover:underline">Tutorials</Link>
            <Link to="/plants" className="hover:underline">Plants</Link>
            <Link to="/marketplace" className="hover:underline">MarketplacePage</Link>
            <Link to="/profile" className="hover:underline">User</Link>
          </div>
        </div>
      </nav>
      <h1 className="text-3xl font-bold text-center mt-16 mb-6">Dashboard</h1>
  
      {/* New Post Form */}
      <div className="mb-6">
        <textarea
          placeholder="Write something..."
          value={newPost.text}
          onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Photo URL (optional)"
          value={newPost.photo}
          onChange={(e) => setNewPost({ ...newPost, photo: e.target.value })}
          className="w-full p-2 border rounded mt-2"
        />
        <button
          onClick={handleCreatePost}
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          Post
        </button>
      </div>
  
      {/* Posts */}
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 rounded-lg shadow mb-4">
          <h3 className="font-bold">{post.userId?.name || "Unknown User"}</h3>
          {post.photo && (
            <img
              src={post.photo}
              alt="Post"
              className="w-full h-48 object-cover mt-2"
            />
          )}
          <p className="mt-2">{post.text}</p>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handleLikePost(post._id)}
              className={`px-4 py-2 rounded ${
                post.likes.includes("loggedInUserId")
                  ? "bg-green-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              {post.likes.length} Likes
            </button>
            <button
              onClick={() => handleSharePost(post._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Share
            </button>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText[post._id] || ""}
                onChange={(e) =>
                  setCommentText({ ...commentText, [post._id]: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => handleAddComment(post._id, commentText[post._id])}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
  
          {/* Comments */}
          <div className="mt-4">
            {post.comments.map((comment, index) => (
              <p key={index}>
                <strong>{comment.userId?.name || "Anonymous"}:</strong> {comment.text}
              </p>
            ))}
          </div>
        </div>
      ))}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
  
};

export default DashboardPage;