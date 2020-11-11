import * as React from 'react';
import Header from './components/header/header';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Center from './components/center/center';
import Boards from './components/boards/boards';
import AddBoard from './components/addBoard/addBoard'
import {AuthProvider} from './context/authContext';
import {Routes, Route} from 'react-router-dom';


function App() {
    return (
        <div className="app">
            <AuthProvider>
                <Header />
                <AddBoard />
                <Center>
                    <Boards />
                    <Routes>
                        <Route path="/signup">
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
