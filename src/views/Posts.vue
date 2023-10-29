<template>
    <v-app>
        <default-bar />
            <HomeView />

        <default-view />
    </v-app>
</template>

<script setup>
// import HomeView from '@/components/HomeView.vue'

import { useCounterStore } from '@/store/counter';
const storeCounter = useCounterStore()

import { useModuleStore } from '@/store/TaskStore';
const moduleStore = useModuleStore()

</script>