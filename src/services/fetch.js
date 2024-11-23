
import { BASE_URL } from "./baseURL"

const ROUTES = {
  BASE_URL: `${BASE_URL}/api/v1`,
  TODOS: 'todos',
}

const get = async ({ url, id = null, searchParams = null, downloadFile = false, auth = true, token = null }) => {
  try {
    let headers = {}
    let newurl = url


    if (id) newurl = newurl + '/' + id
    else if (searchParams) {
      const queryParams = new URLSearchParams(searchParams).toString()

      newurl = `${newurl}?${queryParams}`
    }

    let promise = await fetch(`${ROUTES.BASE_URL}/${newurl}`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers
    })

    if (!promise.ok) {
      const errorData = await promise.json()

      return Promise.reject(errorData)
    }


    if (promise.status === 200) {
        let res = await promise.json()

        return res

    } else return null
  } catch (error) {
    console.log('GET ', error)

    return null
  }
}

const post = async ({ url, body, isFormData = false, auth = true, searchParams = null, token = null }) => {
  try {
    let headers = {
      Accept: 'application/json, text/plain, */*'
    }


    if (!isFormData) headers['Content-Type'] = 'application/json'

    if (searchParams) {
      const queryParams = new URLSearchParams(searchParams).toString()

      url = `${url}?${queryParams}`
    }

    let promise = await fetch(`${ROUTES.BASE_URL}/${url}`, {
      method: 'POST',
      headers,
      body: isFormData ? body : JSON.stringify(body)
    })

    if (!promise.ok) {
      const errorData = await promise.json()

      return Promise.reject(errorData)
    }

    let data = await promise.json()

    return data
  } catch (ex) {
    if (ex instanceof TypeError && ex.message === 'Failed to fetch') {
      throw new Error('Network Error: Please check your internet connection')
    }

    throw new Error(ex)
  }
}

const update = async ({ url, id = null, body = {}, isFormData = false, auth = true }) => {
  try {
    let headers = {
      Accept: 'application/json, text/plain, */*'
    }

    if (!isFormData) headers['Content-Type'] = 'application/json'

    let promise = await fetch(id ? `${ROUTES.BASE_URL}/${url}/${id}` : `${ROUTES.BASE_URL}/${url}`, {
      method: 'PUT',
      headers,
      body: isFormData ? body : JSON.stringify(body)
    })

    if (!promise.ok) {
      const errorData = await promise.json()

      return Promise.reject(errorData)
    }

    if (promise.status === 200) {
      let res = await promise.json()

      return res
    } else return null
  } catch (error) {
    throw new Error(error)
  }
}

const remove = async ({ url, ids = [], auth = true }) => {
  try {
    let headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }

    let promise = await fetch(`${ROUTES.BASE_URL}/${url}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ ids })
    })

    if (!promise.ok) {
      const errorData = await promise.json()

      return Promise.reject(errorData)
    }

    let data = await promise.json()

    return data
  } catch (ex) {
    if (ex instanceof TypeError && ex.message === 'Failed to fetch') {
      throw new Error('Network Error: Please check your internet connection')
    }

    throw new Error(ex)
  }
}

const FETCH = { get, post, update, remove }

export { FETCH, ROUTES }
