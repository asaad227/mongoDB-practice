import React, { useState } from 'react';

const url = `http://localhost:5000/listings`;
export default function Post() {
  const [post, setPost] = useState('');
  const [summary, setSummary] = useState('');
  const newList = { name: post, summary: summary };

  async function postApi() {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newList),
    });

    return response.json();
  }

  function handleSubmit(e) {
    e.preventDefault();
    postApi();
    setPost('');
    setSummary('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        onChange={(e) => setPost(e.target.value)}
        value={post}
      />
      <input
        name="summary"
        type="text"
        onChange={(e) => setSummary(e.target.value)}
        value={summary}
      />
      <button>Submit</button>
    </form>
  );
}
