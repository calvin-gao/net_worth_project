<template>
<form action="" class="form-inline" ref="form" @submit.prevent="addAssets">
        <div class="form-group">
            <label>Asset Name: </label>
            <input type="text" class="form-control" v-model="state.name" placeholder="Name" />
        </div>
        <div class="form-group">
            <label>Amount: </label>    
            <input class="form-control" v-model="state.amount" placeholder="Amount" />   
        </div>
        <p v-for="error of v.$errors" :key="error.$uid">
            {{ error.$property }} - {{ error.$message }}
        </p>
    <button type="submit" class="btn btn-default">Submit</button>
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
    emit('add-assets', {name: state.name.trim(), amount: parseInt(state.amount)});
    state.name = '';
    state.amount = 0;
    v.value.$reset();
}

</script>