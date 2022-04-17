<template>

<h1>Hello Home Page</h1>

<li v-for="(item, index) in assets" :key="index">
    {{ item.name }} - {{ item.amount }}
</li>

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
</script>

<style>
h1{
    color: black;
}
</style>
