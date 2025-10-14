<script setup>
import Button from '@/fragments/Button.vue'
import ButtonBack from '@/fragments/ButtonBack.vue'
import { formatRupiah } from '@/lib/FormatRupiah'
import showAlert from '@/lib/Swal'
import { useKeranjangStore } from '@/stores/Keranjang'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const KeranjangStore = useKeranjangStore()

const { totalHarga, jumlahProduk } = storeToRefs(KeranjangStore)
const { getJumlahProduk, hapusKeranjang, getKeranjang, getTotalHarga } = KeranjangStore
const produks = getKeranjang()

const handlerHapus = (index) => {
  hapusKeranjang(index)

  showAlert('Berhasil Hapus', 'Produk anda telah di hapus dari keranjang', 'success')
}
onMounted(() => {
  getJumlahProduk()
  getTotalHarga()
})
</script>

<template>
  <main>
    <ButtonBack />
    <h2 class="title">Keranjang Belanja</h2>

    <div class="container-table">
      <div class="table-wrapper">
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
    </div>

    <div class="container-form">
      <div class="left-container">
        <h2>Data Pembeli :</h2>
        <div class="container-input">
          <label for="name">Nama</label>
          <input type="text" id="name" placeholder="Nama Pesanan" />
        </div>
        <div class="container-input">
          <label for="nomer">Nomor Whatsapp</label>
          <input type="text" id="nomer" placeholder="08123456678" />
        </div>
        <div class="container-input">
          <label for="alamat">Alamat</label>
          <textarea id="alamat" placeholder="Ketegan RT 07 / 02, Ketegan Taman Sidoarjo"></textarea>
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
        <Button label="Checkout" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: 'Poppins', sans-serif;
  padding-top: 50px;
  max-width: 1200px;
  margin: auto;
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

.container-form {
  display: grid;
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
