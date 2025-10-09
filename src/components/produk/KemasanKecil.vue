<script setup>
import CardProduk from '@/fragments/CardProduk.vue';
import Pagination from '@/fragments/Pagination.vue';
import { useProdukStore } from '@/stores/Produk';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
import { RouterView } from 'vue-router';

const ProdukStore = useProdukStore()

const {produks} = storeToRefs(ProdukStore)

console.log(produks.value)
</script>

<template>
  <main>
    <h2 class="judul">Produk Kami</h2>

    <div class="container-card">
      <CardProduk v-for="produk in produks" :key="produk.id" :category="produk.kemasan" :img="produk.gambar" :title="produk.title" :harga=produk.harga :slug="produk.slug"/>
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
