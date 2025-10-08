import { defineStore } from "pinia";
import { ref } from "vue";

export const useProdukStore = defineStore("produk-store", () => {
  const produks = ref([
    {
      id: 1,
      slug: "tetato-korean-bbq-65-gram",
      gambar: "public/bundling.webp",
      title: "Tetato Korean BBQ",
      kemasan: "65 Gram",
      harga: 15000,
      deskripsi:
        "Rasa smoky manis gurih ala barbeque Korea, bikin ngemil jadi makin seru.",
    },
    {
      id: 2,
      slug: "tetato-chips-spicy-65-gram",
      gambar: "public/bundling.webp",
      title: "Tetato Chips Spicy",
      kemasan: "65 Gram",
      harga: 15000,
      deskripsi:
        "Pedas mantap yang bikin lidah bergoyang, cocok buat pecinta sensasi hot & crunchy!",
    },
    {
      id: 3,
      slug: "tetato-chips-original-65-gram",
      gambar: "public/bundling.webp",
      title: "Tetato Chips Original",
      kemasan: "65 Gram",
      harga: 15000,
      deskripsi:
        "Kerenyahan kentang asli dengan rasa gurih alami. Ringan, renyah, dan selalu bikin nagih!",
    },
    {
      id: 4,
      slug: "tetato-sour-cream-65-gram",
      gambar: "public/bundling.webp",
      title: "Tetato Sour Cream",
      kemasan: "65 Gram",
      harga: 15000,
      deskripsi:
        "Perpaduan gurih, creamy, dan segar dari sour cream dengan sentuhan bawang yang khas.",
    },
    {
      id: 5,
      slug: "tetato-roasted-corn-65-gram",
      gambar: "public/bundling.webp",
      title: "Tetato Roasted Corn",
      kemasan: "65 Gram",
      harga: 15000,
      deskripsi:
        "Aroma jagung bakar manis gurih yang khas, bikin camilan ini beda dari yang lain.",
    },
    {
      id: 6,
      slug: "tetato-korean-bbq-250-gram",
      gambar: "public/bundling.webp",
      title: "Tetato Korean BBQ",
      kemasan: "250 Gram",
      harga: 50000,
      deskripsi:
        "Rasa smoky manis gurih ala barbeque Korea, bikin ngemil jadi makin seru.",
    },
    {
      id: 7,
      slug: "tetato-chips-spicy-250-gram",
      gambar: "public/bundling.webp",
      title: "Tetato Chips Spicy",
      kemasan: "250 Gram",
      harga: 50000,
      deskripsi:
        "Pedas mantap yang bikin lidah bergoyang, cocok buat pecinta sensasi hot & crunchy!",
    },
    {
      id: 8,
      slug: "tetato-chips-original-250-gram",
      gambar: "public/bundling.webp",
      title: "Tetato Chips Original",
      kemasan: "250 Gram",
      harga: 50000,
      deskripsi:
        "Kerenyahan kentang asli dengan rasa gurih alami. Ringan, renyah, dan selalu bikin nagih!",
    },
    {
      id: 9,
      slug: "tetato-sour-cream-250-gram",
      gambar: "public/bundling.webp",
      title: "Tetato Sour Cream",
      kemasan: "250 Gram",
      harga: 50000,
      deskripsi:
        "Perpaduan gurih, creamy, dan segar dari sour cream dengan sentuhan bawang yang khas.",
    },
    {
      id: 10,
      slug: "tetato-roasted-corn-250-gram",
      gambar: "public/bundling.webp",
      title: "Tetato Roasted Corn",
      kemasan: "250 Gram",
      harga: 50000,
      deskripsi:
        "Aroma jagung bakar manis gurih yang khas, bikin camilan ini beda dari yang lain.",
    },
  ]);

  const getByKemasan = (kemasan) => {
    const produk = produks.value.filter((produk) => produk.kemasan == kemasan)

    return produk;
  }

  const getProduk = (slug) => {
    const produk = produks.value.find((produk) => produk.slug == slug);

    return produk;
  }

  return { produks, getProduk, getByKemasan};
});
