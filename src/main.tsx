import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { firebaseConfig } from './firebase.config'
import { FirebaseAppProvider } from 'reactfire';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </FirebaseAppProvider>
)