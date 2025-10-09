<script setup>
import Button from '@/fragments/Button.vue'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <header>
      <h1>Produk Terbaik.</h1>
      <p>Lihat Semua</p>
      <router-link class="router-link" :to="{ name: 'produk' }"
        ><div class="button-panah">></div></router-link
      >
    </header>
    <div class="container-card">
      <div class="card satu">
        <img
          loading="lazy"
          decoding="async"
          src="https://ik.imagekit.io/misxxns4p/banner/best-produk.webp?tr=w-800,q-80,f-webp"
          alt="Tetato Original"
          width="190px"
        />
        <div>
          <div class="bintang1">
            <Icon v-for="i in 5" width="25px" icon="mdi:star" color="#FFCD29" />
          </div>
          <h1>Tetato Chips Varian Original</h1>
          <div class="container-harga">
            <div><h3>Rp 15.000</h3></div>
            <router-link
              class="router-link"
              :to="{ name: 'produk-detail', params: { slug: 'tetato-chips-original-65-gram' } }"
              ><div class="button-panah">></div></router-link
            >
          </div>
        </div>
      </div>
      <div class="card dua">
        <img
          loading="lazy"
          decoding="async"
          src="https://ik.imagekit.io/misxxns4p/banner/best-produk-2.webp?tr=w-800,q-80,f-webp"
          alt="Tetato Roasted Corn"
          width="190px"
        />
        <div>
          <div class="bintang1">
            <Icon v-for="i in 5" width="25px" icon="mdi:star" color="#FFCD29" />
          </div>
          <h1>Tetato Chips Roasted Corn</h1>
          <div class="container-harga">
            <div><h3>Rp 15.000</h3></div>
            <div class="container-harga">
              <router-link
                class="router-link"
                :to="{ name: 'produk-detail', params: { slug: 'tetato-roasted-corn-65-gram' } }"
                ><div class="button-panah">></div></router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="calltoaction">
        <div class="container-image">
          <img
            loading="lazy"
            decoding="async"
            src="https://ik.imagekit.io/misxxns4p/banner/double-produk.webp?tr=q-80,f-webp"
            alt="Tetato Produk"
          />
        </div>
        <div class="content">
          <h2><span>Nikm</span>ati Kriuknya</h2>
          <p>
            Klik sekarang, cemilan enak siap <br />
            temani harimu!
          </p>
          <router-link :to="{ name: 'produk' }">
            <Button label="Beli Sekarang >" color="#BB0015" />
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 30px;
}
header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
header h1 {
  font-weight: 700;
  color: #d4a300;
  font-family: 'DynaPuff', sans-serif;
}
header p,
div {
  margin-top: 10px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 15px;
}

header p {
  text-decoration: underline;
  color: #353535;
}

.button-panah {
  background-color: #ef6a6a;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.router-link {
  text-decoration: none;
}

.container-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
}

.card h1 {
  font-size: 20px;
  font-weight: 500;
  width: 190px;
  color: #4b4b4b;
}

.container-harga {
  display: flex;
  gap: 0.3rem;
  margin-top: -5px;
  align-items: center;
}

.calltoaction h2 {
  font-family: 'DynaPuff', sans-serif;
  font-size: 30px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 10px;
}

.calltoaction {
  position: relative;
  background-color: #ffcd29;
  border-radius: 200px 100px 100px 0;
  height: 400px;
}

.calltoaction span {
  border-bottom: 3px solid #bb0015;
}

Button {
  margin-top: 15px;
}

.container-image {
  transform: translateY(-120px);
}

.content {
  margin-top: -180px;
  padding-left: 40px;
}

@media (max-width: 900px) {
  .container-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 100px 0;
  }

  .calltoaction {
    margin-top: 120px;
    /* width: 85%; */
  }
  .card h1 {
    width: 100%;
  }
}
</style>
