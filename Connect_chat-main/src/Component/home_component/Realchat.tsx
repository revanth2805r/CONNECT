// // import {MultiChatSocket,MultiChatWindow,useMultiChatLogic} from "react-chat-engine-advanced"
// const ChatsPage=(props)=>{
//     const chatprops = useMultiChatLogic('b8009cb7-6ad2-4052-b962-4b929f0e4775',
//     props.user.username,
//     props.user.secret
//     );
//     return (<div style={{height:'100%'}}>
// <MultiChatSocket {...chatprops}/>
// <MultiChatWindow {...chatprops} style={{height:'100%'}}/>
//     </div>
//     )
// }

// export default ChatsPage

// import { PrettyChatWindow } from "react-chat-engine-pretty";
import { PrettyChatWindow } from 'C:/Users/Rangesh/Desktop/chat-pretty/react-chat-engine-pretty/src/index.tsx';
import { userid_context } from '../home_component/Home';
import { useContext } from "react";

const ChatsPage = (props: { user: { username: string; secret: string; }; }) => {
  const { _userid, _collegeid, _chat, _setchat } = useContext(userid_context);
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId={'739840ea-3da5-4115-838b-c597b03f30dd'}
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
        receiver={[_chat]}
      />
    </div>
  );
};

export default ChatsPage;