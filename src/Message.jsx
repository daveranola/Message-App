import { Link, useNavigate } from 'react-router-dom';
import { userService, messageService } from './services/api';
import { useState, useEffect } from 'react';

function Message({ loggedinId }) {
    const [userID, setUserID] = useState(null);
    const [receiverId, setReceiverId] = useState('');
    const [content, setContent] = useState('');

    const [searchName, setSearchName] = useState('');
    const [foundMessages, setFoundMessages] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allMessages, setAllMessages] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedinId) {
            navigate('/'); // redirect to home if not logged in
            return;
        }

        // Fetch all messages
        messageService.getAll()
            .then(res => setAllMessages(res.data))
            .catch(err => console.error(err));

        // Fetch all users
        userService.getAll()
            .then(res => setAllUsers(res.data))
            .catch(err => console.error(err));
    }, [loggedinId, navigate]);

    const getUserByID = () => {
        userService.getById(userID)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    };

    const addMessage = () => {
        if (!receiverId || !content) return alert("Receiver ID and content are required.");

        const newMessage = { senderId: loggedinId, receiverId, content };
        messageService.create(newMessage)
            .then(() => messageService.getAll()) // refresh messages
            .then(res => {
                setAllMessages(res.data);
                setFoundMessages(res.data); // optional: update search results too
                setReceiverId('');
                setContent('');
            })
            .catch(err => console.error(err));
    };

    const searchMessagesByName = () => {
        if (!searchName) return setFoundMessages(allMessages);

        const matchedUsers = allUsers.filter(u =>
            u.name.toLowerCase().includes(searchName.toLowerCase())
        );
        const matchedIds = matchedUsers.map(u => u.id);

        const messages = allMessages.filter(m =>
            matchedIds.includes(m.senderId) || matchedIds.includes(m.receiverId)
        );
        setFoundMessages(messages);
    };

    const getUserNameById = (id) => {
        const user = allUsers.find(u => u.id === id);
        return user ? user.name : `User #${id}`;
    };

    return (
        <div>
            <h1>Messages</h1>
            <Link to="/">Home</Link>

            <div>
                <h2>Get User by ID</h2>
                <input value={userID || ''} onChange={e => setUserID(e.target.value)} placeholder="User ID" />
                <button onClick={getUserByID}>Get User</button>
            </div>

            <div>
                <h2>Add Message</h2>
                <input placeholder="Receiver ID" value={receiverId} onChange={e => setReceiverId(e.target.value)} />
                <input placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
                <button onClick={addMessage}>Send Message</button>
            </div>

            <div>
                <h2>Search Messages by User Name</h2>
                <input placeholder="Enter user name" value={searchName} onChange={e => setSearchName(e.target.value)} />
                <button onClick={searchMessagesByName}>Search</button>
            </div>

            <div>
                <h2>Messages List</h2>
                <ul>
                    {foundMessages.map(m => (
                        <li key={m.messageId}>
                            <strong>{getUserNameById(m.senderId)}</strong> ➔ <strong>{getUserNameById(m.receiverId)}</strong>: {m.content} <small>({m.timeSent})</small>
                        </li>
                    ))}
                </ul>   

            </div>
        </div>
    );
}

export default Message;
