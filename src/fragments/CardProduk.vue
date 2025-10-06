<script setup>
import { formatRupiah } from '@/lib/FormatRupiah';

defineProps({
  img: {
    type: String,
    default: '/public/bundling.png',
  },
  title: {
    type: String,
    default: 'Tetato Chips',
  },
  harga: {
    type: Number,
    default: 'Rp 15.000',
  },
  slug: {
    type: String,
  },
})
</script>

<template>
  <div class="card">
    <div class="container-img">
      <img :src="img" alt="Tetato Chips" />
    </div>
    <div class="content">
      <h4>{{ title }}</h4>
      <div class="harga">
        <h2>{{ formatRupiah(harga) }}</h2>
        <router-link :to="{ name: 'produk-detail', params: { slug } }" class="button-detail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 200px;
  min-height: 280px;
  border-radius: 20px;
  padding: 20px 16px 16px;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: visible;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.container-img {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 9999;
}

.container-img img {
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.card:hover {
  transform: translateY(-8px);
}

.container-img:hover {
  transform: translateY(-20px) scale(2);
}

.content {
  margin-top: auto;
  width: 100%;
  transition: all 0.3s ease;
}

.content h4 {
  margin-left: 15px;
}

.card:hover .content {
  transform: translateY(-5px);
}

.content h4 {
  font-weight: 600;
  color: #444;
  margin-bottom: 10px;
  font-size: 15px;
  transition: color 0.3s ease;
}

.card:hover .content h4 {
  color: #222;
}

.harga {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.harga h2 {
  margin-top: -20px;
  font-weight: 600;
  color: #d4a300;
  font-size: 25px;
  transition: all 0.3s ease;
}

.card:hover .harga h2 {
  color: #b88f00;
  transform: scale(1.05);
}

.button-detail {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  margin-top: -20px;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.card:hover .button-detail {
  transform: translateX(3px) scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.button-detail svg {
  color: white;
  transition: transform 0.3s ease;
}

.card:hover .button-detail svg {
  transform: translateX(1px);
}

@media (max-width: 768px) {
  .container-card {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1.5rem;
  }

  .card {
    min-width: 160px;
    min-height: 260px;
  }

  .container-img {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 640px) {
  .judul {
    margin-left: 20px;
    font-size: 24px;
  }
  .container-img:hover {
    transform: translateY(-15px) scale(2.1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.5s ease forwards;
}
</style>
