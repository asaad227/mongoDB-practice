import './App.css';
import React, { useState } from 'react';
const url = `http://localhost:5000/listings`;

function App() {
  const [data, setData] = useState([]);

  async function getApi() {
    const response = await fetch(`${url}`);
    const data = await response.json();
    const { payload } = data;
    setData(payload);
    console.log(payload);
  }

  getApi();

  return (
    <div>
      {data.map((e) => (
        <div>{e.name}</div>
      ))}
    </div>
  );
}

export default App;
