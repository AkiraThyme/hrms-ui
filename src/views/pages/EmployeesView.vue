<template>
  <div class="employees-container">
    <Breadcrumbs />
    <header class="employees-header">
      <h1>Employees</h1>
      <div class="employees-actions">
        <input type="text" v-model="searchQuery" placeholder="Search employees..." class="search-input" />
        <button @click="openAddModal" class="add-button">
          <MaterialSymbolsGroupAddRounded />
        </button>
        <button @click="refreshTable" class="refresh-button" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          <span v-else>
            <MaterialSymbolsRefreshRounded />
          </span>
        </button>
      </div>
    </header>
    <main>
      <SlotTable :items="formattedEmployees" :badgeColumns="{
        is_active: {
          classes: { 'Active': 'active', 'Inactive': 'inactive' },
          textMap: { 'Active': 'Active', 'Inactive': 'Inactive' }
        }
      }" @edit="openEditModal" @delete="deleteItem" />
    </main>
  </div>
</template>

<script setup>
import MaterialSymbolsGroupAddRounded from '~icons/material-symbols/group-add-rounded'
import MaterialSymbolsRefreshRounded from '~icons/material-symbols/refresh-rounded'
import { format } from 'date-fns'

const employeeStore = useEmployeeStore()
const searchQuery = ref('')
const isLoading = ref(false)

const filteredEmployees = computed(() => {
  if (!searchQuery.value) {
    return employeeStore.employees
  }
  const query = searchQuery.value.toLowerCase()
  return employeeStore.employees?.filter((employee) => {
    const fullName = `${employee.fname} ${employee.lname}`.toLowerCase()
    const email = employee.email.toLowerCase()
    return fullName.includes(query) || email.includes(query)
  })
})

const formattedEmployees = computed(() => {
  return filteredEmployees.value.map(emp => {
    const jobTitles = { 1: 'Software Developer', 2: 'HR Associate' }

    return {
      id: emp.id,
      fname: emp.fname,
      lname: emp.lname,
      email: emp.email,


      hire_date: format(new Date(emp.hire_date), 'MMM dd, yyyy'),

      job_id: jobTitles[emp.job_id] || 'Unknown',

      is_active: emp.is_active ? 'Active' : 'Inactive',
    }
  })
})

const openAddModal = () => {
  console.log('Open Add Modal')
}

const openEditModal = (item) => {
  console.log('Open Edit Modal for:', item)
}

const deleteItem = (id) => {
  employeeStore.deleteEmployee(id)
}

const refreshTable = async () => {
  isLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate 2-second loading
    await employeeStore.fetchEmployees()
    console.log('Table refreshed')
  } catch (error) {
    console.error('Failed to refresh table:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(refreshTable)
</script>
