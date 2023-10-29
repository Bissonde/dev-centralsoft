<template>
  <nav>
    <!-- <RouterLink to="/"><v-btn variant="text"><v-icon color="primary">mdi-home</v-icon>&nbsp;Início</v-btn></RouterLink>&nbsp;
    <RouterLink to="/about"><v-btn variant="text"><v-icon color="primary">mdi-information</v-icon>&nbsp;Sobre</v-btn></RouterLink>&nbsp;
    <RouterLink to="/posts"><v-btn variant="text"><v-icon color="primary">mdi-file</v-icon>&nbsp;Posts</v-btn></RouterLink> -->
  </nav>
  <router-view />
</template>

<script setup>
import { useModuleStore } from './store/TaskStore';
const useModule = useModuleStore()
//
</script>

<script>
</script>
