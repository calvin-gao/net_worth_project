<template>
    <apexchart type="donut" width="500" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps(['assets']);

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
    labels: props.assets.map(asset => asset.name),
});
const series = ref(props.assets.map(asset => asset.amount));

watch(
    props.assets,
    (newAssets) => {
        series.value = newAssets.map(newAsset => newAsset.amount);
        chartOptions.value = {...chartOptions.value, labels: newAssets.map(newAsset => newAsset.name)};
    },
    { deep: true }
);

</script>

<style>
</style>
