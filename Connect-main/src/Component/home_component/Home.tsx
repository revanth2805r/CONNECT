import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from '../Auth/Signup';
import Center from './Center';
import Addfriend from './Addfriend';
import Notification from './Notification';
import Addpost from './Addpost';
import CreateGroup from './CreateGroup';
import Chat from './Chat';
import Addgroup from './Addgroup';
import ProfilePage from './profilepage';
import { DashboardLayout } from './Slotcomponent';

export type userid_context_type = {
  _userid: string;
  _collegeid: string;
  _profile: string;
  _chat:string;
  _setuserid: (value: string) => void;
  _setcollegeid: (value: string) => void;
  _setprofile: (value: string) => void;
  _setchat:(value:string)=>void;
};

export const userid_context = createContext<userid_context_type>({
  _userid: localStorage.getItem("_userid")|| '',
  _collegeid: localStorage.getItem("_collegeid")|| '',
  _profile: '',
  _chat:'',
  _setuserid: () => {},
  _setcollegeid: () => {},
  _setprofile: () => {},
  _setchat:()=>{}

});

export default function Home() {
  const [_userid, _setuserid] = useState(localStorage.getItem("_userid")|| '');
  const [_collegeid, _setcollegeid] = useState(localStorage.getItem("_collegeid")|| '');
  const [_profile, _setprofile] = useState('');
  const[_chat,_setchat]=useState('');

  return (
    <userid_context.Provider value={{ _userid, _collegeid, _profile,_chat, _setuserid, _setcollegeid, _setprofile,_setchat }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<DashboardLayout><Center /></DashboardLayout>} />
          <Route path="/Add_friend" element={<DashboardLayout><Addfriend /></DashboardLayout>} />
          <Route path="/notification" element={<DashboardLayout><Notification /></DashboardLayout>} />
          <Route path="/post" element={<DashboardLayout><Addpost /></DashboardLayout>} />
          <Route path="/Creategroup" element={<DashboardLayout><CreateGroup /></DashboardLayout>} />
          <Route path="/addgroup" element={<DashboardLayout><Addgroup /></DashboardLayout>} />
          <Route path="/Profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
          <Route path="/Chat" element={<DashboardLayout><Chat /></DashboardLayout>} />
        </Routes>
      </BrowserRouter>
    </userid_context.Provider>
  );
}
