import * as React from 'react';
import Header from './components/header/header';
import AuthChecker from './components/authChecker';
import RenderedRoutes from './components/routes';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <AuthChecker>
          <Header />
          <RenderedRoutes />
        </AuthChecker>
      </AuthProvider>
    </div>
  );
}
export default App;
