import  { useState } from 'react';
import useFetch from '../hook/UseFetch';
import {userid_context} from  '../home_component/Home'
import { useContext } from 'react';
import { Link } from 'react-router-dom';

interface User {
  user_id: string;
  college_id: string;
  user_name: string;
  role: "student" | "teacher" | "admin";
  year_of_student: string;
  created_date: string;
  updated_date: string;
  description: string;
}

interface Message {
  request_id: number;
  sender_id: string;
  receiver_id: string;
  message: string;
}

export default function Addfriend() {
  const {_userid,_collegeid,_setprofile}=useContext(userid_context);
  const { data } = useFetch({ url: `https://connectapi.tharanitharan-n2022cse.workers.dev/addfriend2/${_userid}/${_collegeid}`});
  const [followings, setFollowings] = useState<boolean[]>(new Array(data?.query.results.length).fill(false));
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFollowClick = async (index: number, userid: string) => {
    const newFollowings = [...followings];
    newFollowings[index] = !newFollowings[index];
    setFollowings(newFollowings);
    const Messagedata: Message = {
      request_id: 0,
      sender_id: _userid,
      receiver_id: userid,
      message: "jjdjhfjjfdjfh",
    };

    await fetch(`https://connectapi.tharanitharan-n2022cse.workers.dev/request/post/all`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Messagedata),
    });
    console.log(_userid);
    console.log()

    // handle response here
  };

  const filteredResults = data?.query.results.filter((user: User) =>
    user.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col col-span-4 bg-blue gap-5 row-span-2 max-h-[700px]  overflow-y-auto items-center p-3 transition-transform hover:scale-105 rounded-lg max-first:">
      <div className="flex flex-row gap-7 w-11/12 justify-between">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
        <input
          className=" w-8/12 p-4 rounded-full h-9 bg-darkblue placeholder:text-white"
          type="text"
          placeholder="Search for Friends"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredResults?.map((userData: User, index: number) => (
        <div key={userData.user_id} className={`flex flex-col gap-2 bg-darkblue w-11/12 box-border p-3 rounded-3xl ${followings[index] && 'hidden'} transition-transform hover:scale-105`}>
          <a>
            <div className="flex flex-row gap-5 items-center w-11/12">
            <Link to="/profile" className="max-first:hidden" onClick={()=>_setprofile(userData.user_id)} key={userData.user_id}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-white lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></Link>
              <div className="flex flex-col">
                <span className="flex flex-row gap-2 items-center">
                  <span className="text-lg text-white">{userData.user_name}</span>
                  <div className="bg-white text-text h-5 w-20 rounded-full flex items-center justify-center flex-col max-first:w-16 max-first:text-sm ">
                    {userData.role}
                  </div>
                </span>
                <span className="text-lg">{userData.description}</span>
              </div>
              <button onClick={() => handleFollowClick(index, userData.user_id)} key={userData.user_id} className="bg-white text-black h-7 w-20 rounded-full flex items-center justify-center ml-auto">
                {followings[index] ? 'Following' : 'Follow'}
              </button>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
