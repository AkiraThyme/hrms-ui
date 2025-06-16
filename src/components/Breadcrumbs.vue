<template>
  <nav class="breadcrumbs">
    <ul>
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <router-link v-if="index !== breadcrumbs.length - 1" :to="breadcrumb.path">
          {{ capitalize(breadcrumb.name) }}
        </router-link>
        <span v-else>{{ capitalize(breadcrumb.name) }}</span>
        <span v-if="index !== breadcrumbs.length - 1" class="separator">></span>
      </li>
    </ul>
  </nav>
</template>

<script setup>

const route = useRoute()

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched
  const breadcrumbs = matchedRoutes.map((route) => ({
    name: route.name || 'Home',
    path: route.path,
  }))

  if (breadcrumbs.length > 0 && breadcrumbs[0].name.toLowerCase() !== 'dashboard') {
    breadcrumbs.unshift({ name: 'Dashboard', path: '/' })
  }

  return breadcrumbs
})
</script>
