<template>
<form action="" class="form-inline" ref="form" @submit.prevent="addAssets">
        <div class="form-group">
            <label>Asset Name: </label>
            <input type="text" class="form-control" v-model="state.name" placeholder="Name" />
        </div>
        <div class="form-group">
            <label>Amount: </label>    
            <input type="text" class="form-control" v-model="state.amount" placeholder="Amount" />   
        </div>
        <p v-for="error of v.$errors" :key="error.$uid">
            {{ error.$property }} - {{ error.$message }}
        </p>
    <button type="submit" class="btn btn-default">Submit</button>
</form>
</template>

<script setup>
import { Asset } from '../../assets/helper/constants.js';
import { defineEmits, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';

const emit = defineEmits('add-assets');

const state = reactive({
    name: '',
    amount: 0,
});

const rules = computed(() => {
    return {
        name: {required},
        amount: {required, numeric},
    }
});

const v = useVuelidate(rules, state, { $autoDirty: true });

const addAssets = () => {
    if (v.value.$invalid) {
        return;
    }
    emit('add-assets', new Asset(state.name, parseFloat(state.amount)));
}

</script>