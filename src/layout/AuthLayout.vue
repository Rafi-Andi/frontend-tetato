<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>

<script setup>
// bisa kosong kalau gak ada logic
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
