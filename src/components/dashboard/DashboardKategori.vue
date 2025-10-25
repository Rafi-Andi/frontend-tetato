<script setup>
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import { formatRupiah } from '@/lib/FormatRupiah'
import showAlert from '@/lib/Swal'
import Cookies from 'js-cookie'
import router from '@/router'

const kategoriBaru = ref({
  nama_kategori: '',
})

const token = Cookies.get('token')

if (!token) {
  router.push({ name: 'login' })
}

const categories = ref(null)
const totalPages = ref(0)
const currentPage = ref(1)
const isLoading = ref(false)

const fetchKategori = async (page = 1) => {
    try {
        isLoading.value = true
        const response = await axios.get(`http://127.0.0.1:8000/api/kategori?page=${page}`)
        console.log('data :', response.data)
        const data = response.data.data
        categories.value = data.data
        
        currentPage.value = data.current_page
        
        totalPages.value = data.last_page
        
    } catch (error) {
        console.log(error)
    }finally{
        isLoading.value = false
    }
}

const editId = ref(0)

const tambahProduk = async () => {
  try {
    if (editId.value) {
      console.log('ini edit')

      const response = await axios.post(
        `http://127.0.0.1:8000/api/kategori/${editId.value}`,
        kategoriBaru.value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      showAlert(response.data.message, 'Kategori Berhasil di Edit', 'success')
      console.log(response.data)
      kategoriBaru.value.nama_kategori = ''
      editId.value = null
    } else {
      const response = await axios.post('http://127.0.0.1:8000/api/kategori', kategoriBaru.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      showAlert(response.data.message, 'Produk Berhasil ditambahkan ke daftar produk', 'success')
      console.log(response.data)

      kategoriBaru.value.nama_produk = ''
      editId.value = null
    }
  } catch (error) {
    console.log('Error upload:', error)
    showAlert(
      'Gagal menambahkan kategori',
      error.response?.data?.message || 'Terjadi kesalahan',
      'error',
    )  
    const message = error
    if (message === 'Authenticated.') {
      router.push({ name: 'login' })
    }
  }
}


const buttonEdit = (id, nama_kategori) => {
  editId.value = id
  kategoriBaru.value.nama_kategori = nama_kategori
}

const buttonCancel = () => {
  editId.value = null
  kategoriBaru.value.nama_kategori = ''
}

onMounted(() => {
  fetchKategori()
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
            <label>Nama Kategori</label>
            <input
              type="text"
              v-model="kategoriBaru.nama_kategori"
              placeholder="Kemasan 1000 Gram"
            />
          </div>
        </div>
      </div>

      <button v-if="editId" class="btn-tambah" style="background-color: red" @click="buttonCancel">
        Batalkan Edit
      </button>
      <button class="btn-tambah" @click="tambahProduk">
        <span v-if="editId">Edit Produk</span> <span v-else>Tambah Produk</span>
      </button>
    </div>

    <div class="tabel-produk">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody v-if="categories?.length > 0">
          <tr
            v-for="(category, index) in categories"
            :key="index"
          >
            <td>{{ category.id }}</td>
            <td>{{ category.nama_kategori }}</td>
            <td class="action">
              <button
                class="edit-btn"
                @click="
                  buttonEdit(
                    category.id,
                    category.nama_kategori
                  )
                "
              >
                <Icon icon="lucide:edit" width="20" height="20" />
              </button>
            </td>
          </tr>
        </tbody>
        <h1 style="text-align: center; margin-top: 10px;" v-else-if="isLoading">Memuat Data..</h1>
        <h1 style="text-align: center; margin-top: 10px;" v-else>Tidak ada data produk</h1>
      </table>
      <div class="container-paginate" v-if="categories?.length > 0">
        <button
          :disabled="currentPage === 1"
          class="page button"
          @click="fetchKategori(currentPage - 1, kategoriAktif)"
        >
          <p><</p>
        </button>

        <div
          v-for="i in totalPages"
          :key="i"
          :class="['page', i === currentPage ? 'active' : 'inactive']"
          @click="fetchKategori(i, kategoriAktif)"
        >
          <p>{{ i }}</p>
        </div>

        <button
          :disabled="currentPage === totalPages"
          class="page button"
          @click="fetchKategori(currentPage + 1, kategoriAktif)"
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

.input-group input {
  background-color: #f9f8ee;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
  width: 50%;
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
