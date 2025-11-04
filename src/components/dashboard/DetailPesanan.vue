<!-- <script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formatRupiah } from '@/lib/FormatRupiah'
import axios from 'axios'
import { formatTanggalIndonesia } from '@/lib/FormatTanggal'
import showAlert from '@/lib/Swal'
import Cookies from 'js-cookie'
import router from '@/router'
import BaseURL from '@/lib/BaseUrl'
import Swal from 'sweetalert2'

const route = useRoute()

const idPesanan = route.params.id

const pesanan = ref(null)

const daftarStatus = ['baru', 'proses', 'dikirim', 'selesai']
const status = ref('')

const opsiLain = computed(() => daftarStatus.filter((s) => s !== status.value))
const loading = ref(false)

const token = Cookies.get('token')

if (!token) {
  router.push({ name: 'login' })
}

const pesananFetch = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${BaseURL}/api/pesanan/${idPesanan}`, {
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
      `${BaseURL}/api/pesanan/${idPesanan}`,
      { status: status.value },
      { headers: { Authorization: `Bearer ${token}` } },
    )

    showAlert('Berhasil', 'Status pesanan berhasil diperbarui.', 'success')
    pesanan.value.status = status.value

    const nama = pesanan.value.nama_pelanggan
    const kode = pesanan.value.kode_pesanan
    const nomor = pesanan.value.telepon
    let total = formatRupiah(pesanan.value.total_harga)
    const daftarProduk = pesanan.value.pesanan_details
      .map((item) => `- ${item.nama_produk} (${item.jumlah}x) - ${formatRupiah(item.subtotal)}`)
      .join('\n')
    let messageWhatsapp = ''

    if (status.value === 'proses') {
      messageWhatsapp = `
Halo ${nama} 👋  
Pembayaran untuk pesanan Anda #${kode} telah kami terima ✅  

Berikut rincian pesanan Anda:
${daftarProduk}

💵 Subtotal: ${total}  
🚚 Ongkir: ${formatRupiah(ongkosKirim.value)}
📦 Total: ${formatRupiah((pesanan.value.total_harga += ongkosKirim.value))}

Pesanan Anda sedang diproses dan akan segera dikirim 💪  
Terima kasih telah berbelanja di Tetato Chips ❤
`
    } else if (status.value === 'dikirim') {
      const { value: ekspedisi } = await Swal.fire({
        title: 'Masukkan ekspedisi pengiriman',
        input: 'textarea',
        inputLabel: 'Nama ekspedisi pengirim pesanan',
        inputPlaceholder: 'Contoh: JNE REG',
        showCancelButton: true,
        confirmButtonText: 'Kirim',
      })
      const { value: resi } = await Swal.fire({
        title: 'Masukkan Resi pengiriman',
        input: 'textarea',
        inputLabel: 'Resi pengirim pesanan',
        inputPlaceholder: 'Contoh: JNE123456789',
        showCancelButton: true,
        confirmButtonText: 'Kirim',
      })

      messageWhatsapp = `
Halo ${nama}👋  
Pesanan Anda dengan nomor #${kode} telah diperbarui 🛍  

📦 Status terbaru: Dikirim  
Ekspedisi: ${ekspedisi}  
Nomor Resi: ${resi} 

Berikut daftar pesanan Anda:
${daftarProduk}

Terima kasih telah berbelanja di Tetato Chips 
      `
    } else if (status.value === 'selesai') {
      messageWhatsapp = `
Halo ${nama} 👋  

Pesanan Anda dengan nomor #${kode} telah selesai 🎉  

Berikut ringkasannya:
${daftarProduk}

💵 Total: ${total}
🚚 Status Pengiriman: Selesai / Barang telah diterima  

Terima kasih telah berbelanja di Tetato Chips 💚  
Semoga produk kami bermanfaat dan sesuai harapan Anda.  

Untuk informasi atau pemesanan lainnya, Anda dapat menghubungi kami kembali melalui WhatsApp / Website kami.  

Salam hangat,  
Tim Tetato Chips
      `
    }

    const encodedMessage = encodeURIComponent(messageWhatsapp.trim())
    window.open(`https://wa.me/62${nomor}?text=${encodedMessage}`, '_blank')
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
      url: `${BaseURL}/api/invoice/${idPesanan}`,
      method: 'POST',
      data: dataToPost,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    })

    pesananFetch()

    const nama = pesanan.value.nama_pelanggan
    const kode = pesanan.value.kode_pesanan
    const nomor = pesanan.value.telepon
    let total = formatRupiah(pesanan.value.total_harga)
    const daftarProduk = pesanan.value.pesanan_details
      .map((item) => `- ${item.nama_produk} (${item.jumlah}x) - ${formatRupiah(item.subtotal)}`)
      .join('\n')

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

    const messageWhatsapp = `Halo ${nama} 👋  
Terima kasih sudah memesan di Tetato Chips 🙏  

Berikut rincian pesanan Anda:
${daftarProduk} 

💵 Subtotal: ${total}  
🚚 Ongkir: ${formatRupiah(ongkosKirim.value)}
📦 Total: ${formatRupiah((pesanan.value.total_harga += ongkosKirim.value))}
📄 Nomor Invoice: #invoice-${kode}  
🕓 Status: Menunggu Pembayaran  

Silakan melakukan pembayaran ke salah satu rekening berikut:

🏦 BCA  
No. Rekening: 1234567890 
Atas Nama: Tetato Chips

📎 Anda dapat melihat Invoice lengkap pada PDF yang kami kirim

Setelah melakukan pembayaran, harap konfirmasi melalui chat ini dengan mengirim bukti transfer agar pesanan Anda segera diproses ✅  

Terima kasih telah berbelanja di Tetato Chips 💚`

    const encodedMessage = encodeURIComponent(messageWhatsapp.trim())
    window.open(`https://wa.me/62${nomor}?text=${encodedMessage}`, '_blank')
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
</script> -->

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formatRupiah } from '@/lib/FormatRupiah'
import axios from 'axios'
import { formatTanggalIndonesia } from '@/lib/FormatTanggal'
import showAlert from '@/lib/Swal'
import Cookies from 'js-cookie'
import router from '@/router'
import BaseURL from '@/lib/BaseUrl'
import Swal from 'sweetalert2'

const route = useRoute()

const idPesanan = route.params.id

const pesanan = ref(null)

const daftarStatus = ['baru', 'proses', 'dikirim', 'selesai']
const status = ref('')

const ongkosKirim = ref(0) // Pindahkan ke atas

// **PERBAIKAN 1: Computed property untuk Total Akhir (Subtotal + Ongkir)**
const totalAkhir = computed(() => {
  if (!pesanan.value) return 0
  // pesanan.value.total_harga adalah subtotal dari produk
  return pesanan.value.total_harga + ongkosKirim.value
})

const opsiLain = computed(() => daftarStatus.filter((s) => s !== status.value))
const loading = ref(false)

const token = Cookies.get('token')

if (!token) {
  router.push({ name: 'login' })
}

const pesananFetch = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${BaseURL}/api/pesanan/${idPesanan}`, {
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

const updateStatus = async () => {
  try {
    loadingUpdate.value = true
    const response = await axios.put(
      `${BaseURL}/api/pesanan/${idPesanan}`,
      { status: status.value },
      { headers: { Authorization: `Bearer ${token}` } },
    )

    showAlert('Berhasil', 'Status pesanan berhasil diperbarui.', 'success')
    pesanan.value.status = status.value

    const nama = pesanan.value.nama_pelanggan
    const kode = pesanan.value.kode_pesanan
    const nomor = pesanan.value.telepon
    let total = formatRupiah(pesanan.value.total_harga) 
    const daftarProduk = pesanan.value.pesanan_details
      .map((item) => `- ${item.nama_produk} (${item.jumlah}x) - ${formatRupiah(item.subtotal)}`)
      .join('\n')
    let messageWhatsapp = ''

    if (status.value === 'proses') {
      messageWhatsapp = `
Halo ${nama} 👋
Pembayaran untuk pesanan Anda #${kode} telah kami terima ✅

Berikut rincian pesanan Anda:
${daftarProduk}

Pesanan Anda sedang diproses dan akan segera dikirim 💪
Terima kasih telah berbelanja di Tetato Chips ❤
`
    } else if (status.value === 'dikirim') {
      const { value: ekspedisi } = await Swal.fire({
        title: 'Masukkan ekspedisi pengiriman',
        input: 'textarea',
        inputLabel: 'Nama ekspedisi pengirim pesanan',
        inputPlaceholder: 'Contoh: JNE REG',
        showCancelButton: true,
        confirmButtonText: 'Kirim',
      })
      const { value: resi } = await Swal.fire({
        title: 'Masukkan Resi pengiriman',
        input: 'textarea',
        inputLabel: 'Resi pengirim pesanan',
        inputPlaceholder: 'Contoh: JNE123456789',
        showCancelButton: true,
        confirmButtonText: 'Kirim',
      })

      messageWhatsapp = `
Halo ${nama}👋
Pesanan Anda dengan nomor #${kode} telah diperbarui 🛍

📦 Status terbaru: Dikirim
Ekspedisi: ${ekspedisi}
Nomor Resi: ${resi}

Berikut daftar pesanan Anda:
${daftarProduk}

Terima kasih telah berbelanja di Tetato Chips
      `
    } else if (status.value === 'selesai') {
      messageWhatsapp = `
Halo ${nama} 👋

Pesanan Anda dengan nomor #${kode} telah selesai 🎉

Berikut ringkasannya:
${daftarProduk}

💵 Total: ${total} 
🚚 Status Pengiriman: Selesai 

Terima kasih telah berbelanja di Tetato Chips 💚
Semoga produk kami bermanfaat dan sesuai harapan Anda.

Untuk informasi atau pemesanan lainnya, Anda dapat menghubungi kami kembali melalui WhatsApp / Website kami.

Salam hangat,
Tim Tetato Chips
      `
    }

    const encodedMessage = encodeURIComponent(messageWhatsapp.trim())
    window.open(`https://wa.me/62${nomor}?text=${encodedMessage}`, '_blank')
  } catch (error) {
    console.log(error)
  } finally {
    loadingUpdate.value = false
  }
}

const loadingDownload = ref(false)

const downloadInvoice = async () => {
  if (!pesanan.value) return

  loadingDownload.value = true

  try {
    const dataToPost = {
      ongkir: ongkosKirim.value,
    }

    const response = await axios({
      url: `${BaseURL}/api/invoice/${idPesanan}`,
      method: 'POST',
      data: dataToPost,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    })

    pesananFetch()

    const nama = pesanan.value.nama_pelanggan
    const kode = pesanan.value.kode_pesanan
    const nomor = pesanan.value.telepon
    let total = formatRupiah(pesanan.value.total_harga) 
    const daftarProduk = pesanan.value.pesanan_details
      .map((item) => `- ${item.nama_produk} (${item.jumlah}x) - ${formatRupiah(item.subtotal)}`)
      .join('\n')

    const blob = new Blob([response.data], { type: 'application/pdf' })

    const fileName = `INVOICE-${pesanan.value.kode_pesanan || idPesanan}.pdf`

    const fileURL = window.URL.createObjectURL(blob)

    const fileLink = document.createElement('a')
    fileLink.href = fileURL
    fileLink.setAttribute('download', fileName)
    document.body.appendChild(fileLink)

    fileLink.click()
    window.URL.revokeObjectURL(fileURL)
    document.body.removeChild(fileLink)

    showAlert('Berhasil', 'Invoice berhasil diunduh.', 'success')

    const messageWhatsapp = `Halo ${nama} 👋
Terima kasih sudah memesan di Tetato Chips 🙏

Berikut rincian pesanan Anda:
${daftarProduk}

💵 Subtotal: ${total}
🚚 Ongkir: ${formatRupiah(ongkosKirim.value)}
📦 Total: ${formatRupiah(totalAkhir.value)} 
📄 Nomor Invoice: #invoice-${kode}
🕓 Status: Menunggu Pembayaran

Silakan melakukan pembayaran ke salah satu rekening berikut:

🏦 BCA
No. Rekening: 1234567890
Atas Nama: Tetato Chips

📎 Anda dapat melihat Invoice lengkap pada PDF yang kami kirim

Setelah melakukan pembayaran, harap konfirmasi melalui chat ini dengan mengirim bukti transfer agar pesanan Anda segera diproses ✅

Terima kasih telah berbelanja di Tetato Chips 💚`

    const encodedMessage = encodeURIComponent(messageWhatsapp.trim())
    window.open(`https://wa.me/62${nomor}?text=${encodedMessage}`, '_blank')
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
      <p><strong>Nama :</strong> {{ pesanan?.nama_pelanggan }}</p>
      <p><strong>Kode Pesanan:</strong> {{ pesanan?.kode_pesanan }}</p>
      <p><strong>Tanggal:</strong> {{ formatTanggalIndonesia(pesanan?.created_at) }}</p>
      <p><strong>Nomor:</strong> 0{{ pesanan?.telepon }}</p>
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

    <div class="action-panel-wrapper">
      <div class="action-card status-card">
        <h3>Perbarui Status</h3>
        <div class="input-group">
          <label for="status-select">Pilih Status Baru:</label>
          <select class="form-input" v-model="status">
            <option :value="status">{{ status }}</option>
            <option v-for="status in opsiLain" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>
        <button @click="updateStatus" class="btn btn-save" :disabled="loadingUpdate">
          <span v-if="loadingUpdate">Menyimpan...</span><span v-else>Simpan Perubahan Status</span>
        </button>
      </div>

      <div class="action-card invoice-card">
        <h3>Cetak Invoice</h3>
        <div class="input-group">
          <label for="ongkir-input">Ongkos Kirim (Rp):</label>
          <input
            type="number"
            id="ongkir-input"
            v-model.number="ongkosKirim"
            placeholder="Contoh: 15000"
            class="form-input"
          />
        </div>
        <button @click="downloadInvoice" class="btn btn-download" :disabled="loadingDownload">
          <span v-if="loadingDownload">Membuat PDF...</span
          ><span v-else>Konfirmasi Pembayaran & Cetak Invoice PDF</span>
        </button>
        <small class="hint-text">*Masukkan ongkos kirim sebelum mencetak invoice.</small>
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

.action-panel-wrapper {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.action-card {
  background-color: transparent;
  padding: 10px;
  border-radius: 12px;
}

.action-card h3 {
  color: #333;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 18px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #555;
}

.form-input,
.form-select {
  background-color: transparent;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-size: 15px;
  box-sizing: border-box;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.form-input:focus,
.form-select:focus {
  border-color: #d2a400;
  box-shadow: 0 0 0 3px rgba(210, 164, 0, 0.1);
  outline: none;
}

.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  color: white;
  transition: background-color 0.3s;
  text-transform: uppercase;
}

.btn-save {
  background-color: #d2a400;
}

.btn-save:hover:not(:disabled) {
  background-color: #c09400;
}

.btn-download {
  background-color: #28a745;
}

.btn-download:hover:not(:disabled) {
  background-color: #1e7e34;
}

.btn:disabled {
  background-color: #adb5bd;
  cursor: not-allowed;
  opacity: 0.7;
}

.hint-text {
  display: block;
  margin-top: 10px;
  font-size: 13px;
  color: #888;
}
</style>
