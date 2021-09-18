import React, {useState, useEffect} from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import Message from './Message'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import {useSelector} from 'react-redux'
import firebase from 'firebase'

import {selectChannelId, selectChannelName} from './features/appSlice'
import {selectUser} from './features/userSlice'
import db from './firebase'

function Chat() {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if(channelId){
        db.collection("channels").doc(channelId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot =>
            setMessages(snapshot.docs.map((doc) => doc.data()))    
        )} 
    }, [channelId])

    const sendMessage = e => {
        e.preventDefault()

        db.collection('channels').doc(channelId).collection('messages').add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("")
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat__messages">
                {messages.map(message => (
                    <Message 
                        timestamp = {message.timestamp}
                        message = {message.message}
                        user = {message.user}    
                    />
                ))}
            </div>

            <div className="chat__input">
                <AddCircleIcon fontsize="large" />
                <form>
                    <input
                        disabled = {!channelId} 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        type="text" 
                        placeholder={`Send to #${channelName}`}
                    />
                    <button 
                        disabled = {!channelId}
                        className="chat__inputButton"
                        type="submit"
                        onClick = {sendMessage}
                    >
                        Send Message
                     </button>
                </form>

                <div className="chat__inputIcons">
                    <CreditCardIcon fontSize="large"/>
                    <GifIcon fontSize="large"/>
                    <EmojiEmotionsIcon fontSize="large"/>
                </div>
            </div>
        </div>
    )
}

export default Chat
