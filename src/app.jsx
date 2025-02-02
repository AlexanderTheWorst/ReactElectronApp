import React, { Suspense } from 'react';

const Topbar = React.lazy(() => import('./components/Topbar'));
const GameList = React.lazy(() => import('./components/GameList'));

export default function App() {
    return <div
        id='container'
        className='
            width[100]
            height[100]
        '
    >
        <GameList />
        <Topbar />
    </div>
}
