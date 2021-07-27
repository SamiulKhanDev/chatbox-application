import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, More, Search } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import React from 'react'
import { useState } from 'react';
import {useStateValue} from './StateProvider'
import db from './firebase';
import firebase from 'firebase';

const Chat = () => {
    const [seed, setSeed] = React.useState("12");
    const [value, setValue] = React.useState("");
    const [sms, setSms] = useState([]);
    const { ChatRoomsId } = useParams();
    const [chatRoomName, setChatRoomName] = React.useState('');
    const [{ user }, dispatch] = useStateValue();
    React.useEffect(() => {
        if (ChatRoomsId) {
            db.collection('ChatRooms').doc(ChatRoomsId).onSnapshot((snapshot) => {
                setChatRoomName(snapshot.data().name);
            });
            db.collection('ChatRooms').doc(ChatRoomsId).collection('sms').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setSms(snapshot.docs.map(doc=>doc.data()))
            })
       }
    }, [ChatRoomsId])
    const handleClick = (e) => {
        e.preventDefault();
        db.collection('ChatRooms').doc(ChatRoomsId).collection('sms').add({
            name: user.displayName,
            sms: value,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setValue("")
    }
    // {`chat_sms ${mas.name===user.displayName && "chat_smsrecive"}`}
    React.useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
        
    },[ChatRoomsId])
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_info">
                    <h4>{chatRoomName}</h4>
                    <p>last seen at {new Date(sms[sms.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div> 
            </div>
            <div className="chat_body">
                {sms.map((mas) => {
                    return ( 
                        <div className={`chat_sms ${mas.name === user.displayName && "chat_smsrecive"}`}>
                        <p className="chat_name">{mas.name}</p>
                    <span className="chat_chat">{mas.sms}</span>
                       <p className="chat_timestamp">
                         {new Date(mas.timestamp?.toDate().getTime()).toUTCString()}  
                    </p>
                </div>   
                )})}   
            </div>
            <div className="chat_footer">
        
                <form >
                    <input value={value} type="text" placeholder="type a massage" onChange={(e)=>setValue(e.target.value) } />
                    <button onClick={(e)=>handleClick(e)} type="submit">send</button>
                    </form>
            
            </div>
        </div>
    )
}

export default Chat
