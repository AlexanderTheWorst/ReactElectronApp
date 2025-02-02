import React, { useState } from 'react';

function Test({ content, clicked }) {
    return <button onClick={() => clicked()}>{content.title}</button>
}

export default function GameList() {
    let [entries, setEntry] = useState([
        { title: "Test game 1", key: 0 },
        { title: "Test game 2", key: 1 }
    ]);

    // Function to remove an entry by key
    const removeEntry = (key) => {
        setEntry((prev) => prev.filter(entry => entry.key !== key));
    };

    return (
        <div
            id="GameList"
            className="
                height[GL_HEIGHT] width[100]
                display[flex]
                position[absolute] top[0] 
                z-index[0]
                padding-top[50px] margin-top[1px]
            "
        >
            {entries.map((entry) => (
                <Test key={entry.key} content={entry} clicked={() => removeEntry(entry.key)} />
            ))}

            <button onClick={() => {
                setEntry((prev) => [
                    ...prev,
                    { title: (Math.floor(Math.random() * 1000)).toString(), key: prev.length }
                ]);
            }}>Add entry</button>
        </div>
    );
}
