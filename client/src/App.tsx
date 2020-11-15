import * as React from 'react';
import Header from './components/header/header';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Center from './components/center/center';
import Boards from './components/boards/boards';
import { AuthProvider } from './context/authContext';
import { Routes, Route } from 'react-router-dom';


function App() {
    return (
        <div className="app">
            <AuthProvider>
                <Header />
                <Center>
                    <Boards />
                    <Routes>
                        <Route path="/">
                            <Signup />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Routes>
                </Center>
            </AuthProvider>
        </div>
    );
}

export default App;
