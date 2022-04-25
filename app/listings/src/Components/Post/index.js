import React, { useState } from 'react';

const url = `http://localhost:5000/listings`;
export default function Post() {
  const [post, setPost] = useState('');
  const [summary, setSummary] = useState('');
  const [bedroom, setBedroom] = useState('');
  const newList = { name: post, summary: summary, bedroom: bedroom };

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
    setBedroom('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        onChange={(e) => setPost(e.target.value)}
        placeholder="name"
        value={post}
      />
      <input
        name="summary"
        type="text"
        onChange={(e) => setSummary(e.target.value)}
        placeholder="summary"
        value={summary}
      />

      <input
        name="bedroom"
        onChange={(e) => setBedroom(e.target.value)}
        placeholder="bedroom"
        value={bedroom}
      />
      <button>Submit</button>
    </form>
  );
}
