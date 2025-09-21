import { useState } from 'react';

function MessageForm({ addMessage }) {
    const [receiverId, setReceiverId] = useState('');
    const [content, setContent] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (content.trim()) {
            addMessage(receiverId, content);
            setContent('');
        }
    };

    return (
        <form className="message-form" onSubmit={handleSend}>
            <input 
                placeholder="Receiver ID (optional for group chats)" 
                value={receiverId} 
                onChange={e => setReceiverId(e.target.value)}
                className="receiver-input"
            />
            <div className="message-input-wrapper">
                <input 
                    placeholder="Type your message here..." 
                    value={content} 
                    onChange={e => setContent(e.target.value)}
                    className="message-input"
                />
                <button type="submit" className="send-button">Send</button>
            </div>
        </form>
    );
}

export default MessageForm;