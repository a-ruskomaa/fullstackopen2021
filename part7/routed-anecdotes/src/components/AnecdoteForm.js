import React from 'react';
import { useHistory } from "react-router-dom";
import useField from '../hooks/useField';

const AnecdoteForm = ({ addNew, showNotification }) => {
  const { reset: resetContent, ...contentField } = useField('text')
  const { reset: resetAuthor, ...authorField } = useField('text')
  const { reset: resetInfo, ...infoField } = useField('text')

  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0
    });
    showNotification(`a new anecdote: ${contentField.value}`, 10);
    history.push('/');
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...infoField} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );

};


export default AnecdoteForm