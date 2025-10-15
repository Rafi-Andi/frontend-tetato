<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const produkBaru = ref({
  varian: '',
  kemasan: '',
  harga: '',
  gambar: null, 
  preview: null, 
})

const daftarProduk = ref([
  {
    id: 1,
    gambar: 'https://ik.imagekit.io/misxxns4p/tetato.webp',
    varian: 'Tetato Chips Original',
    kemasan: '65 Gram',
    harga: 15000,
  },
  {
    id: 2,
    gambar: 'https://ik.imagekit.io/misxxns4p/tetato.webp',
    varian: 'Tetato Chips Original',
    kemasan: '65 Gram',
    harga: 15000,
  },
])

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    produkBaru.value.gambar = file
    const reader = new FileReader()
    reader.onload = (e) => {
      produkBaru.value.preview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const tambahProduk = () => {
  if (!produkBaru.value.varian || !produkBaru.value.kemasan || !produkBaru.value.harga) return

  daftarProduk.value.push({
    id: Date.now(),
    varian: produkBaru.value.varian,
    kemasan: produkBaru.value.kemasan,
    harga: produkBaru.value.harga,
    gambar: produkBaru.value.preview || 'https://ik.imagekit.io/misxxns4p/tetato.webp',
  })

  produkBaru.value = { varian: '', kemasan: '', harga: '', gambar: null, preview: null }
}

const hapusProduk = (id) => {
  daftarProduk.value = daftarProduk.value.filter((p) => p.id !== id)
}
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
            <input type="text" v-model="produkBaru.varian" placeholder="Tetato chips sambalado" />
          </div>
          <div class="input-group">
            <label>Harga</label>
            <input type="number" v-model="produkBaru.harga" placeholder="15000" />
          </div>
          <div class="input-group">
            <label>Kategori</label>
            <select name="kategori" id="kategori">
              <option value="">Pilih Kategori</option>
              <option value="">Kategori 1</option>
            </select>
          </div>
        </div>

        <div class="upload-container">
          <label>Gambar</label>
          <div class="upload-box">
            <div v-if="!produkBaru.preview" class="upload-icon">
              <Icon icon="mdi:plus" width="50" height="50" color="#D6B000" />
            </div>

            <img v-if="produkBaru.preview" :src="produkBaru.preview" alt="Preview Gambar" class="preview-img" />

            <input
              type="file"
              accept="image/*"
              class="browse-btn"
              @change="handleFileChange"
            />
          </div>
        </div>
      </div>

      <button class="btn-tambah" @click="tambahProduk">Tambah Produk</button>
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
          <tr v-for="p in daftarProduk" :key="p.id">
            <td><img :src="p.gambar" alt="" /></td>
            <td>{{ p.varian }}</td>
            <td>{{ p.kemasan }}</td>
            <td>Rp {{ p.harga.toLocaleString('id-ID') }}</td>
            <td class="action">
              <button class="edit-btn">
                <Icon icon="lucide:edit" width="20" height="20" />
              </button>
              <button class="delete-btn" @click="hapusProduk(p.id)">
                <Icon icon="lucide:trash-2" width="20" height="20" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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

.input-group input, select {
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
</style>
