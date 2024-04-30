
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
      <div className="flex flex-col gap-5 max-lg:hidden">
        <div className="flex flex-row gap-5 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-black lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <Link to='/home' className='text-2xl text-black transition-transform hover:scale-125 hover:font-bold'>Home</Link>
        </div>
        <div className="flex flex-row gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className=" size-9 lucide lucide-milestone"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/><path d="M12 13v8"/><path d="M12 3v3"/></svg>
          <Link to='/post' className='text-2xl text-black transition-transform hover:scale-125 hover:font-bold'>Post</Link>
        </div>
        <div className="flex flex-row gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 lucide lucide-contact-round"><path d="M16 18a4 4 0 0 0-8 0"/><circle cx="12" cy="11" r="3"/><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="8" x2="8" y1="2" y2="4"/><line x1="16" x2="16" y1="2" y2="4"/></svg>
          <Link to='/Add_friend' className='text-2xl text-black transition-transform hover:scale-125 hover:font-bold'>Add Friends</Link>
        </div>
        <div className="flex flex-row gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <Link to="/addgroup" className='text-2xl text-black transition-transform hover:scale-125 hover:font-bold'>Add Group</Link>
        </div>
        <div className="flex flex-row gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 lucide lucide-pen"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
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
