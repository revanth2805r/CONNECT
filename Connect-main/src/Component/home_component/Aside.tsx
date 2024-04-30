import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hook/UseFetch';
import {userid_context} from  '../home_component/Home'
import { useContext } from 'react';

export default function Aside() {
  const {_userid,_collegeid,_chat,_setchat}=useContext(userid_context);
  console.log("Aside")
  const { data } = useFetch({ url: `https://connectapi.tharanitharan-n2022cse.workers.dev/getGroupsForUserAndCollege/${_userid}/${_collegeid}`});
  console.log(data);

  return (
    <aside className="flex flex-col col-span-2 gap-7 rounded-lg p-5 transition-transition hover:scale-105 bg-blue max-h-[700px] overflow-y-auto max-lg:row-span-1 ">
      <div className="flex flex-col gap-3 max-lg:hidden">
        <div className="flex flex-row gap-5 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-black lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
          <Link to='/home' className='text-2xl text-black transition-transform hover:scale-125 hover:font-bold'>Home</Link>
        </div>
        <div className="flex flex-row gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-black lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
          <Link to='/post' className='text-2xl text-black transition-transform hover:scale-125 hover:font-bold'>Post</Link>
        </div>
        <div className="flex flex-row gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-black lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
          <Link to='/Add_friend' className='text-2xl text-black transition-transform hover:scale-125 hover:font-bold'>Add Friends</Link>
        </div>
        <div className="flex flex-row gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-black lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
          <Link to="/addgroup" className='text-2xl text-black transition-transform hover:scale-125 hover:font-bold'>Add Group</Link>
        </div>
        <div className="flex flex-row gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-black lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
          <Link to='/Creategroup' className='text-2xl text-black transition-transform hover:scale-125 hover:font-bold'>Create group</Link>
        </div>
      </div>
      <p className="text-3xl font-bold text-black">My group</p>
      <div className="flex flex-col gap-2">
        {data?.results.map((data: { group_id: string;group_name: string;created_by: string;member: string;description: string;})=>
          <div key={data.group_id} className="flex flex-row gap-5 w-11/12 hover:bg-gray-700'">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 lucide lucide-users-round text-black"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
            <Link to='/Chat' onClick={()=>_setchat(data.group_name)} className="text-2xl text-black transition-transform hover:scale-125 hover:font-bold flex-row-item" >{data.group_name}</Link>
          </div>
        )
}     </div>
    </aside>
  );
}
