<script setup>
import Button from '@/fragments/Button.vue'
import ButtonBack from '@/fragments/ButtonBack.vue'
import { formatRupiah } from '@/lib/FormatRupiah'
import showAlert from '@/lib/Swal'
import { useKeranjangStore } from '@/stores/Keranjang'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const KeranjangStore = useKeranjangStore()

const { totalHarga, jumlahProduk, keranjangBelanja } = storeToRefs(KeranjangStore)
const { getJumlahProduk, hapusKeranjang, getKeranjang, getTotalHarga } = KeranjangStore
const produks = keranjangBelanja

const handlerHapus = (index) => {
  hapusKeranjang(index)

  showAlert('Berhasil Hapus', 'Produk anda telah di hapus dari keranjang', 'success')
}
onMounted(() => {
  getJumlahProduk()
  getTotalHarga()
})
const item = computed(() => {
  return produks.value.map((produk) => ({
    produk_id: produk.id,
    jumlah: produk.jumlah,
  }))
})
const checkoutForm = ref({
  nama_pelanggan: '',
  email: '',
  telepon: '',
  alamat_pengiriman: '',
  items: item,
})

const isLoading = ref(false)
const message = ref('')
const isError = ref(false)
const messageError = ref(null)
const dataResponse = ref(null)

const handleCheckout = async () => {
  try {
    isLoading.value = true
    const response = await axios.post('http://127.0.0.1:8000/api/checkout', checkoutForm.value)
    dataResponse.value = response.data.data
    message.value = response.data.message

    console.log(response)
    console.log(dataResponse.value)

    showAlert(
      'Berhasil Memproses Pesanan',
      'Tunggu dihubungi oleh admin untuk pembayaran',
      'success',
    )
    checkoutForm.value = {
      nama_pelanggan: '',
      email: '',
      telepon: '',
      alamat_pengiriman: '',
      items: item,
    }
  } catch (error) {
    console.log(error)
    isError.value = true
    message.value = error.response.data.message
    messageError.value = error.response.data.errors

    console.log(message.value)
    console.log(messageError.value)

    showAlert('Gagal Memproses Pesanan', message.value, 'error')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main>
    <ButtonBack />
    <h2 class="title">Keranjang Belanja</h2>

    <div class="container-table">
      <div v-if="produks.length > 0" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Produk</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in produks" :key="index">
              <td class="produk">
                <div @click="handlerHapus(index)" class="button-delete">X</div>
                <aside>
                  <img :src="item.gambar" width="100px" alt="" />
                </aside>
                <div class="content">
                  <h3>{{ item.nama }}</h3>
                  <p>{{ item.kategori }}</p>
                </div>
              </td>
              <td>{{ formatRupiah(item.harga) }}</td>
              <td>{{ item.jumlah }}</td>
              <td>{{ formatRupiah(item.total) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="no-produk">
        <div class="no-produk-content">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="no product"
            class="no-produk-img"
          />
          <h2>Tidak Ada Produk</h2>
          <p>Silahkan tambahkan produk ke dalam keranjang belanja</p>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleCheckout" class="container-form">
      <div class="left-container">
        <h2>Data Pembeli :</h2>
        <div class="container-input">
          <label for="name">Nama</label>
          <input
            required
            v-model="checkoutForm.nama_pelanggan"
            type="text"
            id="name"
            placeholder="Nama Pesanan"
          />
          <div v-if="messageError?.nama_pelanggan">
            <h5 v-for="(error, index) in messageError.nama_pelanggan" :key="index">
              <p>{{ error }}</p>
            </h5>
          </div>
        </div>
        <div class="container-input">
          <label for="name">Email</label>
          <input
            required
            v-model="checkoutForm.email"
            type="email"
            id="name"
            placeholder="emailpemesan@gmail.com"
          />
          <div v-if="messageError?.email">
            <h5 v-for="(error, index) in messageError.email" :key="index">
              <p>{{ error }}</p>
            </h5>
          </div>
        </div>
        <div class="container-input">
          <label for="nomer">Nomor Whatsapp</label>
          <input
            required
            v-model="checkoutForm.telepon"
            type="text"
            id="nomer"
            placeholder="08123456678"
          />
          <div v-if="messageError?.telepon">
            <h5 v-for="(error, index) in messageError.telepon" :key="index">
              <p>{{ error }}</p>
            </h5>
          </div>
        </div>
        <div class="container-input">
          <label for="alamat">Alamat</label>
          <textarea
            v-model="checkoutForm.alamat_pengiriman"
            id="alamat"
            placeholder="Ketegan RT 07 / 02, Ketegan Taman Sidoarjo"
          ></textarea>
          <div v-if="messageError?.alamat_pengiriman">
            <h5 v-for="(error, index) in messageError.alamat_pengiriman" :key="index">
              <p>{{ error }}</p>
            </h5>
          </div>
        </div>
      </div>

      <div class="right-container">
        <h2>Ringkasan :</h2>
        <div class="content-ringkasan jumlah">
          <p>Jumlah Produk</p>
          <p>{{ jumlahProduk }} Pcs</p>
        </div>
        <div class="content-ringkasan total">
          <p>Total</p>
          <p>{{ formatRupiah(totalHarga) }}</p>
        </div>
        <h5>*Biaya ongkir akan dihubungi melalui WhatsApp</h5>
        <button class="btn" type="submit">
          <span v-if="isLoading">Memproses Checkout..</span> <span v-else>Checkout</span>
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped>
main {
  font-family: 'Poppins', sans-serif;
  padding-top: 50px;
  max-width: 1200px;
  margin: auto;
}

.btn {
  background-color: #d4a300;
  color: white;
  border: none;
  padding: 10px 40px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;
  font-size: medium;
}

.btn:hover {
  opacity: 0.85;
}

.title {
  text-align: center;
  color: #d4a300;
  font-size: 1.8rem;
}

.container-table {
  padding: 40px 15px;
  overflow-x: auto;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  min-width: 700px;
  text-align: left;
  font-weight: 600;
}

th,
td {
  border-bottom: 1.5px solid #d4a300;
  padding: 15px;
}

th {
  color: #d4a300;
  text-transform: uppercase;
  font-size: 14px;
}

.produk {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.produk aside img {
  border-radius: 10px;
}

.produk .content h3 {
  font-weight: 600;
  font-size: 16px;
}

.produk .content p {
  color: #6a6969;
  font-weight: 500;
  font-size: 14px;
}

.button-delete {
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s ease;
}

.button-delete:hover {
  color: rgba(0, 0, 0, 0.5);
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

.container-form {
  display: grid;
  margin-bottom: 100px;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  padding: 40px;
  background-color: #ffea00;
  border-radius: 20px;
  margin-top: 50px;
}

.left-container {
  width: 100%;
}

.container-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 15px;
}

.container-input input,
.container-input textarea {
  padding: 12px 15px;
  background-color: transparent;
  outline: none;
  border: 2px solid #d4a300;
  border-radius: 15px;
  font-family: 'Poppins', sans-serif;
  resize: none;
}

.right-container {
  width: 100%;
  padding: 20px;
}

.content-ringkasan {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 15px;
  padding: 15px 0;
  border-top: 2px solid #d4a300;
}

.content-ringkasan.total {
  border-bottom: 2px solid #d4a300;
  margin-bottom: 15px;
}

h5 {
  font-size: 14px;
  color: red;
  margin-bottom: 15px;
}

@media (max-width: 992px) {
  .container-form {
    grid-template-columns: 1fr;
    padding: 30px;
  }

  .title {
    font-size: 1.6rem;
  }

  table {
    min-width: 600px;
  }

  .produk aside img {
    width: 80px;
  }
}

@media (max-width: 768px) {
  .container-table {
    padding: 20px 10px;
  }

  table {
    font-size: 13px;
    min-width: 500px;
  }

  .produk {
    flex-direction: column;
    align-items: flex-start;
  }

  .produk aside img {
    width: 70px;
  }

  .container-form {
    padding: 20px;
  }
}

@media (max-width: 576px) {
  main {
    padding: 10px;
    padding-top: 80px;
  }

  .title {
    font-size: 1.4rem;
  }

  .container-form {
    padding: 15px;
  }

  .content-ringkasan {
    font-size: 14px;
  }

  input,
  textarea {
    font-size: 14px;
  }

  table {
    font-size: 12px;
  }

  .produk aside img {
    width: 60px;
  }

  .produk .content h3 {
    font-size: 14px;
  }
}
</style>
