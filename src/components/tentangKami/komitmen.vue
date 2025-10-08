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
                <h1>Komitmen Tetato Chips: <span style="color: #d4a300;"><br>Kualitas, Inovasi, dan <br>Cita Rasa</span></h1>
                <div class="desc-container">
                    <div class="desc">
                        <div class="icon">
                            <icon icon="mdi:leaf"/>
                        </div>  
                        <div class="text">
                            <p>Kami hanya menggunakan kentang pilihan lokal terbaik <br> yang diolah dengan standar kebersihan tinggi</p>
                        </div>
                    </div>
                    <div class="desc">
                        <div class="icon">
                            <icon icon="lets-icons:lamp"/>
                        </div>  
                        <div class="text">
                            <p>Diracik khusus dengan aneka bumbu kekinian yang selalu<br> mengikuti selera modern</p>
                        </div>
                    </div>
                    <div class="desc">
                        <div class="icon">
                            <icon icon="mingcute:wave-line"/>
                        </div>  
                        <div class="text">
                            <p>Diiris dengan ketipisan yang pas dan diproses dengan teknik <br> khusus untuk menghasilkan tekstur kriuk yang luar biasa</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-container">
                <img src="/komitmen.webp" alt="" width="370px">
            </div>
        </div>
    </div>
</template>


<style scoped>

    .komitmen-container {
        margin-top: 600px;
    }

    .judul {
        text-align: center;
        font-size: 23px;
        color: #d4a300;
        font-family: 'dynapuff';
    }

    .container {
        display: flex;
        justify-content: space-around;
        margin-top: 80px;
    }

    .left-container h1 {
        font-family: 'dynapuff';
        font-size:45px;
    }

    .desc {
        display: flex;
        gap: 10px;
        background-color: #FEFFF6;
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
        padding-top:10px ;
        border-radius: 10px;
    }

    .text {
        font-family: 'poppins', sans-serif;
        font-size: 15px;
        font-weight: 450;
    }
</style>