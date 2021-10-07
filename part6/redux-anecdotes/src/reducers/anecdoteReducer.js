import anecdoteService from '../services/anecdoteService'

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

export const insertAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'INSERT',
      data: { anecdote },
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
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
      return state.concat(action.data.anecdote)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer
