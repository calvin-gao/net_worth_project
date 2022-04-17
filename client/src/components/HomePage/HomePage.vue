<template>

<h1>Hello Home Page</h1>

<li v-for="(item, index) in assets" :key="index">
    {{ item.name }} - {{ item.amount }}
</li>

<!-- <h1>The current runningSum is {{ $globalData.runningSum }}} </h1> -->


<AssetForm @add-assets="addAssets" />

</template>

<script setup>
import { Asset } from '../../assets/helper/constants.js';
import AssetForm from '../Form/AssetForm.vue';
import { ref } from 'vue';

const assets = ref([new Asset('Cash', 30.0), new Asset('Investments', 40.0), new Asset('Retirement', 30.0)]);

const addAssets = (asset) => {
    assets.value.push(asset);
}

let runningSum = 0.0;
for( let i = 0 ; i < assets.value.length; i++){
    console.log(assets.value)
    runningSum = runningSum + assets.value
}

//console.log(runningSum);

</script>

<style>
h1{
    color: black;
}
</style>
