<template>
  <component :is="layout">
    <router-view :key="$route.fullPath" />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from './layout/DefaultLayout.vue'
import BlankPageLayout from './layout/BlankPageLayout.vue'

const route = useRoute()
const layout = computed(() => {
  if (route.meta.layout === 'blank-layout') return BlankPageLayout
  return DefaultLayout
})
</script>
