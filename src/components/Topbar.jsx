import React, { Suspense } from 'react';

const WindowControls = React.lazy(() => import('./WindowControls'));

export default function Topbar() {
    return (<div
        id='topbar'
        className='
            width[100] height[45px]
            position[absolute] top[0]
            display[flex] justify-content[space-between]
            box-sizing[border-box]
            z-index[2]
        '
    >
        <img
            src="./resources/icon.png"
            alt="icon"
            className='
                margin[10px] margin-right[0]
            '
        />

        <div
            className='
                -webkit-app-region[drag]
                height[45px] flex-grow[1]
            '
        ></div>

        <div
            className='
                height[80px] width[-webkit-fill-available]
                background[tb-backdrop-color]
                position[fixed] z-index[-1] top[0] left[0] margin[1px] margin-bottom[0]
            '
        ></div>

        <WindowControls
            className='
                margin[12px]
                margin-left[0]
            '
        />
    </div>)
}