<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)

// ✅ Scroll efek (navbar transparan -> putih)
function scrollFunction() {
  const navbar = document.getElementById('mainNavbar')
  const scrollThreshold = 10

  if (window.scrollY > scrollThreshold) {
    navbar.classList.add('navbar-scrolled')
  } else {
    navbar.classList.remove('navbar-scrolled')
  }
}

onMounted(() => {
  window.addEventListener('scroll', scrollFunction)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollFunction)
})
</script>

<template>
  <div class="homepage">
    <nav class="navbar" id="mainNavbar">
      <!-- Logo -->
      <div class="nav-logo">
        <img width="100px" src="/public/logo.webp" alt="Tetato Chips Logo" />
      </div>

      <!-- Hamburger button -->
      <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
        <Icon :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'" width="30px" />
      </button>

      <!-- Navigation links -->
      <div class="nav-isi" :class="{ open: isMenuOpen }">
        <ul>
          <li><router-link :to="{ name: 'beranda' }" @click="isMenuOpen = false">Beranda</router-link></li>
          <li><router-link :to="{ name: 'produk' }" @click="isMenuOpen = false">Produk</router-link></li>
          <li><router-link :to="{ name: 'tentang-kami' }" @click="isMenuOpen = false">Tentang Kami</router-link></li>
        </ul>
      </div>

      <!-- Cart -->
      <div class="nav-cart">
        <router-link :to="{ name: 'keranjang-belanja' }">
          <Icon icon="mdi:cart-outline" />
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* ====== GENERAL ====== */
.router-link-active {
  color: #d4a300;
}

ul li {
  list-style: none;
}

li a {
  color: black;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
}

li a:hover {
  color: #d4a300;
  transition: all 0.2s;
}

/* ====== NAVBAR ====== */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 30px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
  z-index: 9999;
}

.navbar-scrolled {
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-logo img {
  display: block;
}

/* ====== MENU LINKS ====== */
.nav-isi ul {
  display: flex;
  gap: 100px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.nav-cart {
  font-size: 30px;
  text-align: center;
}

.nav-cart a {
  color: black;
}

.nav-cart a:hover {
  color: #d4a300;
}

/* ====== HAMBURGER ====== */
.hamburger {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  display: none;
  color: black;
}

/* ====== RESPONSIVE ====== */
@media (max-width: 900px) {
  .navbar {
    padding: 10px 25px;
  }

  .hamburger {
    display: block;
    z-index: 10000;
  }

  .nav-isi {
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100vh;
    background-color: white;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-isi.open {
    transform: translateX(0);
  }

  .nav-isi ul {
    flex-direction: column;
    gap: 30px;
    text-align: center;
  }

  .nav-cart {
    position: absolute;
    right: 80px;
    font-size: 28px;
  }

  .nav-logo img {
    width: 80px;
  }
}

@media (max-width: 500px) {
  .nav-isi {
    width: 80%;
  }

  .nav-cart {
    right: 70px;
  }
}
</style>
