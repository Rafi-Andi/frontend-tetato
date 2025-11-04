<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="komitmen-container">
    <div class="judul">
      <h1>Komitmen Kami</h1>
    </div>
    <div class="container">
      <div class="left-container">
        <h1>
          Komitmen Tetato Chips:
          <span style="color: #d4a300"><br />Kualitas, Inovasi, dan <br />Cita Rasa</span>
        </h1>
        <div class="desc-container">
          <div class="desc">
            <div class="icon">
              <icon icon="mdi:leaf" />
            </div>
            <div class="text">
              <p>
                Kami hanya menggunakan kentang pilihan lokal terbaik <br />
                yang diolah dengan standar kebersihan tinggi
              </p>
            </div>
          </div>
          <div class="desc">
            <div class="icon">
              <icon icon="lets-icons:lamp" />
            </div>
            <div class="text">
              <p>
                Diracik khusus dengan aneka bumbu kekinian yang selalu<br />
                mengikuti selera modern
              </p>
            </div>
          </div>
          <div class="desc">
            <div class="icon">
              <icon icon="mingcute:wave-line" />
            </div>
            <div class="text">
              <p>
                Diiris dengan ketipisan yang pas dan diproses dengan teknik <br />
                khusus untuk menghasilkan tekstur kriuk yang luar biasa
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="right-container">
        <img
          loading="lazy"
          decoding="async"
          src="https://ik.imagekit.io/misxxns4p/banner/komitmen.webp"
          alt="Komitmen"
          width="370px"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.komitmen-container {
  margin-top: 250px;
}

.judul {
  text-align: center;
  font-size: 23px;
  color: #d4a300;
  font-family: 'dynapuff';
  margin-bottom: 70px;
}

.container {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}

.left-container h1 {
  font-family: 'dynapuff';
  font-size: 45px;
}

.desc {
  display: flex;
  gap: 10px;
  background-color: #fefff6;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.15);
  padding: 15px;
  margin: 20px;
}

.icon {
  font-size: 25px;
  background-color: #ffc40040;
  color: #7a5d00;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  border-radius: 10px;
}

.text {
  font-family: 'poppins', sans-serif;
  font-size: 15px;
  font-weight: 450;
}

@media (max-width: 1024px) {
    .container {
      flex-direction: column;
      align-items: center;
    }

    .left-container {
      width: 90%; 
      max-width: 700px;
      text-align: center;
      margin-bottom: 20px;
    }

    .left-container h1 {
      font-size: 38px;
    }

    .desc-container {
      text-align: left;
    }

    .right-container {
      margin-top: 40px;
    }

    .right-container img {
      display: none;
    }
}

@media (max-width: 600px) {
  .komitmen-container {
    margin-top: 20px;
  }

  .judul {
    font-size: 18px;
    margin-bottom: 30px;
  }

  .left-container {
    width: 95%;
    max-width: 100%;
    text-align: center;
  }

  .left-container h1 {
    font-size: 30px;
  }

  .right-container {
    display: none;
  }

  .desc {
    padding: 10px;
    margin: 10px auto;
  }

  .text {
    font-size: 14px;
  }

  .left-container h1 span br, .desc .text p br {
    display: none;
  }
}
</style>
