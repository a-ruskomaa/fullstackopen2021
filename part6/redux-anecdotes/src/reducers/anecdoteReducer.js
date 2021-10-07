import anecdoteService from '../services/anecdoteService'

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'UPDATE',
      data: { updatedAnecdote },
    })
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
  switch (action.type) {
    case 'UPDATE':
      const updatedAnecdote = action.data.updatedAnecdote
      return state
        .map((item) =>
          item.id === updatedAnecdote.id ? updatedAnecdote : item
        )
        .sort((a, b) => b.votes - a.votes)
    case 'INSERT':
      return state.concat(action.data.anecdote)
    case 'INIT':
      return action.data.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export default anecdoteReducer
