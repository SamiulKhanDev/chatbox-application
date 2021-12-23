import React from 'react'
import '../Sidebar/Css/sidebar.css'
import db from '../../FireBase/firebase'
import { useState,useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import {SearchOutlined} from '@material-ui/icons'
import SidebarChat from '../Sidebarchat/SidebarChat';
import { useStateValue } from '../../StateProvider/StateProvider'

const Sidebar = () => {
    const [{ user }, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]);
    const [referRooms, setReferRooms] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        db.collection('ChatRooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map((doc) => {
                return ({
                    id: doc.id,
                    data:doc.data()
                })
            }))
            setReferRooms(snapshot.docs.map((doc) => {
                return ({
                    id: doc.id,
                    data:doc.data()
                })
            }));
        })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            const newRooms = rooms.filter(room => {
                return room.data.name.toLowerCase() == search.toLowerCase();
            })
            if (newRooms.length == 0) {
                db.collection('ChatRooms').add( {
                    name:search
                })
            }
            
            setRooms([...newRooms]);
        } else {
            setRooms(referRooms);
        }
       setSearch('')
    }
   
    
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}  className="sidebar_icon"/>
             
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchcontainer">
                    <SearchOutlined style={{ color: 'rgb(189,189,189', height: '17px', width: '17px' }} />
                    <form>
                    <input  value={search} placeholder="search or creat new chat" type='text' id="input" onChange={e => {
                        setSearch(e.target.value);
                        }}></input>
                        <button onClick={(e)=>handleSubmit(e)} type="submit">submit</button>
                        </form>
                </div>
               
            </div>
            <div className="sidebar_chatboxs">
                <SidebarChat addNewChat />
                
                {rooms.map((room) => {
                   
                    const { id, data } = room;

                   return <SidebarChat key={id} id={id} data={data.name}/>
                })}
              
            </div>
        </div>
    )
}

export default Sidebar
