<script setup>
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import { formatRupiah } from '@/lib/FormatRupiah'
import showAlert from '@/lib/Swal'
import Cookies from 'js-cookie'
import router from '@/router'
import BaseURL from '@/lib/BaseUrl'

const produkBaru = ref({
  kategori_id: '',
  nama_produk: '',
  harga: '',
  file_path: null,
  preview: null,
  deskripsi: '',
})

const token = Cookies.get('token')

if (!token) {
  router.push({ name: 'login' })
}

const errors = ref(null)

const produks = ref(null)
const totalPages = ref(0)
const currentPage = ref(1)

const fetchProduks = async (page = 1) => {
  const response = await axios.get(`${BaseURL}/api/produk?page=${page}`)
  console.log('data :', response.data)
  const data = response.data.data
  produks.value = data.data

  currentPage.value = data.current_page

  totalPages.value = data.last_page
}

const isLoadingForm = ref(false)

const tambahProduk = async () => {
  try {
    isLoadingForm.value = true
    if (editId.value) {
      errors.value = {}
      console.log('ini edit')
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('kategori_id', produkBaru.value.kategori_id)
      formData.append('nama_produk', produkBaru.value.nama_produk)
      formData.append('harga', produkBaru.value.harga)
      formData.append('deskripsi', produkBaru.value.deskripsi)
      if (produkBaru.value.file_path) {
        formData.append('file_path', produkBaru.value.file_path)
      }
      const response = await axios.post(`${BaseURL}/api/produk/${editId.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      showAlert(response.data.message, 'Produk Berhasil di Edit', 'success')
      console.log(response.data)
      produkBaru.value.nama_produk = ''
      produkBaru.value.deskripsi = ''
      produkBaru.value.harga = ''
      produkBaru.value.kategori_id = ''
      produkBaru.value.file_path = ''
      produkBaru.value.preview = ''
      editId.value = null
      fetchProduks(currentPage.value)
    } else {
      errors.value = {}

      const formData = new FormData()
      formData.append('kategori_id', produkBaru.value.kategori_id)
      formData.append('nama_produk', produkBaru.value.nama_produk)
      formData.append('harga', produkBaru.value.harga)
      formData.append('deskripsi', produkBaru.value.deskripsi)
      formData.append('file_path', produkBaru.value.file_path)

      const response = await axios.post(`${BaseURL}/api/produk`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      showAlert(response.data.message, 'Produk Berhasil ditambahkan ke daftar produk', 'success')
      console.log(response.data)

      produkBaru.value.nama_produk = ''
      produkBaru.value.deskripsi = ''
      produkBaru.value.harga = ''
      produkBaru.value.kategori_id = ''
      produkBaru.value.file_path = ''
      produkBaru.value.preview = ''

      editId.value = null
      fetchProduks(currentPage.value)
    }
  } catch (error) {
    console.log('Error upload:', error.response)
    console.log(error.response.data.errors)
    errors.value = error.response.data.errors
    showAlert(
      'Gagal menambahkan produk',
      error.response?.data?.message || 'Terjadi kesalahan',
      'error',
    )
    const message = error.response.data.message
    if (message === 'Authenticated.') {
      router.push({ name: 'login' })
    }
  } finally {
    isLoadingForm.value = false
  }
}

const editId = ref(0)

const buttonEdit = (id, nama_produk, deskripsi, harga, kategori_id, preview_image) => {
  editId.value = id
  produkBaru.value.nama_produk = nama_produk
  produkBaru.value.deskripsi = deskripsi
  produkBaru.value.harga = harga
  produkBaru.value.kategori_id = kategori_id
  produkBaru.value.preview = preview_image
  produkBaru.value.file_path = null
  console.log(produkBaru.value)
}

const buttonCancel = () => {
  editId.value = null
  produkBaru.value.nama_produk = ''
  produkBaru.value.deskripsi = ''
  produkBaru.value.harga = ''
  produkBaru.value.kategori_id = ''
  produkBaru.value.file_path = ''
  produkBaru.value.preview = ''
}

const hapusProduk = async (id) => {
  try {
    const response = await axios.delete(`${BaseURL}/api/produk/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })

    showAlert('Berhasil Hapus', response.data.message, 'success')
    fetchProduks(currentPage.value)
  } catch (error) {
    console.log(error)
    showAlert('Gagal Hapus', error.response.data.message, 'error')
  }
}

const daftarKategori = ref(null)

const fetchKategori = async () => {
  const response = await axios.get(`${BaseURL}/api/kategori/all`)
  console.log('kategori :', response)
  const data = response.data.data
  console.log(data)

  daftarKategori.value = data
}
const handleFileChange = (event) => {
  const file = event.target.files[0]
  produkBaru.value.file_path = file
  if (file) {
    produkBaru.value.gambar = file
    const reader = new FileReader()
    reader.onload = (e) => {
      produkBaru.value.preview = e.target.result
    }
    reader.readAsDataURL(file)
  }

  console.log(produkBaru.value)
}

onMounted(() => {
  fetchKategori()
  fetchProduks()
})
</script>

<template>
  <div class="data-produk">
    <h1>Data Produk</h1>

    <div class="form-produk">
      <h2>Tambah Produk</h2>
      <div class="form-container">
        <div class="form-inputs">
          <div class="input-group">
            <label>Varian Produk</label>
            <input
              type="text"
              v-model="produkBaru.nama_produk"
              placeholder="Tetato chips sambalado"
            />
            <p v-if="errors?.nama_produk?.[0]" style="color: red; margin-top: 5px; font-size: 15px">
              {{ errors?.nama_produk[0] }}
            </p>
          </div>
          <div class="input-group">
            <label>Deskripsi</label>
            <input
              type="text"
              v-model="produkBaru.deskripsi"
              placeholder="Tetato chips rasa yang enak dan gurih"
            />
            <p v-if="errors?.deskripsi?.[0]" style="color: red; margin-top: 5px; font-size: 15px">
              {{ errors?.deskripsi[0] }}
            </p>
          </div>
          <div class="input-group">
            <label>Harga</label>
            <input type="number" v-model="produkBaru.harga" placeholder="15000" />
            <p v-if="errors?.harga?.[0]" style="color: red; margin-top: 5px; font-size: 15px">
              {{ errors?.harga[0] }}
            </p>
          </div>
          <div class="input-group">
            <label>Kategori</label>
            <select v-model="produkBaru.kategori_id" name="kategori" id="kategori">
              <option value="">Pilih Kategori</option>
              <option
                v-if="daftarKategori?.length > 0"
                v-for="(kategori, index) in daftarKategori"
                :key="index"
                :value="kategori.id"
              >
                {{ kategori.nama_kategori }}
              </option>
            </select>
            <p v-if="errors?.kategori_id?.[0]" style="color: red; margin-top: 5px; font-size: 15px">
              {{ errors?.kategori_id[0] }}
            </p>
          </div>
        </div>

        <div class="upload-container">
          <label>Gambar</label>
          <div class="upload-box">
            <div v-if="!produkBaru.preview" class="upload-icon">
              <Icon icon="mdi:plus" width="50" height="50" color="#D6B000" />
            </div>

            <img
              v-if="produkBaru.preview"
              :src="produkBaru.preview"
              alt="Preview Gambar"
              class="preview-img"
            />

            <input type="file" accept="image/*" class="browse-btn" @change="handleFileChange" />
          </div>
          <p v-if="errors?.file_path?.[0]" style="color: red; margin-top: 20px; font-size: 15px">
            {{ errors?.file_path[0] }}
          </p>
        </div>
      </div>

      <button v-if="editId" class="btn-tambah" style="background-color: red" @click="buttonCancel">
        Batalkan Edit
      </button>
      <button class="btn-tambah" @click="tambahProduk">
        <span v-if="isLoadingForm">Loading..</span>
        <span v-else-if="editId">Edit Kategori</span> <span v-else>Tambah Kategori</span>
      </button>
    </div>

    <div class="tabel-produk">
      <table>
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Varian</th>
            <th>Kemasan</th>
            <th>Harga</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="produks?.length > 0" v-for="produk in produks" :key="produk?.id">
            <td><img :src="produk.url_image" alt="" /></td>
            <td>{{ produk.nama_produk }}</td>
            <td>{{ produk.kategori.nama_kategori }}</td>
            <td>{{ formatRupiah(produk.harga) }}</td>
            <td class="action">
              <button
                class="edit-btn"
                @click="
                  buttonEdit(
                    produk.id,
                    produk.nama_produk,
                    produk.deskripsi,
                    produk.harga,
                    produk.kategori_id,
                    produk.url_image,
                  )
                "
              >
                <Icon icon="lucide:edit" width="20" height="20" />
              </button>
              <button class="delete-btn" @click="hapusProduk(produk.id)">
                <Icon icon="lucide:trash-2" width="20" height="20" />
              </button>
            </td>
          </tr>
          <h1 v-else>Tidak ada data produk</h1>
        </tbody>
      </table>
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
    </div>
  </div>
</template>

<style scoped>
.data-produk {
  background-color: #fffdf2;
  min-height: 100vh;
  padding: 40px;
  font-family: 'Poppins', sans-serif;
}

.data-produk h1 {
  font-size: 28px;
  color: #d2a400;
  font-weight: 700;
  margin-bottom: 30px;
}

.form-produk {
  background-color: #fbf8e3;
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #f1e8b8;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.form-produk h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.form-inputs {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-weight: 500;
  margin-bottom: 5px;
  color: #333;
}

.input-group input,
select {
  background-color: #f9f8ee;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
}

.upload-container {
  flex: 1;
}

.upload-container label {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}

.upload-box {
  border: 2px dashed #aaa;
  background-color: #fffceb;
  border-radius: 10px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
}

.upload-icon {
  background-color: #faf49e;
  border-radius: 10px;
  padding: 10px;
}

.preview-img {
  max-width: 100%;
  max-height: 150px;
  border-radius: 10px;
  object-fit: cover;
}

.browse-btn {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.btn-tambah {
  background-color: #ffd400;
  color: white;
  border: none;
  border-radius: 30px;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-tambah:hover {
  background-color: #eac100;
}

.tabel-produk {
  background-color: #fbf8e3;
  border-radius: 15px;
  border: 1px solid #f1e8b8;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f5f3d8;
}

th {
  text-align: left;
  padding: 10px;
  color: #555;
}

td {
  padding: 10px;
  border-top: 1px solid #e3e3c3;
  vertical-align: middle;
}

td img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
}

.action {
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.edit-btn:hover {
  color: #007bff;
}

.delete-btn:hover {
  color: #d9534f;
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
