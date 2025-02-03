import React from 'react';

export default function GameBanner({ game, key }) {
    return (<div
        key={key}
        className='
            width[200px] height[300px]
            position[relative] 
            overflow[hidden] border-radius[10px]
        '
    >
        <img
            src="https://cdn2.steamgriddb.com/grid/0e3900565e35576ba54faf1c53093932.png"
            alt="Helldivers 2"
            className='
                width[100] height[100]
                z-index[1]
            '
        />

        <div 
            className='
                width[100] height[fit-content]
                padding[12px]
                position[absolute] bottom[0] z-index[2]
                backdrop-filter[gb-blur-banner]
                background[gb-blurred-banner]
                box-shadow[gb-box-shadow]

                color[white] font-weight[bold]
            '
        >
            <p>HELLDIVERS™ 2</p>
        </div>
    </div>)
}