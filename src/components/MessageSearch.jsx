function MessageSearch({ searchName, setSearchName, searchMessagesByName }) {
    return (
        <div>
            <h2>Search Messages by User Name</h2>
            <input
                placeholder="Enter user name"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
            />
            <button onClick={searchMessagesByName}>Search</button>
        </div>
    );
}

export default MessageSearch;
