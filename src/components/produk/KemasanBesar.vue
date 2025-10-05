<script setup>
import CardProduk from '@/fragments/CardProduk.vue'
import Pagination from '@/fragments/Pagination.vue';
</script>

<template>
  <main>
    <h2 class="judul">Kemasan 65 Gram</h2>

    <div class="container-card">
      <CardProduk v-for="i in 5" :key="i" />

    </div>
    <Pagination />
  </main>
</template>

<style scoped>
main {
  font-family: 'Poppins', sans-serif;
  padding: 20px;
}

.judul {
  margin-left: 55px;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.container-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-content: center;
  gap: 2rem;
  padding: 20px;
  position: relative;
}
</style>
