<script setup>
import { formatRupiah } from '@/lib/FormatRupiah'
import { formatTanggalIndonesia } from '@/lib/FormatTanggal'
import router from '@/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { onMounted, ref } from 'vue'

const dataFetching = ref(null)

const dataStatistik = ref([])

const notifikasiPesanan = ref([])
const totalPages = ref(0)
const currentPage = ref(1)

const token = Cookies.get('token')

if (!token) {
  router.push({ name: 'login' })
}

const isLoadingFetching = ref(false)

const fetchingStatistik = async () => {
  try {
    isLoadingFetching.value = true
    const responseStatistik = await axios.get('http://127.0.0.1:8000/api/analisis', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = responseStatistik.data.data

    dataFetching.value = data

    dataStatistik.value = [
      {
        label: 'Pendapatan Total',
        value: formatRupiah(data.totalPendapatanSelesai),
        subLabel: 'Bulan Ini',
        subValue: formatRupiah(data.pendapatanBulanIni),
      },
      {
        label: 'Data Pesanan',
        value: data.jumlahPesanan,
        subLabel: 'Pesanan Baru',
        subValue: data.totalPesananBaru,
      },
      {
        label: 'Varian Produk',
        value: data.jumlahProduk,
        subLabel: 'Terjual',
        subValue: data.produkTerjual,
      },
    ]

    console.log(dataFetching.value)
  } catch (error) {
    console.log(error)
    const message = error.response.data.message
    if (message === 'Authenticated.') {
      router.push({ name: 'login' })
    }
  } finally {
    isLoadingFetching.value = false
  }
}

const isLoadingPesanan = ref(false)

const fetchingPesananBaru = async (page = 1) => {
  try {
    isLoadingPesanan.value = true
    const responsePesananBaru = await axios.get(
      `http://127.0.0.1:8000/api/pesanan?page=${page}&status=baru`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const dataPesananBaru = responsePesananBaru.data.data.data

    currentPage.value = responsePesananBaru.data.data.current_page
    totalPages.value = responsePesananBaru.data.data.last_page
    notifikasiPesanan.value = dataPesananBaru
  } catch (error) {
    console.log(error)
    const message = error.response.data.message
    if (message === 'Authenticated.') {
      router.push({ name: 'login' })
    }
  } finally {
    isLoadingPesanan.value = false
  }
}

onMounted(() => {
  fetchingStatistik()
  fetchingPesananBaru()
})
</script>

<template>
  <section class="dashboard">
    <h2 class="judul">Analisis Toko</h2>

    <div class="statistik tiga-kolom">
      <div v-for="(item, i) in dataStatistik" :key="i" class="kartu">
        <h4>{{ item.label }}</h4>
        <p class="main-value">{{ item.value }}</p>
        <div class="detail-value">
          <span class="sub-label">{{ item.subLabel }}: </span>
          <span class="sub-value">{{ item.subValue }}</span>
        </div>
      </div>
      <div class="kartu" v-if="dataStatistik.length < 1" v-for="(i, index) in 3" :key="index">
        <h3>Loading..</h3>
      </div>
    </div>

    <div class="notifikasi">
      <h4>Notifikasi Pesanan Baru :</h4>
      <table>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama Pemesan</th>
            <th>Tanggal</th>
            <th>Telepon</th>
            <th>Alamat</th>
            <th>Total Harga</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notifikasi, i) in notifikasiPesanan" :key="i">
            <td>{{ notifikasi?.kode_pesanan }}</td>
            <td>{{ notifikasi?.nama_pelanggan }}</td>
            <td>{{ formatTanggalIndonesia(notifikasi?.created_at) }}</td>
            <td>{{ notifikasi?.telepon }}</td>
            <td>{{ notifikasi?.alamat_pengiriman }}</td>
            <td>{{ formatRupiah(notifikasi?.total_harga) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="isLoadingPesanan" style="display: flex; justify-content: center; width: 100%">
        <div class="no-produk-content">
          <h2>Loading..</h2>
        </div>
      </div>
      <div v-else style="display: flex; justify-content: center; width: 100%">
        <div class="no-produk-content" v-if="notifikasiPesanan.length < 1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="no product"
            class="no-produk-img"
          />
          <h2>Tidak Ada Pesanan Terbaru</h2>
          <p>tidak ada pesanan terbaru yang harus di proses</p>
        </div>
      </div>
      <div class="container-paginate" v-if="totalPages > 1">
        <button
          :disabled="currentPage === 1"
          class="page button"
          @click="fetchingPesananBaru(currentPage - 1)"
        >
          <p><</p>
        </button>

        <div
          v-for="i in totalPages"
          :key="i"
          :class="['page', i === currentPage ? 'active' : 'inactive']"
          @click="fetchingPesananBaru(i)"
        >
          <p>{{ i }}</p>
        </div>

        <button
          :disabled="currentPage === totalPages"
          class="page button"
          @click="fetchingPesananBaru(currentPage + 1)"
        >
          <p>></p>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  font-family: 'Poppins', sans-serif;
  background-color: #fdfbec;
  min-height: 100vh;
  padding: 40px;
  color: #222;
}

.judul {
  margin-top: -20px;
  font-size: 24px;
  font-weight: 700;
  color: #b6920e;
  margin-bottom: 20px;
}

.statistik {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.kartu {
  margin-top: -10px;
  background-color: #faf8e2;
  border-radius: 12px;
  padding: 8px 20px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.kartu h4 {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.kartu .main-value {
  font-size: 32px;
  font-weight: 700;
  margin-top: 5px;
  margin-bottom: 15px;
  color: #d4a300;
}

.detail-value {
  border-top: 1px solid #eee;
  padding-top: 10px;
  font-size: 14px;
  color: #555;
}

.sub-label {
  font-weight: 500;
}

.sub-value {
  font-weight: 600;
  color: #333;
}

.notifikasi {
  margin-top: -20px;
  background-color: #faf8e2;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
}

.notifikasi h4 {
  margin-bottom: 15px;
  font-size: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px 15px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

th {
  font-weight: 600;
}

tr:last-child td {
  border-bottom: none;
}

.container-paginate {
  display: flex;
  justify-content: center;
  margin: auto;
  gap: 1rem;
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
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

@media (max-width: 768px) {
  .dashboard {
    padding: 20px;
  }

  .statistik {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .kartu .main-value {
    font-size: 26px;
  }

  .notifikasi {
    overflow-x: auto;
    padding: 15px;
  }

  table {
    min-width: 600px;
  }

  th,
  td {
    padding: 8px 10px;
    font-size: 13px;
  }
}
</style>
