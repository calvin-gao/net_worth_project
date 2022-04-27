<template>
    <button @click="goRegister">Register</button>
    <button @click="goLogin">Login</button>
    <h1>Hello Home Page</h1>

    <li v-for="(item, index) in assets" :key="index">
        {{ item.name }} - {{ item.amount }}
        <button @click="removeAsset(index)">Remove</button>
    </li>

    <h1>The current runningSum is {{ total.currentSum }} </h1>


    <AssetForm @add-assets="addAssets"/>
    
    <PieChart :assets="assets"/>

    <!-- <div>
        <apexchart
        width="500"
        type="bar"
        :options="chartOptions"
        :series="series"
        ></apexchart>
    </div> -->
</template>

<script setup>
import { Asset, Total, titleCase } from '../../assets/helper/constants.js';
import AssetForm from '../Form/AssetForm.vue';
import PieChart  from '../PieChart/PieChart.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';

const router = useRouter();
const userStore = useUserStore();

const assets = ref([new Asset('Cash', 30.0), new Asset('Investments', 40.0), new Asset('Retirement', 30.0)]);
const total = ref(new Total(0.0));


const getAssets = () => {
    console.log(userStore.token);
    return axios.get('/api/assets/', {
        headers: {
            'Authorization': `Token ${userStore.token}`
        }
    }).then((response) => {
        assets.value = response.data;
    }).catch(() => {
    })
};

getAssets();

const addAssets = (asset) => {
    for (var i in assets.value) {
        if (assets.value[i].name.toLowerCase() === asset.name.toLowerCase()) {
            assets.value[i].amount += asset.amount;
            return;
        }
    }
    asset.name = titleCase(asset.name);
    assets.value.push(asset);
}

const removeAsset = (index) => {
    assets.value.splice(index, 1);
}

const getRunningSum = (assets) => {
    let runningSum = 0.0;
    for (let i = 0; i < assets.length; i++) {
        runningSum = runningSum + assets[i].amount
    }
    return runningSum;
}


const goRegister = () => {
    router.push('/register');
}

const goLogin = () => {
    router.push('/login');
}

total.value.currentSum = getRunningSum(assets.value);

watch(
    assets,
    (newAssets) => {
        total.value.currentSum = getRunningSum(newAssets);
    },
    { deep: true }
);

</script>

<style>
h1 {
    color: black;
}
</style>
