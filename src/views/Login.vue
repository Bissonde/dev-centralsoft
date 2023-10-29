<template>
    <v-app>
        <default-bar />
        <LoginVue />

        <default-view />
    </v-app>
</template>

<script setup>
import LoginVue from '@/components/Login.vue';
import { useCounterStore } from '@/store/counter';
import { useModuleStore } from '@/store/TaskStore';


const moduleStore = useModuleStore()
const storeCounter = useCounterStore()

</script>

<script>
</script>