<script setup></script>

<template>
  <div class="judul-card">
    <h1 class="text-card">Kenapa Harus Kami ?</h1>
  </div>
  <div class="card-container">
    <div class="test-card">
      <div class="product-card">
        <img src="/makan1.jpg" alt="Cocok Untuk Semua Image" class="card-image" />
      </div>
      <div class="card-text-overlay1">
        <h3>Cocok Untuk<br />Semua</h3>
      </div>
    </div>
    <div class="test-card">
      <div class="product-card">
        <img src="/makan2.png" alt="Camilan Kekinian Image" class="card-image" />
      </div>
      <div class="card-text-overlay1">
        <h3>
          Camilan <br />
          Kekinian
        </h3>
      </div>
    </div>
    <div class="test-card">
      <div class="product-card">
        <img src="/makan3.jpg" alt="Ukuran Praktis Image" class="card-image" />
      </div>
      <div class="card-text-overlay1">
        <h3>
          Ukuran <br />
          Praktis
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>

.text-card {
  font-family: 'dynapuff';
  color: #d4a300;
  padding: 30px;
  margin-bottom: 50px;
  font-size: 45px;
}

.card-container {
  display: flex;
  justify-content: center;
  gap: 100px;
  flex-wrap: wrap;
}

.product-card {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  border-radius: 30px 120px 0px 50px;
  width: 300px;
  height: 400px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.card-text-overlay1 {
  position: relative;
  width: 70%;
  bottom: 20px;
  background-color: #ffc300;
  border-radius: 0px 80px 0px 70px;
  padding: 23px 0px 20px 0px;
  text-align: center;
  color: white;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  z-index: 2;
  left: 50px;
  bottom: 50px;
}

.card-text-overlay1 h3 {
  margin: 0;
  font-size: 20px;
  line-height: 1.2;
}
</style>
