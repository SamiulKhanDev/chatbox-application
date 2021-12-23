import React from 'react'
import '../Sidebarchat/Css/sidebarchat.css'
import db from '../../FireBase/firebase'
import { useState } from 'react'
import { Avatar, IconButton, Snackbar } from '@material-ui/core'
import { Delete, DnsTwoTone } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const SidebarChat = ({addNewChat,id,data}) => {  
    const [lastSms, setLastSms] = useState([]);
    const [seed, setSeed] = React.useState("12");
    const handleClick = (id) => {
        console.log(id);
        
        
    //    db.collection('ChatRooms').doc(id).collection("sms").delete()
        
    }
    useEffect(() => {
        if (id) {
            db.collection('ChatRooms').doc(id).collection("sms").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                setLastSms(snapshot.docs.map((doc) => {
                  return  doc.data().sms;
                }))
            
            });
        };
    }, []);
   
   
    const createChat = () => {
        const roomName = prompt('enter chatroom name')
        if (roomName) {
            db.collection('ChatRooms').add( {
                name:roomName
            })
        }
        
        
    }
    React.useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
        
    },[])
    return !addNewChat ? (
        <Link to={`/ChatRooms/${id}`}>
 <div key={id} className="sidebarchat">
            <Avatar style={{height:'25px',width:'25px'}} src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarchat_info">
                <h4>{data}</h4>
                    <p>{lastSms[0]}</p>
                </div>
                
        </div>
        </Link>
       
    ) : (
            <div onClick={createChat} className="sidebarchat">
                    <h4>Create ChatRoom</h4>
            </div>
    )
}

export default SidebarChat
