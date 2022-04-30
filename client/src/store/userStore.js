import { defineStore } from 'pinia';


export const useUserStore = defineStore('userStore', {
    id: 'userStore',
    state: () => ({
        token: (localStorage.getItem('token-user') ?? ""),
        user: JSON.parse((localStorage.getItem('user-user') ?? "{}"))
    }),
    getters: {},
    actions: {
        setToken(newToken) {
            this.token = newToken;
            localStorage.setItem('token-user', newToken);
        },
        setUser(newUser) {
            this.user = newUser;
            localStorage.setItem('user-user', JSON.stringify(newUser));
        },
        clearToken() {
            this.token = "";
            localStorage.removeItem('token-user');
        },
        clearUser() {
            this.user = "";
            localStorage.removeItem('user-user');
        },
        reset() {
            this.clearToken();
            this.clearUser();
        }
    }
})