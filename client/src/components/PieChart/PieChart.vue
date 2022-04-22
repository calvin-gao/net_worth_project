<template>
    <apexchart type="donut" width="500" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup>
import { defineProps, ref} from 'vue';

const props = defineProps(['assets']);
console.log(props.assets);

const chartOptions = ref({
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    total: {show: true, showAlways: true, label: 'Total'},
                }
            }
        }
    },
    labels: ['Cash', 'Investments', 'Retirement', "Hell"],
});
const series = ref([30, 40, 35, 50]);

</script>

<style>
</style>
