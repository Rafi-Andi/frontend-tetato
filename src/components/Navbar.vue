<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
   <div class="homepage">
        <div class="navbar" id="mainNavbar">
            <div class="nav-logo">
                <!-- <img width="100px" src="img/Desain tanpa judul (8).png" alt="Tetato Chips Logo" /> -->
            </div>
            <div class="nav-isi">
                <ul>
                    <div class="nav-home">
                        <li><a href="index.html">Beranda</a></li>
                    </div>
                    <li><a href="">Produk</a></li>
                    <li><a href="">Tentang Kami</a></li>
                </ul>
            </div>
            <div class="nav-cart">
                <a href=""><Icon icon="mdi-cart"/></a>
            </div>
        </div>
    </div>
</template>


<style scoped>
:root {
    --color1 :#D4A300 ;
    --color2 : #FFC300 ;
    --color3 : #FFEAA4 ;
    --font1 : 'poppins', sans-serif ;
    --font2 : 'dynapuff' ;
}
ul li{
    list-style: none;
}

li a {
    color: black;
    text-decoration: none;
    font-family: 'poppins', sans-serif;
}

li a:hover {
    color: var(--color1);
    transition: all 0.2s;
    background-color: transparent;
}

.navbar {
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: transparent;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    z-index: 9999;
}

.navbar-scrolled {
    background-color: #ffffff; 
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-logo {
    margin-left: 30px;
}

.nav-cart {
    font-size: 30px;
    margin-right: 35px;
    margin-top: 15px;
    text-align: center;
}

.nav-cart a {
    color: black;
}

.nav-cart a:hover {
    color: #D4A300;
}

.nav-isi ul {
    display: flex;
    gap: 100px;
    font-weight: 600;
    margin-top: 15px;
}

.nav-home li a {
    color: var(--color1);
}
</style>