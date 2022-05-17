<template>
    <div :class='["p-4", "border-custom", v.$errors.length && "border-custom-warning" ]'>
        <div class="input-group mb-3">
            <span class="input-group-text">Name</span>
            <input class="form-control" type="text" v-model.trim="formData.name" @input="updateAsset"/>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Amount</span>
            <span class="input-group-text">$</span>
            <input class="form-control" v-model="formData.amount" @input="updateAsset"/>
        </div>
        <template v-if="v.$errors.length != 0">
            <p v-for="error of v.$errors" :key="error.$uid" class="text-danger align-middle mb-1">
                {{ error.$property }} - {{ error.$message }}
            </p>
        </template>
        <button class="btn btn-outline-secondary" @click.prevent="removeAsset(props.index)">Remove</button>
    </div>
</template>

<script setup>
import { useAssetStore } from '../../store/assetStore';
import { useUserStore } from '../../store/userStore';
import { defineProps, reactive, watch, computed } from 'vue';
import _ from 'lodash';
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';


const props = defineProps({ "index": { "type": Number, "required": true } });
const assetsStore = useAssetStore();
const userStore = useUserStore();

const formData = reactive({...assetsStore.assets[props.index]});
var pastFormData = reactive({...assetsStore.assets[props.index]});

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

const rules = computed(() => {
    return {
        name: {required},
        amount: {required, numeric},
    }
});

const v = useVuelidate(rules, formData, { $autoDirty: true, $lazy: true });

watch(
    () => formData, 
    (formData) => {
        (async () => {
            const is_valid = await v.value.$validate();
            if (_.isEqual(formData, pastFormData) || !is_valid) {
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
            assetsStore.updateAsset(props.index, response?.data ?? {...formData, amount: parseFloat(formData?.amount)}); // if guest otherwise use form data
            pastFormData = {...formData};
        })();
    }, 
    { deep: true }
);
    

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

<style>
.border-custom {
    border-color: #ffd700 !important;
    border-radius: 5px 15px;
    border: 1px solid;
}
</style>
