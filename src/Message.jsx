import { Link, useNavigate } from 'react-router-dom';
import { userService, messageService } from './services/api';
import { useState, useEffect } from 'react';
import MessageForm from './components/MessageForm';
import MessageSearch from './components/MessageSearch';
import MessageList from './components/MessageList';

function Message({ loggedinId }) {
    const [userID, setUserID] = useState(null);

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

    const addMessage = ( receiverId, content ) => {
        if (!receiverId || !content) return alert("Receiver ID and content are required.");

        const newMessage = { senderId: loggedinId, receiverId, content };
        messageService.create(newMessage)
            .then(() => messageService.getAll()) // refresh messages
            .then(res => {
                setAllMessages(res.data);
                setFoundMessages(res.data); // optional: update search results too
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

            <MessageForm addMessage={addMessage}/>
            <MessageSearch  searchName={searchName} setSearchName={setSearchName} searchMessagesByName={searchMessagesByName} />
            <MessageList messages={foundMessages} getUserNameById={getUserNameById} />
           
        </div>
    );
}

export default Message;
