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
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';

const formData = reactive({username : "" , password: ""});
const userStore = useUserStore();
const router = useRouter();

const createAccount = () => {
    axios.post('/api/register/', formData )
    .then((response) => {
        userStore.setData(response.data);
        router.push('/');
    })
    .catch((error) => {
        console.log(error);
    })
}

</script>