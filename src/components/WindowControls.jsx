import React from 'react'

export default function WindowControls(props) {
    let className=' display[flex] gap[6px] height[auto] '

    return (<div
        id="window-controls"
        className={className + (props.className || '')}
    >
        <img onClick={() => electron.minimize()} src="./resources/window-controls-icons/Minimize.png" alt="icon" />
        <img onClick={async (event) => {
            let fullscreen = './resources/window-controls-icons/ExitFullscreen.png';
            let notFullscreen = './resources/window-controls-icons/Fullscreen.png';
            let result = await electron.try_fullscreen();
            console.log(result)
            console.log(result === 0 ? notFullscreen : fullscreen)
            event.target.src = result === 1 ? fullscreen : notFullscreen;
        }} src="./resources/window-controls-icons/Fullscreen.png" alt="icon" />
        <img onClick={() => electron.close()} src="./resources/window-controls-icons/Close.png" alt="icon" />
    </div>)
}