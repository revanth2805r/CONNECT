import React, { useState, useRef, useEffect, useContext } from 'react';
import { userid_context } from '../home_component/Home';
import useFetch from '../hook/UseFetch';

export default function Chat() {
  const { _chat, _userid } = useContext(userid_context);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, error } = useFetch({ url: `https://connectapi.tharanitharan-n2022cse.workers.dev/chatbb/${_userid}/${_chat}` });
  console.log("Chat")
  console.log(data);

  useEffect(() => {
    if (error) {
      console.error('Error fetching data:', error);
    }

    if (data && data.results && data.results.length > 0) {
      const newMessages: string[] = data.results.map((msgObj: any) => {
        return msgObj.message;
      });

      setChatMessages(newMessages);
    }
  }, [data, error]);

  const handleSend = () => {
    if (message.trim() !== '') {
      const formattedMessage = `You: ${message}`;
      setChatMessages([...chatMessages, formattedMessage]);
      setMessage('');
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-blue h-[671px] flex flex-col gap-2 col-span-4 max-h-[1240px]  rounded-xl p-3 transition-transform hover:scale-105">
      <div className="flex flex-row justify-between bg-darkblue 500 p-2 rounded-lg">
        <div className="flex flex-row gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-9 text-white lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
          <p className="flex flex-col justify-center text-3xl text-white max-first:text-sm">{_chat}</p>
        </div>
        <div className="flex flex-row gap-3 w-8/12 ">
          <input className='w-11/12 rounded-lg pl-3 bg-blue' type="text" placeholder='Search the chat'/>
        </div>
      </div>
      <div className="bg-darkblue h-5/6 rounded-lg overflow-y-auto p-2 flex flex-col gap-1">
        {chatMessages.map((chatMessage, index) =>(
          <div>
            <p key={index} className="text-white p-2 bg-blue shadow-xl rounded-md w-fit">  {chatMessage }</p>
          </div>
        ) )
        }
       
        
        <div ref={messagesEndRef} />
      </div>
  
      <div className="bg-darkblue p-2 rounded-lg">
        <div className="flex flex-row gap-3 items-center">
          <input
            className="w-10/12 h-14 rounded-xl pl-10 bg-blue"
            placeholder="Write something"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="h-8 w-20 bg-blue rounded-xl text-black" onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}
