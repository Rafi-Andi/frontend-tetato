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
  margin-top: 50px;
}

.judul h1 {
  text-align: center;
  font-size: 45px;
  color: #d4a300;
  font-family: 'dynapuff';
  margin-bottom: 50px; /* Tambahkan jarak dari judul ke konten */
}

/* Mengubah layout utama menjadi Flexbox (Desktop) */
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px; /* Jarak antara gambar dan teks (dapat disesuaikan) */
  max-width: 1300px;
  margin: 0 auto; /* Pusatkan container */
  padding: 0 20px; /* Padding samping */
}

/* Hapus properti position/z-index untuk desktop yang lama */
.left-container {
  flex-shrink: 0; /* Mencegah gambar mengecil dari ukuran aslinya */
  /* Hilangkan position: absolute; z-index: 5; left: 18%; */
}

.left-container img {
  width: 550px; /* Gunakan nilai width yang sudah Anda tentukan */
  max-width: 100%; /* Agar gambar tetap responsif */
  border-radius: 20px; /* Tambahkan sedikit radius agar seperti contoh */
  object-fit: cover;
}

.right-container {
  /* Hapus properti position/z-index untuk desktop yang lama */
  /* Hilangkan position: absolute; z-index: 10; left: 56%; top: 60px; */
  
  font-family: 'poppins';
  background-color: #ffc300;
  padding: 30px;
  font-weight: 400;
  border-radius: 30px; /* Bulatkan semua sudut */
  flex-grow: 1; /* Biarkan mengisi ruang */
  max-width: 400px; /* Batasi lebar container kanan */
}

.right-container h1 {
  font-size: 30px; /* Ukuran heading yang lebih besar agar menonjol */
  margin-bottom: 20px;
  line-height: 1.2;
}

.right-container p {
  font-size: 16px; /* Ukuran paragraf yang nyaman dibaca */
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
  display: block;
}

/* ======================================= */
/* MEDIA QUERY: LAYAR TABLET & MOBILE (MAX 1024PX) */
/* ======================================= */
@media (max-width: 1024px) {
    /* 1. HILANGKAN GAMBAR */
    .left-container {
        display: none; 
    }

    /* 2. Pusatkan container teks */
    .content {
        justify-content: center; /* Konten sekarang hanya right-container */
    }

    /* 3. Atur ulang container teks */
    .right-container {
        max-width: 80%; /* Biarkan teks mengambil lebar penuh di tengah */
        margin: 0 auto;
        padding: 40px;
        text-align: center;
    }
    
    .right-container h1 {
        font-size: 28px;
    }

    .right-container p {
        font-size: 16px;
        /* Hapus tag <br/> di HTML atau biarkan teks mengalir */
    }

    .btn {
        width: 200px; /* Tombol sedikit lebih lebar */
    }
}

/* ======================================= */
/* MEDIA QUERY: LAYAR MOBILE (MAX 600PX) */
/* ======================================= */
@media (max-width: 600px) {
    /* Gambar sudah tersembunyi dari 1024px, tinggal penyesuaian teks */
    .judul h1 {
        font-size: 35px;
    }
    
    .right-container {
        max-width: 90%; 
        padding: 30px 20px;
        border-radius: 15px;
    }
    
    .right-container h1 {
        font-size: 22px;
    }

    .right-container p {
        font-size: 14px;
    }

    .btn {
        width: 100%; /* Tombol lebar penuh di HP */
    }
}
</style>