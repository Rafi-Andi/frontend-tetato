import showAlert from '@/lib/Swal'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
const KERANJANG_KEY = 'keranjang-belanja'

export const useKeranjangStore = defineStore('keranjang-store', () => {
  const keranjangBelanja = ref(JSON.parse(localStorage.getItem('keranjang-belanja')) || [])
  const jumlahProduk = ref(0)
  const totalHarga = ref(0)

  const totalKeranjang = computed(() => keranjangBelanja.value.length)

  const getKeranjang = () => {
    console.log(keranjangBelanja.value)
    return JSON.parse(localStorage.getItem('keranjang-belanja'))
  }

  const addKeranjang = (data) => {
    const dataKeranjang = getKeranjang()
    console.log(dataKeranjang)
    dataKeranjang.push({...data})
    localStorage.setItem(KERANJANG_KEY, JSON.stringify(dataKeranjang))

    keranjangBelanja.value = getKeranjang()
  }

  const hapusKeranjang = (index) => {
    const dataKeranjang = getKeranjang()

    keranjangBelanja.value.splice(index, 1)
    localStorage.setItem(KERANJANG_KEY, JSON.stringify(keranjangBelanja.value))

    getJumlahProduk()
    getTotalHarga()
  }

  const getJumlahProduk = () => {
    const dataKeranjang = getKeranjang()
    console.log(dataKeranjang)
    let jumlah = 0
    for (let index = 0; index < dataKeranjang.length; index++) {
      jumlah += dataKeranjang[index].jumlah
    }

    console.log(jumlah)
    jumlahProduk.value = jumlah
  }
  const getTotalHarga = () => {
    const dataKeranjang = getKeranjang()
    console.log(dataKeranjang)
    let harga = 0
    for (let index = 0; index < dataKeranjang.length; index++) {
      harga += dataKeranjang[index].total
    }

    totalHarga.value = harga
  }

  return { keranjangBelanja, totalKeranjang, addKeranjang, getKeranjang, hapusKeranjang, getJumlahProduk, getTotalHarga, totalHarga, jumlahProduk }
})
