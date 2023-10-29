<script setup>
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';
import { Colors } from 'chart.js';
Chart.register(Colors);

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const data = {
    labels: labels,
    datasets: [{
        label: 'Receitas',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        // color: #000,
        data: [12, 19, 3, 5, 2, 3, 9, 9, 30, 12, 17, 11],
        parsing: {
            xAxisKey: 'Key',
            yAxisKey: 'value'
        },
        borderWidth: 1
    },
    {
        label: 'Vendas',
        backgroundColor: 'rgb(20, 50, 90)',
        borderColor: 'rgb(10, 40, 80)',
        data: [2, 9, 13, 15, 12, 13, 6, 7, 8, 9, 10, 11, 12],
        borderWidth: 1
    }]
};
Chart.defaults.font.size = 16;
// Chart.defaults.font.style = 'italics';
Chart.defaults.lineHeight = '1.2';
Chart.defaults.font.family = "'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'";
Chart.defaults.font.weight = '500';
// Do not show lines for all datasets by default
Chart.defaults.datasets.line.showLine = true;

// let chart = new Chart(ctx, {
//     type: 'line',
//     data: data,
//     options: {
//         plugins: {
//             legend: {
//                 labels: {
//                     // This more specific font property overrides the global property
//                     font: {
//                         size: 14
//                     }
//                 }
//             }
//         }
//     }
// });


const options = {
    plugins: {
        colors:{
            enabled: true,
        }
    }
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

onMounted(() => {
    const myChart = new Chart(
        document.getElementById('myChart'), config
    );
})


</script>
<template>
    <!-- <h6>ChartJs</h6> -->
    <canvas id="myChart" height="100%" width="90" style=""></canvas>
</template>