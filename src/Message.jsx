import { Link, useNavigate } from 'react-router-dom';
import { userService, messageService } from './services/api';
import { useState, useEffect, useRef } from 'react';
import MessageForm from './components/MessageForm';
import MessageSearch from './components/MessageSearch';
import MessageList from './components/MessageList';
import UserList from './components/UserList';
import './Message.css'; 

function Message({ loggedinId }) {
    const [userID, setUserID] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [foundMessages, setFoundMessages] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const navigate = useNavigate();

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        scrollToBottom();
    }, [allMessages, foundMessages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!loggedinId) {
            navigate('/'); // redirect to home if not logged in
            return;
        }

        // Fetch all messages
        messageService.getAll()
            .then(res => {
                setAllMessages(res.data);
                setFoundMessages(res.data); // Initialize with all messages
            })
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
                setFoundMessages(res.data); 
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
        <div className="messages-container">
            <header className="messages-header">
                <h1>Messages</h1>
                <Link to="/" className="home-link">Home</Link>
            </header>

            <div className="messages-content">
                <div className="messages-main">
                    <div className="messages-search">
                        <MessageSearch 
                            searchName={searchName} 
                            setSearchName={setSearchName} 
                            searchMessagesByName={searchMessagesByName} 
                        />
                    </div>
                    
                    <div className="messages-list-container">
                        <MessageList 
                            messages={foundMessages} 
                            getUserNameById={getUserNameById} 
                            currentUserId={loggedinId}
                        />
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="message-input-container">
                        <MessageForm addMessage={addMessage} />
                    </div>
                </div>
                
                <aside className="users-sidebar">
                    <UserList users={allUsers} />
                </aside>
            </div>
        </div>
    );
}

export default Message;