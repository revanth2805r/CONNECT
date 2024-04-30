import React, { useState } from 'react';
import useFetch from '../hook/UseFetch';
import { userid_context } from '../home_component/Home';
import { useContext } from 'react';
import { Link } from 'react-router-dom';



export default function Center() {
  const { _userid, _collegeid,_profile,_setprofile} = useContext(userid_context);
  console.log(_collegeid);
  console.log(_userid);
  const { data } = useFetch({ url: `https://connectapi.tharanitharan-n2022cse.workers.dev/get/rel/${_collegeid}` });
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter posts based on search query
  const filteredPosts = data?.results.filter((post: any) =>
    post.post_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.post_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col col-span-4 bg-blue items-center gap-5 p-5 max-h-[700px] overflow-y-auto rounded-xl transition-transform hover:scale-105 max-lg:col-span-1 max-lg:row-span-2 max-lg:max-h-[950px] ">
      <div className="flex flex-row gap-7 w-11/12 justify-between">
      <Link to="/profile" onClick={(e)=>_setprofile(_userid)} key={_userid}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-white lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></Link>
        <input
          className="border w-8/12 p-4 rounded-full h-9"
          type='text'
          placeholder="Search for your mind?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="w-11/12 p-5">
        {filteredPosts?.map((post: any) => (
          <div key={post.post_id} className="bg-darkblue mb-4 p-5 rounded-lg transition-transform hover:scale-105">
            <div className="flex flex-row gap-7 items-start">
              <Link to='/profile' onClick={()=>_setprofile(post.user_id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-white lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></Link>
              <p className="font-bold text-xl text-white transition-transform hover:scale-105 overflow-auto max-first:text-sm">{post.user_id}</p>
            </div>
            <p className="text-2xl  text-white font-bold">{post.post_title}</p>
            <p className='text-white'>
              {post.post_description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
