<template>
    <input type="text" v-model.trim="formData.name" @input="updateAsset"/>
    <input v-model.number="formData.amount" @input="updateAsset"/>
    <button @click.prevent="removeAsset(props.index)">Remove</button>
</template>

<script setup>
import { useAssetStore } from '../../store/assetStore';
import { useUserStore } from '../../store/userStore';
import { defineProps, reactive, watch, ref } from 'vue';
import _ from 'lodash';
import axios from 'axios';


const props = defineProps({ "index": { "type": Number, "required": true } });
const assetsStore = useAssetStore();
const userStore = useUserStore();

const formData = reactive({...assetsStore.assets[props.index]});
const pastFormData = reactive({...assetsStore.assets[props.index]});

const removeAsset = async (index) => {
    if (userStore.token) {
        await axios.delete(`/api/asset/${assetsStore.assets[index].id}/`, {
            headers: {
                'Authorization': `Token ${userStore.token}`
            }
        });
    }
    assetsStore.removeAsset(index);
}


watch(
    () => formData, 
    (formData, pastFormData) => {
        (async () => {
            if (_.isEqual(formData, pastFormData)) {
                return;
            }
    
            var response = undefined;
            if (userStore.token) {
                response =  await axios.put(`/api/asset/${formData.id}/`, formData, {
                    headers: {
                        'Authorization': `Token ${userStore.token}`
                    }
                });
            }
            assetsStore.updateAsset(props.index, response?.data ?? {...formData}); // if guest otherwise use form data
        })();
    }, 
    { deep: true });
    

watch(
    () => assetsStore.assets[props.index],
    (newAssets) => {
        if (newAssets) {
            formData.name = newAssets.name;
            formData.amount = newAssets.amount;
        }
    },
    { deep: true }
);
</script>
