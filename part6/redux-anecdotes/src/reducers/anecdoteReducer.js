const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

export const insertAnecdote = (anecdote) => {
  return {
    type: 'INSERT',
    data: { anecdote },
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes,
  }
}

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      return state
        .map((item) =>
          item.id === action.data.id ? { ...item, votes: item.votes + 1 } : item
        )
        .sort((a, b) => b.votes - a.votes)
    case 'INSERT':
      return state.concat(asObject(action.data.anecdote))
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer
