<script setup>
import { Icon } from '@iconify/vue'
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close-sidebar'])
</script>

<template>
  <aside :data-open="isOpen">
    <div class="container-menu">
      <div style="margin-top: 20px">
        <img src="https://ik.imagekit.io/misxxns4p/logo.webp" width="100px" alt="" />
      </div>
      <router-link
        :to="{ name: 'dashboard' }"
        class="menu"
        :class="{ active: $route.name === 'dashboard' }"
        style="text-decoration: none"
      >
        <Icon icon="lucide:layout-dashboard" class="w-5 h-5" color="#716F6F" width="25px" />
        <h3>Analisis</h3>
      </router-link>

      <router-link
        :to="{ name: 'dashboard-produk' }"
        class="menu"
        :class="{ active: $route.name === 'dashboard-produk' }"
        style="text-decoration: none"
      >
        <Icon icon="lucide:package" class="w-5 h-5" color="#716F6F" width="25px" />
        <h3>Produk</h3>
      </router-link>
      <router-link
        :to="{ name: 'dashboard-kategori' }"
        class="menu"
        :class="{ active: $route.name === 'dashboard-kategori' }"
        style="text-decoration: none"
      >
        <Icon icon="lucide:package" class="w-5 h-5" color="#716F6F" width="25px" />
        <h3>Kategori</h3>
      </router-link>

      <router-link
        :to="{ name: 'dashboard-pesanan' }"
        class="menu"
        :class="{ active: $route.name === 'dashboard-pesanan' }"
        style="text-decoration: none"
      >
        <Icon icon="bi:cart2" class="w-5 h-5" color="#716F6F" width="25px" />
        <h3>Pesanan</h3>
      </router-link>
    </div>
    <hr
      style="margin-top: 30px; height: 3px; width: 100%; background-color: #716f67; color: #716f67"
    />
    <div class="menu" style="padding: 20px">
      <Icon icon="lucide:log-out" class="w-5 h-5" color="#716F6F" width="25px" />
      <h3>Logout</h3>
    </div>
  </aside>
</template>

<style scoped>
.menu.active {
  background-color: #f7e8b8;
  border-radius: 10px;
  color: #333;
}

.menu.active h3 {
  color: #333;
  font-weight: 600;
}

.menu.active .w-5 {
  color: #333 !important;
}

aside {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fdfbec;
  border-right: 1px solid #eee;
}

.container-menu {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 20px;
}
.menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 10px;
  padding: 8px 15px;
  margin-right: 15px;
  color: black;
}

.menu h3 {
  font-weight: 600;
}

@media (max-width: 1024px) {
  aside {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease-out;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }

  aside[data-open='true'] {
    transform: translateX(0);
  }

  aside > .menu:last-child {
    display: none;
  }
}
</style>
