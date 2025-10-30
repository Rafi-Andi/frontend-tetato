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
          <router-link :to="{name: 'produk'}">Lihat Produk</router-link>
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

@media (max-width: 768px) {
  .content {
    flex-direction: column; /* Ubah tata letak menjadi vertikal */
    align-items: center;
    gap: 0; /* Hilangkan jarak default */
  }

  .left-container, .right-container {
      flex: 1 1 100%; /* Ambil lebar penuh */
      max-width: 90%; /* Batasi agar ada ruang di pinggir */
      transform: none; /* Hapus efek tumpang tindih */
      left: auto;
      position: relative; /* Kembali ke posisi normal */
  }

  .left-container {
      order: 1; /* Gambar di atas */
      margin-bottom: -50px; /* Tarik gambar ke bawah sedikit agar menempel/sedikit tumpang tindih dengan kotak teks */
  }
  
  .left-container img {
      width: 100%; /* Gambar mengisi lebar container */
      max-width: 300px; /* Batas maksimum ukuran gambar */
      margin: 0 auto;
  }
  
  .right-container {
      order: 2; /* Teks di bawah */
      text-align: center; /* Pusatkan teks */
      border-radius: 20px; /* Bulatkan semua sudut */
      padding: 30px;
  }
  
  .right-container h1 {
      font-size: 20px;
  }

  .right-container p {
      font-size: 14px;
      /* Tambahkan tag <br> kembali jika perlu baris pendek untuk mobile, tapi lebih baik biarkan mengalir */
      text-align: left; /* Teks paragraf bisa tetap rata kiri agar mudah dibaca */
  }

  .btn {
      width: 100%;
      max-width: 200px; /* Batas maksimum lebar tombol */
  }
}
</style>