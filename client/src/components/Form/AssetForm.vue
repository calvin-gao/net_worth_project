<template>
<form action="" class="form-inline" ref="form" @submit.prevent="addAssets">
    <div :class='["p-4", "border-custom-form", v.$errors.length && "border-custom-warning" ]'>
        <div class="input-group mb-2">
            <span class="input-group-text">Asset Name</span>
            <input type="text" class="form-control" v-model="state.name" placeholder="Name" />
        </div>
        <div class="input-group mb-2">
            <span class="input-group-text">Amount</span>    
            <input class="form-control" v-model="state.amount" placeholder="Amount" />   
        </div>
        <template v-if="v.$errors.length != 0">
            <p v-for="error of v.$errors" :key="error.$uid" class="text-danger align-middle mb-1">
                {{ error.$property }} - {{ error.$message }}
            </p>
        </template>
        <button type="submit" class="btn btn-primary" v-else>Submit</button>
    </div>
</form>
</template>

<script setup>
import { defineEmits, reactive, computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';

const emit = defineEmits('add-assets');
const form = ref(null);

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

const v = useVuelidate(rules, state, { $autoDirty: true, $lazy: true });

const addAssets = () => {
    if (!v.value.$validate()) {
        return;
    }
    emit('add-assets', {name: state.name.trim(), amount: parseFloat(state.amount)});
    state.name = '';
    state.amount = 0;
    v.value.$reset();
}

</script>

<style>
.border-custom-form {
    border-color: green !important;
    border-radius: 5px 15px;
    border: 1px solid;
}
</style>