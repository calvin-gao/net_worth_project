<template>
    <NavBar></NavBar>

    <h1>Net Worth Pie Visualizer</h1>
    <h2>Hello, {{ userStore.user?.username ?? "Guest" }}</h2>

    <div class="container-fluid">
        <div class="row">
            <div class="col border-end">

                <!-- <h1>The current runningSum is {{ assetsStore.getRunningTotal() }} </h1> -->
                <AssetForm class="mb-2" @add-assets="addAssets"/>

                <template v-if="assetsStore.assets.length != 0">
                    <h3>Current Assets</h3>
                    <hr/>
                </template>
                <template v-for="(_, index) in assetsStore.assets" :key="index">
                    <AssetElement class="mb-2" :index="index" />
                </template>
            </div>
            <div class="col">
                <PieChart />
            </div>
        </div>
    </div>

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
import NavBar from '../NavBar/NavBar.vue';
import { useUserStore } from '@/store/userStore';
import { useAssetStore } from '@/store/assetStore';
import axios from 'axios';

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
        userStore.reset();
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

</script>

<style>
h1 {
    color: black;
}
.border-custom-warning {
    border-color: red !important;
}
</style>
