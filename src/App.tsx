import './styles/main.css';
import { AuthProvider, StorageProvider, useFirebaseApp } from 'reactfire';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {Loadable, FullscreenLoader} from './components/common/Loading';
import { lazy } from 'react';

/* lazy import pages using Loadable */
const Login = Loadable(lazy(() => import('./pages/Login')), FullscreenLoader);
const Workspace = Loadable(lazy(() => import('./pages/Workspace')), FullscreenLoader);

function App() {

  const auth = getAuth(useFirebaseApp());
  const storage = getStorage(useFirebaseApp());

  return (
    <StorageProvider sdk={storage}>
      <AuthProvider sdk={auth}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workspace/*" element={<Workspace />} />
        </Routes>
      </AuthProvider>
    </StorageProvider>
  )
}

export default App
