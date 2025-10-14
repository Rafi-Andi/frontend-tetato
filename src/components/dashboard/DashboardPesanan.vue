<template>
  <div class="container">
    <h2 class="title">Data Produk</h2>

    <div class="tabs">
      <button :class="{ active: tab === 'all' }" @click="tab = 'all'">All Orders</button>
      <button :class="{ active: tab === 'proses' }" @click="tab = 'proses'">Proses</button>
      <button :class="{ active: tab === 'selesai' }" @click="tab = 'selesai'">Selesai</button>
    </div>

    <div class="filters">
      <input type="text" v-model="search" placeholder="Cari ID / Customer" />
      <input type="date" v-model="date" />
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Tanggal</th>
          <th>Total</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in filteredOrders"
          :key="order.id"
        >
          <td>#{{ order.id }}</td>
          <td>{{ order.customer }}</td>
          <td>{{ order.tanggal }}</td>
          <td>Rp {{ order.total.toLocaleString('id-ID') }}</td>
          <td>
            <span
              class="status"
              :class="order.status === 'Proses' ? 'status-proses' : 'status-selesai'"
            >
              {{ order.status }}
            </span>
          </td>
          <td>
            <button class="btn-detail">Detail</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button v-for="n in 6" :key="n" :class="{ active: n === currentPage }" @click="currentPage = n">
        {{ n }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const tab = ref("all");
const search = ref("");
const date = ref("");
const currentPage = ref(1);

const orders = ref([
  { id: "001", customer: "Rafi Andi Prayitno", tanggal: "31-09-2025", total: 15000, status: "Proses" },
  { id: "002", customer: "Rifqi Maulana", tanggal: "01-10-2025", total: 20000, status: "Selesai" },
]);

const filteredOrders = computed(() => {
  let data = orders.value;

  if (tab.value !== "all") data = data.filter(o => o.status.toLowerCase() === tab.value);

  if (search.value)
    data = data.filter(o =>
      o.customer.toLowerCase().includes(search.value.toLowerCase()) ||
      o.id.includes(search.value)
    );

  return data;
});
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
  background-color: #fffdf4;
}

.container {
  width: 90%;
  margin: 40px auto;
  background-color: #fffdf4;
}

.title {
  font-weight: bold;
  color: #c59e00;
  font-size: 22px;
  margin-bottom: 10px;
}

.tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.tabs button {
  border: none;
  background: none;
  font-weight: 600;
  color: #999;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  padding-bottom: 5px;
}

.tabs button.active {
  color: #333;
  border-bottom: 2px solid #c59e00;
}

.filters {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.filters input {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 12px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #fefce9;
  border-radius: 12px;
  overflow: hidden;
}

.data-table th {
  text-align: left;
  background: #f7f3d0;
  padding: 12px 16px;
}

.data-table td {
  padding: 14px 16px;
  border-top: 1px solid #ddd;
}

.status {
  padding: 6px 14px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.status-proses {
  background-color: #f7b500;
}

.status-selesai {
  background-color: #43a047;
}

.btn-detail {
  background-color: #2f2f2f;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn-detail:hover {
  opacity: 0.9;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 6px;
}

.pagination button {
  border: 1px solid #c59e00;
  background: #fffbe3;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #c59e00;
  color: white;
}
</style>
