<script setup>
defineProps({
  label: {
    type: String,
    default: 'Button',
  },
  color: {
    type: String,
    default: '#FFC300',
  },
})
</script>

<template>
  <button class="btn" :style="{ backgroundColor: color }">
    {{ label }}
  </button>
</template>

<style scoped>
.btn {
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;
  font-size: medium;
}

.btn:hover {
  opacity: 0.85;
}
</style>
