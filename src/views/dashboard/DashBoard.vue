<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <main class="dashboard-main">
        <section class="stats-section">
          <div class="stat-card">
            <h2>Total Employees</h2>
            <p>{{ totalEmployees }}</p>
          </div>
          <div class="stat-card">
            <h2>Departments</h2>
            <p>{{ stats.departments }}</p>
          </div>
          <div class="stat-card">
            <h2>Payslips Generated</h2>
            <p>{{ stats.payslipsGenerated }}</p>
          </div>
          <div class="stat-card">
            <h2>Reports</h2>
            <p>{{ stats.reports }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
const stats = ref({
  departments: 8,
  payslipsGenerated: 450,
  reports: 25
})

const totalEmployees = ref(0)
const employeeStore = useEmployeeStore()

const fetchData = async () => {
  try {
    await employeeStore.fetchEmployees()
    console.log(employeeStore.employees?.length)
    totalEmployees.value = employeeStore.employees?.length
  } catch (error) {
    console.error('Error fetching employee data:', error)
  }
}

onMounted(() => {
  try {
    fetchData()
  } catch (error) {
    throw error
  }
})
</script>
