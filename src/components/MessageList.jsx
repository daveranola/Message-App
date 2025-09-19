function MessageList({messages, getUserNameById}) {
    return (
        <div>
            <h2>Messages List</h2>
            <ul>
                {messages.map(m => (
                    <li key={m.messageId}>
                        <strong>{getUserNameById(m.senderId)}</strong> ➔ <strong>{getUserNameById(m.receiverId)}</strong>: {m.content} <small>({m.timeSent})</small>
                    </li>
                ))}
            </ul>   
        </div>
    );
}

export default MessageList;