<template>
    <apexchart type="donut" width="500" :options="chartOptions.value" :series="series.value"></apexchart>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps(['assets']);
console.log(props.assets);

const series = ref([20, 20, 30]);
const chartOptions = ref({
    chart: {
        type: 'donut',
    },
    labels: {
        show: true,
        total: {
            show: true,
        }
    },
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                show: false
            }
        }
    }]
});

</script>

<style>
</style>
