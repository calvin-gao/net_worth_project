<template>

<h1>Hello Home Page</h1>

<li v-for="(item, index) in assets" :key="index">
    {{ item.name }} - {{ item.amount }}
</li>

<h1>The current runningSum is {{ total.currentSum }} </h1> 


<AssetForm @add-assets="addAssets" />

</template>

<script setup>
import { Asset , Total } from '../../assets/helper/constants.js';
import AssetForm from '../Form/AssetForm.vue';
import { ref } from 'vue';

const assets = ref([new Asset('Cash', 30.0), new Asset('Investments', 40.0), new Asset('Retirement', 30.0)]);

const addAssets = (asset) => {
    assets.value.push(asset);
}

let runningSum = ref(0.0);
for( let i = 0 ; i < assets.value.length; i++){
    runningSum.value = runningSum.value + assets.value[i].amount
}

const total = ref(new Total(runningSum))
console.log(runningSum.value);

</script>

<style>
h1{
    color: black;
}
</style>
