import React, { useState ,ChangeEvent} from 'react';
import { userid_context } from '../home_component/Home';
import { useContext } from 'react';

interface Post {
  post_id: number;
  user_id: string;
  post_title: string;
  post_description: string;
}

export default function Addpost() {
 
 
  const [img, setimg] = useState<File | null>(null);
  const { _userid} = useContext(userid_context);
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
  const formData = new FormData();
  formData.append('json', JSON.stringify(postdata)); // Append JSON data
  if (img) {
    formData.append('image', img); 
  } 

  const response = await fetch(`https://connectapi.tharanitharan-n2022cse.workers.dev/post/all`, {
    method: 'POST',
    body: formData, // Use FormData as the request body
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

  }




  function handleimg(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files ? e.target.files[0] : null; // Check if files are available
    if (file) {
      setimg(file);
      
    }
  }


  return (
    <div className="bg-blue p-5 flex flex-col gap-7 items-center col-span-4 max-h-[700px]  overflow-y-auto  rounded-lg transition-transform hover:scale-105">
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
    <label htmlFor="imageInput" className="upload-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-image">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
        <circle cx="9" cy="9" r="2"/>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
      <input id="imageInput" type='file' name='image'  style={{ display: 'none' }} onChange={handleimg} />
    </label>
 
        <button type='submit' className="bg-darkblue w-28 h-14 rounded-xl text-xl font-bold text-white">
          Post
        </button>
      </form>
    </div>
  );
}
