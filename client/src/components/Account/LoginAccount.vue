<template>
<NavBar/>
<div class="container-fluid">
    <div class="row">
        <form @submit.prevent="loginAccount" class="col-4 m-4 mx-auto">
            <div :class='["p-4 border-custom-form", error && "border-custom-form-warning" ]'>
                <div class="text-danger mb-3" v-if="error">{{ error }}</div>
                <div class="form-floating mb-3">
                    <input class="form-control" v-model="formData.username" placeholder="username"/>
                    <label>Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input class="form-control" v-model="formData.password" type="password" placeholder="password"/>
                    <label>Password</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary w-100 border-submit-form btn-success" v-if="!error">Login</button>
        </form>
    </div>
</div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import axios from "axios";
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';
import NavBar from '../NavBar/NavBar.vue';

const formData = reactive({username : "" , password: ""});
const error = ref("");
const userStore = useUserStore();
const router = useRouter();

watch(formData, () => {
    error.value = "";
});

const loginAccount = () => {
    axios.post('/api/login/', formData)
    .then((response) => {
        userStore.setData(response.data);
        router.push('/');
    })
    .catch(() => {
        error.value = "Wrong password or username, try again";
    })
}

</script>