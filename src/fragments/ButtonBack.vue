<script setup>
import {  useRouter } from 'vue-router';

const router = useRouter()

const goBack = () => {
    router.back()
}
</script>

<template>
  <button @click="goBack" class="btn">
    < Kembali
  </button>
</template>

<style scoped>
.btn {
  color: white;
  border: none;
  padding: 10px 40px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;
  font-size: medium;
  background-color: #FFC300;
}

.btn:hover {
  opacity: 0.85;
}
</style>
