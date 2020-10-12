import React from 'react';
import Header from './components/header/header';
import Login from './components/login/login';
import Center from './components/center/center';

function App() {
    return (
        <div className="app">
            <Header />
            <Center>
                <Login />
            </Center>
        </div>
    );
}

export default App;
