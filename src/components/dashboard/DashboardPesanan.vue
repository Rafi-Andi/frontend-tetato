<script setup>
import { formatRupiah } from '@/lib/FormatRupiah'
import { formatTanggalIndonesia } from '@/lib/FormatTanggal'
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import debounce from 'lodash.debounce'
import Cookies from 'js-cookie'
import router from '@/router'
import BaseURL from '@/lib/BaseUrl'

const search = ref('')
const date = ref('')
const currentPage = ref(1)
const totalPages = ref(0)

const dataPesanans = ref([])
const statusRef = ref('')

const loading = ref(false)

const token = Cookies.get('token')

if(!token){
  router.push({name: 'login'})
}

const fetchPesanans = async (page = 1) => {
  try {
    loading.value = true
    const url = `${BaseURL}/api/pesanan?page=${page}&status=${statusRef.value}&search=${search.value}&date=${date.value}`

    console.log('Fetching:', url)

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = response.data.data

    currentPage.value = data.current_page
    totalPages.value = data.last_page
    dataPesanans.value = data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

watch(statusRef, (newStatus) => {
  currentPage.value = 1
  fetchPesanans(1)
})

watch(
  search,
  debounce(async (newSearch) => {
    currentPage.value = 1
    fetchPesanans(1)
  }, 500),
)

watch(date, (newDate) => {
  currentPage.value = 1
  fetchPesanans(1)
})

watch(currentPage, (newPage) => {
  fetchPesanans(newPage)
})

const prevButton = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
const nextButton = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

onMounted(() => {
  fetchPesanans()
})
</script>

<template>
  <div class="container">
    <h2 class="title">Data Produk</h2>

    <div class="tabs">
      <button :class="{ active: statusRef === '' }" @click="statusRef = ''">All Orders</button>
      <button :class="{ active: statusRef === 'proses' }" @click="statusRef = 'proses'">
        Proses
      </button>
      <button :class="{ active: statusRef === 'dikirim' }" @click="statusRef = 'dikirim'">
        Dikirim
      </button>
      <button :class="{ active: statusRef === 'selesai' }" @click="statusRef = 'selesai'">
        Selesai
      </button>
    </div>

    <div class="filters">
      <input type="text" v-model="search" placeholder="Cari ID / Customer" />
      <input type="date" v-model="date" />
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Telepon</th>
          <th>Tanggal</th>
          <th>Total</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="6" style="text-align: center; color: #999; font-style: italic">
            Loading...
          </td>
        </tr>

        <tr v-else-if="dataPesanans.length < 1">
          <td colspan="6" style="text-align: center; color: #999; font-style: italic">
            Tidak ada data pesanan yang ditemukan.
          </td>
        </tr>

        <tr v-else v-for="pesanan in dataPesanans" :key="pesanan.id">
          <td>#{{ pesanan.kode_pesanan }}</td>
          <td>{{ pesanan.nama_pelanggan }}</td>
          <td>{{ pesanan.telepon }}</td>
          <td>{{ formatTanggalIndonesia(pesanan.created_at) }}</td>
          <td>{{ formatRupiah(pesanan.total_harga) }}</td>
          <td>
            <span class="status" :class="pesanan.status">
              {{ pesanan.status }}
            </span>
          </td>
          <td>
            <router-link
              :to="{ name: 'detail-pesanan', params: { id: pesanan.id } }"
              class="btn-detail"
            >
              Detail
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button style="background-color: #fee2bc; color: #d4a300" @click="prevButton"><</button>
      <button
        v-for="n in totalPages"
        :key="n"
        :class="{ active: n === currentPage }"
        @click="currentPage = n"
      >
        {{ n }}
      </button>
      <button style="background-color: #fee2bc; color: #d4a300" @click="nextButton">></button>
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Poppins', sans-serif;
  background-color: #fffdf4;
}

.container {
  width: 90%;
  margin: 40px auto;
  background-color: #fffdf4;
}

.title {
  font-weight: bold;
  color: #c59e00;
  font-size: 22px;
  margin-bottom: 10px;
}

.tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.tabs button {
  border: none;
  background: none;
  font-weight: 600;
  color: #999;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  padding-bottom: 5px;
}

.tabs button.active {
  color: #333;
  border-bottom: 2px solid #c59e00;
}

.filters {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.filters input {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 12px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #fefce9;
  border-radius: 12px;
  overflow: hidden;
}

.data-table th {
  text-align: left;
  background: #f7f3d0;
  padding: 12px 16px;
}

.data-table td {
  padding: 14px 16px;
  border-top: 1px solid #ddd;
}

.status {
  padding: 6px 14px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.status.baru {
  background-color: #e2b810;
}

.status.proses {
  background-color: #3b82f6;
}

.status.selesai {
  background-color: #22c55e;
}

.btn-detail {
  background-color: #2f2f2f;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn-detail:hover {
  opacity: 0.9;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 6px;
}

.pagination button {
  border: 1px solid #c59e00;
  background: #fffbe3;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #c59e00;
  color: white;
}
</style>
