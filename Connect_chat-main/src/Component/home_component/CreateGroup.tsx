import React, { useState } from 'react';
import { userid_context } from '../home_component/Home';
import { useContext } from 'react';

interface Group {
  group_id: string;
  group_name: string;
  created_by: string;
  member: string;
  description: string;
}

export default function CreateGroup() {
  const { _userid, _collegeid } = useContext(userid_context);
  const [group_id, setgroup_id] = useState<string>('');
  const [Group_name, setGroup_name] = useState<string>('');
  const [Groupdesc, setGroupDesc] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const groupdata: Group = {
      group_id: group_id,
      group_name: Group_name,
      created_by: _userid,
      member: _userid,
      description: Groupdesc,
    };

    console.log(_userid);
    console.log(_collegeid);

    try {
      const response = await fetch(`https://connectapi.tharanitharan-n2022cse.workers.dev/group/${_userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupdata),
      });

      if (response.ok) {
        const responseData = await response.json(); // Add this line to handle response data if needed
        console.log('Post submitted successfully');
        // Clear input fields after successful submission
        setgroup_id('');
        setGroup_name('');
        setGroupDesc('');
        // Handle any further logic after successful post submission
      } else {
        console.error('Failed to submit post');
      }
    } catch (error) {
      console.error('An error occurred during post submission:', error);
    }
  };

  return (
    <div className="flex flex-col bg-blue p-11 col-span-4 gap-6 items-center rounded-lg">
      <p className="text-3xl">Create Group</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 justify-center items-center p-3 w-11/12">
        <div className="flex flex-row w-11/12 gap-4 items-center justify-between max-first:w-[250px]">
          <label className="text-2xl  text-black max-w-24 w-8/12 max-first:hidden">Group ID:</label>
          <input
            className=" h-14 rounded-lg pl-5 bg-darkblue  placeholder:text-white w-10/12 max-first:w-11/12"
            placeholder="Enter the group"
            value={group_id}
            onChange={(e) => {
              setgroup_id(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row w-11/12 gap-4 items-center justify-between max-first:w-[250px]  ">
          <label className="text-2xl text-black max-w-24  w-8/12 max-first:hidden ">Group Name:</label>
          <input
            className="  h-14 rounded-lg p-5 bg-darkblue  placeholder:text-white w-10/12 max-first:w-11/12"
            placeholder="Enter the Group Name"
            value={Group_name}

            onChange={(e) => {
              setGroup_name(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row w-11/12 gap-4 items-center justify-between max-first:w-[250px]">
          <label className="text-2xl  text-black max-w-24 max-first:hidden">Group desc:</label>
          <input
            className=" h-14 rounded-lg pl-5 bg-darkblue  placeholder:text-white w-10/12 max-first:w-11/12"
            placeholder="Enter the Description"
            value={Groupdesc}
            onChange={(e) => {
              setGroupDesc(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="h-14 bg-darkblue w-28 rounded-2xl font-bold text-wh ">
          Create Group
        </button>
      </form>
    </div>
  );
}
