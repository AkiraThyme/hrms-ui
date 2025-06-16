import { ServerApi } from "@/config/axios"
import _ from "lodash"

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref([])
  const error = ref(null)

  const fetchEmployees = async () => {
    try {
      const response = await ServerApi.get('/employees')
      employees.value = response.data.employees
      error.value = null
    } catch (err) {
      error.value = err.response ? err.response?.data?.message : err.message
      throw err
    }
  }

  // const addEmployee = async (employeeData) => {
  //   try {
  //     const response = await ServerApi.post('/employee', employeeData)
  //     employees.value.push(response.data.employee)
  //     error.value = null
  //     return response.data
  //   } catch (err) {
  //     error.value = err.response ? err.response?.data?.message : err.message
  //     throw err
  //   }
  // }

  return { employees, error, fetchEmployees }
})
