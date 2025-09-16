import { Link } from 'react-router-dom';

function Message() {
    return (
        <div>
            <h1>This is the Message component</h1>
            <Link to="/">Home</Link>
        </div>
    );
}

export default Message;