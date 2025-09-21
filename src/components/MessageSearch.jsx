function MessageSearch({ searchName, setSearchName, searchMessagesByName }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        searchMessagesByName();
    };

    const clearSearch = () => {
        setSearchName('');
        searchMessagesByName();
    };

    return (
        <div className="messages-search">
            <form onSubmit={handleSubmit} className="search-container">
                <input
                    className="search-input"
                    placeholder="Search messages by username..."
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    type="text"
                />
                {searchName && (
                    <button 
                        type="button" 
                        className="search-clear"
                        onClick={clearSearch}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
        </div>
    );
}

export default MessageSearch;