<template>
  <component :is="layout">
    <router-view :key="$route.fullPath" />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AuthLayout from './layout/AuthLayout.vue'
import DefaultLayout from './layout/DefaultLayout.vue'

const route = useRoute()
const layout = computed(() => {
  if (route.meta.layout === 'auth') return AuthLayout
  return DefaultLayout
})
</script>
