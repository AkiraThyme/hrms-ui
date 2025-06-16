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
            <p>{{ stats.totalEmployees }}</p>
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
  totalEmployees: ref(0),
  departments: 8,
  payslipsGenerated: 450,
  reports: 25
})

const employee = useEmployeeStore()

const fetchData = async () => {
  try {
    const response = await employee.getAllEmployees()
    stats.value.totalEmployees = totalEmployees.value
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
}),
</script>
