import React, { useState } from 'react';

const Post = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSignup = async () => {
    try {
      const data = {
        title: title,
        description: desc,
      };

      const response = await fetch('https://example.com/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log(data);

      if (response.ok) {
        console.log('Data successfully stored!');
      } else {
        console.error('Failed to store data. Status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form>
      <div>
        <label>Title</label>
        <input
          type='text'
          placeholder='Enter the Title'
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type='text'
          placeholder='Enter the Content'
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button type='button' onClick={handleSignup}>
        Post
      </button>
    </form>
  );
};

export default Post;
