<script setup>
import Chart from 'chart.js/auto';
import { onMounted } from 'vue'

const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
const data = {
    labels: labels,
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

onMounted(() => {
    const myChart = new Chart(
        document.getElementById('myChart3'), config
    );
})


</script>
<template>
    <!-- <h6>ChartJs</h6> -->
    <canvas id="myChart3"></canvas>
</template>