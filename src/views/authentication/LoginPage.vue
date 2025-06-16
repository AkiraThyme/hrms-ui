<template>
  <div class="auth-container">
    <div class="form-container">
      <h1>Login</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="btn">Login</button>
        <p class="toggle-link">
          Don't have an account?
          <span @click="redirectToRegister">Register</span>
        </p>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: "Login",
  setup() {
    const authStore = useAuthStore();
    const form = reactive({
      email: "",
      password: "",
    });
    const error = ref(null);

    const handleSubmit = async () => {
      try {
        error.value = null;
        await authStore.login({
          email: form.email,
          password: form.password,
        });
        router.push({ name: 'home' });
      } catch (err) {
        error.value = authStore.error;
      }
    };

    const redirectToRegister = () => {
      router.push({ name: 'register' });
    };

    return {
      form,
      error,
      handleSubmit,
      redirectToRegister,
    };
  },
};
</script>
