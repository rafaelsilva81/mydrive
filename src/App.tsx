import './styles/main.css';
import { AuthProvider, StorageProvider, useFirebaseApp } from 'reactfire';
import { Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { Workspace } from './pages/Workspace';
import { Login } from './pages/Login';

function App() {

  const auth = getAuth(useFirebaseApp());
  const storage = getStorage(useFirebaseApp());

  return (
    <StorageProvider sdk={storage}>
      <AuthProvider sdk={auth}>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/workspace">
            <Route index element={<Workspace />} />
            <Route path="/workspace/:folderId" element={<Workspace />} />
          </Route>
          <Route
            path='login'
            element={<Login />}
          />
        </Routes>
      </AuthProvider>
    </StorageProvider>
  )
}

export default App
