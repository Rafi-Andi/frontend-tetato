<script setup>
import { Icon } from '@iconify/vue'
import Button from '@/fragments/Button.vue'
</script>

<template>
  <main>
    <aside>
      <img src="/public/bundling.webp" alt="Bundling Hemat Tetato" />
    </aside>

    <div class="content">
      <p class="subtitle">Paket Hemat</p>
      <h1 id="title">
        Bundling Hemat 4 Pcs – <span>Gurih & Renyah Lebih Puas</span>
      </h1>
      <p class="desc">
        Ngemil enak gak harus mahal. Paket hemat 4 pcs Tetato Chips bikin kamu bebas sharing bareng
        sahabat tanpa takut kantong jebol.
      </p>

      <div class="container-label">
        <div class="label">
          <div class="icon"><Icon icon="tdesign:money" color="#FFC300" width="26" /></div>
          <p>Lebih Hemat</p>
        </div>
        <div class="label">
          <div class="icon"><Icon icon="mdi:emoticon-tongue-outline" color="#FFC300" width="26" /></div>
          <p>Gurih dan Renyah</p>
        </div>
        <div class="label">
          <div class="icon"><Icon icon="mdi:account-group" color="#FFC300" width="26" /></div>
          <p>Cocok buat sharing</p>
        </div>
        <div class="label">
          <div class="icon"><Icon icon="mdi:trophy" color="#FFC300" width="26" /></div>
          <p>Best Seller</p>
        </div>
      </div>

      <div class="harga">
        <h1>Rp 57.000</h1>
        <h3>Rp 60.000</h3>
      </div>

      <Button label="Tambah ke keranjang" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  align-items: center;
  gap: 3rem;
  padding: 60px 80px;
  font-family: 'Poppins', sans-serif;
}

aside {
  display: flex;
  justify-content: center;
  align-items: center;
}

main img {
  width: 100%;
  max-width: 420px;
  height: auto;
  display: block;
}

.content {
  text-align: left;
}

.subtitle {
  font-weight: 600;
  color: #ff7043;
  font-size: 18px;
  margin-bottom: 10px;
}

#title {
  font-family: 'DynaPuff', sans-serif;
  font-size: 42px;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 20px;
}

#title span {
  color: #d4a300;
}

.desc {
  font-weight: 400;
  font-size: 18px;
  color: #4a4a4a;
  max-width: 600px;
}

.container-label {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
  margin-top: 30px;
}

.label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.label p {
  color: #1f1f1f;
  font-weight: 500;
}

.label .icon {
  padding: 6px;
  border: 1px solid #ffc300;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.harga {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin: 25px 0;
}

.harga h1 {
  color: #ff7043;
  font-weight: 600;
  font-size: 30px;
}

.harga h3 {
  font-weight: 500;
  color: #989898;
  text-decoration: line-through;
  margin: 0;
}

@media (max-width: 1200px) {
  main {
    grid-template-columns: 1fr 1fr;
    padding: 50px 60px;
    gap: 2rem;
  }

  #title {
    font-size: 36px;
  }

  .desc {
    font-size: 16px;
  }
}

@media (max-width: 900px) {
  main {
    grid-template-columns: 1fr;
    padding: 50px 40px;
  }

  aside {
    order: 1;
    margin-bottom: 20px;
  }

  .content {
    order: 2;
    max-width: 90%;
    margin: 0 auto;
    text-align: left;
  }

  .container-label {
    grid-template-columns: 1fr 1fr;
  }

  #title {
    font-size: 32px;
  }

  .desc {
    font-size: 16px;
    color: #505050;
  }
}

@media (max-width: 640px) {
  main {
    padding: 30px 20px;
  }

  #title {
    font-size: 26px;
  }

  .subtitle {
    font-size: 16px;
  }

  .desc {
    font-size: 15px;
  }

  .container-label {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .harga {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .harga h1 {
    font-size: 24px;
  }

  .harga h3 {
    font-size: 16px;
  }

  main img {
    max-width: 250px;
  }
}
</style>
