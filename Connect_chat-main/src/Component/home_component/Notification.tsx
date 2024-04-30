import React, { useState } from 'react';
import useFetch from '../hook/UseFetch';
import {userid_context} from  '../home_component/Home'
import { useContext } from 'react';



interface FriendRequest {
  request_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  is_status: string;
  created_at: string;
  updated_at: string;
}

export default function Notification() {
  const {_userid}=useContext(userid_context);
  async function fetchAPI(sender_id: string, is_status: boolean) {
    const request: FriendRequest = {
      request_id: '',
      sender_id: sender_id,
      receiver_id: _userid,
      message: 'hsfkjfkwefkwje',
      is_status: is_status ? 'approved' : 'rejected',
      created_at: JSON.stringify(Date.now()),
      updated_at: JSON.stringify(Date.now()),
    };
  
    try {
     await fetch(`https://connectapi.tharanitharan-n2022cse.workers.dev/update/request/${sender_id}/${_userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }).then(response => {console.log(response);});
      console.log(JSON.stringify(request));
  
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
  
      // const responseData = await response.json();
      // console.log('Response Data:', responseData); // Log the response data for debugging
  
      // return responseData;
    } catch (error:any) {
      console.error('Error:', error.message);
      return null; // Return null or handle the error accordingly in your application
    }
  }
  

  const { data } = useFetch({ url: `https://connectapi.tharanitharan-n2022cse.workers.dev/request/${_userid}`});
  console.log(_userid);
  console.log(data);

  const [requestStates, setRequestStates] = useState<{ [key: string]: { accept: boolean; ignore: boolean } }>({});
  // const [is_status, setis_status] = useState<boolean>(false);

  const handleAccept = async (sender_id: string, ms:string) => {
    setRequestStates((prevRequestStates) => ({
      ...prevRequestStates,
      [sender_id]: {
        accept: true,
        ignore: false,
      },
    }));
    if(ms=="accept"){
      await fetchAPI(sender_id,true);
    }
  };

  const handleIgnore = async (sender_id: string,ms:string) => {
    setRequestStates((prevRequestStates) => ({
      ...prevRequestStates,
      [sender_id]: {
        accept: false,
        ignore: true,
      },
    }));

    if(ms=="ignore"){
      await fetchAPI(sender_id,false);
    }
  };

  return (
    <div className="flex flex-col col-span-4 bg-blue gap-5 p-5 row-span-2 max-h-[1240px] items-center rounded-lg transition-transform hover:scale-105">
      <div className="text-black text-3xl font-bold">Friend request</div>
      <div className="flex flex-col gap-3 justify-between w-[500px] ">
        {data?.results.map((datas: { sender_id: string; Sender_name: string; message: string }) => (
          <div  className="flex flex-row gap-2 items-center bg-darkblue w-11/12 p-3 rounded-lg justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-white lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
            <div className="flex flex-col gap-1">
              <p className='text-white text-2xl max-first:text-sm'>{datas.Sender_name}</p>
              <p className='text-white text-2xl max-first:hidden'>Sent a Friend Request</p>
            </div>
            <div className="flex flex-row gap-5 w-11/12">
              {requestStates[datas.sender_id]?.accept ? (
                <button key={datas.sender_id} className="h-7 w-24 bg-green-500 rounded-full">
                  Accepted
                </button>
              ) : (
                <div className="flex flex-row gap-3">
                  <button
                    key={datas.sender_id}
                    onClick={() => handleAccept(datas.sender_id, "accept")}
                    className="h-7 w-24  bg-white rounded-full" 
                    hidden={requestStates[datas.sender_id]?.ignore}
                  >
                    Accept
                  </button>
                  {requestStates[datas.sender_id]?.ignore ? (
                    <button key={datas.sender_id} className="h-7 w-24 bg-red-500 rounded-full">
                      Ignored
                    </button>
                  ) : (
                    <button
                      key={datas.sender_id}
                      onClick={() => handleIgnore(datas.sender_id,"ignore")}
                      className="h-7 w-24 bg-white rounded-full"
                    >
                      Ignore
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
