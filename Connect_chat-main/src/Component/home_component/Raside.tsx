import React, { useContext } from 'react';
import useFetch from '../hook/UseFetch';
import { userid_context } from '../home_component/Home';
import { useNavigate } from 'react-router-dom';

export default function Raside() {
  const navigate = useNavigate();
  const { _userid, _collegeid, _chat, _setchat } = useContext(userid_context);
  const { data } = useFetch({ url: `https://connectapi.tharanitharan-n2022cse.workers.dev/getApprovedSender/${_userid}/${_collegeid}` });
  console.log("RAside", data);

  const handleChatClick = (userId: string) => {
    _setchat(userId);
    console.log("csdcjsdkkfekjfherjker,hermfhferjverhejghr");
    console.log(_chat);
    navigate('/Chat');

  };

  return (
    <aside className="col-span-2 p-5 flex flex-col gap-4 rounded-lg row-span-1 max-h-[700px] overflow-y-auto bg-blue transition-transform hover:scale-105 max-lg:row-span-1 max-first:max-h-[1000px]">
      {/* {data && (
        <>
          <p className="text-3xl text-black">Latest Activity</p>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="flex flex-row gap-5 h-16">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-9 text-black lucide lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                <a className='text-2xl text-white transition-transform hover:scale-125 hover:font-bold'>Group Item {i + 1}</a>
              </div>
            ))}
          </div>
        </>
      )} */}
      <p className='text-black text-3xl font-bold'>My Friends</p>
      <div>
        {data && data.results.map((userdata: { user_name: string, user_id: string }) => (
          <div key={userdata.user_id} className="flex flex-row gap-5 h-16 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-9 text-black lucide lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
            <button onClick={() => handleChatClick(userdata.user_name)} className='text-2xl text-black transition-transform hover:scale-125 hover:font-bold'>{userdata.user_name}</button>
          </div>
        ))}
      </div>
    </aside>
  );
}
