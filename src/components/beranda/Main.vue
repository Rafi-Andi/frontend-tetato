<script setup>

</script>

<template>
        <div class="main">
            <div class="left-container">
                <div class="main-text">
                    <div class="text1">
                        <h1>SNACK</h1>
                        <div class="potato-text">
                            <h1>KENTANG</h1>
                        </div>
                        <h1>IRIS TIPIS</h1>
                    </div>
                    <div class="text2">
                        <h1>DENGAN</h1>
                        <div class="potato-text2">
                            <h1>KENTANG</h1>
                        </div>
                        <h1>ASLI</h1>
                    </div>
                    <div class="desc-text">
                        <h2>5 Varian Rasa Paling Hype. Bikin Ketagihan Dari <br/> Gigitan Pertama.</h2>
                    </div>
                </div>
                <div class="button-container">
                    <div class="button1">
                        <a href=""><button class="button-text1">Beli Sekarang</button></a>
                    </div>
                    <div class="button2">
                        <a href=""><button class="button-text2">Produk Terbaik</button></a>
                    </div>
                </div>
                <div class="label-container">
                    <div class="label1">
                        <div class="label-logo1">
                            <!-- <img src="img/Group.png" alt="Kentang Asli Icon" /> -->
                        </div>
                        <div class="text-box">
                            <h3 class="text-box1">Kentang Asli</h3>
                            <p>Dibuat dari kentang <br/>pilihan</p>
                        </div>
                    </div>
                    <div class="label2">
                        <div class="label-logo2">
                            <!-- <img src="img/mdi_fried-potatoes.png" alt="Renyah & Gurih Icon" width="50px" /> -->
                        </div>
                        <div class="text-box">
                            <h3 class="text-box2">Renyah & Gurih</h3>
                            <p>Tipis, kriuk dan bikin<br />nagih</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-container">
                <img src="/beranda.png" alt="Tetato Chips Product Image" width="460px" />
            </div>
        </div>
</template>


<style scoped> 
    .main {
    display: flex;
    margin-left: 50px;
    gap: 50px;
}

.text1, .text2 {
    display: flex;
    gap: 10px;
    font-family: "dynapuff", sans-serif;
    font-size: 25px;
}

.potato-text, .potato-text2 {
    color: #D4A300;
}

.desc-text {
    font-family: 'poppins', sans-serif;
}

.desc-text h2{
    font-weight: 500;
}

.button-container {
    display: flex;
    gap: 15px;
    margin-top: 30px;
}

.button-text1, .button-text2 {
    width: px;
    font-size: 25px ;
    width: 250px;
    font-family: 'poppins', sans-serif;
    border-radius: 20px;
    height: 50px;
    font-weight: bold ;
}

.button-text1 {
    background-color: var(--color2);
    border-color: #FFC300;
    color: white;
    border: none;
}

.button-text2 {
    background-color: white;
    color: var(--color2);
    border: 3px solid var(--color2);
}

.label-container {
    display: flex;
    gap: 30px;
}

.label1, .label2 {
    background-color: #F0F0F0;
    border: 2px solid #C9C9C9;
    font-family: 'poppins', sans-serif;
    display: flex;
    gap: 10px;
    margin-top: 35px;
    width: 247px;
    height: 75px;
    padding-left: 10px;
    border-radius: 30px 0 30px 0;
}

.label2 {
    border-radius: 0 30px 0 30px;
}

.label-logo1, .label-logo2 {
    text-align: center;
    background-color: white;
    padding-top: 10px;
    width: 77px;
    height: 61px;
    border-radius: 30px 0 30px 0;
    margin-top: 5px;
}

.label-logo2 {
    padding-top: 3px;
}

.label-logo2 {
    border-radius: 0 30px 0 30px;
}

.text-box p {
    font-weight: 600;
    font-size: 11px;
}

.text-box1, .text-box2 {
    color: var(--color1);
}

.text-box1 {
    font-size: 15px;
    margin-top: 5px;
}

.text-box2 {
    font-size: 15px;
    margin-top: 5px;
}

.left-container {
    margin-top: 130px;
    margin-left: 20px;
}
</style>