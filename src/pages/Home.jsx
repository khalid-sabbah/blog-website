
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AddPostButton from '../components/AddPostButton';
import AddPostForm from './AddPostForm';
import PostMenu from './PostMenu';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      setUsername(user.username);
    } else {
      navigate('/');
    }

    axios.get('http://localhost:4000/posts')
      .then(response => {
        setPosts(response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [navigate]);

  const handleAddPost = (newPost, postId) => {
    const updatedPosts = postId
      ? posts.map(post => (post.id === postId ? { ...newPost, id: postId } : post))
      : [{ ...newPost, id: Date.now().toString() }, ...posts];

    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    if (postId) {
      axios.put(`http://localhost:4000/posts/${postId}`, newPost)
        .catch(error => {
          console.error('Error updating post:', error);
        });
    } else {
      axios.post('http://localhost:4000/posts', newPost)
        .catch(error => {
          console.error('Error adding post:', error);
        });
    }

    setShowAddPostForm(false);
  };

  const handleEditPost = (post) => {
    setEditPost(post);
    setShowAddPostForm(true);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    axios.delete(`http://localhost:4000/posts/${postId}`)
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <AddPostButton onClick={() => { setEditPost(null); setShowAddPostForm(true); }} />
      <Modal show={showAddPostForm} onClose={() => setShowAddPostForm(false)}>
        <AddPostForm
          onAddPost={handleAddPost}
          currentPost={editPost}
          isEdit={Boolean(editPost)}
          onClose={() => setShowAddPostForm(false)}
          username={username}
        />
      </Modal>
      {posts.map(post => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img src={`https://i.pravatar.cc/150?u=${post.username}`} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <h2 className="text-lg font-semibold">{post.username}</h2>
                <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
              </div>
            </div>
            {post.username === username && (
              <PostMenu
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
              />
            )}
          </div>
          <p className="text-gray-700 text-left mb-4">{post.content}</p>
          {post.image && <img src={post.image} alt="Post" className="w-full max-w-md rounded mb-4 mx-auto" />}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 text-gray-500">
              <button className="hover:text-blue-500">
                <i className="fas fa-thumbs-up"></i> Like
              </button>
              <button className="hover:text-blue-500">
                <i className="fas fa-comment"></i> Comment
              </button>
              <button className="hover:text-blue-500">
                <i className="fas fa-share"></i> Share
              </button>
            </div>
            <div className="text-gray-500">
              <span className="mr-2">10 Likes</span> • <span>5 Comments</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


