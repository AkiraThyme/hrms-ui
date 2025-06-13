<template>
  <div class="auth-container">
    <div class="form-container">
      <h1>Register</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" @input="fetchEmployeeId" placeholder="Enter your email"
            required />
        </div>
        <div class="form-group">
          <label for="employee_id">Employee ID</label>
          <input type="text" id="employee_id" v-model="form.employee_id"
            placeholder="Employee ID will be fetched automatically" disabled />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" placeholder="Enter your password" required />
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" placeholder="Enter your name" required />
        </div>
        <button type="submit" class="btn">Register</button>
        <p class="toggle-link">
          Already have an account?
          <span @click="redirectToLogin">Login</span>
        </p>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  setup() {
    const authStore = useAuthStore();
    const form = reactive({
      email: "",
      employee_id: "",
      password: "",
      name: "",
    });
    const error = ref(null);

    const fetchEmployeeId = async () => {
      if (form.email) {
        try {
          form.employee_id = await authStore.fetchEmployeeId(form.email);
        } catch (err) {
          console.error("Failed to fetch employee ID:", err);
          form.employee_id = "";
        }
      } else {
        console.warn("Email is empty or undefined");
      }
    };

    const handleSubmit = async () => {
      try {
        error.value = null;
        await authStore.register({
          email: form.email,
          employee_id: form.employee_id,
          password: form.password,
          name: form.name,
        });
        // Redirect to home or dashboard
      } catch (err) {
        error.value = authStore.error;
      }
    };

    const redirectToLogin = () => {
      // Logic to navigate to the Login page
    };

    return {
      form,
      error,
      handleSubmit,
      fetchEmployeeId,
      redirectToLogin,
    };
  },
};
</script>
