import { FETCH, ROUTES } from "./fetch"

const fetchTodos = async () => {
    try {
        const response = await FETCH.get({ url: ROUTES.TODOS})

        return [response.data, null]
    } catch (error) {
        return [null, error]
    }
}

const getTodo = async (id) => {
    try {
        const response = await FETCH.get({ url: ROUTES.TODOS, id})

        return [response.data, null]
    } catch (error) {
        return [null, error]
    }
}

const createTodos = async ({ body }) => {
    console.log("🚀 ~ createTodos ~ body:", body)
    try {
        const response = await FETCH.post({ url: ROUTES.TODOS, body })

        return [response.data, null]
    } catch (error) {
        return [null, error]
    }
}

const updateTodos = async ({ body, id }) => {
    try {
        const response = await FETCH.update({ url: ROUTES.TODOS, body, id })

        return [response.data, null]
    } catch (error) {
        return [null, error]
    }
}

const removeTodos = async (idsToRemove) => {
    try {
        const response = await FETCH.remove({ url: ROUTES.TODOS, ids: idsToRemove })

        return [response, null]
    } catch (error) {
        return [null, error]
    }
}

export {
    fetchTodos,
    getTodo,
    createTodos,
    updateTodos,
    removeTodos
}
