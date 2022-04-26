import './App.css';
import React from 'react';
import Comments from '../comments';
import Post from '../Post';

function App() {
  return (
    <div className="app">
      <Comments />
      <Post />
    </div>
  );
}

export default App;
