import { ServerApi } from "@/config/axios"
import _ from "lodash"

export const useAuthStore = defineStore('auth', () => {
  const user = ref({})
  const isAuthenticated = ref(false)
  const error = ref(null)

  const login = async (credentials) => {
    try {
      const response = await ServerApi.post('/auth/login', credentials)
      user.value = response.data.user
      isAuthenticated.value = true
      error.value = null

      return response.data
    } catch (err) {
      error.value = err.response ? err.response?.data?.message : err.message
      isAuthenticated.value = false
      throw err
    }
  }

  const register = async (userData) => {
    try {
      const response = await ServerApi.post('/auth/register', userData)
      user.value = response.data.user
      isAuthenticated.value = true
      error.value = null

      return response.data
    } catch (err) {
      error.value = err.response ? err.response?.data?.message : err.message
      isAuthenticated.value = false
      throw err
    }
  }

  const employeeRegister = async (employeeData) => {
    try {
      const response = await ServerApi.post('/auth/register/employee', employeeData)
      error.value = null
      return response.data
    } catch (err) {
      error.value = err.response ? err.response?.data?.message : err.message
      throw err
    }
  }

  const fetchEmployeeId = async (email) => {
    try {
      const response = await ServerApi.get(`/auth/fetch/employee`, {
        params: { email },
      })
      return response.data.emp_id
    } catch (err) {
      console.error("Failed to fetch employee ID:", err)
      throw err
    }
  }

  const logout = () => {
    user.value = {}
    isAuthenticated.value = false
    error.value = null
  }

  return {
    user,
    isAuthenticated,
    error,
    login,
    register,
    employeeRegister,
    fetchEmployeeId, // Added fetchEmployeeId method
    logout
  }

})
