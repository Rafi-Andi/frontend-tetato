<script setup></script>

<template>
  <div class="main">
    <div class="left-container">
      <h1 class="h1">
        Bukan Sekedar
        <span style="color: #d4a300"
          >Keripik <br />
          Biasa.</span
        >
        Ini adalah <br /><span style="color: #d4a300">Tetato Chips.</span>
      </h1>
      <p>
        Wujud nyata dari semangat kami <br />
        untuk menciptakan snack kentang premium <br />
        yang menawarkan pengalaman kriuk tak terlupakan. <br />Didirikan di Surabaya pada maret
        2024.
      </p>
      <div class="button" style="cursor: pointer;">
        <button><a href="https://www.instagram.com/tetato.id/">Ikuti Kami ></a></button>
      </div>
    </div>
    <div class="right-container">
      <img
        loading="lazy"
        decoding="async"
        src="https://ik.imagekit.io/misxxns4p/banner/chipsproduk.webp"
        alt="Tetato Chips"
      />
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 150px 20px;
}

.h1 {
  font-family: 'dynapuff';
  font-size: 48px;
}

.button button {
  padding: 5px;
  width: 250px;
  font-size: 20px;
  font-family: 'poppins', sans-serif;
  font-weight: 700;
  background-color: #ffc300;
  border: #ffc300;
  border-radius: 15px;
  margin-top: 10px;
}

.button button a {
  text-decoration: none;
  color: white;
  background-color: #ffc300;
}

p {
  font-size: 18px;
  font-family: 'poppins', sans-serif;
  font-weight: 400;
  margin-top: 20px;
}

.right-container img {
  width: 350px;
  height: 350px;
}

@media (max-width: 1024px) {
  .main {
    /* Kurangi padding vertikal saat di tablet */
    padding: 80px 20px; 
    /* Izinkan konten untuk tumpuk jika perlu */
    flex-direction: column; 
    align-items: center; /* Pusatkan item saat tumpuk */
  }

  .left-container, .right-container {
    /* Pastikan keduanya mengambil lebar penuh jika tumpuk, 
       atau set lebar agar tetap proporsional */
    width: 100%;
    max-width: 600px; /* Batasi lebar maksimal agar tidak terlalu lebar di layar besar */
    text-align: center; /* Pusatkan teks pada tampilan tablet/mobile */
  }

  .h1 {
    font-size: 40px;
  }
  
  .right-container {
    /* Pindah gambar ke atas */
    order: -1; 
  }

  .right-container img {
    /* Ukuran gambar lebih kecil di tablet */
    width: 300px;
    height: 300px;
    margin-bottom: 30px; 
  }
}

/* ------------------------------------------- */
/* MEDIA QUERY: Maksimal Lebar 600px */
/* ------------------------------------------- */

@media (max-width: 600px) {
  .main {
    padding: 50px 15px;
    /* Memastikan konten di tengah */
    align-items: center; 
  }

  .left-container, .right-container {
    max-width: 85%; /* Batasi lebar maksimal agar tidak terlalu lebar di mobile */
    /* Set lebar default ke 100% dari max-width 85% */
    width: 100%; 
  }
  
  .h1 {
    font-size: 32px;
    /* Pusatkan teks h1 */
    text-align: center; 
    line-height: 1.2;
  }
  
  .left-container {
    /* Pusatkan semua konten di left-container */
    text-align: center; 
  }

  .right-container {
    order: -1; 
    text-align: center;
    margin-bottom: 20px;
  }

  .right-container img {
    width: 250px;
    height: 250px;
  }
  
  p {
    font-size: 16px;
    /* Teks paragraf sekarang dipusatkan */
    text-align: center; 
    /* Batasi lebar paragraf agar tidak terlalu panjang */
    max-width: 90%; 
    margin-left: auto;
    margin-right: auto;
  }
  
  .button {
    /* Pastikan tombol tetap di tengah */
    text-align: center;
  }
  
  .button button {
    width: 100%; 
    max-width: 250px;
    margin: 15px auto; /* Margin auto untuk memusatkan tombol */
  }
}
</style>