<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formatRupiah } from '@/lib/FormatRupiah'
import axios from 'axios'
import { formatTanggalIndonesia } from '@/lib/FormatTanggal'
import showAlert from '@/lib/Swal'
import Cookies from 'js-cookie'
import router from '@/router'

const route = useRoute()

const idPesanan = route.params.id

const pesanan = ref(null)

const daftarStatus = ['baru', 'proses', 'selesai']
const status = ref('')

const opsiLain = computed(() => daftarStatus.filter((s) => s !== status.value))
const loading = ref(false)

const token = Cookies.get('token')

if(!token){
 router.push({name: 'login'})
}

const pesananFetch = async () => {
  try {
    loading.value = true
    const response = await axios.get(`http://127.0.0.1:8000/api/pesanan/${idPesanan}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = response.data.data
    status.value = data.status
    pesanan.value = data
    console.log(data)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const loadingUpdate = ref(false)
const messageUpdate = ref('')

const updateStatus = async () => {
  try {
    loadingUpdate.value = true
    const response = await axios.put(
      `http://127.0.0.1:8000/api/pesanan/${idPesanan}`,
      {
        status: status.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    console.log(response)

    const message = response.data.message

    pesanan.value.status = response.data.data
    showAlert('Berhasil', message, 'success')
  } catch (error) {
    console.log(error)
  } finally {
    loadingUpdate.value = false
  }
}

const ongkosKirim = ref(0) 
const loadingDownload = ref(false)


const downloadInvoice = async () => {
  if (!pesanan.value) return

  loadingDownload.value = true

  try {
    const dataToPost = {
      ongkir: ongkosKirim.value,
    }

    const response = await axios({
      url: `http://127.0.0.1:8000/api/invoice/${idPesanan}`,
      method: 'POST',
      data: dataToPost,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    })

    pesananFetch()

    const blob = new Blob([response.data], { type: 'application/pdf' })

    const fileName = `invoice-${pesanan.value.kode_pesanan || idPesanan}.pdf`

    const fileURL = window.URL.createObjectURL(blob)

    const fileLink = document.createElement('a')
    fileLink.href = fileURL
    fileLink.setAttribute('download', fileName)
    document.body.appendChild(fileLink)

    fileLink.click()
    window.URL.revokeObjectURL(fileURL)
    document.body.removeChild(fileLink)

    showAlert('Berhasil', 'Invoice berhasil diunduh.', 'success')
  } catch (error) {
    console.log(error.response)
    console.error('Gagal mengunduh invoice:', error)
    showAlert('Gagal', 'Gagal mengunduh file. Periksa input ongkir.', 'error')
  } finally {
    loadingDownload.value = false
  }
}

onMounted(() => {
  pesananFetch()
})
</script>

<template>
  <div v-if="loading" class="loading">
    <p>Loading pesanan...</p>
  </div>
  <div v-else class="detail-pesanan">
    <h1>Detail Pesanan</h1>

    <div class="info-pesanan">
      <p><strong>Nomor Pesanan:</strong> {{ pesanan?.id }}</p>
      <p><strong>Tanggal:</strong> {{ formatTanggalIndonesia(pesanan?.created_at) }}</p>
      <p><strong>Status:</strong> {{ pesanan?.status }}</p>
      <p><strong>Total:</strong> {{ formatRupiah(pesanan?.total_harga) }}</p>
    </div>

    <table class="tabel-produk">
      <thead>
        <tr>
          <th>Produk</th>
          <th>Harga</th>
          <th>Jumlah</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pesanan?.pesanan_details" :key="item.id">
          <td>{{ item.nama_produk }}</td>
          <td>{{ formatRupiah(item.harga) }}</td>
          <td>{{ item.jumlah }}</td>
          <td>{{ formatRupiah(item.subtotal) }}</td>
        </tr>
      </tbody>
    </table>

    <div style="display: flex; flex-direction: column; margin-top: 20px">
      <div class="input-ongkir-container" style="margin-bottom: 20px">
        <label for="ongkir" style="font-weight: bold; margin-bottom: 5px; display: block"
          >Masukkan Ongkos Kirim (Rp):</label
        >
        <input
          type="number"
          id="ongkir"
          v-model.number="ongkosKirim"
          style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; width: 220px"
        />
      </div>
      <select class="status-dropdown" v-model="status">
        <option :value="status">{{ status }}</option>
        <option v-for="status in opsiLain" :key="status" :value="status">
          {{ status }}
        </option>
      </select>

      <div class="container-button" style="display: flex; gap: 1rem">
        <button @click="updateStatus" class="btn-kembali">
          <span v-if="loadingUpdate">Memperbarui data</span><span v-else>Simpan</span>
        </button>
        <button
          @click="downloadInvoice"
          class="btn-download"
          :disabled="loadingDownload"
          style="width: 220px"
        >
          <span v-if="loadingDownload">Membuat PDF...</span><span v-else>Cetak Invoice (PDF)</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-pesanan {
  padding: 30px;
  font-family: 'Poppins', sans-serif;
  background-color: #fffdf2;
  min-height: 100vh;
}

.detail-pesanan h1 {
  color: #d2a400;
  margin-bottom: 20px;
}

.info-pesanan p {
  font-size: 16px;
  margin: 5px 0;
}

.tabel-produk {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.tabel-produk th,
.tabel-produk td {
  padding: 10px;
  border: 1px solid #e3e3c3;
  text-align: left;
}

.btn-kembali {
  margin-top: 20px;
  background-color: #ffd400;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-weight: 600;
}

.btn-kembali:hover {
  background-color: #eac100;
}

.btn-download {
  margin-top: 20px;
  background-color: green;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-weight: 600;
}

.btn-download:hover {
  background-color: #eac100;
}


.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  font-size: 18px;
  color: #d2a400;
}

.status-dropdown {
  width: 220px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d4a300;
  background-color: #fff8e1;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  position: relative;
}

.status-dropdown:disabled {
  opacity: 0.7;
}

.status-dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.status-dropdown-wrapper::after {
  content: '▼';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #d4a300;
  font-size: 12px;
}
</style>
