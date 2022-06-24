import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './Feed';
import './App.css';
import SharedLayout from './pages/SharedLayout';
import Error from './pages/Error';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Feed />} />
          <Route path='login' element={<Login></Login>} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
