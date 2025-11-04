<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="main">
    <div class="left-container">
      <header>
        <h1 class="main-judul">
          SNACK <span class="highlight">KENTANG</span> IRIS TIPIS DENGAN
          <span class="highlight">KENTANG</span> ASLI
        </h1>
        <h2>
          5 Varian Rasa Paling Hype. Bikin Ketagihan Dari <br />
          Gigitan Pertama.
        </h2>
      </header>

      <div class="desc-text"></div>

      <div class="button-container">
        <router-link :to="{name: 'produk'}" style="text-decoration: none;" class="button-text1">Beli Sekarang</router-link>
        <a href="#best-sellers" style="text-decoration: none;" class="button-text2">Produk Terbaik</a>
      </div>

      <div class="label-container">
        <div class="label-item left">
          <div class="label-logo">
            <Icon icon="emojione-monotone:potato" color="#FFCD29" width="40px" />
          </div>
          <div class="text-box">
            <h3>Kentang Asli</h3>
            <p>Dibuat dari kentang pilihan</p>
          </div>
        </div>

        <div class="label-item right">
          <div class="label-logo">
            <Icon icon="mdi:fried-potatoes" color="#FFCD29" width="50px" />
          </div>
          <div class="text-box">
            <h3>Renyah & Gurih</h3>
            <p>Tipis, kriuk, dan bikin nagih</p>
          </div>
        </div>
      </div>
    </div>

    <div class="right-container">
      <img
        loading="lazy"
        decoding="async"
        src="https://ik.imagekit.io/misxxns4p/banner/beranda.webp?tr=w-800,q-80,f-webp"
        width="100%"
        alt="Tetato Chips Product Image"
      />
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  padding: 60px 80px;
}

.left-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.right-container img {
  max-width: 100%;
  height: auto;
}

header h1 {
  font-weight: 700;
  text-align: start;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-family: 'DynaPuff', sans-serif;
  line-height: 1.3;
}

.highlight {
  color: #d4a300;
}

header h2 {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  line-height: 1.4;
  text-align: start;
}

.button-container {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.button-text1,
.button-text2 {
  font-size: 1rem;
  width: 220px;
  height: 50px;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-text1 {
  background-color: #ffc300;
  border: none;
  color: white;
}

.button-text1:hover {
  background-color: #e5b200;
}

.button-text2 {
  background-color: white;
  color: #ffc300;
  border: 3px solid #ffc300;
}

.button-text2:hover {
  background-color: #ffc300;
  color: white;
}

.label-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}

.label-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f0f0f0;
  border: 2px solid #c9c9c9;
  padding: 10px 15px;
  width: 230px;
  height: 75px;
  border-radius: 30px 0 30px 0;
  font-family: 'Poppins', sans-serif;
}

.label-item.right {
  border-radius: 0 30px 0 30px;
}

.label-logo {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 60px;
  border-radius: inherit;
}

.text-box h3 {
  font-size: 15px;
  color: #d4a300;
  margin: 0;
}

.text-box p {
  font-size: 11px;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 1024px) {
  .main {
    flex-direction: column;
    text-align: center;
    padding: 80px;
    margin-top: 100px;
  }

  .right-container img {
    display: none ;
  }
}

@media (max-width: 600px) {
  
  .main {
    padding: 20px;
    gap: 30px;

  }
  header {
    padding: 20px;
  }
  header h1 {
    font-size: 2rem;
  }

  header h2 {
    font-size: 1rem;
    margin-top: 5px;
  }

  .button-text1,
  .button-text2 {
    width: 100%;
    font-size: 0.9rem;
    height: 45px;
  }

  .label-item {
    width: 60%;
    display: flex;
  }
}
</style>
