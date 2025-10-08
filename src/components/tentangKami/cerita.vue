<script setup></script>

<template>
    <div class="container">
        <div class="judul">
            <h1>Cerita Kami</h1>
        </div>
        <div class="content">
            <div class="left-container">
                <img src="/cerita.png" alt="" width="400px">
            </div>
            <div class="right-container">
                <h1>Berawal Dari Ide <br> Sedeharna</h1>
                <p>Cikal bakal Tetato Chips <br> bermula dari ide <br> sederhana: menciptakan <br> camilan kentang yang <br>unik, renyah berbeda, <br> dan penuh cita rasa <br>yang disukai anak muda</p>
                <button>
                    <a href="Lihat Produk"></a>
                </button>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .container {
        margin-top: 70px;
    }

    .judul h1 {
        text-align: center;
        font-size: 45px;
        color: #d4a300;
        font-family: 'dynapuff';
    }

    .content {
        position: relative;
    }

    .left-container {
        position: absolute;
    }

    .right-container {
        position: absolute; 
        font-family: 'poppins';    
    }
</style>