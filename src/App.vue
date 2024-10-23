<script setup>

</script>

<template>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/release/1">Go to Release</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
