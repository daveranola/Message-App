import { Link } from 'react-router-dom';
import { userService } from './services/api';
import { useState } from 'react';

function Message() {
    const [userID, setUserID] = useState(null);

    const getUserByID =() => {
        userService.getById(userID) // example with ID 1
        .then(res => console.log(res.data)) // log user data
        .catch(err => console.error(err));
    }

    return (
        <div>
            <h1>This is the Message component</h1>
            <Link to="/">Home</Link>
            <input value={userID} onChange={e => setUserID(e.target.value)} />
            <button onClick={getUserByID}>Get User by ID</button>
        </div>
    );
}

export default Message;