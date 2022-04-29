<template>
    <button @click="goRegister">Register</button>
    <button @click="goLogin">Login</button>
    <h1>Hello Home Page</h1>

    <li v-for="(item, index) in assetsStore.assets" :key="index">
        {{ item.name }} - {{ item.amount }}
        <button @click="removeAsset(index)">Remove</button>
    </li>

    <h1>The current runningSum is {{ total.currentSum }} </h1>


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
import { Total, titleCase } from '../../assets/helper/constants.js';
import AssetForm from '../Form/AssetForm.vue';
import PieChart  from '../PieChart/PieChart.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { useAssetStore } from '@/store/assetStore';
import axios from 'axios';

const router = useRouter();
const userStore = useUserStore();

const assetsStore = useAssetStore();
const total = ref(new Total(0.0));


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
    await axios.post('/api/assets/', {...asset}, {
        headers: {
            'Authorization': `Token ${userStore.token}`
        }
    });
}

const addAssets = async (asset) => {
    asset.name = titleCase(asset.name);
    for (var i in assetsStore.assets) {
        if (assetsStore.assets[i].name.toLowerCase() === asset.name.toLowerCase()) {
            asset.amount += assetsStore.assets[i].amount;
            await addAssettoDB(asset);
            assetsStore.updateAsset(i, asset);
            return;
        }
    }
    await addAssettoDB(asset);
    assetsStore.addAsset(asset);
}

const removeAsset = async (index) => {
    if (userStore.token) {
        await axios.delete(`/api/asset/${assetsStore.assets[index].name}/`, {
            headers: {
                'Authorization': `Token ${userStore.token}`
            }
        });
    }
    assetsStore.removeAsset(index);
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

total.value.currentSum = getRunningSum(assetsStore.assets);

watch(
    () => assetsStore.assets,
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
