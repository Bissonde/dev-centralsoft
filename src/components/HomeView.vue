<template>
    <div class="home">
        <div class="counter">
            <Counter />
        </div>
        <div class="buttons">
            <v-btn variant="tonal" color="success" type="submit" @click="storeCounter.decreaseCount" :ripple="true"
                :disabled="loading" :loading="loading" prepend-icon="mdi-minus">
                Guardar
                <template v-slot:loader>
                    <v-progress-linear indeterminate></v-progress-linear>
                </template>
            </v-btn>
            |
            <v-btn variant="tonal" color="success" type="submit" @click="storeCounter.increaseCount" :ripple="true"
                :disabled="loading" :loading="loading" prepend-icon="mdi-plus">
                Guardar
                <template v-slot:loader>
                    <v-progress-linear indeterminate></v-progress-linear>
                </template>
            </v-btn>
        </div>
        <hr>
        <div>
            The counter is {{ storeCounter.oddOrEven }}
        </div>
        <hr>
        <div>
            <h3>Edit Counter: </h3>
            <input v-model="storeCounter.count" type="number">
        </div>
        <hr>
        <div>
            <h3>Module</h3>
            <input v-model="moduleStore.name" type="text" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCounterStore } from '@/stores/counter'
import Counter from '@/components/Counter.vue'
import { useModuleStore } from '@/stores/TaskStore'
const moduleStore = useModuleStore()
const storeCounter = useCounterStore()

</script>