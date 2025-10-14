<script setup>
import { ref } from 'vue'

const dataStatistik = ref([
  { label: 'Jumlah Produk', value: 20 },
  { label: 'Pesanan selesai', value: 30 },
  { label: 'Pesanan Baru', value: 50 },
  { label: 'Jumlah Pesanan', value: 100 },
  { label: 'Jumlah Pesanan', value: 100 },
  { label: 'Jumlah Pesanan', value: 100 },
])

const notifikasiPesanan = ref([
  { no: 1, kode: '#001', nama: 'Rafi Andi Prayitno', tanggal: '31-09-2025', total: 'Rp 15.000' },
  { no: 2, kode: '#002', nama: 'Rifqi Maulana', tanggal: '01-10-2025', total: 'Rp 20.000' },
])
</script>

<template>
  <section class="dashboard">
    <h2 class="judul">Analisis Toko</h2>

    <div class="statistik">
      <div v-for="(item, i) in dataStatistik" :key="i" class="kartu">
        <h4>{{ item.label }}</h4>
        <p>{{ item.value }}</p>
      </div>
    </div>

    <div class="notifikasi">
      <h4>Notifikasi Pesanan Baru :</h4>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Kode</th>
            <th>Nama Pemesan</th>
            <th>Tanggal</th>
            <th>Total pesanan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in notifikasiPesanan" :key="i">
            <td>{{ row.no }}</td>
            <td>{{ row.kode }}</td>
            <td>{{ row.nama }}</td>
            <td>{{ row.tanggal }}</td>
            <td>{{ row.total }}</td>
          </tr>
        </tbody>
      </table>
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
  font-size: 24px;
  font-weight: 700;
  color: #b6920e;
  margin-bottom: 30px;
}

.statistik {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.kartu {
  background-color: #faf8e2;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.kartu h4 {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.kartu p {
  font-size: 28px;
  font-weight: 700;
  margin-top: 10px;
}

.notifikasi {
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

@media (max-width: 768px) {
  .dashboard {
    padding: 20px; 
  }

  .statistik {
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
    gap: 15px;
  }

  .kartu p {
    font-size: 22px;
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
