import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { firebaseConfig } from './firebase.config'
import { FirebaseAppProvider } from 'reactfire';
import { Loading } from './components/common/Loading'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
    <React.Suspense fallback={<Loading />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Suspense>
  </FirebaseAppProvider>
)