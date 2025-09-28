import { useState } from 'react';

function MessageForm({ addMessage }) {
    const [content, setContent] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (content.trim()) {
            addMessage(content);
            setContent('');
        }
    };

    return (
        <form className="message-form" onSubmit={handleSend}>
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