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
      <div class="button">
        <button><a href="">Ikuti Kami ></a></button>
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
  margin-top: 130px;
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

@media (max-width: 768px) {
  .main {
    flex-direction: column; /* Ubah tata letak menjadi vertikal */
    text-align: center; /* Pusatkan teks */
    margin-top: 50px; /* Kurangi margin atas */
  }

  .left-container {
    order: 2; /* Pindahkan konten teks ke bawah di mobile */
    margin-top: 30px;
  }

  .right-container {
    order: 1; /* Pindahkan gambar ke atas di mobile */
  }

  .h1 {
    font-size: 36px; /* Kurangi ukuran font untuk H1 */
  }

  p {
    font-size: 16px; /* Kurangi ukuran font untuk paragraf */
  }

  /* Kebutuhan untuk gambar */
  .right-container img {
    width: 250px; /* Ukuran gambar yang lebih kecil di mobile */
    height: 250px;
    margin: 0 auto; /* Pusatkan gambar */
  }

  .button button {
    width: 100%; /* Tombol bisa full-width di mobile untuk kemudahan klik */
    max-width: 300px; /* Batasi lebar maksimum tombol */
  }
}

/*
  MEDIA QUERY: Untuk layar dengan lebar maksimum 480px (Mobile sangat kecil)
*/
@media (max-width: 480px) {
    .h1 {
        font-size: 30px;
    }

    p {
        font-size: 14px;
    }

    .right-container img {
        width: 200px;
        height: 200px;
    }
}
</style>