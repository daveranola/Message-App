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
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const navigate = useNavigate();

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        scrollToBottom();
    }, [allMessages, foundMessages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Fetch messages function
    const fetchMessages = () => {
        messageService.getAll()
            .then(res => {
                setAllMessages(res.data);
                // If searching, apply the filter to new messages
                if (searchName) {
                    const matchedUsers = allUsers.filter(u =>
                        u.name.toLowerCase().includes(searchName.toLowerCase())
                    );
                    const matchedIds = matchedUsers.map(u => u.id);
                    const filteredMessages = res.data.filter(m =>
                        matchedIds.includes(m.senderId) || matchedIds.includes(m.receiverId)
                    );
                    setFoundMessages(filteredMessages);
                } else {
                    setFoundMessages(res.data);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    };

    // Fetch users function
    const fetchUsers = () => {
        userService.getAll()
            .then(res => setAllUsers(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        if (!loggedinId) {
            navigate('/'); // redirect to home if not logged in
            return;
        }

        // Initial fetch
        fetchMessages();
        fetchUsers();

        // Set up polling every 2 seconds (adjust as needed)
        const messageIntervalId = setInterval(fetchMessages, 2000);
        const userIntervalId = setInterval(fetchUsers, 10000); // Less frequent for users

        // Clean up intervals on component unmount
        return () => {
            clearInterval(messageIntervalId);
            clearInterval(userIntervalId);
        };
    }, [loggedinId, navigate]);

    // Update search when searchName or allMessages/allUsers change
    useEffect(() => {
        if (searchName) {
            const matchedUsers = allUsers.filter(u =>
                u.name.toLowerCase().includes(searchName.toLowerCase())
            );
            const matchedIds = matchedUsers.map(u => u.id);
            const messages = allMessages.filter(m =>
                matchedIds.includes(m.senderId) || matchedIds.includes(m.receiverId)
            );
            setFoundMessages(messages);
        } else {
            setFoundMessages(allMessages);
        }
    }, [searchName, allMessages, allUsers]);

    const addMessage = (receiverId, content) => {
        if (!receiverId || !content) return alert("Receiver ID and content are required.");

        const newMessage = { senderId: loggedinId, receiverId, content };
        messageService.create(newMessage)
            .then(() => {
                // Fetch messages immediately after sending
                fetchMessages();
            })
            .catch(err => console.error(err));
    };

    const searchMessagesByName = () => {
        // This is now handled by the useEffect above
        // Just trigger the search by updating searchName state
        if (!searchName) {
            setFoundMessages(allMessages);
        }
        // The useEffect will handle the actual filtering
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
                        {isLoading ? (
                            <div className="loading">Loading messages...</div>
                        ) : (
                            <>
                                <MessageList 
                                    messages={foundMessages} 
                                    getUserNameById={getUserNameById} 
                                    currentUserId={loggedinId}
                                />
                                <div ref={messagesEndRef} />
                            </>
                        )}
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