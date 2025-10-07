<!-- <script setup>
import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="bestseller-container">
            <div class="best-container">
                <h1 class="bestseller-text">Best Seller</h1>
                <div class="shop-all">
                    <a href=""><p class="shop-all-text" id="shop-text">Shop All</p></a>
                    <a href=""><button class="shop-all-logo">></button></a>
                </div>
            </div>
            <div class="best-content">
                <div class="best-content1">
                    <div class="best-img1">
                        <a href=""><img src="/best-produk.png" alt=""></a>
                        <div class="bintang1">
                            <Icon v-for="i in 5" width="30px" :key="index" icon="mdi:star"/>
                        </div>
                        <div class="best-text">
                            <p>Tetato Chips <br> Varian Original</p>
                            <a href="" id="best-menu"><p>></p></a>
                        </div>
                        <div class="price-text">
                            <p>Rp 15.000</p>
                        </div>
                    </div>
                </div>
                <div class="best-content2">
                    <div class="best-img2">
                        <a href=""><img src="/best-produk.png" alt=""></a>
                        <div class="bintang2">
                            <Icon v-for="i in 5" width="30px" :key="index" icon="mdi:star"/>
                        </div>
                        <div class="best-text">
                            <p>Tetato Chips <br> Varian Original</p>
                            <a href="" id="best-menu"><p>></p></a>
                        </div>
                        <div class="price-text">
                            <p>Rp 15.000</p>
                        </div>
                    </div>
                </div>
                <div class="best-content3">
                    <div class="best-img3">
                        <img src="/double-produk.png" alt="" width="250px">
                    </div>
                    <div class="best-background">
                        <h1>Nikmati kriuknya!!</h1>
                        <p>Klik sekarang,<br> cemilan enak siap temani harimu!</p>
                        <button class="beli-sekarang">Beli Sekarang ></button>
                    </div>
                </div>
            </div>
        </div>
</template>


<style scoped>
    .best-content {
    display: flex;
    justify-content: space-around;
    margin-top: 80px;
}

.best-container {
    margin-top: 100px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.bestseller-text {
    font-family: 'dynapuff';
    color: #D4A300;
    margin-left: 100px;
    font-size: 45px ;
}

.shop-all {
    font-family: 'poppins', sans-serif;
    font-weight: 600;
    display: flex;
    gap: 15px;
    font-size: 20px;
    align-items: center;
    margin-top: 5px;
}

.shop-all-logo {
    font-family: 'poppins', sans-serif;
    background-color: #EF6A6A;
    border: 3px solid #EF6A6A;
    color: white;
    border-radius: 60px;
    font-size: 20px;
    width: 28px;
}

.shop-all a p, .shop-all a {
    text-decoration: none;
    font-style: none;
    color: black;
}

.best-img1, .best-img2 {
    width: fit-content;
    height: fit-content; 
}  

.bintang1, .bintang2 {
    color: #FFC300;
    align-items: center;
    text-align: center;
    margin-right: 80px;
    margin-top: 20px;
    word-spacing: 0px;
    font-size: 20px;
}

.best-text {
    display: flex;
    font-family: 'poppins', sans-serif;
    font-weight: 600;
    margin-left: 18px;
    margin-top: 15px;
}

#best-menu {
    background-color: #EF6A6A;
    border: 3px solid #EF6A6A;
    color: white;
    border-radius: 60px;
    font-size: 20px;
    height: fit-content;
    width: 30px;
    justify-content: center;
    margin-top: 10px;
    margin-left: 20px;
    text-align: center;
    font-weight: 400;
    text-decoration: none;
}

.price-text {
    font-family: 'poppins', sans-serif;
    font-weight: 800;
    margin: 8%;
}

.best-content3 {
    background-color: #FFCD29;
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: fit-content;
}
</style> -->

<template>
    <main>
        <header>
            <h1>Best Sellers.</h1>
            <p>Shop All</p>
            <div>
                >
            </div>
        </header>
    </main>
</template>

<style scoped>

header {
    display: flex;
    align-items: center;
}
header h1 {
    font-weight: 700;
    color: #D4A300;
    font-family: "DynaPuff", sans-serif;
}
header p, div {
    margin-top: 10px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 15px;
}

header p{
    text-decoration: underline;
    color: #353535;
}

header div {
    background-color: #EF6A6A;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>