import React, {useState, useEffect} from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from "./SidebarChannel"
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { selectUser } from './userSlice';
import {useSelector} from "react-redux";
import db, {auth} from "./firebase"

function Sidebar() {
    const {user} =  useSelector(selectUser);
    const [channels, setChannels] = useState([])


    useEffect(() =>{
        db.collection("channels").onSnapshot(snap => {
            setChannels(snap.docs.map(doc => ({id: doc.id, ...doc.data()})))
        })
    }, [])

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name")

        db.collection("channels").add({
            channelName
        })
    }



    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Ben Taylor</h3>
                <ExpandMoreIcon/>
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                    <ExpandMoreIcon/>
                    <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={e => handleAddChannel()} className="sidebar__addChannel"/>
                </div>

                <div className="sidebar__channelsList">
                    
                    {channels.map(channel => <SidebarChannel key={channel.id} name={channel.channelName} id={channel.id}/>)}
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon className="sidebar__voiceIcon" fontSize="large"/>
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon/>
                    <CallIcon/>
                </div>
            </div>
            <div className="sidebar__profile">
                    <Avatar onClick={e => {auth.signOut()}} src={user?.photo}/>
                    <div className="sidebar__profileInfo">
                        <h3>@{user?.displayName}</h3>
                        <p>#{user?.uid.substring(0, 5)}</p>
                    </div>

                    <div className="sidebar__profileIcons">
                        <MicIcon/>
                        <HeadsetIcon/>
                        <SettingsIcon/>
                    </div>
                </div>
        </div>

    )
}

export default Sidebar
