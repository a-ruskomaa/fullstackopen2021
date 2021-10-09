import React from 'react';
import { useHistory } from "react-router-dom";
import useField from '../hooks/useField';

const AnecdoteForm = ({ addNew, showNotification }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    showNotification(`a new anecdote: ${content.value}`, 10);
    history.push('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );

};


export default AnecdoteForm