<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  total: { Int16Array, default: 5 },
})

let totalPages = computed(() => props.total)
let currentPage = ref(1)

const NextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<template>
  <main>
    <div class="page button" @click="prevPage">
      <p><</p>
    </div>

    <div
      v-for="i in totalPages"
      :key="i"
      :class="['page', i === currentPage ? 'active' : 'inactive']"
    >
      <p>{{ i }}</p>
    </div>

    <div class="page button" @click="NextPage">
      <p>></p>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  margin: auto;
  gap: 1rem;
  font-size: 20px;
  font-weight: 500;
}

.page {
  background-color: antiquewhite;
  padding: 5px 15px;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.page:hover {
  transform: scale(1.1);
}

.page.button {
  background-color: #fee2bc;
  color: #d4a300;
}

.page.active {
  color: white;
  background-color: #d4a300;
}

.page.inactive {
  background-color: white;
  color: #d4a300;
  border: 1px solid #d4a300;
}
</style>
