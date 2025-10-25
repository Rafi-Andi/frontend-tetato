import Analisis from '@/components/dashboard/Analisis.vue'
import DashboardKategori from '@/components/dashboard/DashboardKategori.vue'
import DashboardPesanan from '@/components/dashboard/DashboardPesanan.vue'
import DashboardProduk from '@/components/dashboard/DashboardProduk.vue'
import DetailPesanan from '@/components/dashboard/DetailPesanan.vue'
import DashboardAdmin from '@/layout/DashboardAdmin.vue'
import Beranda from '@/pages/Beranda.vue'
import DetailProduk from '@/pages/DetailProduk.vue'
import KeranjangBelanja from '@/pages/KeranjangBelanja.vue'
import Login from '@/pages/Login.vue'
import Produk from '@/pages/Produk.vue'
import TentangKami from '@/pages/TentangKami.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Beranda,
      name: 'beranda',
      meta: { layout: 'default' },
    },
    {
      path: '/produk',
      component: Produk,
      name: 'produk',
      meta: { layout: 'default' },
    },
    {
      path: '/produk/:slug',
      component: DetailProduk,
      name: 'produk-detail',
      meta: { layout: 'default' },
      props: true,
    },
    {
      path: '/tentang-kami',
      component: TentangKami,
      name: 'tentang-kami',
      meta: { layout: 'default' },
    },
    {
      path: '/keranjang-belanja',
      component: KeranjangBelanja,
      meta: { layout: 'blank-layout' },
      name: 'keranjang-belanja',
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login,
      meta: { layout: 'blank-layout' },
    },
    {
      path: '/dashboard',
      component: DashboardAdmin,
      meta: { layout: 'blank-layout' },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Analisis,
          meta: { layout: 'blank-layout' },
        },
        {
          path: '/dashboard-produk',
          name: 'dashboard-produk',
          component: DashboardProduk,
          meta: { layout: 'blank-layout' },
        },
        {
          path: '/dashboard-kategori',
          name: 'dashboard-kategori',
          component: DashboardKategori,
          meta: { layout: 'blank-layout' },
        },
        {
          path: '/dashboard-pesanan',
          name: 'dashboard-pesanan',
          component: DashboardPesanan,
          meta: { layout: 'blank-layout' },
        },
        {
          path: '/detail-pesanan/:id',
          name: 'detail-pesanan',
          component: DetailPesanan,
          meta: { layout: 'blank-layout' },
        }
      ],
    },
  ],
})

export default router
