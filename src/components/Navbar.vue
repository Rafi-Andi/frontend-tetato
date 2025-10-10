<script setup>
import { useKeranjangStore } from '@/stores/Keranjang'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)

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

const KeranjangStore = useKeranjangStore()
const {totalKeranjang} = storeToRefs(KeranjangStore)

</script>

<template>
  <div class="homepage">
    <nav class="navbar" id="mainNavbar">
      <div class="nav-logo">
        <img
          width="100px"
          src="https://ik.imagekit.io/misxxns4p/logo.webp"
          alt="Tetato Chips Logo"
        />
      </div>

      <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
        <Icon :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'" width="30px" />
      </button>

      <div class="nav-isi" :class="{ open: isMenuOpen }">
        <ul>
          <li>
            <router-link :to="{ name: 'beranda' }" @click="isMenuOpen = false">
              <Icon class="icon-nav" icon="mdi:home-outline" width="22px" /> Beranda
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'produk' }" @click="isMenuOpen = false">
              <Icon class="icon-nav" icon="mdi:bag-personal-outline" width="22px" /> Produk
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'tentang-kami' }" @click="isMenuOpen = false">
              <Icon class="icon-nav" icon="mdi:information-outline" width="22px" /> Tentang Kami
            </router-link>
          </li>
        </ul>
      </div>

      <div class="nav-cart">
        <router-link :to="{ name: 'keranjang-belanja' }">
          <Icon icon="mdi:cart-outline" width="26px" />
        </router-link>
        <div class="jumlah-keranjang">
          <p>{{ totalKeranjang }}</p>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.router-link-active {
  color: #d4a300;
}

ul li {
  list-style: none;
}

.icon-nav {
  display: none;
}

li a {
  color: black;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
}

li a:hover {
  color: #d4a300;
  transition: all 0.2s ease-in-out;
}

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
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  z-index: 9999;
}

.navbar-scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.nav-logo img {
  display: block;
}

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
  position: relative;
}

.nav-cart a {
  color: black;
}

.nav-cart a:hover {
  color: #d4a300;
}

.jumlah-keranjang {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #d4a300;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 600;
  transform: translate(10px, -8px);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
}


.hamburger {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  display: none;
  color: black;
}

@media (max-width: 900px) {
  .jumlah-keranjang {
    font-size: 10px;
    min-width: 16px;
    height: 16px;
    transform: translate(8px, -6px);
  }
  .navbar {
    padding: 10px 25px;
  }

  .hamburger {
    display: block;
    z-index: 10000;
  }

  .icon-nav {
  display: block;
}

  .nav-isi {
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    height: 100vh;
    background-color: #ffffff;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    justify-content: center;
  }

  .nav-isi.open {
    transform: translateX(0);
  }

  .nav-isi ul {
    flex-direction: column;
    transform: translateY(100px);
    gap: 25px;
    text-align: left;
  }

  .nav-isi ul li a {
    font-size: 1.1rem;
    padding: 10px 0;
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
    width: 55%;
  }

  .nav-cart {
    right: 70px;
  }

  .nav-isi ul li a {
    font-size: 1rem;
  }
}
</style>
