import React, { Suspense } from 'react';

const WindowControls = React.lazy(() => import('./WindowControls'));

export default function Topbar() {
    return (<div
        id='topbar'
        className='
            -webkit-app-region[drag]
            width[100] height[45px]
            position[absolute] top[0]
            display[flex] justify-content[space-between]
            padding[10px] box-sizing[border-box]
            z-index[2]
        '
    >
        <img src="./resources/icon.png" alt="icon" />

        <WindowControls />
    </div>)
}