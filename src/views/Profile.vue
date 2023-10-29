<template>
    <v-app>
        <default-bar />
        <ProfileVue />

        <default-view />
    </v-app>
</template>

<script setup>
import ProfileVue from '@/components/Profile.vue';
import { useCounterStore } from '@/store/counter';
import { useModuleStore } from '@/store/TaskStore';

const moduleStore = useModuleStore()
const storeCounter = useCounterStore()

</script>

<script>
</script>