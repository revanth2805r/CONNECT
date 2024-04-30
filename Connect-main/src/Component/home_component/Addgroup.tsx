import React, { useState } from 'react';
import useFetch from '../hook/UseFetch';
import { userid_context } from '../home_component/Home';
import { useContext } from 'react';

interface Group {
  group_id: string;
  group_name: string;
  created_by: string;
  member: string;
  description: string;
}

interface GroupMembers {
  duplicate_group_id: string;
  member: string;
}

export default function Addgroup() {
  const { _userid, _collegeid } = useContext(userid_context);
  const { data, refetch } = useFetch({ url: `https://connectapi.tharanitharan-n2022cse.workers.dev/getGroupsForUserAndnotcollege/${_userid}/${_collegeid}` });
  console.log(data);

  async function handleAdd(groupId: string): Promise<void> {
    const messageData: GroupMembers = {
      duplicate_group_id: groupId, // Using groupId as duplicate_group_id
      member: _userid,
    };

    try {
      const response = await fetch(`https://connectapi.tharanitharan-n2022cse.workers.dev/group_members/${groupId}/${_userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      console.log(response);

      if (response.ok) {
        console.log('Group added successfully');
        // Refetch the data to update the UI after successful addition
        refetch();
      } else {
        console.error('Failed to add group');
      }
    } catch (error) {
      console.error('An error occurred during group addition:', error);
    }
  }

  return (
    <div className="flex flex-col col-span-4 bg-blue gap-5 row-span-2 max-h-[700px]  overflow-y-auto items-center p-3 rounded-lg transition-transform hover:scale-105 max-first:h-44">
      <div className="flex flex-row gap-7 w-11/12 justify-between">
        <div className="size-9 bg-black"></div>
        <input
          className=" bg-darkblue w-8/12 p-4 rounded-full h-9 placeholder:text-white"
          type="text"
          placeholder="Search for group"
        />
      </div>
      {data && data.results.map((group: Group) => (
        <div key={group.group_id} className="flex flex-col gap-2 bg-darkblue w-11/12 box-border p-3 rounded-3xl transition-transform hover:scale-105">
          <a>
            <div className="flex flex-row gap-5 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-9 lucide lucide-users-round text-white"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
              <div className="flex flex-col">
                <span className="flex flex-row gap-2 items-center">
                  <a className="text-lg text-white">{group.group_name}</a>
                </span>
              </div>
              <button onClick={() => handleAdd(group.group_id)} className="bg-white h-7 w-20 rounded-full flex items-center justify-center ml-auto">Add</button>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
