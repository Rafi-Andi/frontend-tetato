<script setup>
import Sidebar from '@/components/dashboard/Sidebar.vue';
import { Icon } from '@iconify/vue';
import { RouterView } from 'vue-router'
import { ref } from 'vue' // 

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <main>
    <div class="toggle-button" @click="toggleSidebar">
        <Icon :icon="isSidebarOpen ? 'lucide:x' : 'lucide:menu'" width="28" />
    </div>

    <Sidebar :is-open="isSidebarOpen" @close-sidebar="isSidebarOpen = false" />


    <div class="content-wrapper"> <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
    main {
        font-family: 'poppins', sans-serif;
        display: grid;
        grid-template-columns: 0.8fr 3.2fr;
        height: 100vh;
    }

    .content-wrapper {
        overflow-y: auto;
    }

    .toggle-button {
        display: none; 
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1001; 
        cursor: pointer;
        color: #b6920e;
        background-color: #faf8e2;
        padding: 8px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    @media (max-width: 1024px) {
        main {
            grid-template-columns: 1fr;
            height: auto;
        }

        .toggle-button {
            display: block; 
        }
    }
</style>