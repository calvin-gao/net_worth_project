<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Net Worth Calculator</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <div class="navbar-nav">
                    <div class="nav-item" aria-label="Register" v-if="!userStore.user">
                        <a class="nav-link" href="#" @click="goRegister">Register</a>
                    </div>
                    <div aria-label="Login" v-if="!userStore.user">
                        <a class="nav-link" href="#" @click="goLogin">Login</a>
                    </div>
                    <div aria-label="Logout" v-else>
                        <a class="nav-link" href="#" @click="goLogout">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { useAssetStore } from '@/store/assetStore';

const userStore = useUserStore();

const assetsStore = useAssetStore();

const router = useRouter();

const goRegister = () => {
    router.push('/register');
}

const goLogin = () => {
    router.push('/login');
}

const goLogout = () => {
    return axios.post('/api/logout/', {
        headers: {
            'Authorization': `Token ${userStore.token}`
        }
    }).finally(() => {
        userStore.reset();
        assetsStore.setAssets([]);
        router.push('/');
    });
}
</script>

<style>
</style>