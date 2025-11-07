import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './Components/Loader';

const LoginPage = lazy(() => import('./Components/LoginPage'));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
