<script setup>
import Button from '@/fragments/Button.vue'
import ButtonBack from '@/fragments/ButtonBack.vue'
import { formatRupiah } from '@/lib/FormatRupiah'
import showAlert from '@/lib/Swal'
import { useKeranjangStore } from '@/stores/Keranjang'
import { useProdukStore } from '@/stores/Produk'
import axios from 'axios'
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const data = ref({})

const router = useRoute()
const slug = router.params.slug
console.log(slug)

const kuantitas = ref(1)
const totalHarga = computed(() => data?.value?.harga * kuantitas.value)

const fetchDetailProduks = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/produk/${slug}`)
    console.log(response)
    data.value = response.data.data[0]
    console.log(data.value.nama_produk)
  } catch (error) {
    console.log(error)
  }
}

const tambah = () => {
  kuantitas.value++
  console.log(formatRupiah(totalHarga.value))
}

const kurang = () => {
  if (kuantitas.value > 1) {
    kuantitas.value--
  }
}

onMounted( async() => {
  await fetchDetailProduks()
})

const KeranjangStore = useKeranjangStore()

const { addKeranjang } = KeranjangStore

const dataCheckOut = ref({})

const handleCheckout = () => {
  if (!data.value) {
    showAlert('Gagal', 'Data produk belum dimuat.', 'error')
    return
  }
  dataCheckOut.value = {
    id: data.value.id,
    nama: data.value.nama_produk,
    kategori: data.value.kategori.nama_kategori,
    gambar: data.value.url_image,
    harga: data.value.harga,
    jumlah: kuantitas.value,
    total: totalHarga.value,
  }

  addKeranjang(dataCheckOut.value)

  dataCheckOut.value = {}

  showAlert('Berhasil', 'Berhasil menambahkan ke keranjang', 'success')
}
</script>

<template>
  <main>
    <ButtonBack />
    <header>
      <h1>Detail Produk</h1>
      <p>{{ slug }}</p>
    </header>
    <div class="container-content">
      <aside>
        <img loading="lazy" decoding="async" :src="data?.url_image" width="400px" alt="" />
      </aside>
      <div class="content">
        <p class="label">{{ data?.kategori?.nama_kategori }}</p>
        <h1 class="varian">{{ data?.nama_produk }}</h1>
        <h2 class="harga">{{ formatRupiah(data?.harga) }}</h2>
        <p class="deskripsi">
          {{ data?.deskripsi }}
        </p>
        <div class="button-jumlah">
          <div class="kurang" @click="kurang">-</div>
          <div>
            <p>{{ kuantitas }}</p>
          </div>
          <div class="tambah" @click="tambah">+</div>
        </div>
        <h1 class="harga-total">Total: {{ formatRupiah(totalHarga) }}</h1>
        <div @click="handleCheckout">
          <Button label="Tambah ke keranjang" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 100px 20px;
  position: relative;
}

header {
  font-family: 'DynaPuff', sans-serif;
  color: #d4a300;
  text-align: center;
}
.container-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 60px;
  font-family: 'poppins', sans-serif;
  gap: 2rem;
}

.content .label {
  color: #9e9e9e;
  font-weight: 500;
  font-size: 20px;
}

.content .varian {
  font-weight: 600;
}

.content .harga {
  color: #d4a300;
  font-weight: 600;
  font-size: 30px;
}

.content .deskripsi {
  color: #4b4b4b;
  font-size: 20px;
  margin-top: 10px;
}

.button-jumlah {
  display: flex;
  gap: 2rem;
  border: 1px solid #9e9e9e;
  width: fit-content;
  height: 35px;
  align-items: center;
  padding: 0px 20px;
  border-radius: 50px;
  font-weight: 500;
  margin-top: 20px;
  font-size: 22px;
  color: #4b4b4b;
  margin-bottom: 30px;
}

.kurang {
  display: flex;
  align-items: center;
  border-right: 1px solid #9e9e9e;
  height: 35px;
  padding-right: 20px;
  cursor: pointer;
}
.tambah {
  display: flex;
  align-items: center;
  border-left: 1px solid #9e9e9e;
  height: 35px;
  padding-left: 20px;
  cursor: pointer;
}

.harga-total {
  color: #d4a300;
  font-weight: 600;
  margin-bottom: 10px;
}

@media (max-width: 720px) {
  .container-content {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    justify-content: center;
  }

  aside img {
    width: 300px;
  }
}
</style>
