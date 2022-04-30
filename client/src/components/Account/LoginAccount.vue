<template>
    <form @submit.prevent="createAccount">
        <input v-model="formData.username" placeholder="username">
        <input v-model="formData.password" type="password" placeholder="password">
        <button type="submit">Login</button>
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
    axios.post('/api/login/', formData )
    .then((response) => {
        userStore.setToken(response.data.token);
        userStore.setUser(response.data.user);
        router.push('/');
    })
    .catch((error) => {
        console.log(error);
    })
}

</script>