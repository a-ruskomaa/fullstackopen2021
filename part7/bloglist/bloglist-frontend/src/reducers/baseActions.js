const getAll = (baseService, actionName) => {
  return () => {
    return async (dispatch) => {
      const objects = await baseService.getAll()
      dispatch({
        type: actionName,
        data: objects,
      })
    }
  }
}

const create = (baseService, actionName) => {
  return (content) => {
    return async (dispatch) => {
      const object = await baseService.create(content)
      dispatch({
        type: actionName,
        data: { object },
      })
    }
  }
}

const update = (baseService, actionName) => {
  return (content) => {
    return async (dispatch) => {
      const updatedObject = await baseService.update(content)
      dispatch({
        type: actionName,
        data: { updatedObject },
      })
    }
  }
}

const remove = (baseService, actionName) => {
  return (id) => {
    return async (dispatch) => {
      await baseService.delete(id)
      dispatch({
        type: actionName,
        data: { id },
      })
    }
  }
}

const baseActions = {
  getAll,
  create,
  update,
  remove
}


export default baseActions
