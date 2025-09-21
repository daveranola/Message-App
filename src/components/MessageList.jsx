function MessageList({ messages, getUserNameById, currentUserId }) {
    // Function to format time to military format without seconds
    const formatTime = (timeString) => {
        if (!timeString) return '';
        
        try {
            const date = new Date(timeString);
            // Check if date is valid
            if (isNaN(date.getTime())) return timeString;
            
            // Format to HH:MM (24-hour format)
            return date.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting time:', error);
            return timeString;
        }
    };

    return (
        <div className="message-list">
            {messages.length === 0 ? (
                <div className="no-messages">No messages yet. Start a conversation!</div>
            ) : (
                messages.map(m => (
                    <div 
                        key={m.messageId} 
                        className={`message ${m.senderId === currentUserId ? 'own-message' : ''}`}
                    >
                        <div className="message-header">
                            <span className="message-sender">{getUserNameById(m.senderId)}</span>
                            <span className="message-time">{formatTime(m.timeSent)}</span>
                        </div>
                        <div className="message-content">{m.content}</div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MessageList;