import React, {useEffect, useState} from 'react'
import "./Chat.css"
import ChatHeader from "./ChatHeader"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from "./Message"
import {useSelector} from "react-redux";
import {selectChannelId, selectChannelName} from "./appSlice";
import {selectUser} from "./userSlice"
import db from "./firebase"
import firebase from "firebase"

function Chat() {
    const user = useSelector(selectUser)
    const name = useSelector(selectChannelName);
    const id = useSelector(selectChannelId);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => { 
        if(id){
        db.collection("channels")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snap => {
            setMessages(snap.docs.map(doc => doc.data()))}
        )    
    }
    }, [id])

    const sendMessage = e => {
        e.preventDefault()
        if(id){
        
        db.collection("channels").doc(id).collection("messages").add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })}

        setInput("");
    }

    return (
        <div className="chat">
            <ChatHeader name={name}/>
            <div className="chat__messages">
                {messages.map(message => 
                <Message key={message.timestamp} user={message.user.user} timestamp={message.timestamp} message={message.message} />
                )}
            </div>
            <div className="chat__input">
                <AddCircleIcon/>
                <form onSubmit={e => sendMessage(e)}>
                    <input value={input} onChange={e => setInput(e.currentTarget.value)} placeholder={`message #youtube`}/>
                    <button type="submit">Send Message</button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon/>
                    <GifIcon/>
                    <EmojiEmotionsIcon/> 
                </div>
            </div>
        </div>
    )
}

export default Chat
