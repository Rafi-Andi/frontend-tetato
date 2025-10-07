<script setup></script>

<template>
    <div class="main">
        <div class="left-container">
            <h1 class="h1">Bukan Sekedar <span style="color: #D4A300;">Keripik <br> Biasa.</span> Ini adalah <br><span style="color: #D4A300;">Tetato Chips.</span></h1>
            <p> Wujud nyata dari semangat kami <br> untuk menciptakan snack kentang premium <br> yang menawarkan pengalaman kriuk tak terlupakan. <br>Didirikan di Surabaya pada maret 2024.</p>
            <div class="button">
                <button><a href="">Ikuti Kami  ></a></button>
            </div>
        </div>
        <div class="right-container">
            <img src="/chipsproduk.png" alt="">
        </div>
    </div>
</template>


<style scoped>

    .main {
        display: flex;
        justify-content: space-around;
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
        background-color: #FFC300;
        border: #FFC300;
        border-radius: 15px;
        margin-top: 10px;
    }

    .button button a {
        text-decoration: none;
        color: white;
        background-color: #FFC300;
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
</style>