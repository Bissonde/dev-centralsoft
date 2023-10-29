<template>
    <div class="about">
        <h1>About</h1>
        <button @click="storeCounter.increaseCount" class="counter-button">
            {{  storeCounter.count }}
        </button>
<br><br>
     <v-btn @click="storeCounter.decreaseCount">--</v-btn>&nbsp;<v-btn @click="storeCounter.increaseCount">++</v-btn>
    <br>
    <br>
    <v-btn @click="moduleStore.setModule(5)">SET MODULE</v-btn>
    <!-- <br><br>    <input v-model="moduleStore.dialog" /> -->
    </div>

<br>
<br>
{{ moduleStore.dialog }}
</template>

<script setup>
import { useCounterStore } from '@/store/counter';
const storeCounter = useCounterStore()

import { useModuleStore } from '@/store/TaskStore';
const moduleStore = useModuleStore()

</script>