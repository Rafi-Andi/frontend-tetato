<script setup>

</script>

<template>
    <!-- ngoding html e ng kene -->
    <main>
    <section class="cta-section">
        <div class="cta-image">
            <img src="https://ik.imagekit.io/misxxns4p/banner/calltoaction.webp" alt="Tetato Chips">  
        </div>

        <div class="cta-content">
            <h2>Bersiap untuk <span>Menikmati?</span></h2>
            <p>Pesan sekarang dan temukan kenikmatan Tetato Chips yang bikin kamu susah berhenti ngemil</p>
            <router-link :to="{name: 'produk'}" class="cta-button ">Pesan Sekarang</router-link>
        </div>
    </section>
</main>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

main {
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.cta-section {
    background-color: #ffecb3;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    gap: 80px;
    padding: 20px;
    border-radius: 40px;
    max-width: 1300px;
}

.cta-image {
    position: relative;
    flex-shrink: 0;
    transform: translateX(-30px);
    left: 50px;
}

.cta-image img {
    width: 340px;
    border-radius: 25px;
    object-fit: cover;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease, box-shadow 0.3s ease;
}

.cta-content {
    max-width: 700px;
    text-align: center;
}

.cta-content h2 {
    font-family: 'Baloo 2', cursive;
    font-size: 42.5px;
    color: #000000;
    margin-bottom: 10px;
}

.cta-content h2 span {
    color: #f4a100;
}

.cta-content p {
    margin-top: 10px;
    color: #333;
    font-size: 23px;
    line-height: 1.5;
    font-style: italic;
}

.cta-button {
    display: inline-block;
    background-color: #ff9800;
    color: white;
    padding: 14px 30px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 550;
    transition: 0.3s;
    margin-top: 18px;
}

.cta-button span {
    margin-left: 8px;
    font-weight: bold;
}

.cta-button:hover {
    background-color: #f57c00;
    transform: translateY(-3px);
}

@media (max-width: 1024px) {
    .cta-section {
        /* KUNCI: Mengubah layout dari baris menjadi kolom */
        flex-direction: column;
        text-align: center;
        gap: 30px; 
        padding: 40px 20px;
        max-width: 800px; /* Lebar container lebih kecil */
        margin: 30px auto; /* Pusat container */
    }

    .cta-image {
        /* Menghilangkan properti geser desktop agar gambar di tengah */
        transform: none; 
        left: auto; 
    }
    
    .cta-image img {
        width: 300px;
    }

    .cta-content {
        max-width: 90%;
    }
    .cta-content h2 {
        font-size: 38px;
    }

    .cta-content p {
        font-size: 18px;
    }
}

/* ======================================= */
/* MEDIA QUERY: LAYAR MOBILE (MAX 600PX) */
/* ======================================= */
@media (max-width: 600px) {
    .cta-section {
        /* Layout sudah bertumpuk dari 1024px, tinggal penyesuaian padding */
        padding: 20px;
        border-radius: 25px;
        margin: 15px; /* Margin lebih kecil */
    }
    
    .cta-image img {
        width: 250px; /* Gambar lebih kecil untuk ponsel */
    }

    .cta-content h2 {
        font-size: 28px;
    }

    .cta-content p {
        font-size: 14px;
        padding: 0 5px; 
    }

    .cta-button {
        padding: 10px 20px;
        font-size: 15px;
    }
}
</style>