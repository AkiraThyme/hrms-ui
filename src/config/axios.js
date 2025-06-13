import axios from "axios"

import _ from "lodash"

export const ServerApi = (() => {

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      'secret-key': import.meta.env.VITE_SECRET_KEY
    }
  })

  instance.interceptors.request.use(
    config => {
      if (localStorage.token) {
        config.headers.Authorization = `Bearer ${localStorage.token}`
      }

      return config
    },
    error => Promise.reject(error)
  )

  instance.interceptors.response.use(
    config => config,
    error => {
      const statusCode = _.get(error, 'response.status')

      if (statusCode === 422) {
        const validationError = _.get(error, 'response.data.validationError')
        const errorStore = useErrorStore()
        errorStore.obj = validationError
      }

      return Promise.reject(error)
    }
  )

  return instance
})()
