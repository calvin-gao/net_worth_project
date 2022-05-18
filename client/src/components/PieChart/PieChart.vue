<template>
    <apexchart type="donut" width="100%" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAssetStore } from '@/store/assetStore';

const assetStore = useAssetStore();


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
    labels: assetStore.map(asset => asset.name),
});
const series = ref(assetStore.map(asset => asset.amount));

watch(
    () => assetStore.assets,
    (newAssets) => {
        series.value = newAssets.map(newAsset => newAsset.amount);
        chartOptions.value = {...chartOptions.value, labels: newAssets.map(newAsset => newAsset.name)};
    },
    { deep: true }
);

</script>

<style>
</style>
