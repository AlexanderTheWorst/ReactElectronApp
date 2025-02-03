import React, { useState, Suspense } from 'react';

const GameBanner = React.lazy(() => import('./GameBanner'));

export default function GameList() {
    let [entries, setEntry] = useState([
        { Game: 'Test game 1', key: 0 },
        { Game: 'Test game 2', key: 1 },
        { Game: 'Test game 3', key: 2 },
        { Game: 'Test game 4', key: 3 },
        { Game: 'Test game 5', key: 4 },
        { Game: 'Test game 6', key: 5 }
    ]);

    // Function to remove an entry by key
    const removeEntry = (key) => {
        setEntry((prev) => prev.filter(entry => entry.key !== key));
    };

    return (
        <div
            id='GameList'
            className='
                no-scrollbar

                height[-webkit-fill-available] width[-webkit-fill-available]
                display[flex] flex-wrap[wrap] gap[10px] justify-content[start] align-content[flex-start]
                overflow-y[scroll] padding-left[9px] padding-right[10px] padding-bottom[10px] padding-top[50px] 
                z-index[0] 
                position[absolute] top[0] margin-top[1px] margin-bottom[1px]
            '
        >
            {entries.map((entry) => (
                <GameBanner key={entry.key} content={entry} clicked={() => removeEntry(entry.key)} />
            ))}

            <button onClick={() => {
                setEntry((prev) => [
                    ...prev,
                    { Game: (Math.floor(Math.random() * 1000)).toString(), key: prev.length }
                ]);
            }}>Add entry</button>
        </div>
    );
}
