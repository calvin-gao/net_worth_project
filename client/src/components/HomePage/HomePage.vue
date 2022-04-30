<template>
    <button @click="goRegister">Register</button>
    <button @click="goLogin">Login</button>
    <h1>Hello Home Page</h1>

    <li v-for="(_, index) in assetsStore.assets" :key="index">
        <AssetElement :index="index" />
    </li>

    <h1>The current runningSum is {{ assetsStore.getRunningTotal() }} </h1>


    <AssetForm @add-assets="addAssets"/>
    
    <PieChart />

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
import { titleCase } from '../../assets/helper/constants.js';
import AssetForm from '../Form/AssetForm.vue';
import PieChart  from '../PieChart/PieChart.vue';
import AssetElement from '../AssetElement/AssetElement.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { useAssetStore } from '@/store/assetStore';
import axios from 'axios';

const router = useRouter();
const userStore = useUserStore();

const assetsStore = useAssetStore();


const getAssets = () => {
    return axios.get('/api/assets/', {
        headers: {
            'Authorization': `Token ${userStore.token}`
        }
    }).then((response) => {
        assetsStore.setAssets(response.data);
    }).catch(() => {
        assetsStore.setAssets([]);
    })
};

getAssets();

const addAssettoDB = async (asset) => {
    if (userStore.token) {
        return await axios.post('/api/assets/', asset, {
            headers: {
                'Authorization': `Token ${userStore.token}`
            }
        });
    }
    return undefined;
}

const addAssets = async (asset) => {
    asset.name = titleCase(asset.name);
    const response = await addAssettoDB(asset);
    for (var i in assetsStore.assets) {
        if (assetsStore.assets[i].name.toLowerCase() === asset.name.toLowerCase()) {
            assetsStore.updateAsset(i, response?.data ?? asset);
            return;
        }
    }
    assetsStore.addAsset(response?.data ?? asset);
}

const goRegister = () => {
    router.push('/register');
}

const goLogin = () => {
    router.push('/login');
}

</script>

<style>
h1 {
    color: black;
}
</style>
