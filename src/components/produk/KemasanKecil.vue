<script setup>
import CardProduk from '@/fragments/CardProduk.vue'
import { useProdukStore } from '@/stores/Produk'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import { RouterView } from 'vue-router'

const ProdukStore = useProdukStore()

const produks = ref(null)
const totalPages = ref(0)
const currentPage = ref(1)

const kategoris = ref(null)
const kategoriAktif = ref('')

const fetchProduks = async (page = 1, kategori = '') => {
  if (!kategori) {
    const response = await axios.get(`http://127.0.0.1:8000/api/produk?page=${page}`)
    console.log('data :', response.data)
    const data = response.data.data
    produks.value = data.data

    currentPage.value = data.current_page

    totalPages.value = data.last_page
  } else {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/produk?page=${page}&kategori=${kategori}`,
    )
    console.log('data :', response.data)
    const data = response.data.data
    produks.value = data.data

    currentPage.value = data.current_page

    totalPages.value = data.last_page
  }
}

const fetchKategori = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/kategori`)
  console.log('kategori :', response)
  const data = response.data.data
  console.log(data)

  kategoris.value = data
}

onMounted(() => {
  fetchProduks()
  fetchKategori()
})
</script>

<template>
  <main>
    <header>
      <h2 class="judul">Produk Kami</h2>
      <div class="filter-container">
        <label for="filter" class="filter-label">Filter Kategori:</label>
        <div class="custom-select">
          <select
            v-model="kategoriAktif"
            id="filter"
            name="filter"
            @change="fetchProduks(1, kategoriAktif)"
          >
            <option value="">Semua</option>
            <option v-for="(kategori, index) in kategoris" :key="index" :value="kategori.id">
              {{ kategori.nama_kategori }}
            </option>
          </select>
        </div>
      </div>
    </header>

    <div class="container-card">
      <CardProduk
        v-if="produks?.length > 0"
        v-for="produk in produks"
        :key="produk.id"
        :category="produk.kategori.nama_kategori"
        :img="produk.url_image"
        :title="produk.nama_produk"
        :harga="produk.harga"
        :slug="produk.slug"
      />

      <div v-else class="no-produk">
        <div class="no-produk-content">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="no product"
            class="no-produk-img"
          />
          <h2>Tidak Ada Produk</h2>
          <p>Produk pada kategori ini belum tersedia.</p>
        </div>
      </div>
    </div>

    <div class="container-paginate" v-if="produks?.length > 0">
      <button
        :disabled="currentPage === 1"
        class="page button"
        @click="fetchProduks(currentPage - 1, kategoriAktif)"
      >
        <p><</p>
      </button>

      <div
        v-for="i in totalPages"
        :key="i"
        :class="['page', i === currentPage ? 'active' : 'inactive']"
        @click="fetchProduks(i, kategoriAktif)"
      >
        <p>{{ i }}</p>
      </div>

      <button
        :disabled="currentPage === totalPages"
        class="page button"
        @click="fetchProduks(currentPage + 1, kategoriAktif)"
      >
        <p>></p>
      </button>
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: 'Poppins', sans-serif;
  padding: 20px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 55px;
  flex-wrap: wrap;
}

.judul {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  font-family: 'Poppins', sans-serif;
  flex-wrap: wrap;
}

.filter-label {
  font-weight: 600;
  color: #333;
}

.custom-select {
  position: relative;
  display: inline-block;
  width: 220px;
}

.custom-select select {
  appearance: none;
  width: 100%;
  padding: 10px 40px 10px 14px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-select select:hover {
  border-color: #007bff;
}

.custom-select select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  outline: none;
}

.custom-select::after {
  content: '▼';
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #555;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.custom-select select:focus + .custom-select::after {
  transform: translateY(-50%) rotate(180deg);
}

.container-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-content: center;
  justify-items: center;
  gap: 2rem;
  padding: 20px;
  position: relative;
}

.no-produk {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  text-align: center;
  background-color: #fff9f2;
  border-radius: 16px;
  padding: 40px 20px;
  box-shadow: 0 0 10px rgba(255, 221, 150, 0.2);
  transition: all 0.3s ease;
}

.no-produk:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 20px rgba(255, 200, 100, 0.25);
}

.no-produk-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #444;
}

.no-produk-img {
  width: 100px;
  height: 100px;
  opacity: 0.8;
}

.no-produk h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #d4a300;
}

.no-produk p {
  font-size: 1rem;
  color: #666;
}

.container-paginate {
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
  border: none;
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
