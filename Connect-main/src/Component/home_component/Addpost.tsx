import React, { useState } from 'react';
import { userid_context } from '../home_component/Home';
import { useContext } from 'react';

interface Post {
  post_id: number;
  user_id: string;
  post_title: string;
  post_description: string;
}

export default function Addpost() {
  const { _userid, _collegeid } = useContext(userid_context);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postdata: Post = {
      post_id: 0, // You may set the post_id based on your application logic
      user_id: _userid, // Assuming _userid is dynamically set
      post_title: title,
      post_description: desc,
    };

    try {
      const response = await fetch(`https://connectapi.tharanitharan-n2022cse.workers.dev/post/tharani171`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postdata),
      });

      if (response.ok) {
        console.log('Post submitted successfully');
        // Clear input fields after successful submission
        setTitle('');
        setDesc('');
        // Handle any further logic after successful post submission
      } else {
        console.error('Failed to submit post');
      }
    } catch (error) {
      console.error('An error occurred during post submission:', error);
    }
  };

  return (
    <div className="bg-blue p-5 flex flex-col gap-7 items-center col-span-4 sticky top-14 rounded-lg transition-transform hover:scale-105">
      <p className="text-2xl font-bold text-black">Post The content</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-11/12 items-center">
        <input
          className="border border-white h-20 w-11/12 text-2xl rounded-lg p-3 bg-darkblue placeholder:text-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border border-white h-64 w-11/12 text-2xl rounded-lg p-3 bg-darkblue placeholder:text-white"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type='submit' className="bg-darkblue w-28 h-14 rounded-xl text-xl font-bold text-white">
          Post
        </button>
      </form>
    </div>
  );
}
