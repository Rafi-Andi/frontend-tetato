<script setup>
import FooterKita from '@/components/FooterKita.vue'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <Navbar />
  <main>
    <slot />
  </main>

  <FooterKita />
</template>

<style scoped></style>
