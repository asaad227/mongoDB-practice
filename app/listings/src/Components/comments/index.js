import React, { useEffect, useState } from 'react';
const url = `http://localhost:5000/listings`;
export default function Comments() {
  const [data, setData] = useState([]);

  async function getApi() {
    const response = await fetch(`${url}`);
    const data = await response.json();
    const { payload } = data;
    setData(payload);
    console.log(payload);
  }
  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      {data.map((e) => (
        <div key={e._id}>{e.name}</div>
      ))}
    </div>
  );
}
