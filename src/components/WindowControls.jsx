import React from 'react'

export default function WindowControls() {
    return (<div
        id="window-controls"
        className='
            display[flex] gap[5px] height[auto] padding[1px]
        '
    >
        <img src="./resources/window-controls-icons/Minimize.png" alt="icon" />
        <img src="./resources/window-controls-icons/Fullscreen.png" alt="icon" />
        <img src="./resources/window-controls-icons/Close.png" alt="icon" />
    </div>)
}