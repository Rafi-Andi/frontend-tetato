<script setup>
import KemasanBesar from '@/components/produk/KemasanBesar.vue'
import KemasanKecil from '@/components/produk/KemasanKecil.vue'
import PaketHemat from '@/components/produk/PaketHemat.vue'
</script>

<template>
  <main>
    <header>
      <h1>Temukan Varian Rasa Favoritmu</h1>
      <p>Rasa kekinian yang bikin nagih dari gigitan pertama.</p>
    </header>

    <PaketHemat />
    <KemasanKecil />
    <!-- <KemasanBesar /> -->
  </main>
</template>

<style scoped>
header {
  text-align: center;
  margin: 60px auto 40px auto;
  padding: 0 20px;
  max-width: 900px;
}

main {
  padding: 10px;
  padding-top: 30px;
}

header h1 {
  color: #d4a300;
  font-size: 48px;
  font-weight: bold;
  font-family: 'DynaPuff', sans-serif;
  line-height: 1.2;
  margin-bottom: 15px;
}

header p {
  color: #4b4b4b;
  font-size: 24px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  max-width: 700px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  header h1 {
    font-size: 42px;
  }
  header p {
    font-size: 20px;
  }
}

@media (max-width: 900px) {
  header {
    margin: 50px auto 35px auto;
    padding: 0 25px;
  }

  header h1 {
    font-size: 36px;
  }

  header p {
    font-size: 18px;
    max-width: 90%;
  }
}

@media (max-width: 640px) {
  header {
    margin: 40px auto 30px auto;
    padding: 0 15px;
  }

  header h1 {
    font-size: 28px;
  }

  header p {
    font-size: 16px;
    color: #555;
  }
}
</style>
