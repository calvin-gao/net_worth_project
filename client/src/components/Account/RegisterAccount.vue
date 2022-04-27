<template>
    <form @submit.prevent="createAccount">
        <input v-model="formData.username" placeholder="username">
        <input v-model="formData.password" type="password" placeholder="password">
        <button type="submit">Submit</button>
    </form>

</template>
<script setup>
import {reactive } from 'vue';
import axios from "axios";

const formData = reactive({username : "" , password: ""});


const createAccount = () => {
    axios.post('/api/register/', formData )
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
}

</script>