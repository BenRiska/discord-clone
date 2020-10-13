import React from 'react'
import "./SidebarChannel.css"
import {setChannelInfo} from "./appSlice";
import {useDispatch} from "react-redux";

function SidebarChannel({id, name, }) {
    const dispatch = useDispatch()
    return (
        <div className="sidebarChannel">
            <h4 onClick={() => {dispatch(setChannelInfo({
                channelId: id,
                channelName: name
            }))}}><span className="sidebarChannel__hash">#</span>{name}</h4>
        </div>
    )
}

export default SidebarChannel
