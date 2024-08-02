
import React, { useState, useEffect } from 'react';

export default function AddPostForm({ onAddPost, currentPost, isEdit, onClose, username }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (isEdit && currentPost) {
      setContent(currentPost.content);
      setImage(currentPost.image);
    }
  }, [isEdit, currentPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      content,
      image,
      username,
      timestamp: new Date().toISOString(),
    };
    onAddPost(newPost, currentPost ? currentPost.id : null);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        {image && (
          <img src={image} alt="Selected" className="mt-2 w-full max-w-xs rounded-md" />
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          {isEdit ? 'Update' : 'Add'} Post
        </button>
      </div>
    </form>
  );
}

