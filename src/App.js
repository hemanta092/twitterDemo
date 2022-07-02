import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './Feed';
import './App.css';
import SharedLayout from './pages/SharedLayout';
import Error from './pages/Error';
import Login from './pages/Login';
import MyTweets from './pages/MyTweets';
import AllUsers from './pages/AllUsers';
import SearchUser from './pages/SearchUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Feed />} />
          <Route path='*' element={<Error />} />
          <Route path='my_tweets' element={<MyTweets />} />
          <Route path='all_users' element={<AllUsers />} />
          <Route path='search_users' element={<SearchUser />} />
        </Route>
        <Route path='/login' exact element={<Login></Login>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
