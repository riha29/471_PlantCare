import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { FaThumbsUp, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ text: "", photo: "" });
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState({});
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

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
      setPosts([response.data, ...posts]);
      setNewPost({ text: "", photo: "" });
      setError("");
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
    const comment = commentText[postId];
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
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add comment");
    }
  };

  const handleSharePost = async (postId) => {
    try {
      const token = localStorage.getItem("authToken");
      const postToShare = posts.find(post => post._id === postId);
      
      const sharedPost = {
        originalPostId: postId,
        text: postToShare.text,
        photo: postToShare.photo,
        sharedFrom: postToShare.userId?.name || "Unknown User",
        isShared: true,
        originalCreatedAt: postToShare.createdAt
      };

      await axios.post(
        `/posts/share`,
        sharedPost,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI to show success message
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);

      // Update share count in UI
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            shareCount: (post.shareCount || 0) + 1
          };
        }
        return post;
      }));

      setError("");
    } catch (err) {
      console.error("Error sharing post:", err);
      setError("Failed to share post");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
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

      {/* Success Message */}
      {shareSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Post shared successfully to your profile!
        </div>
      )}

      {/* New Post Form */}
      <div className="flex items-center mt-20 justify-center mb-6">
        <div className="bg-white shadow-lg rounded-lg p-4 flex space-x-4 items-center w-3/4">
          <textarea
            placeholder="Write something..."
            value={newPost.text}
            onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            className="flex-grow p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Photo URL (optional)"
            value={newPost.photo}
            onChange={(e) => setNewPost({ ...newPost, photo: e.target.value })}
            className="p-2 border rounded"
          />
          <button
            onClick={handleCreatePost}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="flex flex-col items-center">
        {posts.map((post) => (
          <div key={post._id} className="bg-white shadow-lg rounded-lg mb-6 w-2/3">
            <div className="p-4">
              <div className="flex items-center mb-2">
                <img
                  src={"https://via.placeholder.com/40"}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-bold">{post.userId?.name || "Unknown User"}</h3>
                  <p className="text-sm text-gray-500">
                    {post.isShared && <span className="text-gray-400">Shared from {post.sharedFrom} • </span>}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {post.photo && (
                <div className="w-full flex justify-center">
                  <img
                    src={post.photo}
                    alt="Post"
                    className="w-auto h-64 object-cover mt-4 rounded-lg"
                  />
                </div>
              )}
              <p className="mt-4">{post.text}</p>
              <div className="flex items-center justify-between mt-4 px-2">
                <button
                  onClick={() => handleLikePost(post._id)}
                  className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
                >
                  <FaThumbsUp /> <span>{post.likes?.length || 0} Likes</span>
                </button>
                <button
                  onClick={() => handleSharePost(post._id)}
                  className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
                >
                  <FaShare /> <span>{post.shareCount || 0} Shares</span>
                </button>
              </div>
              <div className="mt-4">
                {post.comments?.map((comment, index) => (
                  <p key={index} className="text-sm bg-gray-100 p-2 rounded-lg mb-2">
                    <strong>{comment.userId?.name || "Anonymous"}:</strong> {comment.text}
                  </p>
                ))}
              </div>
              <div className="flex items-center mt-4">
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
                  onClick={() => handleAddComment(post._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default DashboardPage;