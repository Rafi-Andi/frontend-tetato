<script setup>
import { Icon } from '@iconify/vue';


</script>

<template>
        <footer class="footer">
        <div class="footer-container">
            <!-- Kolom 1: Tentang Kami -->
            <div class="footer-section about">
         <img width="100px"
          src="https://ik.imagekit.io/misxxns4p/logo.webp"
          alt="Tetato Chips Logo" />
                <h3></h3>
                <p>
                    Tetato adalah camilan kentang tipis yang gurih, renyah, 
                    dan dibuat dari bahan pilihan.
                </p>
                <div class="contact">
                    <p><i class="fa-solid fa-phone"></i> +62 823–3706–9983</p>
                    <p><i class="fa-brands fa-instagram"></i> @tetato.id</p>
                </div>
            </div>

            <!-- Kolom 2: Navigasi -->
            <div class="footer-section nav">
                <h3>Navigasi</h3>
                <ul>
                    <li><a href="#">Beranda</a></li>
                    <li><a href="#">Produk Kami</a></li>
                    <li><a href="#">Tentang Kami</a></li>
                </ul>
            </div>

            <!-- Kolom 3: Sosial Media -->
            <div class="footer-section social">
                <h3>Sosial Media</h3>
                <div class="social-icons">
                    <a href="https://wa.link/pbq472"><icon icon="logos:whatsapp-icon"></icon></a>
                    <a href="https://www.tiktok.com/@tetato.id"><Icon icon="logos:tiktok-icon"/></a>
                     <a href="#"><Icon icon="simple-icons:shopee"></Icon></a> 
                    <a href="https://www.instagram.com/tetato.id?igsh=MWF4OWhyM292enQzcA=="><Icon icon="logos:instagram-icon"/></a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>@ Copyright 2025, All Right Reversed</p>
        </div>
    </footer>
</template>


<style scoped>


.footer {
    font-family: Arial, sans-serif;
    background-color: #FFC107;
    color: #1a1a1a;
    padding: 40px 20px 0;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 40px;
    padding-bottom: 30px;
}

/* Kolom Tentang Kami */
.footer-section.about .logo {
    width: 120px;
    margin-bottom: 15px;
}

.footer-section h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #000;
}

.footer-section.about p {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 20px;
    color: #000;
}

.contact {
    font-size: 14px;
}

.contact p {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.contact i {
    font-size: 16px;
}

/* Kolom Navigasi */
.footer-section.nav h3 {
    margin-bottom: 15px;
}

.footer-section.nav ul {
    list-style: none;
}

.footer-section.nav ul li {
    margin-bottom: 10px;
}

.footer-section.nav ul li a {
    color: #000;
    text-decoration: none;
    font-size: 14px;
    transition: opacity 0.3s;
}

.footer-section.nav ul li a:hover {
    opacity: 0.7;
}

/* Kolom Sosial Media */
.footer-section.social h3 {
    margin-bottom: 15px;
}

.social-icons {
    display: flex;
    gap: 15px;
}

.social-icons a {
    width: 40px;
    height: 40px;
    background-color: #ffd93f;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: transform 0.3s;
}

.social-icons a:hover {
    transform: scale(1.1);
}

.social-icons i {
    color: #FFC107;
    font-size: 20px;
}

.social-icons img {
    width: 24px;
    height: 24px;
    filter: invert(89%) sepia(69%) saturate(1567%) hue-rotate(359deg) brightness(104%) contrast(101%);
}

/* Footer Bottom */
.footer-bottom {
    border-top: 2px solid #ffffff;
    padding: 20px 0;
    text-align: left;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-bottom p {
    font-size: 13px;
    color: #000000;
}

/* Responsive Design */
@media (max-width: 768px) {
    .footer-container {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    .footer-section.about .logo {
        width: 100px;
    }
    
    .social-icons {
        justify-content: flex-start;
    }
}
</style>