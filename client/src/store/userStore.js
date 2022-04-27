import { defineStore } from 'pinia';


export const useUserStore = defineStore('userStore', {
    id: 'userStore',
    state: () => ({
        token: (localStorage.getItem('token-user') ?? "")
    }),
    getters: {},
    actions: {
        setToken(newToken) {
            this.token = newToken;
            localStorage.setItem('token-user', newToken);
        }
    }
})