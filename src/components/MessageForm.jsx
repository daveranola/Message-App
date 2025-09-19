import { useState } from 'react';

function MessageForm({ addMessage }) {
    const [receiverId, setReceiverId] = useState('');
    const [content, setContent] = useState('');

    
    const handleSend = () => {
        addMessage(receiverId, content);
        setReceiverId('');
        setContent('');
    };

    return (
        <div>
            <div>
                <h2>Add Message</h2>
                <input placeholder="Receiver ID" value={receiverId} onChange={e => setReceiverId(e.target.value)} />
                <input placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
                <button onClick={handleSend}>Send Message</button>
            </div>
        </div>
    );
}

export default MessageForm;
