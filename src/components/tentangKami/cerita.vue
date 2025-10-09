<script setup></script>

<template>
  <div class="container">
    <div class="judul">
      <h1>Cerita Kami</h1>
    </div>
    <div class="content">
      <div class="left-container">
        <img
          loading="lazy"
          decoding="async"
          src="https://ik.imagekit.io/misxxns4p/banner/cerita.webp"
          alt="Cerita Kami"
          width="550px"
        />
      </div>
      <div class="right-container">
        <h1>
          Berawal Dari Ide <br />
          Sedeharna
        </h1>
        <p>
          Cikal bakal Tetato Chips <br />
          bermula dari ide <br />
          sederhana menciptakan <br />
          camilan kentang yang <br />unik, renyah berbeda, <br />
          dan penuh cita rasa <br />yang disukai anak muda
        </p>
        <button class="btn">
          <a href="">Lihat Produk</a>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 100px;
}

.judul h1 {
  text-align: center;
  font-size: 45px;
  color: #d4a300;
  font-family: 'dynapuff';
}

.content {
  position: relative;
  top: 50px;
}

.left-container {
  position: absolute;
  z-index: 5;
  left: 18%;
}

.right-container {
  position: absolute;
  z-index: 10;
  font-family: 'poppins';
  background-color: #ffc300;
  left: 56%;
  top: 60px;
  padding: 30px;
  font-weight: 400;
  border-radius: 30px 30px 0px 30px;
}

.right-container h1 {
  font-size: 20px;
  margin-bottom: 20px;
}

.btn {
  padding: 8px;
  background-color: #bb0015;
  border: none;
  border-radius: 10px;
  margin-top: 30px;
  width: 150px;
}

.btn a {
  text-decoration: none;
  font-family: 'poppins';
  font-weight: 600;
  color: white;
}
</style>
