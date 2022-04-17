<template>
<form action="" class="form-inline" ref="form" @submit="addAssets">
        <div class="form-group">
            <label>Asset Name: </label>
            <input type="text" class="form-control" v-model="name" placeholder="Name" />
        </div>
        <div class="form-group">
            <label>Amount: </label>    
            <input type="text" class="form-control" v-model.number="amount" placeholder="Amount" />   
        </div>
    <button type="submit" class="btn btn-default">Submit</button>
</form>
</template>

<script setup>
import { Asset } from '../../assets/helper/constants.js';
import { ref, defineEmits } from 'vue';

const emit = defineEmits('add-assets');

const name = ref('');
const amount = ref(0);

const addAssets = (event) => {
    event.preventDefault();
    emit('add-assets', new Asset(name.value, amount.value));
}
</script>