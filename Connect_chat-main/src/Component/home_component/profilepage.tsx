import React from 'react';
import useFetch from '../hook/UseFetch';
import { userid_context } from '../home_component/Home';
import { useContext } from 'react';
import im from './Im.png'
import { useNavigate } from 'react-router-dom';

interface UserData {
  user_id: string;
  college_id: string;
  role: "student";
  year_of_student: string;
  user_name: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { _profile } = useContext(userid_context);
  console.log(_profile);

  // Fetch user data
  const { data: userData, loading: userLoading } = useFetch({ url: `https://connectapi.tharanitharan-n2022cse.workers.dev/user/get/${_profile}` });
  console.log("userData:", userData);

  // Fetch posts related to the user
  const { data: postData, loading: postLoading } = useFetch({ url: `https://connectapi.tharanitharan-n2022cse.workers.dev/getpost/${_profile}` });
  console.log("postData:", postData);
  console.log(postData)

  if (userLoading || postLoading) {
    return <p>Loading...</p>;
  }

  // Assuming the structure is userData.details.results

  const users: UserData[] = userData.details.results;
  const posts: UserData[]=postData.post.results;
  function handlelogut(): void {
    navigate('/');
  }

  return (
    <div className="bg-blue flex flex-col items-center col-span-4 max-h-[700px]  overflow-y-auto p-5 h-[671px] sticky top-14 rounded-lg transition-transform hover:scale-105 rounded-lg">
      <div className="flex flex-col gap-5 items-center">
        <div className="size-52 bg-black rounded-full"><img src={im} /></div>
        {users.map((user: UserData) => (
          <div key={user.user_id} className="flex flex-col gap-8 items-center">
            <div className="flex flex-row gap-3">
              <p className="text-2xl text-black">USER_id:</p>
              <p className="text-2xl text-black">{user.user_id}</p>
            </div>
            <div className="flex flex-row gap-3">
              <p className="text-2xl text-black">USER_Name:</p>
              <p className="text-2xl text-black">{user.user_name}</p>
            </div>
            <div className="flex flex-row gap-3">
              <p className="text-2xl text-black">College_id:</p>
              <p className="text-2xl text-black">{user.college_id}</p>
            </div>
            <div className="flex flex-row gap-3">
              <p className="text-2xl text-black">Role:</p>
              <p className="text-2xl text-black">{user.role}</p>
            </div>
            <div className="flex flex-row gap-3">
              <p className="text-2xl text-black">Year:</p>
              <p className="text-2xl text-black">{user.year_of_student}</p>
            </div>
            <button onClick={()=>handlelogut()} className="bg-darkblue w-24 h-12 rounded-full">LogOut</button>
          </div>
        ))}
        {posts?.map((post: any) => (
          <div key={post.post_id} className="bg-darkblue mb-4 p-5 rounded-lg transition-transform hover:scale-105 w-4/5">
            <div className="flex flex-row gap-7 items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-white lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
              <p className="font-bold text-xl text-white transition-transform hover:scale-105">{post.user_id}</p>
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
};

export default ProfilePage;
