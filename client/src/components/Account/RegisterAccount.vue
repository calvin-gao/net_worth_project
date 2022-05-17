<template>
<NavBar/>
<div class="container-fluid">
    <div class="row">
        <form @submit.prevent="createAccount" :class='["m-4 p-4", "col-4 mx-auto", "border-custom-form", error && "border-custom-warning" ]'>
            <div class="text-danger mb-3" v-if="error">{{ error }}</div>
            <div class="form-floating mb-3">
                <input class="form-control" v-model="formData.username" placeholder="username"/>
                <label>Username</label>
            </div>
            <div class="form-floating mb-3">
                <input class="form-control" v-model="formData.password" type="password" placeholder="password"/>
                <label>Password</label>
            </div>
            <div class="form-floating mb-3">
                <input class="form-control" v-model="formData.password_verify" type="password" placeholder="verify password"/>
                <label>Verify Password</label>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</div>
</template>

<script setup>
import { reactive, watch, ref } from 'vue';
import axios from "axios";
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';
import NavBar from '../NavBar/NavBar.vue';

const formData = reactive({username : "" , password: "", password_verify: ""});
const error = ref("");
const userStore = useUserStore();
const router = useRouter();

watch(formData, () => {
    error.value = "";
});

const createAccount = () => {
    if (formData.password !== formData.password_verify) {
        error.value = "Passwords do not match";
        return;
    }
    axios.post('/api/register/', formData )
    .then((response) => {
        userStore.setData(response.data);
        router.push('/');
    })
    .catch((_) => {
        error.value = "Account already exists, please login.";
    })
}

</script>