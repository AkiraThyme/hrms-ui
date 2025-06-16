<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li>
            <a @click.prevent="navigateTo('employee')">Employee</a>
          </li>
          <li>
            <a @click.prevent="navigateTo('department')">Department</a>
          </li>
          <li>
            <a @click.prevent="navigateTo('payslip')">Payslip</a>
          </li>
          <li>
            <a @click.prevent="navigateTo('reports')">Reports</a>
          </li>
        </ul>
      </nav>
    </header>
    <main class="dashboard-main">
      <section class="stats-section">
        <div class="stat-card">
          <h2>Total Employees</h2>
          <p>120</p>
        </div>
        <div class="stat-card">
          <h2>Departments</h2>
          <p>8</p>
        </div>
        <div class="stat-card">
          <h2>Payslips Generated</h2>
          <p>450</p>
        </div>
        <div class="stat-card">
          <h2>Reports</h2>
          <p>25</p>
        </div>
      </section>
      <section class="charts-section">
        <div class="chart-container">
          <canvas id="employeeChart"></canvas>
        </div>
        <div class="chart-container">
          <canvas id="departmentChart"></canvas>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "Dashboard",
  methods: {
    navigateTo(section) {
      this.$router.push({ name: section });
    },
    renderCharts() {
      // Employee Chart
      const employeeCtx = document.getElementById("employeeChart").getContext("2d");
      new Chart(employeeCtx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Employees Added",
              data: [10, 20, 15, 25, 30, 40],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      // Department Chart
      const departmentCtx = document.getElementById("departmentChart").getContext("2d");
      new Chart(departmentCtx, {
        type: "pie",
        data: {
          labels: ["HR", "Finance", "IT", "Marketing"],
          datasets: [
            {
              label: "Departments",
              data: [25, 15, 30, 20],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    },
  },
  mounted() {
    this.renderCharts()
  },
}
</script>
