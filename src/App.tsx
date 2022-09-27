import './styles/main.css';
import { AuthProvider, StorageProvider, useFirebaseApp } from 'reactfire';
import { Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

function App() {

  const auth = getAuth(useFirebaseApp());
  const storage = getStorage(useFirebaseApp());

  return (
    <StorageProvider sdk={storage}>
      <AuthProvider sdk={auth}>
        <Routes>
          <Route path='/'>
            <Route index element={<Dashboard />} />
            <Route
              path='login'
              element={<Login />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </StorageProvider>
  )
}

export default App
