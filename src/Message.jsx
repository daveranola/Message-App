import { Link, useNavigate } from 'react-router-dom';
import { userService, messageService } from './services/api';
import { useState } from 'react';
import { useEffect } from 'react';

function Message( {loggedinId} ) {
    const [userID, setUserID] = useState(null);
    
    const [messages, setMessages] = useState([]);
     
    const [receiverId, setReceiverId] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedinId) {
            navigate('/'); // redirect to home if not logged in
            return;
        }
        messageService.getAll()
        .then(res => setMessages(res.data))
        // res.data = json array which messageService.getAll() returns
        .catch(err => console.error(err));
    }, [loggedinId, navigate]);


    const getUserByID =() => {
        userService.getById(userID) // example with ID 1
        .then(res => console.log(res.data)) // log user data
        .catch(err => console.error(err));
    }

    const addMessage = () => {
        const newMessage = { senderId: loggedinId, receiverId, content };
        messageService.create(newMessage)
        .then(res => {
            console.log(res.data); // "Saved"
            return messageService.getAll(); // refresh list
        })
        .then(res => setMessages(res.data))
        .catch(err => console.error(err));
    }

    return (
        <div>
            <h1>This is the Message component</h1>
            <Link to="/">Home</Link>
            <input value={userID} onChange={e => setUserID(e.target.value)} />
            <button onClick={getUserByID}>Get User by ID</button>

            <h1>Users</h1>
            <ul>
                {messages.map(u => (
                <li key={u.messageId}>{u.senderId} - {u.receiverId} - {u.content} - {u.timeSent}</li>
                ))}
            </ul>

            <h1>Add Message</h1>
            <input placeholder="Receiver ID" value={receiverId} onChange={e => setReceiverId(e.target.value)} />
            <input placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
            {/* this shit wont work if there is a null value in sender/reciever id */}
            <button onClick={addMessage}>Send Message</button>

            

        </div>
    );
}

export default Message;