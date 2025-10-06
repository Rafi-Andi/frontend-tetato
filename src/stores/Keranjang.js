import { defineStore } from 'pinia'
import { ref } from 'vue'
const KERANJANG_KEY = 'keranjang-belanja'

export const useKeranjangStore = defineStore('keranjang-store', () => {
  const keranjangBelanja = ref(JSON.parse(localStorage.getItem('keranjang-belanja')) || [])

  const getKeranjang = () => {
    console.log(keranjangBelanja.value)
    return keranjangBelanja.value
  }

  const addKeranjang = (data) => {
    const dataKeranjang = getKeranjang()
    console.log(dataKeranjang)
    dataKeranjang.push({...data})
    localStorage.setItem(KERANJANG_KEY, JSON.stringify(dataKeranjang))

    console.log(dataKeranjang)
  }

  const hapusKeranjang = (index) => {
    const dataKeranjang = getKeranjang()

    dataKeranjang.splice(index, 1)
    localStorage.setItem(KERANJANG_KEY, JSON.stringify(dataKeranjang))
  }

  const getJumlahProduk = () => {
    const dataKeranjang = getKeranjang()
    console.log(dataKeranjang)
    let jumlah = 0
    for (let index = 0; index < dataKeranjang.length; index++) {
      jumlah += dataKeranjang[index].jumlah
    }

    console.log(jumlah)
    return jumlah
  }
  const getTotalHarga = () => {
    const dataKeranjang = getKeranjang()
    console.log(dataKeranjang)
    let totalHarga = 0
    for (let index = 0; index < dataKeranjang.length; index++) {
      totalHarga += dataKeranjang[index].total
    }

    console.log(totalHarga)
    return totalHarga
  }

  return { keranjangBelanja, addKeranjang, getKeranjang, hapusKeranjang, getJumlahProduk, getTotalHarga }
})
