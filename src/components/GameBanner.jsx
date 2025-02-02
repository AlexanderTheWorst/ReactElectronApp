import React from 'react';

export default function GameBanner({ game, key }) {
    return (<div
        key={key}
        className='
            width[200px] height[300px]
            position[relative]
        '
    >
        <img
            src="https://cdn2.steamgriddb.com/grid/0e3900565e35576ba54faf1c53093932.png"
            alt="Helldivers 2"
            className='
                width[100] height[100]
            '
        />
    </div>)
}