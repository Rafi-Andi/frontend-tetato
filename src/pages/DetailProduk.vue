<script setup>
import Button from '@/fragments/Button.vue'
</script>

<template>
  <main>
    <div class="button-kembali">
        <Button label="< Kembali"/>
    </div>
    <header>
      <h1>Detail Produk</h1>
    </header>
    <div class="container-content">
      <aside><img src="/public/bundling.png" width="400px" alt="" /></aside>
      <div class="content">
        <p class="label">kemasan 65 Gram</p>
        <h1 class="varian">Tetato Sour & Cream</h1>
        <h2 class="harga">Rp 15.000 / pcs</h2>
        <p class="deskripsi">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quam aliquam eum
          voluptatibus sequi fugit. Tempore, voluptate. Impedit, tempore itaque.
        </p>
        <div class="button-jumlah">
          <div class="kurang">-</div>
          <div><p>2</p></div>
          <div class="tambah">+</div>
        </div>
        <h1 class="harga-total">Total: Rp 30.000</h1>
        <Button label="Tambah ke keranjang" />
      </div>
    </div>
  </main>
</template>

<style scoped>

main {
    padding: 20px;
    position: relative;
}


header {
    font-family: "DynaPuff", sans-serif;
    color: #d4a300;
    text-align: center;
}
.container-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 60px;
  font-family: 'poppins', sans-serif;
  gap: 2rem;
}

.content .label {
  color: #9e9e9e;
  font-weight: 500;
  font-size: 20px;
}

.content .varian {
  font-weight: 600;
}

.content .harga {
  color: #d4a300;
  font-weight: 600;
  font-size: 30px;
}

.content .deskripsi {
  color: #4b4b4b;
  font-size: 20px;
  margin-top: 10px;
}

.button-jumlah {
  display: flex;
  gap: 2rem;
  border: 1px solid #9e9e9e;
  width: fit-content;
  height: 35px;
  align-items: center;
  padding: 0px 20px;
  border-radius: 50px;
  font-weight: 500;
  margin-top: 20px;
  font-size: 22px;
  color: #4B4B4B;
  margin-bottom: 30px;
}

.kurang {
    display: flex;
    align-items: center;
    border-right: 1px solid #9e9e9e;
    height: 35px;
    padding-right: 20px;
    cursor: pointer;
}
.tambah {
    display: flex;
    align-items: center;
    border-left: 1px solid #9e9e9e;
    height: 35px;
    padding-left: 20px;
    cursor: pointer;
}

.harga-total {
    color: #d4a300;
    font-weight: 600;
    margin-bottom: 10px;
}

@media (max-width: 720px) {
    .container-content {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        justify-content: center;
    }

    aside img {
        width: 300px;
    }
}
</style>
